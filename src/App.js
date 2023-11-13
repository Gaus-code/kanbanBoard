import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import TaskDescription from "./components/Tasks/TaskDescription";

function App() {
  function useLocalStorage(columnName) {
    const [state, setState] = useState(() =>
      localStorage.getItem(columnName)
        ? JSON.parse(localStorage.getItem(columnName))
        : []
    );

    useEffect(() => {
      localStorage.setItem(columnName, JSON.stringify(state));
    }, [state, columnName]);

    return [state, setState];
  }

  const [backlog, setBacklog] = useLocalStorage("backlog");
  const [ready, setReady] = useLocalStorage("ready");
  const [inProgress, setInProgress] = useLocalStorage("in_progress");
  const [finished, setFinished] = useLocalStorage("finished");

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              backlog={backlog}
              setBacklog={setBacklog}
              ready={ready}
              setReady={setReady}
              inProgress={inProgress}
              setInProgress={setInProgress}
              finished={finished}
              setFinished={setFinished}
            />
          }
        />
        <Route
          path="tasks/:taskId"
          element={
            <TaskDescription
              backlog={backlog}
              setBacklog={setBacklog}
              ready={ready}
              setReady={setReady}
              inProgress={inProgress}
              setInProgress={setInProgress}
              finished={finished}
              setFinished={setFinished}
            />
          }
        />
      </Routes>
      <Footer activeTasks={backlog.length} finishedTasks={finished.length} />
    </div>
  );
}

export default App;
