import { createClient } from '@/utils/supabase/server';
import { Question } from '../models/question';
import { Person } from '../models/person';
import { Survey } from '../models/survey';
import { Database } from '../schema';
import { QueryData, SupabaseClient } from '@supabase/supabase-js';


export async function getSupabaseClient() {
    'use server'

    const client: SupabaseClient<Database> = await createClient<Database>();
    // const client = await createClient<Database>();
    return client;
}


export async function isAuthenticatd() {
    const supabase = await getSupabaseClient();
    const user = await supabase.auth.getUser();
    return !!user.data.user;
}


export async function addQuestion(question: string) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('questions')
        .insert({ question })

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}

export async function deleteQuestion(questionID: string) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionID)

    if (error) {
        console.log('Error', error.details)
    }


    return true;
}




export async function getQuestions(): Promise<any[]> {
    'use server'
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('questions')
        .select('id, question)')

    if (error) {
        console.log('Error', error.details)
    }

    if (data) {
        return data;
    }

    return []

}


export async function addPerson(person: Person) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('people')
        .insert(person)

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}

export async function deletePerson(peopleID: string) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('people')
        .delete()
        .eq('id', peopleID)

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}


export async function getPeople(): Promise<any[]> {
    'use server'
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('people')
        .select('id, firstname, surname, email)')

    if (error) {
        console.log('Error', error.details)
    }

    if (data) {
        return data;
    }

    return []

}


export async function addSurvey(survey: Object) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('surveys')
        .insert(survey)

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}

export async function deleteSurvey(surveyID: string) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('surveys')
        .delete()
        .eq('id', surveyID)

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}

export async function getSurveys(): Promise<any[]> {
    'use server'
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('surveys')
        .select('id, name, appraisee_id, people:appraisee_id(id, firstname, surname, email))')

    console.log('getSurveys', data);

    if (error) {
        console.log('Error', error.details)
    }

    if (data) {
        return data;
    }

    return []

}


export async function getSurvey(surveyID: number): Promise<any> {
    'use server'
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('surveys')
        .select('id, name, appraisee_id, people:appraisee_id(id, firstname, surname, email))')
        .eq('id', surveyID)
        .limit(1)
        .single()

    if (error) {
        console.log('Error', error.details);
    }

    if (data) {
        return data;
    }

    return null;

}

export async function getQuestionsForSurvey(surveyID: number): Promise<any[]> {
    'use server'
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('surveys')
        .select('*, survey_questions(questions(*))')
        .eq('id', surveyID)
        .limit(1)
        .single()


    if (data) {
        return data.survey_questions.map(question => question.questions);
    }

    return []

}


export async function addQuestionToSurvey(surveyID: number, questionID: number) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('survey_questions')
        .insert({ survey_id: surveyID, question_id: questionID })

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}



export async function removeQuestionFromSurvey(surveyID: number, questionID: number) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('survey_questions')
        .delete()
        .eq('survey_id', surveyID)
        .eq('question_id', questionID);

    console.log('Server removeQuestionFromSurvey ', surveyID, questionID)

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}





export async function getPeopleForSurvey(surveyID: number): Promise<any[]> {
    'use server'
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from('surveys')
        .select('*, survey_people(people(*))')
        .eq('id', surveyID)
        .limit(1)
        .single()

    if (error) {
        console.log('Error', error.details)
    }

    if (data) {
        console.log('getPeopleForSurvey', JSON.stringify(data))

        return data.survey_people.map(people => people.people);

    }

    return []

}


export async function addPersonToSurvey(surveyID: number, peopleID: number) {
    'use server'
    const supabase = await getSupabaseClient();
    const { error } = await supabase
        .from('survey_people')
        .insert({ survey_id: surveyID, people_id: peopleID })

    if (error) {
        console.log('Error', error.details)
    }

    return true;
}
