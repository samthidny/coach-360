import Link from "next/link";
import { getPeople, getQuestionsForSurvey, getSurveys } from "../apis/supabase";
import { addSurveyAction, deleteSurveyAction } from "./actions";
import { FormField } from "@/ui/form-field";
import { FormDropdown } from "@/ui/form-dropdown";

export default async function Surveys() {

  const surveys = await getSurveys();

  const people = await getPeople()


  // console.log("Surveys Page", people);
  // const list = surveys.map((survey) => (
  //   <p key={survey.id}>
  //     <Link href={`/survey/${survey.id}`}>{survey.name}</Link>
  //     {survey.name} {survey.appraisee_id}
  //   </p>
  // ));

  const list = surveys.map((survey) => <tr key={survey.id}><td><Link href={`/survey/${survey.id}`}>{survey.name}</Link></td><td>{survey.appraisee_id}</td><td><form><input name="survey-id" type="hidden" defaultValue={survey.id}></input><button className="negative-button" formAction={deleteSurveyAction}>Delete</button></form></td></tr>)


  const data = [{ id: 1, name: 'Poop' }]

  return (
    <div>
      <h1>My Surveys</h1>

      <form className="add-form">
        <fieldset>
          <legend>Add new survey</legend>
          <div className="form-row">
            <div className="form-col">
              <label>Survey Name</label>
            </div>
            <div className="form-col">
              <input name="name"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="appraisee_id">Apprsaisee</label>
            </div>
            <div className="form-col">
              <FormDropdown data={people} field="email" title="Appraisee" name="appraisee_id"></FormDropdown>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
            </div>
            <div className="form-col">
              <button formAction={addSurveyAction}>Create Survey</button>
            </div>
          </div>
        </fieldset>
      </form>

      <table className="data-table">
        <tbody>
          {list}
        </tbody>
      </table>

    </div>
  );
}
