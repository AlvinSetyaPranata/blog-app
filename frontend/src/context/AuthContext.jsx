import { createContext, useEffect, useState } from "react"
import { supabase } from "../services/auth"
// import { SupabaseClient } from "@supabase/supabase-js"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

      const [session, setSession] = useState()
      const [user, setUser] = useState()

      useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
          setSession(data.session)
          setUser(data.session.user)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))

        return () => listener.subscription.unsubscribe()

      }, [])

    return (
        <AuthContext.Provider value={{session, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;