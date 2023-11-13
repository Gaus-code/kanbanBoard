import React, { useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

export default function TaskDescription(props) {
  let { state } = useLocation();
  let { taskId } = useParams();

  const description = useRef(state.task.description);

  function changeDescription(column, setColumn) {
    const index = column.map((task) => task.id).indexOf(Number(taskId));
    const tasks = [...column];
    const task = { ...column[index] };
    task.description = description.current;
    tasks[index] = task;
    setColumn(tasks);
  }

  function changeTaskDescription() {
    if (state.column === "Backlog") {
      changeDescription(props.backlog, props.setBacklog);
    } else if (state.column === "Ready") {
      changeDescription(props.ready, props.setReady);
    } else if (state.column === "In Progress") {
      changeDescription(props.inProgress, props.setInProgress);
    } else {
      changeDescription(props.finished, props.setFinished);
    }
  }

  function handleChange(e) {
    description.current = e.target.value;
  }

  return (
    <div className="main">
      <div className="container">
        <div className="description__container">
          <h1 className="description__title">{state.task.text}</h1>
          <textarea
            onChange={handleChange}
            className="description__text"
            placeholder="This task has no description"
            defaultValue={state.task.description}
          ></textarea>
          <div className="description__btn" onClick={changeTaskDescription}>
            <Link to="/">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1.35355"
                  y1="0.646447"
                  x2="24.3536"
                  y2="23.6464"
                  stroke="black"
                />
                <line
                  y1="-0.5"
                  x2="32.5269"
                  y2="-0.5"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)"
                  stroke="black"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
