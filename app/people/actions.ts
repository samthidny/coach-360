'use server'

import { revalidatePath } from "next/cache";
import { addPerson, deletePerson, deleteQuestion } from "../apis/supabase";
import { Person } from "../models/person";

export async function addPersonAction(formData: FormData) {

    const person = { firstname: formData.get('firstname'), surname: formData.get('surname'), email: formData.get('email') }
    await addPerson(person as Person);

    revalidatePath('/', 'layout')


}

export async function deletePersonAction(formData: FormData) {

    deletePerson(formData.get('people-id') as string);

    revalidatePath('/', 'layout')


}
