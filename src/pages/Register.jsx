import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Building2, Briefcase, CheckCircle2, XCircle } from 'lucide-react';
import { register } from '../services/auth';
import { useToast } from '../components/Toast';

export default function Register() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        full_name: '',
        department: '',
        role: 'user',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const isValidEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const passwordChecks = {
        length: formData.password.length >= 8,
        hasUpper: /[A-Z]/.test(formData.password),
        hasLower: /[a-z]/.test(formData.password),
        hasNumber: /[0-9]/.test(formData.password),
    };
    const strength = Object.values(passwordChecks).filter(Boolean).length;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isValidEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (strength < 3) {
            setError('Password must be 8+ chars with upper, lower, and numbers');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const { confirmPassword, ...payload } = formData;
            await register(payload);
            showToast('success', 'Account created!', 'Please sign in to continue.');
            navigate('/login');
        } catch (err) {
            const msg = err.response?.data?.detail || 'Registration failed';
            setError(msg);
            showToast('error', 'Registration failed', msg);
        } finally {
            setLoading(false);
        }
    };

    const StrengthBar = () => {
        if (!formData.password) return null;
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        return (
            <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                                i < strength ? colors[strength - 1] : 'bg-slate-200'
                            }`}
                        />
                    ))}
                </div>
                <p className="text-[10px] text-slate-500">
                    Strength: <span className="font-semibold">{labels[strength - 1] || 'Very Weak'}</span>
                </p>
            </div>
        );
    };

    const Requirement = ({ ok, text }) => (
        <div className="flex items-center gap-1.5 text-[10px]">
            {ok ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ) : (
                <XCircle className="w-3 h-3 text-slate-300" />
            )}
            <span className={ok ? 'text-emerald-700' : 'text-slate-400'}>{text}</span>
        </div>
    );

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
                        Join the document<br />intelligence platform.
                    </h2>
                    <p className="text-[15px] text-white/70 leading-relaxed max-w-md">
                        Create your account and start processing documents with AI. It's free and takes less than a minute.
                    </p>

                    <div className="mt-10 space-y-4">
                        {[
                            'Unlimited document uploads',
                            'AI summarization & classification',
                            'Semantic search & RAG chatbot',
                        ].map((label, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                                <div className="w-8 h-8 rounded-lg bg-aqua-500/20 border border-aqua-500/30 flex items-center justify-center shrink-0 text-aqua-400 text-sm font-bold">
                                    ✓
                                </div>
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-white/40 text-xs">
                    © 2026 docMantra — SIH 25080
                </div>
            </div>

            {/* RIGHT — Form */}
            <div className="flex items-center justify-center p-6 bg-slate-50 overflow-y-auto">
                <div className="w-full max-w-[440px] animate-fade-up py-8">
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
                        Create account
                    </h1>
                    <p className="text-sm text-slate-500 mt-1.5 mb-8">
                        Set up your docMantra workspace access
                    </p>

                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="input-label">Username *</label>
                                <div className="relative">
                                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text" name="username" value={formData.username}
                                        onChange={handleChange} required minLength={3}
                                        placeholder="johndoe" className="input pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="input-label">Full Name</label>
                                <input
                                    type="text" name="full_name" value={formData.full_name}
                                    onChange={handleChange} placeholder="John Doe" className="input"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="input-label">Email *</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email" name="email" value={formData.email}
                                    onChange={handleChange} required
                                    placeholder="john.doe@kmrl.co.in"
                                    className={`input pl-10 ${
                                        formData.email && !isValidEmail(formData.email) ? 'border-red-300' : ''
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="input-label">Password *</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="password" name="password" value={formData.password}
                                        onChange={handleChange} required placeholder="••••••••"
                                        className="input pl-10"
                                    />
                                </div>
                                <StrengthBar />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="input-label">Confirm *</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="password" name="confirmPassword" value={formData.confirmPassword}
                                        onChange={handleChange} required placeholder="••••••••"
                                        className={`input pl-10 ${
                                            formData.confirmPassword && formData.password !== formData.confirmPassword
                                                ? 'border-red-300' : ''
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {formData.password && (
                            <div className="grid grid-cols-2 gap-1.5 px-1">
                                <Requirement ok={passwordChecks.length} text="8+ characters" />
                                <Requirement ok={passwordChecks.hasUpper} text="Uppercase" />
                                <Requirement ok={passwordChecks.hasLower} text="Lowercase" />
                                <Requirement ok={passwordChecks.hasNumber} text="Number" />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="input-label">Department</label>
                                <div className="relative">
                                    <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <select
                                        name="department" value={formData.department}
                                        onChange={handleChange} className="input pl-10"
                                    >
                                        <option value="">Select department</option>
                                        <option>Admin</option>
                                        <option>Engineering</option>
                                        <option>Finance</option>
                                        <option>HR</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="input-label">Role</label>
                                <div className="relative">
                                    <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <select
                                        name="role" value={formData.role}
                                        onChange={handleChange} className="input pl-10"
                                    >
                                        <option value="user">User</option>
                                        <option value="engineer">Engineer</option>
                                        <option value="hr">HR</option>
                                        <option value="finance">Finance</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
                            {loading ? 'Creating...' : 'Create Account'}
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <p className="text-center text-[13px] text-slate-500 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-aqua-600 font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}