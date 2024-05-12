import { useFormStatus } from "react-dom"


type SubmitButtonProps = {
    label: string,
    buttonClass: string
}

export function SubmitButton(props: SubmitButtonProps) {

    const { pending } = useFormStatus()

    return (
        <button disabled={pending} className={props.buttonClass}>{props.label} {pending ? 'Saving' : ''}</button>
    )
}