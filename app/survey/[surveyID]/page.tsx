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
      <h1>Survey Component</h1>
      <div>Name: {survey.name}</div>
      <div>Appraisee: {appraisee.firstname} {appraisee.surname} {appraisee.email}</div>
      <h2>Questions {questions.length}</h2>

      <ServerForm title="Add question to survey" serverAction={addQuestionToSurveyAction} submitLabel="Add question">
        <>
          <div className="form-row">
            <div className="form-col">
              <label>Question</label>
            </div>
            <div className="form-col">
              <input name="survey-id" type="hidden" defaultValue={survey.id}></input>
              <FormDropdown data={allQuestions} field="question" title="Question" name="question-id"></FormDropdown>
            </div>
          </div>
        </>

      </ServerForm>


      {/* <form className="add-form">
        <fieldset>
          <legend>Add question to survey</legend>
          <div className="form-row">
            <div className="form-col">
              <label>Question</label>
            </div>
            <div className="form-col">
              <input name="survey-id" type="hidden" defaultValue={survey.id}></input>
              <FormDropdown data={allQuestions} field="question" title="Question" name="question-id"></FormDropdown>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
            </div>
            <div className="form-col">
              <button formAction={addQuestionToSurveyAction}>Add question to survey</button>
            </div>
          </div>
        </fieldset>
      </form> */}


      <table className="data-table">
        <tbody>
          {questionsList}
        </tbody>
      </table>


      <ServerForm title="Add people to survey" serverAction={addPersonToSurveyAction} submitLabel="Add person">
        <>
          <div className="form-row">
            <div className="form-col">
              <label>Person</label>
            </div>
            <div className="form-col">
              <input name="survey-id" type="hidden" defaultValue={survey.id}></input>
              <FormDropdown data={allAppraisers} field="email" title="Person" name="people-id"></FormDropdown>
            </div>
          </div>
        </>
      </ServerForm>


      {/* <form className="add-form">
        <fieldset>
          <legend>Add people to survey</legend>

          <div className="form-row">
            <div className="form-col">
            </div>
            <div className="form-col">
              <button formAction={addPersonToSurveyAction}>Add person to survey</button>
            </div>
          </div>
        </fieldset>
      </form> */}


      <table className="data-table">
        <tbody>
          {peopleList}
        </tbody>
      </table>


    </div>
  );
}
