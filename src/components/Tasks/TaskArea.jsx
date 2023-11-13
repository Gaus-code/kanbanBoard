import React from "react";
import c from "./Task.module.css";


export default function TaskArea(props) {
  function handleChange(e) {
    props.setTask({ text: e.target.value, description: "" });
  }

  function handleKeyUp(e) {
    if (e.code === "Enter") {
      if (props.task.text.trim()) {
        props.addTask(
          { id: props.tasksLength, text: props.task.text, ...props.task },
          "Backlog"
        );
      }
      props.setTask({ id: 0, text: "", description: "" });
      props.setAreaOpen(false);
    }
  }

  return (
    <input
      className={c.input}
      style={{ fontSize: "inherit", borderRadius: "5px", padding: "8px" }}
      value={props.task.text}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      name="task"
      placeholder="Введите новую задачу"
    />
  );
}
