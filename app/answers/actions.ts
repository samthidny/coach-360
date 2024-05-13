'use server'

import { revalidatePath } from "next/cache";
import { addQuestion, addSurvey, deleteSurvey } from "../apis/supabase";
import { Survey } from "../models/survey";

export async function addSurveyAction(formData: FormData) {


    const survey = { name: formData.get('name'), appraisee_id: formData.get('appraisee_id') }

    await addSurvey(survey);

    revalidatePath('/', 'layout')

}


export async function deleteSurveyAction(formData: FormData) {


    await deleteSurvey(formData.get('survey-id') as string);

    revalidatePath('/', 'layout')

}
