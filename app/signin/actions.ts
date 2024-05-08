'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSupabaseClient } from '../apis/supabase'

export async function login(formData: FormData) {
  'use server'


  const form = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    route: formData.get('route') as string,
  }

  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword(form)

  if (error) {
    console.log('Error', error);
    redirect('/error')
  }

  if (data.user) {
    revalidatePath('/', 'layout');
    redirect(`/${form.route}`);
  }

}
