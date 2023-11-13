import React from "react";
import clasess from "./Footer.module.css";

export default function Footer(props) {
  return (
    <footer className={clasess.footer}>
      <div className={clasess.container}>
        <div className={clasess.footerReport}>
          <p>Active tasks: {props.activeTasks}</p>
          <p>Finished tasks: {props.finishedTasks}</p>
        </div>
        <div>Kanban board by Yulya, 2023</div>
      </div>
    </footer>
  );
}
