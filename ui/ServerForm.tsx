"use client"
import { SubmitButton } from "./SubmitButton";
import { Children, useRef } from 'react';

type NewSurveyFormProps = {
    title: string,
    serverAction: Function
    children: any,
    submitLabel: string
    
}


export function ServerForm(props: NewSurveyFormProps) {
    
    const formRef = useRef<HTMLFormElement>(null)
    
    return (
        <form ref={formRef} action={async (formData) => {
            props.serverAction(formData)
            formRef.current?.reset()
        }} className="add-form">
            <fieldset>
                <legend>{props.title}</legend>
                {props.children}
                <div className="form-row">
                    <div className="form-col">
                    </div>
                    <div className="form-col">
                        <SubmitButton label={props.submitLabel} buttonClass="" />
                    </div>
                </div>
            </fieldset>
        </form>
    );
}
