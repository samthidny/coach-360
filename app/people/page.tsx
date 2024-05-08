import { getPeople, getQuestions } from "../apis/supabase";
import { addPersonAction, deletePersonAction } from "./actions";

export default async function Questions() {
  const people = await getPeople();

  // const list = people.map((person) => <p key={person.id}>{person.id} {person.firstname} {person.surname} {person.email}</p>)


  const list = people.map((person) =>
    <tr key={person.id}><td>{person.firstname}</td><td>{person.surname}</td><td>{person.email}</td><td><form><input name="people-id" type="hidden" defaultValue={person.id}></input><button className="negative-button" formAction={deletePersonAction}>Delete</button></form></td></tr>
  );


  return (
    <div>
      <h1>People</h1>

      <form className="add-form">
        <fieldset>
          <legend>Add new person</legend>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="first-name">Firstname</label>
            </div>
            <div className="form-col">
              <input id="first-name" type="text" name="firstname"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="surname">Surname</label>
            </div>
            <div className="form-col">
              <input id="surname" type="text" name="surname"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-col">
              <input id="email" type="text" name="email"></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
            </div>
            <div className="form-col">
              <button formAction={addPersonAction}>Add Person</button>
            </div>
          </div>
        </fieldset>

      </form>

      <table className="data-table">
        <caption>
          People
        </caption>
        <thead>
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>

    </div>
  );
}
