'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <div className="login-icon">🚀</div>
          <h1>LearnStart Admin</h1>
          <p>Sign in to manage your roadmap content</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <HiOutlineMail className="icon" />
              <input
                type="email"
                placeholder="admin@learnstart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <HiOutlineLockClosed className="icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <HiOutlineArrowRight />}
          </button>
        </form>
      </motion.div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          padding: var(--space-lg);
          background-image: radial-gradient(circle at 50% 50%, var(--accent-primary-glow) 0%, transparent 70%);
        }

        .login-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: var(--space-2xl);
          width: 100%;
          max-width: 440px;
          box-shadow: var(--shadow-lg);
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }

        .login-icon {
          width: 64px;
          height: 64px;
          background: var(--accent-gradient);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto var(--space-md);
          color: white;
        }

        .login-header h1 {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          margin-bottom: var(--space-xs);
        }

        .login-header p {
          color: var(--text-tertiary);
          font-size: var(--font-size-sm);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .icon {
          position: absolute;
          left: var(--space-md);
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 18px;
        }

        .input-with-icon .input {
          padding-left: 44px;
        }

        .login-error {
          background: rgba(248, 113, 113, 0.1);
          color: var(--danger);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          border: 1px solid rgba(248, 113, 113, 0.2);
        }

        .w-full {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
