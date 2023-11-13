import React from "react";
import Select from "react-select";

export default function TaskSelect({ tasks, addTask, column }) {
  function selectTask(task) {
    addTask(task, column);
  }

  function handleSelect(task) {
    const t = tasks.find((t) => task.id === t.id);
    selectTask(t);
  }

  const options = tasks.map(function (task) {
    return { value: task.text, label: task.text, id: task.id };
  });

  console.log(tasks);

  return (
    <Select
      classNamePrefix="select"
      options={options}
      value={""}
      components={{ DropdownIndicator: false }}
      onChange={handleSelect}
    />
  );
}
