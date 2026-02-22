'use client';

import { ThemeProvider } from '@/lib/theme';
import Navbar from '@/components/Navbar';
import SplashScreen from '@/components/SplashScreen';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <SplashScreen />
            <Navbar />
            {children}
        </ThemeProvider>
    );
}
