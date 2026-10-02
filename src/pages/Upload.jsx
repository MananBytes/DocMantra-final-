import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, X, ArrowLeft, FileText } from 'lucide-react';
import { uploadDocument } from '../services/documents';
import { useToast } from '../components/Toast';

export default function UploadPage() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('Admin');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [dragover, setDragover] = useState(false);

    const handleFile = (f) => {
        if (!f) return;
        const maxSize = 10 * 1024 * 1024;
        if (f.size > maxSize) {
            showToast('error', 'File too large', 'Maximum size is 10MB');
            return;
        }
        setFile(f);
    };

    const handleFileChange = (e) => handleFile(e.target.files[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragover(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            showToast('warning', 'No file selected', 'Please choose a file to upload');
            return;
        }

        setLoading(true);
        try {
            await uploadDocument(file, { title, department, category });
            showToast('success', 'Document uploaded!', `${file.name} is being processed`);
            setTimeout(() => navigate('/documents'), 800);
        } catch (err) {
            const msg = err.response?.data?.detail || 'Upload failed';
            showToast('error', 'Upload failed', msg);
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (b) => {
        if (b < 1024) return b + ' B';
        if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
        return (b / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
        <div className="max-w-[900px] mx-auto space-y-6 animate-fade-up">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/documents')}
                    className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                    <h1 className="text-[22px] font-extrabold text-navy-900 tracking-tight">Upload Document</h1>
                    <p className="text-[13px] text-slate-500 mt-0.5">
                        AI processing starts automatically after upload
                    </p>
                </div>
            </div>

            {/* Drop zone */}
            <label
                onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
                onDragLeave={() => setDragover(false)}
                onDrop={handleDrop}
                className={`block border-2 border-dashed rounded-3xl p-8 sm:p-16 text-center cursor-pointer transition-all bg-white ${
                    dragover
                        ? 'border-aqua-500 bg-aqua-50 scale-[1.01]'
                        : 'border-slate-300 hover:border-aqua-500 hover:bg-aqua-50/50'
                }`}
            >
                <input type="file" onChange={handleFileChange} className="hidden" />

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-aqua-200"
                     style={{ background: 'linear-gradient(135deg, #E6FAF8, #C0F2EE)' }}>
                    <UploadCloud className="w-7 h-7 text-aqua-600" />
                </div>

                {file ? (
                    <>
                        <div className="text-lg font-bold text-navy-900 mb-1.5 break-all px-4">
                            {file.name}
                        </div>
                        <div className="text-[13px] text-slate-500 mb-4">
                            {formatSize(file.size)} • Ready to upload
                        </div>
                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setFile(null); }}
                            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold"
                        >
                            <X className="w-3.5 h-3.5" /> Remove file
                        </button>
                    </>
                ) : (
                    <>
                        <div className="text-lg font-bold text-navy-900 mb-1.5">
                            Click to upload or drag & drop
                        </div>
                        <div className="text-[13px] text-slate-500 mb-5">
                            PDF, DOCX, JPG, PNG, or TXT — Max 10MB per file
                        </div>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            {['PDF', 'DOCX', 'JPG', 'PNG', 'TXT'].map((t) => (
                                <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-semibold">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </label>

            {/* Metadata form */}
            {file && (
                <div className="card p-6 animate-fade-up">
                    <div className="flex items-center gap-2 mb-5">
                        <FileText className="w-4 h-4 text-aqua-600" />
                        <h3 className="text-sm font-bold text-navy-900">Document Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="input-label">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Annual Budget Report 2026"
                                className="input"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="input-label">Department</label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="input"
                            >
                                <option>Admin</option>
                                <option>Engineering</option>
                                <option>Finance</option>
                                <option>HR</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="input-label">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g., Report, Invoice, Policy, Circular"
                                className="input"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2.5 mt-6 pt-5 border-t border-slate-100">
                        <button onClick={() => navigate('/documents')} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} disabled={loading} className="btn btn-primary">
                            {loading ? (
                                'Uploading...'
                            ) : (
                                <>
                                    <UploadCloud className="w-4 h-4" />
                                    Upload & Process
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}