"use client"
import { addSurveyAction } from "@/app/surveys/actions";
import { FormDropdown } from "./form-dropdown";
import { SubmitButton } from "./SubmitButton";

type NewSurveyFormProps = {
    people: any[]
}


export function NewSurveyForm(props: NewSurveyFormProps) {
    return (
        <form action={async (formData) => {
            addSurveyAction(formData)
        }} className="add-form">
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
                        <FormDropdown data={props.people} field="email" title="Appraisee" name="appraisee_id"></FormDropdown>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col">
                    </div>
                    <div className="form-col">
                        <SubmitButton />
                    </div>
                </div>
            </fieldset>
        </form>
    );
}
