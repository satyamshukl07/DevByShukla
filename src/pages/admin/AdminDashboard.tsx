import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  fetchAdminStats,
  fetchAdminReviews,
  fetchAdminEnquiries,
  approveReview,
  rejectReview
} from '../../services/adminApi';
import { AdminStats, ReviewItem, EnquiryItem } from '../../types';
import {
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowRight,
  Check,
  X,
  ExternalLink,
  Shield,
  Calendar,
  UserCheck,
  AlertTriangle,
  Loader2
} from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingReviews, setPendingReviews] = useState<ReviewItem[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, reviewsData, enquiriesData] = await Promise.all([
        fetchAdminStats(),
        fetchAdminReviews('pending'),
        fetchAdminEnquiries(),
      ]);
      setStats(statsData);
      setPendingReviews(reviewsData.slice(0, 5));
      setRecentEnquiries(enquiriesData.slice(0, 4));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveReview(id);
      setToastMessage('Review approved! It is now live on the public website.');
      await loadDashboardData();
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
      setToastMessage('Review marked as rejected.');
      await loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Failed to reject review');
    } finally {
      setActionLoading(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Real-time control panel for customer reviews, inquiries, and approvals."
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between shadow-lg shadow-emerald-500/10 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        {/* Total Reviews */}
        <div className="bg-[#0b1222] border border-slate-800/90 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Reviews
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {loading ? '-' : stats?.totalReviews ?? 0}
          </div>
          <Link
            to="/admin/reviews"
            className="mt-3 inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            <span>View all reviews</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Pending Reviews */}
        <div className="bg-[#0b1222] border border-amber-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Pending Approval
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-300">
            {loading ? '-' : stats?.pendingReviews ?? 0}
          </div>
          <Link
            to="/admin/reviews/pending"
            className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            <span>Review submissions</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Approved Reviews */}
        <div className="bg-[#0b1222] border border-slate-800/90 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Approved (Public)
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {loading ? '-' : stats?.approvedReviews ?? 0}
          </div>
          <Link
            to="/admin/reviews/approved"
            className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <span>Live on website</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Rejected Reviews */}
        <div className="bg-[#0b1222] border border-slate-800/90 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Rejected
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-400">
            {loading ? '-' : stats?.rejectedReviews ?? 0}
          </div>
          <Link
            to="/admin/reviews/rejected"
            className="mt-3 inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium"
          >
            <span>View rejected</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Total Enquiries */}
        <div className="bg-[#0b1222] border border-slate-800/90 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Total Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {loading ? '-' : stats?.totalEnquiries ?? 0}
          </div>
          <Link
            to="/admin/enquiries"
            className="mt-3 inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            <span>{stats?.newEnquiries ? `${stats.newEnquiries} new inquiries` : 'View inbox'}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Pending Reviews & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pending Reviews Queue (Takes 7 cols) */}
        <div className="lg:col-span-7 bg-[#0b1222] border border-slate-800/90 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Pending Reviews Queue</h2>
              {pendingReviews.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  {pendingReviews.length}
                </span>
              )}
            </div>
            <Link
              to="/admin/reviews/pending"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>View all pending</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center items-center text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mr-2 text-blue-500" />
              <span>Loading pending reviews...</span>
            </div>
          ) : pendingReviews.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3 opacity-80" />
              <h3 className="text-sm font-semibold text-white">No pending reviews</h3>
              <p className="text-xs text-slate-400 mt-1">
                All customer reviews have been reviewed. New customer submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((rev) => (
                <div
                  key={rev._id}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.photoUrl}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700 bg-slate-800"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                        {rev.email && (
                          <p className="text-xs text-slate-400">{rev.email}</p>
                        )}
                        <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[11px] text-slate-400 ml-1">
                            • {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(rev._id)}
                        disabled={actionLoading === rev._id}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                        title="Approve and publish publicly"
                      >
                        {actionLoading === rev._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">Approve</span>
                      </button>

                      <button
                        onClick={() => handleReject(rev._id)}
                        disabled={actionLoading === rev._id}
                        className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                        title="Reject review"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reject</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 pl-1 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50">
                    "{rev.reviewText}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contact Inquiries (Takes 5 cols) */}
        <div className="lg:col-span-5 bg-[#0b1222] border border-slate-800/90 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Recent Enquiries</h2>
              </div>
              <Link
                to="/admin/enquiries"
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <span>View inbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 flex justify-center items-center text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mr-2 text-indigo-500" />
                <span>Loading enquiries...</span>
              </div>
            ) : recentEnquiries.length === 0 ? (
              <div className="py-12 text-center">
                <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-white">No inquiries yet</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Inquiries submitted via the public Contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {recentEnquiries.map((enq) => (
                  <div
                    key={enq._id}
                    className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-bold text-white truncate max-w-[170px]">
                        {enq.name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'New'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mb-2">
                      {enq.email} {enq.phone && `• ${enq.phone}`}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 bg-slate-950/30 p-2 rounded-lg border border-slate-800/40">
                      {enq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Review Submission Simulator Card */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border border-blue-800/40 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Public Flow Verification</p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Test submitting a review on the public page and approving it here.
                </p>
              </div>
              <a
                href="/testimonials"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>Write Review</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
