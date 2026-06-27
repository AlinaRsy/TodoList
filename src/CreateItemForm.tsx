import { useState } from "react";
import { Button } from "./Button";

type Props = {
//   todoListId: TodoListType["id"];
  createItem: (title: string) => void;
};
export function CreateItemForm({ createItem }: Props) {
  const [titleInput, setTitleInput] = useState("");
  const [error, setError] = useState(false);

  const createItemHandler = () => {
    const title = titleInput.trim();
    if (title !== "") {
      createItem(titleInput);
    } else {
      setError(true);
    }
    setTitleInput("");
  };
  const isTitleValid = titleInput.length > 0 && titleInput.length <= 20;
  
  return (
    <div>
      <input
        value={titleInput}
        onChange={(e) => {
          error && setError(false);
          setTitleInput(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && isTitleValid) {
            createItemHandler();
          }
        }}
        className={error ? "error" : ""}
      />
      <Button title="+" disabled={!isTitleValid} onClick={createItemHandler} />
      {!error && titleInput.length === 0 && <p>Enter title</p>}
      {!error && isTitleValid && <p>Max title length 20 characters</p>}
      {!error && titleInput.length > 20 && (
        <p style={{ color: "red" }}>Enter less than 20 characters</p>
      )}
      {error && <p style={{ color: "red" }}>Enter valid title</p>}
    </div>
  );
}
