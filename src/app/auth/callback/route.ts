import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                        })
                    },
                },
            }
        )

        const { error, data } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            // Upsert user record in public users table on every login
            await supabase.from('users').upsert({
                id: data.user.id,
                email: data.user.email,
                phone: data.user.phone ?? null,
                role: data.user.user_metadata?.role ?? 'user',
                payment_status: 'unpaid',
                created_at: new Date().toISOString(),
            }, {
                onConflict: 'id',
                ignoreDuplicates: false, // update payment_status only if not already paid
            })

            return NextResponse.redirect(`${origin}/`)
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
