import React, { useState } from "react";
import { Link } from "react-router-dom";
import plus from "../../assets/images/add-card.svg";
import TaskArea from "./TaskArea";
import TaskSelect from "./TaskSelect";
import c from "./Task.module.css";

export default function TaskBlock(props) {
  const [isAreaOpen, setAreaOpen] = useState(false);
  const [task, setTask] = useState({ id: 0, text: "", description: "" });

  function activityBlock() {
    if (props.name === "Backlog") {
      return (
        <TaskArea
          task={task}
          setTask={setTask}
          addTask={props.addTask}
          setAreaOpen={setAreaOpen}
          tasksLength={props.tasksLength}
        />
      );
    } else {
      if (props.select.length === 0) {
        setAreaOpen(!isAreaOpen);
      } else {
        return (
          <TaskSelect
            tasks={props.select}
            addTask={props.addTask}
            column={props.name}
          />
        );
      }
    }
  }

  function addButtonEvent() {
    if (props.name === "Backlog") {
      if (isAreaOpen && task.text) {
        setAreaOpen(!isAreaOpen);
        if (task.text.trim()) {
          props.addTask(
            { id: props.tasksLength, ...task, description: "" },
            "Backlog"
          );
        }
        setTask({ id: 0, text: "", description: "" });
      } else {
        setAreaOpen(!isAreaOpen);
      }
    } else {
      setAreaOpen(!isAreaOpen);
    }
  }

  return (
    <div className={c.block}>
      <h3>{props.name}</h3>
      <ul className={c.blockList}>
        {props.tasks.length ? (
          props.tasks.map((task, index) => {
            return (
              <li className={c.blockTask} key={index}>
                <Link
                  to={`tasks/${task.id}`}
                  state={{ task, column: props.name }}
                >
                  {task.text}
                </Link>
              </li>
            );
          })
        ) : (
          <p className={c.blockTask + c.blockNonActive}>Нет задач</p>
        )}
      </ul>

      {isAreaOpen && activityBlock()}

      <button
        className={c.button}
        disabled={
          props.name !== "Backlog" && !props.select.length ? true : false
        }
        style={{
          backgroundColor: !isAreaOpen || "#0079BF",
          color: !isAreaOpen || "#fff",
        }}
        onClick={() => addButtonEvent()}
      >
        {isAreaOpen || <img src={plus} alt="add cart" />}
        <p style={{ fontSize: "18px" }}>{isAreaOpen ? "Submit" : "Add card"}</p>
      </button>
    </div>
  );
}
