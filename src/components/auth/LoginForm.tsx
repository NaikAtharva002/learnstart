'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, Loader2, ArrowRight } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    // createClient is called ONLY inside handlers (never at render time)
    // This prevents crash during Next.js static prerendering / build
    const getSupabase = () => {
        const { createClient } = require('@/lib/supabase/client');
        return createClient();
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const supabase = getSupabase();
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
            setIsLoading(false);
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) { setError('Please enter a valid phone number'); return; }
        try {
            setIsLoading(true);
            setError(null);
            const supabase = getSupabase();
            const { error } = await supabase.auth.signInWithOtp({
                phone: phone.startsWith('+') ? phone : `+${phone}`,
            });
            if (error) throw error;
            setShowOtpInput(true);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) { setError('Please enter the OTP'); return; }
        try {
            setIsLoading(true);
            setError(null);
            const supabase = getSupabase();
            const { error } = await supabase.auth.verifyOtp({
                phone: phone.startsWith('+') ? phone : `+${phone}`,
                token: otp,
                type: 'sms',
            });
            if (error) throw error;
            router.push('/');
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Invalid OTP');
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', width: '100%' }}>
            <div className="card card-glass" style={{ padding: 'var(--space-2xl)' }}>

                <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                    <div style={{ fontSize: '40px', marginBottom: 'var(--space-sm)' }}>🚀</div>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                        Log in to access your dashboard
                    </p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(248, 113, 113, 0.1)', color: 'var(--danger)', padding: 'var(--space-sm)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                {/* Google */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="btn"
                    style={{ width: '100%', justifyContent: 'center', background: 'white', color: '#1a1a2e', marginBottom: 'var(--space-lg)', height: '44px', gap: '10px' }}
                >
                    {isLoading && !showOtpInput ? <Loader2 className="animate-spin" size={18} /> : (
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    )}
                    <span>Continue with Google</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', margin: 'var(--space-lg) 0' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    <span style={{ padding: '0 var(--space-md)', color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase' }}>Or phone</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                {!showOtpInput ? (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="tel" className="input" placeholder="+91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ paddingLeft: '36px' }} disabled={isLoading} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px' }} disabled={isLoading || !phone}>
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <span>Send OTP Code</span>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <div className="form-group">
                            <label className="form-label">Verification Code</label>
                            <input type="text" className="input" placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={isLoading} style={{ textAlign: 'center', letterSpacing: '0.25em', fontSize: 'var(--font-size-lg)', fontWeight: 600 }} maxLength={6} />
                        </div>
                        <label className="checkbox-wrapper">
                            <div className={`checkbox ${rememberMe ? 'checked' : ''}`} onClick={() => setRememberMe(!rememberMe)}>
                                {rememberMe && <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                            </div>
                            <span className="checkbox-label">Remember me for 30 days</span>
                        </label>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px' }} disabled={isLoading || !otp}>
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><span>Verify &amp; Login</span><ArrowRight size={16} /></>}
                        </button>
                        <button type="button" onClick={() => setShowOtpInput(false)} className="btn btn-ghost" style={{ justifyContent: 'center', fontSize: 'var(--font-size-xs)' }}>
                            Use a different phone number
                        </button>
                    </form>
                )}
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-xl)' }}>
                By continuing, you agree to our <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Terms of Service</a>
            </p>
        </div>
    );
}
