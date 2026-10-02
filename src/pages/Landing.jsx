import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText, Search, Bot, Shield, Globe, Zap, ArrowRight, Layers
} from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        { icon: FileText, title: 'AI Summarization', desc: 'Auto-generated summaries for long regulatory circulars, reports, and policies.' },
        { icon: Search, title: 'Semantic Search', desc: 'Find documents by meaning, not keywords. Ask a question, get the answer.' },
        { icon: Bot, title: 'Source-Grounded Chat', desc: 'Answers from YOUR documents with clickable source references. Zero hallucinations.' },
        { icon: Globe, title: 'Bilingual Support', desc: 'Handles English and Malayalam documents, including bilingual hybrids.' },
        { icon: Shield, title: 'Enterprise Security', desc: 'JWT authentication, bcrypt hashing, role-based access control.' },
        { icon: Zap, title: 'Zero Cost', desc: '100% open-source. No paid APIs, no credit cards, no hidden billing.' },
    ];

    const steps = [
        { n: 1, title: 'Upload', desc: 'Drag & drop any PDF, DOCX, or scanned image' },
        { n: 2, title: 'OCR', desc: 'Text extracted automatically via Tesseract' },
        { n: 3, title: 'AI Process', desc: 'Summary, classification, keyword extraction' },
        { n: 4, title: 'Index', desc: 'Stored in search engine + vector DB' },
        { n: 5, title: 'Query', desc: 'Search semantically or chat with documents' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200">
                <div className="max-w-[1200px] mx-auto h-[68px] px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center font-extrabold text-white text-base shrink-0"
                             style={{ background: 'linear-gradient(135deg, #1EC9B8, #007A6E)', boxShadow: '0 2px 8px rgba(0,180,160,0.3)' }}>
                            dM
                        </div>
                        <div>
                            <div className="text-lg font-extrabold text-navy-900 tracking-tight leading-none">
                                doc<span className="text-aqua-600">Mantra</span>
                            </div>
                            <div className="text-[9px] font-bold text-aqua-600 tracking-[0.1em] uppercase mt-0.5">
                                KMRL Portal
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
                        <a href="#workflow" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How it Works</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate('/login')} className="btn btn-ghost">
                            Sign In
                        </button>
                        <button onClick={() => navigate('/register')} className="btn btn-primary">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <section className="relative overflow-hidden pt-24 pb-20 px-6"
                     style={{ background: 'linear-gradient(180deg, #E6FAF8 0%, white 100%)' }}>
                <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
                     style={{ background: 'radial-gradient(circle, rgba(0, 180, 160, 0.15), transparent 70%)' }} />
                <div className="absolute -bottom-1/3 -left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                     style={{ background: 'radial-gradient(circle, rgba(0, 150, 136, 0.1), transparent 70%)' }} />

                <div className="max-w-[1200px] mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-aqua-200 rounded-full text-xs font-semibold text-aqua-700 shadow-sm mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-aqua-500 animate-pulse-dot"></span>
                            © 2026 docMantra — Built for Kochi Metro Rail Limited
                        </div>

                        <h1 className="text-[52px] font-extrabold leading-[1.08] tracking-tight text-navy-900 mb-5">
                            Your documents,<br />
                            <span style={{
                                background: 'linear-gradient(135deg, #00B4A0, #007A6E)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                intelligently understood.
                            </span>
                        </h1>

                        <p className="text-[17px] text-slate-600 leading-relaxed mb-8 max-w-[520px]">
                            docMantra automates document ingestion, processing, retrieval, and knowledge extraction for Kochi Metro Rail Limited. Upload any document — PDF, scan, or Malayalam file — and let AI do the rest.
                        </p>

                        <div className="flex items-center gap-3 flex-wrap">
                            <button onClick={() => navigate('/register')} className="btn btn-primary btn-lg">
                                Start Free
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button onClick={() => navigate('/login')} className="btn btn-secondary btn-lg">
                                View Live Demo
                            </button>
                        </div>


                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-3xl p-5"
                             style={{
                                 boxShadow: '0 20px 25px -5px rgba(10, 25, 41, 0.1), 0 0 0 1px rgba(0, 180, 160, 0.08)',
                                 transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg)'
                             }}>
                            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                <div className="flex-1 ml-3 bg-slate-100 rounded-lg px-3 py-1.5 text-[11px] text-slate-400">
                                    🔍 Search documents...
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2.5 mb-4">
                                {[
                                    { label: 'Total Docs', value: '2,847', trend: '↑ 12%', color: 'text-emerald-600' },
                                    { label: 'Processed', value: '2,791', trend: '98% done', color: 'text-emerald-600' },
                                    { label: 'Processing', value: '56', trend: 'In queue', color: 'text-amber-600' },
                                ].map((s, i) => (
                                    <div key={i} className="bg-slate-50 rounded-[10px] p-3 border border-slate-100">
                                        <div className="text-[10px] text-slate-500 font-semibold">{s.label}</div>
                                        <div className="text-xl font-extrabold text-navy-900 mt-1">{s.value}</div>
                                        <div className={`text-[10px] font-semibold mt-0.5 ${s.color}`}>{s.trend}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {[
                                    { name: 'Safety_Circular_067.pdf', meta: 'Engineering • 2.4 MB', status: 'Completed', badge: 'badge-success', color: 'file-pdf' },
                                    { name: 'HR_Leave_Policy_2026.docx', meta: 'HR • 1.8 MB', status: 'Processing', badge: 'badge-warning', color: 'file-doc' },
                                    { name: 'Scanned_Invoice_2847.jpg', meta: 'Finance • 3.1 MB', status: 'Completed', badge: 'badge-success', color: 'file-img' },
                                ].map((d, i) => (
                                    <div key={i} className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-[10px] border border-slate-100">
                                        <div className={`file-badge !w-8 !h-8 !text-[9px] ${d.color}`}>
                                            {d.name.split('.').pop().toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[11px] font-semibold text-slate-800 truncate">{d.name}</div>
                                            <div className="text-[9px] text-slate-400 mt-0.5">{d.meta}</div>
                                        </div>
                                        <span className={`badge ${d.badge} !text-[9px] !px-2`}>{d.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center max-w-[640px] mx-auto mb-14">
                        <div className="text-xs font-bold text-aqua-600 tracking-[0.08em] uppercase mb-3">
                            Capabilities
                        </div>
                        <h2 className="text-[38px] font-extrabold text-navy-900 tracking-tight leading-tight mb-3">
                            Everything KMRL needs,<br />in one platform.
                        </h2>
                        <p className="text-base text-slate-600 leading-relaxed">
                            From OCR on scanned Malayalam circulars to source-grounded Q&A — docMantra handles the entire document lifecycle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="p-7 bg-white border border-slate-200 rounded-2xl hover:border-aqua-200 hover:-translate-y-1 transition-all"
                                     style={{ boxShadow: '0 1px 2px rgba(10, 25, 41, 0.04)' }}>
                                    <div className="w-11 h-11 rounded-xl bg-aqua-50 text-aqua-600 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-bold text-navy-900 mb-2">{f.title}</h3>
                                    <p className="text-[13px] text-slate-600 leading-relaxed">{f.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="workflow" className="py-20 px-6 bg-navy-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                     style={{ background: 'radial-gradient(circle, rgba(0, 180, 160, 0.1), transparent 70%)' }} />

                <div className="max-w-[1200px] mx-auto relative z-10">
                    <div className="text-center max-w-[640px] mx-auto mb-14">
                        <div className="text-xs font-bold text-aqua-400 tracking-[0.08em] uppercase mb-3">
                            How it Works
                        </div>
                        <h2 className="text-[38px] font-extrabold tracking-tight leading-tight mb-3">
                            From upload to insight<br />in five steps.
                        </h2>
                        <p className="text-base text-navy-300 leading-relaxed">
                            The entire pipeline is automated. Upload a document and the AI handles the rest.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {steps.map((s) => (
                            <div key={s.n} className="text-center">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg mx-auto mb-4"
                                     style={{ background: 'rgba(0, 180, 160, 0.15)', border: '1px solid rgba(0, 180, 160, 0.3)', color: '#4DD9CC' }}>
                                    {s.n}
                                </div>
                                <div className="text-sm font-bold text-white mb-1.5">{s.title}</div>
                                <div className="text-xs text-navy-300 leading-relaxed">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 text-white text-center relative overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, #009688, #005F56)' }}>
                <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
                     style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)' }} />

                <div className="max-w-[640px] mx-auto relative z-10">
                    <h2 className="text-[36px] font-extrabold tracking-tight mb-4">
                        Ready to transform KMRL's document workflow?
                    </h2>
                    <p className="text-base opacity-90 mb-7 leading-relaxed">
                        Join the document intelligence revolution. Zero cost. Enterprise-grade. Built for Kochi Metro.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-aqua-700 px-7 py-3.5 rounded-2xl font-bold text-[15px] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
                        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                    >
                        Get Started Free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            <footer className="py-10 px-6 bg-navy-950 text-navy-400 text-[13px]">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-white text-[11px]"
                             style={{ background: 'linear-gradient(135deg, #1EC9B8, #007A6E)' }}>
                            dM
                        </div>
                        <span className="text-white font-bold">docMantra</span>
                    </div>
                    <div>© 2026 docMantra — Built for KMRL.</div>
                </div>
            </footer>
        </div>
    );
}