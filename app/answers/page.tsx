"use server"
import Link from "next/link";
import { getPeople, getQuestionsForSurvey, getSurvey, getSurveys } from "../apis/supabase";
import { addSurveyAction, deleteSurveyAction } from "./actions";
import { FormDropdown } from "@/ui/form-dropdown";
import { ServerForm } from "@/ui/ServerForm";
import { TableForm } from "@/ui/TableForm";
import { SignInWithPasswordCredentials, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../schema";
import { createClient } from "@/utils/supabase/server";
import { Person } from "../models/person";

export default async function Surveys() {

  const client: SupabaseClient<Database> = await createClient<Database>();

  // const credentials: SignInWithPasswordCredentials = { email: 'samthidny@gmail.com', password: 'Userman88!' }
  // await client.auth.signInWithPassword(credentials)


  const surveyID:number = 2;


  // const { data, error } = await client
  //       .from('surveys')
  //       .select('id, name, appraisee_id, people:appraisee_id(id, firstname, surname, email)')
  //       .eq('id', surveyID)
  //       .limit(1)
  //       .single()


  const data = await getSurvey(surveyID);

  console.log('Signed in, got survey', data);
  const people = data.people;


  // const questions = await getQuestionsForSurvey(surveyID);

  console.log('Signed in, questions', questions);



  return (
    <div>
      <h1>Survey Test</h1>

      <h2>Person: {people.email} </h2>

      <h2>Questions</h2>


      <table className="data-table">
        <tbody>
          
        </tbody>
      </table>

    </div>
  );
}
