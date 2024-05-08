'use server'

import { revalidatePath } from "next/cache";
import { addPersonToSurvey, addQuestionToSurvey, removeQuestionFromSurvey } from "../../apis/supabase";

export async function addQuestionToSurveyAction(formData: FormData) {

    const surveyID = formData.get('survey-id') as string;
    const questionID = formData.get('question-id') as string;

    addQuestionToSurvey(parseInt(surveyID), parseInt(questionID));


    revalidatePath('/', 'layout')


}


export async function addPersonToSurveyAction(formData: FormData) {

    const surveyID = formData.get('survey-id') as string;
    const peopleID = formData.get('people-id') as string;

    addPersonToSurvey(parseInt(surveyID), parseInt(peopleID));


    revalidatePath('/', 'layout')


}


export async function removeQuestionAction(formData: FormData) {
    
    const surveyID = formData.get('survey-id') as string;
    const questionID = formData.get('question-id') as string;
    await removeQuestionFromSurvey(parseInt(surveyID), parseInt(questionID))

    revalidatePath('/', 'layout')
}

export async function removePersonAction(formData: FormData) {
    console.log('Remove person from survey')
}

