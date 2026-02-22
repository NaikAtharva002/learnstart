import type { Metadata } from "next";
import "./globals.css";
import "./admin-styles.css";
import ClientLayout from "./ClientLayout";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "LearnStart Admin — Content Management",
    description: "Manage your roadmap content, videos, and tasks.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" data-theme="light">
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
