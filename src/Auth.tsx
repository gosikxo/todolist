import { Auth as SupaAuth, ThemeSupa } from '@supabase/auth-ui-react'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import App from './App'
import { supabase } from './supabase'

export default function Auth() {
    const [user, setUser] = useState<User | null>(null)

    const updateUser = async () => {
        const response = await supabase.auth.getUser()

        setUser(response.data.user);
    }

    useEffect(() => { updateUser() }, [])

    if (user) {
        return <App user={user}/>
    }

    return <SupaAuth appearance={{ theme: ThemeSupa }}
        supabaseClient={supabase}></SupaAuth>
}