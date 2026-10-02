import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, CheckCircle2, Shield, Globe } from 'lucide-react';
import { login } from '../services/auth';
import { useToast } from '../components/Toast';

export default function Login() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await login(formData.username, formData.password);
            showToast('success', 'Welcome back!', `Signed in as ${data.user?.full_name || data.user?.username}`);
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.detail || 'Login failed. Please try again.';
            setError(msg);
            showToast('error', 'Login failed', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* LEFT — Brand Panel */}
            <div className="hidden lg:flex relative bg-gradient-to-br from-aqua-700 to-navy-900 p-12 flex-col justify-between overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-aqua-500/30 blur-3xl" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-aqua-500/20 blur-3xl" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-14">
                        <div className="w-9 h-9 rounded-[10px] bg-white/15 border border-white/20 flex items-center justify-center font-extrabold text-white text-base">
                            dM
                        </div>
                        <div>
                            <div className="text-lg font-extrabold text-white tracking-tight leading-none">
                                doc<span className="text-aqua-400">Mantra</span>
                            </div>
                            <div className="text-[10px] font-bold text-aqua-400 tracking-[0.1em] uppercase mt-0.5">
                                KMRL Portal
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-extrabold text-white leading-[1.15] tracking-tight mb-4">
                        Welcome back to<br />document intelligence.
                    </h2>
                    <p className="text-[15px] text-white/70 leading-relaxed max-w-md">
                        Sign in to access your organization's document workspace. Your AI assistant is ready to help.
                    </p>

                    <div className="mt-10 space-y-4">
                        {[
                            { icon: CheckCircle2, label: 'Source-grounded AI answers' },
                            { icon: Shield, label: 'Enterprise-grade security (JWT)' },
                            { icon: Globe, label: 'English + Malayalam support' },
                        ].map((f, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                                <div className="w-8 h-8 rounded-lg bg-aqua-500/20 border border-aqua-500/30 flex items-center justify-center shrink-0">
                                    <f.icon className="w-4 h-4 text-aqua-400" />
                                </div>
                                {f.label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-white/40 text-xs">
                    © 2026 docMantra — Built for KMRL
                </div>
            </div>

            {/* RIGHT — Form */}
            <div className="flex items-center justify-center p-6 bg-slate-50">
                <div className="w-full max-w-[400px] animate-fade-up">
                    <div className="flex lg:hidden items-center gap-2.5 justify-center mb-8">
                        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center font-extrabold text-white text-base"
                             style={{ background: 'linear-gradient(135deg, #1EC9B8, #007A6E)' }}>
                            dM
                        </div>
                        <div className="text-lg font-extrabold text-navy-900 tracking-tight">
                            doc<span className="text-aqua-600">Mantra</span>
                        </div>
                    </div>

                    <h1 className="text-[28px] font-extrabold text-navy-900 tracking-tight">
                        Sign in
                    </h1>
                    <p className="text-sm text-slate-500 mt-1.5 mb-8">
                        Enter your credentials to access the workspace
                    </p>

                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="input-label">Username</label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="admin"
                                    className="input pl-10"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="input-label">Password</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="input pl-10"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary btn-lg w-full mt-2"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <p className="text-center text-[13px] text-slate-500 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-aqua-600 font-semibold hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}