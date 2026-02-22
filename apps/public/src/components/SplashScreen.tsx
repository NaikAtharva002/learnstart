'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setVisible(false), 600);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="splash-logo">
                <div className="splash-icon">🚀</div>
                <span className="splash-text">LearnStart</span>
            </div>
            <p className="splash-tagline">Your founder journey starts here</p>
            <div className="splash-loading-bar" />
        </div>
    );
}
