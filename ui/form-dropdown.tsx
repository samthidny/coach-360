
type FormDropdownProps = {
    name: string,
    title: string,
    data: any[],
    field: string

}

export function FormDropdown(props:FormDropdownProps) {

  const options = props.data.map(item => <option key={item.id} value={item.id}>{item[props.field]}</option>)


  return (
    <div>
      <select id={props.name} name={props.name}>
        {options}
      </select>
    </div>
  );
}
