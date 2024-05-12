'use server'

import { revalidatePath } from "next/cache";
import { addQuestion, deleteQuestion } from "../apis/supabase";

export async function addQuestionAction(formData: FormData) {

    await addQuestion(formData.get('question') as string);

    revalidatePath('/', 'layout')
    
}

export async function deleteQuestionAction(formData: FormData) {

    deleteQuestion(formData.get('question-id') as string);

    revalidatePath('/', 'layout')
    
}
