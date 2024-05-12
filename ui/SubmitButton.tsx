import { useFormStatus } from "react-dom"

export function SubmitButton() {

    const { pending } = useFormStatus()

    return (
        <button>Create Survey! {pending ? 'Saving' : ''}</button>
    )
}