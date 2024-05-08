import { getQuestions } from "../apis/supabase";
import { addQuestionAction, deleteQuestionAction } from "./actions";

export default async function Questions() {
  const questions = await getQuestions();

  const list = questions.map((question) => <tr key={question.id}><td>{question.question}</td><td><form><input name="question-id" type="hidden" defaultValue={question.id}></input><button className="negative-button" formAction={deleteQuestionAction}>Delete</button></form></td></tr>)

  return (
    <div>
      <h1>Questions</h1>

      <form className="add-form">
        <fieldset>
          <legend>Add new question</legend>
          <div className="form-row">
            <div className="form-col">
              <label>Question</label>
            </div>
            <div className="form-col">
              <textarea name="question"></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
            </div>
            <div className="form-col">
              <button formAction={addQuestionAction}>Add Question</button>
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
