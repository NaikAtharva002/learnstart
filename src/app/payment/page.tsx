'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Zap, Lock, ArrowRight, Loader2 } from 'lucide-react';

const FEATURES = [
    'Full access to all business roadmaps',
    'Step-by-step phase guides with curated videos',
    'Action task checklists for every phase',
    'Progress tracking across businesses',
    'Problem library with solutions',
    'Early access to new business roadmaps',
];

export default function PaymentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        // For MVP: Simulate payment flow. Replace with Razorpay/Stripe integration later.
        // This opens a simple confirmation and marks user as paid.
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }

            // TODO: Integrate Razorpay here. For now simulate success.
            alert('Payment gateway coming soon! For beta access, your account has been activated.');

            // Mark user as paid (for beta / demo)
            await supabase.from('users').upsert({
                id: user.id,
                email: user.email,
                payment_status: 'paid',
            }, { onConflict: 'id' });

            router.refresh();
            router.push('/');
        } catch {
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-lg)',
            background: 'var(--bg-primary)',
            backgroundImage: 'radial-gradient(circle at top right, var(--accent-primary-glow), transparent 40%), radial-gradient(circle at bottom left, var(--accent-secondary-glow), transparent 40%)',
        }}>
            <div style={{ maxWidth: '420px', width: '100%' }}>

                {/* Badge */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                    <span className="badge badge-accent" style={{ display: 'inline-flex', marginBottom: 'var(--space-sm)' }}>
                        <Zap size={12} /> Limited Beta Offer
                    </span>
                    <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--space-xs)' }}>
                        Unlock Full Access
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                        One-time payment. Lifetime access.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="card card-glass" style={{ padding: 'var(--space-2xl)', position: 'relative', overflow: 'hidden' }}>

                    {/* Glow Effect */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        right: '-30%',
                        width: '200px',
                        height: '200px',
                        background: 'var(--accent-primary-glow)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        opacity: 0.4,
                        pointerEvents: 'none',
                    }} />

                    {/* Price */}
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '4px' }}>
                            <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginTop: '8px', color: 'var(--text-secondary)' }}>₹</span>
                            <span style={{
                                fontSize: '72px',
                                fontWeight: 900,
                                letterSpacing: '-0.05em',
                                lineHeight: 1,
                                background: 'var(--accent-gradient)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>49</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-xs)' }}>
                            One-time · No subscription · No hidden fees
                        </p>
                    </div>

                    {/* Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
                        {FEATURES.map((feature) => (
                            <div key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                                <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', height: '52px', fontSize: 'var(--font-size-base)', fontWeight: 700 }}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <span>Continue to Payment · ₹49</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    {/* Security Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)', marginTop: 'var(--space-md)' }}>
                        <Lock size={12} style={{ color: 'var(--text-muted)' }} />
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                            Secured · 100% Money Back Guarantee
                        </span>
                    </div>
                </div>

                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-lg)' }}>
                    Already paid? <a href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Go to dashboard</a>
                </p>
            </div>
        </div>
    );
}
