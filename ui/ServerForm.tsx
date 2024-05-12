"use client"
import { SubmitButton } from "./SubmitButton";
import { Children } from 'react';

type NewSurveyFormProps = {
    title: string,
    serverAction: Function
    children: any
    
}


export function ServerForm(props: NewSurveyFormProps) {
    return (
        <form action={async (formData) => {
            props.serverAction(formData)
        }} className="add-form">
            <fieldset>
                <legend>{props.title}</legend>
                {props.children}
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
