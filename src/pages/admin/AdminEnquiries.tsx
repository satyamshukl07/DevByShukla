import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  fetchAdminEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from '../../services/adminApi';
import { EnquiryItem, EnquiryStatus } from '../../types';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Building2,
  DollarSign,
  Briefcase,
  Trash2,
  ExternalLink,
  Loader2,
  AlertTriangle,
  Eye,
  X,
  Send
} from 'lucide-react';

export function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<'all' | EnquiryStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminEnquiries(activeStatus === 'all' ? undefined : activeStatus);
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [activeStatus]);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setActionLoading(id);
    try {
      await updateEnquiryStatus(id, newStatus);
      setToastMessage(`Status updated to "${newStatus}".`);
      await loadEnquiries();
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update enquiry status');
    } finally {
      setActionLoading(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    try {
      await deleteEnquiry(id);
      setToastMessage('Enquiry deleted.');
      setDeleteConfirmId(null);
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      await loadEnquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to delete enquiry');
    } finally {
      setActionLoading(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      (e.phone && e.phone.toLowerCase().includes(q)) ||
      (e.company && e.company.toLowerCase().includes(q)) ||
      e.message.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout
      title="Contact Enquiries"
      subtitle="Client leads and quote requests submitted via the contact form."
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

      {/* Filter and Search Bar */}
      <div className="bg-[#0b1222] border border-slate-800/90 rounded-3xl p-4 sm:p-6 shadow-xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {(['all', 'New', 'Contacted', 'Resolved'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeStatus === status
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{status === 'all' ? 'All Inquiries' : status}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="bg-[#0b1222] border border-slate-800/90 rounded-3xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <p className="text-sm">Loading inquiries from database...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-20 text-center px-4">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No inquiries found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'Try adjusting your search criteria.'
                : 'Customer inquiries submitted through your website will be saved here automatically.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Prospect</th>
                  <th className="py-3.5 px-4">Project / Budget</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-900/40 transition-colors">
                    {/* Prospect Info */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-white text-sm">{enq.name}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{enq.email}</div>
                      {enq.phone && (
                        <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{enq.phone}</span>
                        </div>
                      )}
                      {enq.company && (
                        <div className="text-blue-400 text-[11px] font-medium flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3" />
                          <span>{enq.company}</span>
                        </div>
                      )}
                    </td>

                    {/* Project & Budget */}
                    <td className="py-4 px-4">
                      {enq.projectType ? (
                        <span className="font-medium text-slate-200 block">
                          {enq.projectType}
                        </span>
                      ) : (
                        <span className="text-slate-500">General Inquiry</span>
                      )}
                      {enq.budget && (
                        <span className="text-[11px] text-emerald-400 font-mono block mt-1">
                          {enq.budget}
                        </span>
                      )}
                    </td>

                    {/* Message */}
                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <p className="line-clamp-2 text-slate-300 leading-relaxed">
                        {enq.message}
                      </p>
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 font-medium mt-1 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View full message</span>
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                      {new Date(enq.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value as EnquiryStatus)}
                        disabled={actionLoading === enq._id}
                        className={`text-xs font-bold rounded-xl px-2.5 py-1.5 border bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                          enq.status === 'New'
                            ? 'text-blue-400 border-blue-500/40'
                            : enq.status === 'Contacted'
                            ? 'text-amber-400 border-amber-500/40'
                            : 'text-emerald-400 border-emerald-500/40'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Direct Email */}
                        <a
                          href={`mailto:${enq.email}?subject=Regarding%20Your%20Website%20Inquiry%20-%20DevByShukla`}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Reply by Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>

                        {/* Direct WhatsApp if phone available */}
                        {enq.phone && (
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(
                              enq.name
                            )},%20this%20is%20Satyam%20Shukla%20from%20DevByShukla.%20Thank%20you%20for%20your%20inquiry!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-800/80 text-emerald-400 hover:text-white border border-emerald-800/40 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <Send className="w-4 h-4" />
                          </a>
                        )}

                        {/* Delete Enquiry */}
                        <button
                          onClick={() => setDeleteConfirmId(enq._id)}
                          disabled={actionLoading === enq._id}
                          className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-white border border-rose-900/40 transition-colors cursor-pointer"
                          title="Delete Enquiry"
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

      {/* Full Enquiry Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1222] border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">{selectedEnquiry.name}</h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-5">
              <a href={`mailto:${selectedEnquiry.email}`} className="hover:text-blue-400 underline">
                {selectedEnquiry.email}
              </a>
              {selectedEnquiry.phone && <span>• {selectedEnquiry.phone}</span>}
              {selectedEnquiry.company && <span>• {selectedEnquiry.company}</span>}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5 text-xs bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Project Type:</span>
                <span className="text-slate-200 font-medium">{selectedEnquiry.projectType || 'General'}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Estimated Budget:</span>
                <span className="text-emerald-400 font-medium font-mono">{selectedEnquiry.budget || 'Not specified'}</span>
              </div>
              {selectedEnquiry.businessType && (
                <div>
                  <span className="text-slate-500 block uppercase font-semibold text-[10px]">Industry:</span>
                  <span className="text-slate-200">{selectedEnquiry.businessType}</span>
                </div>
              )}
              <div>
                <span className="text-slate-500 block uppercase font-semibold text-[10px]">Submitted:</span>
                <span className="text-slate-200">{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[11px] uppercase font-bold text-slate-400 block mb-2">Project Requirements:</label>
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 max-h-56 overflow-y-auto text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status changer in modal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value as EnquiryStatus)}
                  className="text-xs font-bold rounded-xl px-3 py-1.5 border bg-slate-900 text-white border-slate-700"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Regarding%20Your%20Website%20Inquiry%20-%20DevByShukla`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Lead</span>
                </a>
              </div>
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
              <h3 className="text-lg font-bold text-white">Delete Enquiry?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Are you sure you want to delete this customer inquiry? This action cannot be undone.
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
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
