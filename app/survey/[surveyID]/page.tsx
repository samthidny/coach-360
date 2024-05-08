import { FormDropdown } from "@/ui/form-dropdown";
import { getPeople, getPeopleForSurvey, getQuestions, getQuestionsForSurvey, getSurvey, getSurveys } from "../../apis/supabase";
import { addPersonToSurveyAction, addQuestionToSurveyAction, removePersonAction, removeQuestionAction } from "./actions";

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
  


  console.log("Survey people", people);


  const questionsList = questions.map((question) => <tr key={question.id}><td>{question.question}</td><td><form><input name="survey-id" type="text" defaultValue={surveyID}></input><input name="question-id" type="text" defaultValue={question.id}></input><button className="negative-button" formAction={removeQuestionAction}>Remove</button></form></td></tr>)

  const peopleList = people.map((person) => <tr key={person.id}><td>{person.email}</td><td><form><input name="people-id" type="hidden" defaultValue={person.id}></input><button className="negative-button" formAction={removePersonAction}>Remove</button></form></td></tr>)


  return (
    <div>
      <h1>Survey Component</h1>
      <div>Name: {survey.name}</div>
      <div>Appraisee: {appraisee.firstname} {appraisee.surname} {appraisee.email}</div>
      <h2>Questions {questions.length}</h2>


      <form className="add-form">
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
      </form>


      <table className="data-table">
        <tbody>
          {questionsList}
        </tbody>
      </table>





      <form className="add-form">
        <fieldset>
          <legend>Add people to survey</legend>
          <div className="form-row">
            <div className="form-col">
              <label>Person</label>
            </div>
            <div className="form-col">
              <input name="survey-id" type="hidden" defaultValue={survey.id}></input>
              <FormDropdown data={allAppraisers} field="email" title="Person" name="people-id"></FormDropdown>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
            </div>
            <div className="form-col">
              <button formAction={addPersonToSurveyAction}>Add person to survey</button>
            </div>
          </div>
        </fieldset>
      </form>


      <table className="data-table">
        <tbody>
          {peopleList}
        </tbody>
      </table>


    </div>
  );
}
