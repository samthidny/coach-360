import Link from "next/link";
import { getPeople, getQuestionsForSurvey, getSurveys } from "../apis/supabase";
import { addSurveyAction, deleteSurveyAction } from "./actions";
import { FormDropdown } from "@/ui/form-dropdown";
import { ServerForm } from "@/ui/ServerForm";
import { TableForm } from "@/ui/TableForm";

export default async function Surveys() {

  const surveys = await getSurveys();
  const people = await getPeople()
  const list = surveys.map((survey) => <tr key={survey.id}><td><Link href={`/survey/${survey.id}`}>{survey.name}</Link></td><td>{survey.people.email}</td><td><TableForm serverAction={deleteSurveyAction} buttonLabel={"Delete Survey"}><><input name="survey-id" type="hidden" defaultValue={survey.id}></input></></TableForm></td></tr>)

  return (
    <div>
      <h1>My Surveys</h1>
      <ServerForm title="Add New Survey" serverAction={addSurveyAction} submitLabel="Add Survey">
        <div>
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
        </div>
      </ServerForm>

      <table className="data-table">
        <tbody>
          {list}
        </tbody>
      </table>

    </div>
  );
}
