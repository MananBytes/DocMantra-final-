import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Trash2, Eye, Search as SearchIcon, FileText } from 'lucide-react';
import { listDocuments, deleteDocument, downloadDocument } from '../services/documents';
import { useToast } from '../components/Toast';
import Modal from '../components/Modal';

export default function Documents() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const [viewDoc, setViewDoc] = useState(null);
    const [deleteDoc, setDeleteDoc] = useState(null);

    const fetchDocuments = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await listDocuments();
            setDocs(data.documents || []);
        } catch (err) {
            const msg = err.response?.data?.detail || 'Failed to load documents';
            setError(msg);
            showToast('error', 'Load failed', msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleDownload = async (doc) => {
        try {
            const blob = await downloadDocument(doc.document_id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = doc.original_filename;
            a.click();
            window.URL.revokeObjectURL(url);
            showToast('success', 'Downloading', doc.original_filename);
        } catch {
            showToast('error', 'Download failed', 'Could not download the file.');
        }
    };

    const confirmDelete = async () => {
        if (!deleteDoc) return;
        try {
            await deleteDocument(deleteDoc.document_id);
            setDocs(docs.filter((d) => d.document_id !== deleteDoc.document_id));
            showToast('success', 'Document deleted', deleteDoc.original_filename);
            setDeleteDoc(null);
        } catch {
            showToast('error', 'Delete failed', 'Could not delete the document.');
        }
    };

    const formatSize = (b) => {
        if (b < 1024) return b + ' B';
        if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
        return (b / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (d) =>
        new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const fileBadge = (type) => {
        const t = (type || 'txt').toLowerCase();
        let cls = 'file-txt';
        if (t === 'pdf') cls = 'file-pdf';
        else if (t === 'docx' || t === 'doc') cls = 'file-doc';
        else if (['jpg', 'jpeg', 'png'].includes(t)) cls = 'file-img';
        return <div className={`file-badge ${cls}`}>{t.toUpperCase().slice(0, 4)}</div>;
    };

    const statusBadge = (s) => {
        if (s === 'completed') return <span className="badge badge-success">Completed</span>;
        if (s === 'processing') return <span className="badge badge-warning">Processing</span>;
        if (s === 'failed') return <span className="badge badge-danger">Failed</span>;
        return <span className="badge badge-neutral">{s}</span>;
    };

    const departments = ['All', ...new Set(docs.map((d) => d.department).filter(Boolean))];
    const statuses = ['All', 'uploaded', 'processing', 'completed', 'failed'];

    const filtered = docs.filter((d) => {
        const q = search.toLowerCase();
        const matchesSearch =
            !q ||
            d.original_filename?.toLowerCase().includes(q) ||
            d.title?.toLowerCase().includes(q) ||
            d.department?.toLowerCase().includes(q) ||
            d.category?.toLowerCase().includes(q);
        const matchesDept = deptFilter === 'All' || d.department === deptFilter;
        const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
        return matchesSearch && matchesDept && matchesStatus;
    });

    const handleSearchClickOrFocus = () => {
        const qParam = search.trim() ? `?q=${encodeURIComponent(search.trim())}` : '';
        navigate(`/search${qParam}`);
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-up">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-xl sm:text-[22px] font-extrabold text-navy-900 tracking-tight">All Documents</h1>
                    <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
                        {docs.length} document{docs.length !== 1 ? 's' : ''} • {departments.length - 1} department{departments.length - 1 !== 1 ? 's' : ''}
                    </p>
                </div>
                <button onClick={() => navigate('/upload')} className="btn btn-primary">
                    <Plus className="w-4 h-4" />
                    Upload Document
                </button>
            </div>

            {/* Toolbar - 2) Search bar in Documents page redirects to Search page */}
            <div className="card p-3 flex items-center gap-3 flex-wrap">
                <div
                    onClick={handleSearchClickOrFocus}
                    className="relative flex-1 min-w-[200px] sm:min-w-[280px] cursor-pointer group"
                >
                    <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onFocus={handleSearchClickOrFocus}
                        onClick={handleSearchClickOrFocus}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
                        }}
                        placeholder="Search documents..."
                        className="input pl-10 cursor-pointer group-hover:border-emerald-400 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="input !w-full sm:!w-auto">
                        {departments.map((d) => <option key={d}>{d === 'All' ? 'All Departments' : d}</option>)}
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input !w-full sm:!w-auto">
                        {statuses.map((s) => <option key={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
                    </select>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-12 text-slate-500 text-sm">Loading documents...</div>
            ) : error ? (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                    {error}
                </div>
            ) : filtered.length === 0 ? (
                <div className="card empty-state">
                    <div className="empty-icon"><FileText className="w-7 h-7" /></div>
                    <div className="text-base font-bold text-slate-700 mb-1.5">
                        {docs.length === 0 ? 'No documents yet' : 'No matching documents'}
                    </div>
                    <div className="text-[13px] text-slate-500 mb-5">
                        {docs.length === 0 ? 'Upload your first document to get started' : 'Try a different search or filter'}
                    </div>
                    {docs.length === 0 && (
                        <button onClick={() => navigate('/upload')} className="btn btn-primary">
                            <Plus className="w-4 h-4" />
                            Upload Document
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((d) => (
                        <div key={d.document_id} className="card card-hover p-5 flex flex-col">
                            <div className="flex items-start justify-between mb-3.5">
                                {fileBadge(d.file_type)}
                                {statusBadge(d.status)}
                            </div>
                            <div className="text-sm font-bold text-navy-900 mb-1 break-words">
                                {d.original_filename}
                            </div>
                            <div className="text-[11px] text-slate-400">
                                {d.department || 'No dept'} • {formatSize(d.file_size)} • {formatDate(d.created_at)}
                            </div>
                            {d.summary && (
                                <div className="text-xs text-slate-600 leading-relaxed mt-3 mb-3 line-clamp-2">
                                    {d.summary}
                                </div>
                            )}
                            <div className="mt-auto flex items-center gap-1 pt-3.5 border-t border-slate-100 flex-wrap">
                                <button onClick={() => setViewDoc(d)} className="flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                                    <Eye className="w-3.5 h-3.5" /> View
                                </button>
                                <button onClick={() => handleDownload(d)} className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                                    <Download className="w-3.5 h-3.5" /> Download
                                </button>
                                <button onClick={() => setDeleteDoc(d)} className="flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold text-red-600 hover:bg-red-50 transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* View Modal */}
            <Modal
                isOpen={!!viewDoc}
                onClose={() => setViewDoc(null)}
                title={viewDoc?.original_filename || ''}
                subtitle={viewDoc ? `${viewDoc.department || 'No dept'} • ${viewDoc.category || 'No category'}` : ''}
                footer={
                    <>
                        <button onClick={() => setViewDoc(null)} className="btn btn-secondary">Close</button>
                        <button onClick={() => { handleDownload(viewDoc); setViewDoc(null); }} className="btn btn-primary">
                            Download
                        </button>
                    </>
                }
            >
                {viewDoc && (
                    <div className="space-y-4">
                        {viewDoc.summary && (
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                    AI Summary
                                </div>
                                <p className="text-[13px] text-slate-700 leading-relaxed">{viewDoc.summary}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Document ID</div>
                                <div className="text-xs font-semibold text-slate-700 mt-0.5 break-all">{viewDoc.document_id}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">File Size</div>
                                <div className="text-xs font-semibold text-slate-700 mt-0.5">{formatSize(viewDoc.file_size)}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</div>
                                <div className="mt-0.5">{statusBadge(viewDoc.status)}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uploaded</div>
                                <div className="text-xs font-semibold text-slate-700 mt-0.5">{formatDate(viewDoc.created_at)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal
                isOpen={!!deleteDoc}
                onClose={() => setDeleteDoc(null)}
                title="Delete Document?"
                subtitle="This action cannot be undone"
                footer={
                    <>
                        <button onClick={() => setDeleteDoc(null)} className="btn btn-secondary">Cancel</button>
                        <button onClick={confirmDelete} className="btn btn-danger">Delete</button>
                    </>
                }
            >
                {deleteDoc && (
                    <p className="text-[13px] text-slate-600">
                        Are you sure you want to delete <strong className="text-slate-900">{deleteDoc.original_filename}</strong>?
                        This will permanently remove the file and its metadata.
                    </p>
                )}
            </Modal>
        </div>
    );
}