import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protect admin routes
    if (!user || user.user_metadata?.role !== 'admin') {
        // Redirect unauthenticated or non-admin users to the main app login page
        const loginUrl = process.env.NEXT_PUBLIC_PUBLIC_URL
            ? new URL('/login', process.env.NEXT_PUBLIC_PUBLIC_URL)
            : new URL('http://localhost:3000/login');

        return NextResponse.redirect(loginUrl)
    }

    // Enforce email allowlist
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [];
    if (adminEmails.length > 0 && user.email && !adminEmails.includes(user.email)) {
        // Not in allowlist
        const loginUrl = process.env.NEXT_PUBLIC_PUBLIC_URL
            ? new URL('/login', process.env.NEXT_PUBLIC_PUBLIC_URL)
            : new URL('http://localhost:3000/login');

        return NextResponse.redirect(loginUrl)
    }

    return supabaseResponse
}
