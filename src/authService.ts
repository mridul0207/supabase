// authService.ts
import supabase from './supabaseClient'
import { AuthError, Session, User } from '@supabase/supabase-js'

export const signUp = async (email: string, password: string): Promise<{ data: User | null; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  return { data: data.user, error }
}

export const signIn = async (email: string, password: string): Promise<{ data: Session | null; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data: data.session, error }
}

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Get user error:', error.message)
    return null
  }
  return data.user
}
