import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  fetchAdminReviews,
  approveReview,
  rejectReview,
  deleteReview,
  fetchAdminStats
} from '../../services/adminApi';
import { ReviewItem, ReviewStatus, AdminStats } from '../../types';
import {
  Star,
  Check,
  X,
  Trash2,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Filter,
  Eye
} from 'lucide-react';

export function AdminReviews() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab filter based on path
  const getInitialTab = (): 'all' | ReviewStatus => {
    if (location.pathname.includes('/pending')) return 'pending';
    if (location.pathname.includes('/approved')) return 'approved';
    if (location.pathname.includes('/rejected')) return 'rejected';
    return 'all';
  };

  const [activeTab, setActiveTab] = useState<'all' | ReviewStatus>(getInitialTab());
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync tab with route if path changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reviewsData, statsData] = await Promise.all([
        fetchAdminReviews(activeTab === 'all' ? undefined : activeTab),
        fetchAdminStats()
      ]);
      setReviews(reviewsData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleTabChange = (tab: 'all' | ReviewStatus) => {
    setActiveTab(tab);
    if (tab === 'all') navigate('/admin/reviews');
    else navigate(`/admin/reviews/${tab}`);
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveReview(id);
      setToastMessage('Review approved successfully! Now visible on public site.');
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to approve review');
    } finally {
      setActionLoading(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await rejectReview(id);
      setToastMessage('Review rejected.');
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to reject review');
    } finally {
      setActionLoading(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      await deleteReview(id);
      setToastMessage('Review permanently removed.');
      setDeleteConfirmId(null);
      if (selectedReview?._id === id) setSelectedReview(null);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete review');
    } finally {
      setActionLoading(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      r.reviewText.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout
      title="Review Management"
      subtitle="Moderate incoming customer feedback, approve testimonials, and manage ratings."
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between shadow-lg shadow-emerald-500/10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs and Search Bar */}
      <div className="bg-[#0b1222] border border-slate-800/90 rounded-3xl p-4 sm:p-6 shadow-xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>All Reviews</span>
              {stats?.totalReviews !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30">
                  {stats.totalReviews}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'pending'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-slate-900/80 text-amber-400 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pending</span>
              {stats?.pendingReviews !== undefined && stats.pendingReviews > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-950 text-amber-200 border border-amber-500/40">
                  {stats.pendingReviews}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange('approved')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'approved'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-900/80 text-emerald-400 hover:text-emerald-300 hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approved (Live)</span>
              {stats?.approvedReviews !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-200">
                  {stats.approvedReviews}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange('rejected')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'rejected'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-900/80 text-rose-400 hover:text-rose-300 hover:bg-slate-800'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Rejected</span>
              {stats?.rejectedReviews !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-950 text-rose-200">
                  {stats.rejectedReviews}
                </span>
              )}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or content..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Reviews Table / Cards Container */}
      <div className="bg-[#0b1222] border border-slate-800/90 rounded-3xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <p className="text-sm">Loading reviews from database...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-20 text-center px-4">
            <Star className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">
              {activeTab === 'pending'
                ? 'No pending reviews'
                : activeTab === 'approved'
                ? 'No approved reviews'
                : activeTab === 'rejected'
                ? 'No rejected reviews'
                : 'No reviews found'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'Try adjusting your search criteria.'
                : 'Reviews submitted by users through the public website will appear here for review.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Customer</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4">Review Message</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {filteredReviews.map((rev) => (
                  <tr
                    key={rev._id}
                    className="hover:bg-slate-900/40 transition-colors"
                  >
                    {/* Customer Info */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.photoUrl}
                          alt={rev.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-700 bg-slate-800 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-white text-sm truncate max-w-[160px]">
                            {rev.name}
                          </div>
                          {rev.email && (
                            <div className="text-slate-400 text-[11px] truncate max-w-[160px]">
                              {rev.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Review text snippet */}
                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <p className="line-clamp-2 text-slate-300 leading-relaxed">
                        "{rev.reviewText}"
                      </p>
                      <button
                        onClick={() => setSelectedReview(rev)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 font-medium mt-1 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Read full</span>
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                      {new Date(rev.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {rev.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                      {rev.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approved</span>
                        </span>
                      )}
                      {rev.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          <XCircle className="w-3 h-3" />
                          <span>Rejected</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Approve Button (shown if pending or rejected) */}
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove(rev._id)}
                            disabled={actionLoading === rev._id}
                            className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all cursor-pointer disabled:opacity-50"
                            title="Approve Review (Publish)"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}

                        {/* Reject Button (shown if pending or approved) */}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleReject(rev._id)}
                            disabled={actionLoading === rev._id}
                            className="p-2 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 transition-all cursor-pointer disabled:opacity-50"
                            title="Reject Review"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteConfirmId(rev._id)}
                          disabled={actionLoading === rev._id}
                          className="p-2 rounded-xl bg-rose-600/15 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-all cursor-pointer disabled:opacity-50"
                          title="Delete Permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Full Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1222] border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <img
                src={selectedReview.photoUrl}
                alt={selectedReview.name}
                className="w-14 h-14 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedReview.name}</h3>
                {selectedReview.email && (
                  <p className="text-xs text-slate-400">{selectedReview.email}</p>
                )}
                <div className="flex items-center gap-1 mt-1 text-amber-400">
                  {Array.from({ length: selectedReview.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">
                    ({selectedReview.rating} out of 5 stars)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-6 max-h-60 overflow-y-auto">
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                "{selectedReview.reviewText}"
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
              <span>Submitted on: {new Date(selectedReview.createdAt).toLocaleString()}</span>
              <span className="capitalize font-semibold text-slate-300">
                Status: {selectedReview.status}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              {selectedReview.status !== 'approved' && (
                <button
                  onClick={() => {
                    handleApprove(selectedReview._id);
                    setSelectedReview(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Publish</span>
                </button>
              )}

              {selectedReview.status !== 'rejected' && (
                <button
                  onClick={() => {
                    handleReject(selectedReview._id);
                    setSelectedReview(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              )}

              <button
                onClick={() => {
                  setDeleteConfirmId(selectedReview._id);
                  setSelectedReview(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1222] border border-rose-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="text-lg font-bold text-white">Permanently Delete Review?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Are you sure you want to delete this review? This action cannot be undone and will permanently remove this feedback from the database.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-rose-600/30"
              >
                Yes, Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
