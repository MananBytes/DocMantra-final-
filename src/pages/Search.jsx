import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Sparkles, Download, Eye, FileText } from 'lucide-react';
import { listDocuments, downloadDocument } from '../services/documents';
import { useToast } from '../components/Toast';
import Modal from '../components/Modal';

const SUGGESTIONS = [
    'fire safety',
    'leave policy',
    'maintenance',
    'invoice',
    'board meeting',
    'environmental',
];

export default function SearchPage() {
    const { showToast } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get('q') || '';

    const [query, setQuery] = useState(urlQuery);
    const [allDocs, setAllDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewDoc, setViewDoc] = useState(null);

    // Synchronize query state with URL search param
    useEffect(() => {
        const q = searchParams.get('q');
        if (q !== null) {
            setQuery(q);
        }
    }, [searchParams]);

    const updateQuery = (newVal) => {
        setQuery(newVal);
        if (newVal.trim()) {
            setSearchParams({ q: newVal }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
    };

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const data = await listDocuments();
                setAllDocs(data.documents || []);
            } catch {
                showToast('error', 'Load failed', 'Could not fetch documents');
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
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
            showToast('error', 'Download failed');
        }
    };

    const q = query.trim().toLowerCase();
    const results = q
        ? allDocs.filter((d) => {
              const blob = [
                  d.original_filename,
                  d.title,
                  d.summary,
                  d.department,
                  d.category,
                  ...(d.keywords || []),
              ]
                  .filter(Boolean)
                  .join(' ')
                  .toLowerCase();
              return blob.includes(q);
          })
        : [];

    const formatSize = (b) => {
        if (b < 1024) return b + ' B';
        if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
        return (b / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const fileBadge = (type) => {
        const t = (type || 'txt').toLowerCase();
        let cls = 'file-txt';
        if (t === 'pdf') cls = 'file-pdf';
        else if (t === 'docx' || t === 'doc') cls = 'file-doc';
        else if (['jpg', 'jpeg', 'png'].includes(t)) cls = 'file-img';
        return <div className={`file-badge ${cls} !w-11 !h-11 !rounded-xl !text-[10px]`}>{t.toUpperCase().slice(0, 4)}</div>;
    };

    const statusBadge = (s) => {
        if (s === 'completed') return <span className="badge badge-success">Completed</span>;
        if (s === 'processing') return <span className="badge badge-warning">Processing</span>;
        if (s === 'failed') return <span className="badge badge-danger">Failed</span>;
        return <span className="badge badge-neutral">{s}</span>;
    };

    return (
        <div className="max-w-[900px] mx-auto space-y-6 animate-fade-up px-2 sm:px-0">
            {/* Hero search */}
            <div className="text-center pt-4 sm:pt-8 pb-4">
                <div className="inline-flex items-center gap-1.5 text-aqua-600 font-bold text-xs uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4" /> AI-Powered Search
                </div>
                <h1 className="text-2xl sm:text-[28px] font-extrabold text-navy-900 tracking-tight mb-2">
                    Find anything in your documents
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-7">
                    Search by meaning, not just keywords. Try asking a question.
                </p>

                <div className="relative max-w-[640px] mx-auto">
                    <SearchIcon className="w-5 h-5 absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => updateQuery(e.target.value)}
                        placeholder="Try: 'fire safety requirements' or 'Q4 maintenance report'..."
                        className="w-full pl-11 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 text-sm sm:text-[15px] bg-white rounded-2xl border-2 border-slate-200 outline-none transition-all focus:border-aqua-500 shadow-md"
                        style={{ boxShadow: '0 4px 6px -1px rgba(10, 25, 41, 0.07)' }}
                        autoFocus
                    />
                </div>

                <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                    {SUGGESTIONS.map((s) => (
                        <button
                            key={s}
                            onClick={() => updateQuery(s)}
                            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-aqua-300 hover:text-aqua-700 hover:bg-aqua-50 transition-all cursor-pointer"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div className="text-center py-12 text-slate-500 text-sm">Loading...</div>
            ) : !query.trim() ? (
                <div className="card empty-state mt-4">
                    <div className="empty-icon"><SearchIcon className="w-7 h-7" /></div>
                    <div className="text-base font-bold text-slate-700 mb-1.5">
                        Start typing to search
                    </div>
                    <div className="text-[13px] text-slate-500">
                        {allDocs.length} documents available to search
                    </div>
                </div>
            ) : results.length === 0 ? (
                <div className="card empty-state">
                    <div className="empty-icon"><SearchIcon className="w-7 h-7" /></div>
                    <div className="text-base font-bold text-slate-700 mb-1.5">No results found</div>
                    <div className="text-[13px] text-slate-500">
                        Try different keywords or browse all documents
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                        {results.length} result{results.length !== 1 ? 's' : ''}
                    </div>
                    {results.map((d) => (
                        <div key={d.document_id} className="card card-hover p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                {fileBadge(d.file_type)}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                        <div className="text-sm font-bold text-navy-900 truncate">
                                            {d.original_filename}
                                        </div>
                                        {statusBadge(d.status)}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                        {d.department || 'No dept'} • {d.category || 'No category'} • {formatSize(d.file_size)}
                                    </div>
                                    {d.summary && (
                                        <div className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                                            {d.summary}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                                <button
                                    onClick={() => setViewDoc(d)}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                                    title="View"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDownload(d)}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                                    title="Download"
                                >
                                    <Download className="w-4 h-4" />
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
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">File Size</div>
                                <div className="text-xs font-semibold text-slate-700 mt-0.5">{formatSize(viewDoc.file_size)}</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</div>
                                <div className="mt-0.5">{statusBadge(viewDoc.status)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}