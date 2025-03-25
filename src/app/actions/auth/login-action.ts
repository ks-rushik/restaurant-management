'use server'

import { createClient } from '@/app/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ILoginFormData } from '../../components/auth/LoginForm'

export async function login(formData: ILoginFormData) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  }  

  const { error } = await supabase.auth.signInWithPassword(data)
 
  if (error) {
    return error
  }


  revalidatePath('/', 'layout')
  redirect('/menu')
}

