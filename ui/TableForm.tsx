"use client"
import { SubmitButton } from "./SubmitButton";
import { Children, useRef } from 'react';

type TableFormProps = {
    serverAction: Function,
    buttonLabel: string,
    children: any
}


export function TableForm(props: TableFormProps) {

    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form ref={formRef} action={async (formData) => {
            props.serverAction(formData)
        }} className="add-form">

            {props.children}
            <SubmitButton label={props.buttonLabel} buttonClass="negative-button" />

        </form>
    );
}
