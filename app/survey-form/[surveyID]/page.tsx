import { FormDropdown } from "@/ui/form-dropdown";
import { getPeople, getPeopleForSurvey, getQuestions, getQuestionsForSurvey, getSurvey, getSurveys } from "../../apis/supabase";
import { addPersonToSurveyAction, addQuestionToSurveyAction, removePersonAction, removeQuestionAction } from "./actions";
import { TableForm } from "@/ui/TableForm";
import { ServerForm } from "@/ui/ServerForm";

export default async function Surveys({ params }: { params: { surveyID: number } }) {

  const surveyID = params.surveyID;

  const surveys = await getSurveys();


  const survey = await getSurvey(surveyID);
  const appraisee = survey.people;
  const questions = await getQuestionsForSurvey(surveyID);
  const people = await getPeopleForSurvey(surveyID);

  const allQuestions = await getQuestions();
  const allPeople = await getPeople();
  const allAppraisers = allPeople.filter(person => person.id !== appraisee.id);

  const questionsList = questions.map((question) => <tr key={question.id}><td>{question.question}</td><td><TableForm serverAction={removeQuestionAction} buttonLabel={"Remove Question"}><><input name="survey-id" type="hidden" defaultValue={surveyID}></input><input name="question-id" type="hidden" defaultValue={question.id}></input></></TableForm></td></tr>)

  const peopleList = people.map((person) => <tr key={person.id}><td>{person.email}</td><td><TableForm serverAction={removePersonAction} buttonLabel={"Remove Person"}><><input name="survey-id" type="hidden" defaultValue={surveyID}></input><input name="people-id" type="hidden" defaultValue={person.id}></input></></TableForm></td></tr>)


  return (
    <div>
      <h1>Test Survey Form</h1>
      <div>Name: {survey.name}</div>
      <div>Appraisee: {appraisee.firstname} {appraisee.surname} {appraisee.email}</div>
      <h2>Questions {questions.length}</h2>

    </div>
  );
}
