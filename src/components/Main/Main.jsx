import React, { useMemo } from "react";
import TaskBlock from "../Tasks/TaskBlock";
import classes from "./Main.module.css";

export default function Main({
  backlog,
  setBacklog,
  ready,
  setReady,
  inProgress,
  setInProgress,
  finished,
  setFinished,
}) {
  const tasksLength =
    backlog.length + ready.length + inProgress.length + finished.length;

  function addTask(task, column) {
    if (column === "Backlog") {
      setBacklog([...backlog, task]);
    } else if (column === "Ready") {
      setReady([...ready, task]);
      setBacklog(backlog.filter((el) => el.id !== task.id));
    } else if (column === "In Progress") {
      setInProgress([...inProgress, task]);
      setReady(ready.filter((el) => el.id !== task.id));
    } else {
      setFinished([...finished, task]);
      setInProgress(inProgress.filter((el) => el.id !== task.id));
    }
  }

  const columnData = useMemo(
    () => [
      {
        name: "Backlog",
        tasks: backlog,
        select: null,
      },
      {
        name: "Ready",
        tasks: ready,
        select: backlog,
      },
      {
        name: "In Progress",
        tasks: inProgress,
        select: ready,
      },
      {
        name: "Finished",
        tasks: finished,
        select: inProgress,
      },
    ],
    [backlog, ready, inProgress, finished]
  );

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        {columnData.map((column) => (
          <TaskBlock
            key={column.name}
            name={column.name}
            tasks={column.tasks}
            select={column.select}
            addTask={addTask}
            tasksLength={tasksLength}
          ></TaskBlock>
        ))}
      </div>
    </main>
  );
}
