import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
    title: 'Log In | LearnStart',
    description: 'Log in to your account',
};

export default function LoginPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-lg)',
            background: 'var(--bg-primary)',
            backgroundImage: 'radial-gradient(circle at top right, var(--accent-primary-glow), transparent 40%), radial-gradient(circle at bottom left, var(--accent-secondary-glow), transparent 40%)'
        }}>
            <LoginForm />
        </div>
    );
}
