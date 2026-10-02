import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Building2, FileCheck2, AlertCircle, Cpu } from 'lucide-react';
import { listDocuments } from '../services/documents';

export default function Dashboard() {
    const navigate = useNavigate();
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const data = await listDocuments();
                setDocs(data.documents || []);
            } catch (err) {
                console.error('Failed to load stats');
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, []);

    const total = docs.length;
    const completed = docs.filter((d) => d.status === 'completed').length;
    const processing = docs.filter((d) => d.status === 'processing').length;
    const failed = docs.filter((d) => d.status === 'failed').length;
    const depts = new Set(docs.map((d) => d.department).filter(Boolean)).size;

    const stats = [
        {
            label: 'Total Documents',
            value: total,
            sub: total > 0 ? `${docs.filter((d) => d.status === 'uploaded').length} pending` : 'No documents yet',
            up: total > 0,
            icon: FileText,
            color: 'bg-aqua-50 text-aqua-600',
        },
        {
            label: 'Departments',
            value: depts,
            sub: depts > 0 ? 'Active' : 'None',
            up: false,
            icon: Building2,
            color: 'bg-emerald-50 text-emerald-600',
        },
        {
            label: 'Completed',
            value: completed,
            sub: `${processing} processing`,
            up: false,
            icon: FileCheck2,
            color: 'bg-amber-50 text-amber-600',
        },
        {
            label: 'Failed',
            value: failed,
            sub: failed > 0 ? 'Needs attention' : 'All good',
            up: false,
            icon: AlertCircle,
            color: 'bg-slate-100 text-slate-600',
        },
    ];

    const recent = [...docs]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    const formatSize = (b) => {
        if (b < 1024) return b + ' B';
        if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
        return (b / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (d) => {
        const date = new Date(d);
        const diff = Math.floor((Date.now() - date) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return Math.floor(diff / 86400) + 'd ago';
    };

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

    // Compute department breakdown for chart
    const deptCounts = {};
    docs.forEach((d) => {
        const dept = d.department || 'Unknown';
        deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });
    const deptEntries = Object.entries(deptCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const maxCount = Math.max(...deptEntries.map((e) => e[1]), 1);

    return (
        <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-up px-1 sm:px-0">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-[22px] font-extrabold text-navy-900 tracking-tight">
                    Good day, {total > 0 ? 'Admin' : 'there'} 👋
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
                    Here's what's happening in your document workspace.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500 text-sm">Loading dashboard...</div>
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {stats.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={i} className="stat-card">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold text-slate-500">{s.label}</span>
                                        <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${s.color}`}>
                                            <Icon className="w-[18px] h-[18px]" />
                                        </div>
                                    </div>
                                    <div className="text-2xl sm:text-[28px] font-extrabold text-navy-900 tracking-tight leading-none">
                                        {s.value}
                                    </div>
                                    <div className={`text-xs mt-1.5 ${s.up ? 'text-emerald-600' : 'text-slate-500'}`}>
                                        {s.up ? '↑ ' : ''}{s.sub}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Recent Uploads */}
                        <div className="lg:col-span-2 card overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                                <div className="text-sm font-bold text-navy-900">Recent Uploads</div>
                                <button
                                    onClick={() => navigate('/documents')}
                                    className="text-xs font-semibold text-aqua-600 hover:text-aqua-700 cursor-pointer"
                                >
                                    View all →
                                </button>
                            </div>
                            {recent.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <div className="text-base font-bold text-slate-700 mb-1.5">No documents yet</div>
                                    <div className="text-[13px] text-slate-500 mb-5">Upload your first document to get started</div>
                                    <button onClick={() => navigate('/upload')} className="btn btn-primary">
                                        Upload Document
                                    </button>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {recent.map((d) => (
                                        <div key={d.document_id} className="flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-slate-50 transition-colors">
                                            {fileBadge(d.file_type)}
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[13px] font-semibold text-slate-800 truncate">
                                                    {d.original_filename}
                                                </div>
                                                <div className="text-[11px] text-slate-400 mt-0.5">
                                                    {d.department || 'No dept'} • {formatSize(d.file_size)} • {formatDate(d.created_at)}
                                                </div>
                                            </div>
                                            {statusBadge(d.status)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Department chart */}
                        <div className="card overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100">
                                <div className="text-sm font-bold text-navy-900">By Department</div>
                            </div>
                            {deptEntries.length === 0 ? (
                                <div className="p-5 text-center text-sm text-slate-500 py-12">
                                    No data yet
                                </div>
                            ) : (
                                <div className="p-5">
                                    <div className="flex items-end gap-2 h-[140px] mb-3">
                                        {deptEntries.map(([name, count], i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                                                <div
                                                    className="w-full rounded-t-md transition-all hover:opacity-80"
                                                    style={{
                                                        height: `${(count / maxCount) * 100}%`,
                                                        minHeight: '12px',
                                                        background: 'linear-gradient(180deg, #1EC9B8, #007A6E)',
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {deptEntries.map(([name, count], i) => (
                                            <div key={i} className="flex-1 text-center min-w-0">
                                                <div className="text-[10px] font-bold text-slate-500 truncate">{name}</div>
                                                <div className="text-[11px] font-bold text-navy-900">{count}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* AI Quick Action */}
                    <div className="card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 relative overflow-hidden">
                        <div className="absolute -top-1/2 -right-1/4 w-[300px] h-[300px] rounded-full bg-aqua-500/10 blur-3xl pointer-events-none" />
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 text-white relative z-10 shadow-md"
                             style={{ background: 'linear-gradient(135deg, #1EC9B8, #007A6E)' }}>
                            <Cpu className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <div className="flex-1 relative z-10">
                            <div className="text-base font-bold text-navy-900 mb-1">
                                Ask AI about your documents
                            </div>
                            <div className="text-xs sm:text-[13px] text-slate-500">
                                Get source-grounded answers from all your uploaded documents
                            </div>
                        </div>
                        <button onClick={() => navigate('/chat')} className="btn btn-primary relative z-10 w-full sm:w-auto">
                            Open Chat
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}