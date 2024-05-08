
type Props = {
    name: string,
    title: string
}

export function FormField(props:Props) {
  return (
    <div>
      <label htmlFor="input">{props.title}</label>
      <input name={props.name} id="input" type="text"></input>
    </div>
  );
}
