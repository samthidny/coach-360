import { ServerForm } from "@/ui/ServerForm";
import { getQuestions } from "../apis/supabase";
import { addQuestionAction, deleteQuestionAction } from "./actions";
import { TableForm } from "@/ui/TableForm";

export default async function Questions() {
  const questions = await getQuestions();

  const list = questions.map((question) => <tr key={question.id}><td>{question.question}</td><td><TableForm serverAction={deleteQuestionAction} buttonLabel={"Delete Question"}><><input name="question-id" type="hidden" defaultValue={question.id}></input></></TableForm></td></tr>)

  return (
    <div>
      <h1>Questions</h1>
      <ServerForm title="Add new question" serverAction={addQuestionAction} submitLabel="Add Question">
        <div>
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
