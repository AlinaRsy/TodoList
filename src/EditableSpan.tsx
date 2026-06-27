import { ChangeEvent, useState } from "react";

type Props = {
  title: string;
  changeTitle?: (title: string) => void
};
export function EditableSpan({ title,changeTitle }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(title);

    const activateEditMode = ()=>{
        setEditMode(true)
    }
    const deactiveteEditMode = ()=>{
        setEditMode(false)
        changeTitle && changeTitle(value)
    }
    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)
    }

  return (
    <>
        {editMode && <input onChange={changeValueHandler} onBlur={deactiveteEditMode} type="text" value={value} autoFocus/>}
        {!editMode && <span onDoubleClick={activateEditMode} style={{ color: "darkblue" }}>{title}</span>}
    </>
  );
}
