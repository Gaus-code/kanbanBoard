import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/user-avatar.svg";
import arrow from "../../assets/images/arrow-down.svg";
import clasess from "./Header.module.css";

export default function Header() {
  const [isRotate, setRotate] = useState(false);

  return (
    <header className={clasess.header}>
      <div className={clasess.container}>
        <div className={clasess.logo}>
          <Link to={"/"}>Awesome Kanban Board</Link>
        </div>
        <div className={clasess.user} onClick={() => setRotate(!isRotate)}>
          <img src={logo} alt="avatar" className="user-img" />
          <img
            src={arrow}
            alt="arrow"
            className="user-arrow"
            style={{ transition: "all 200ms linear", transform: isRotate ? "scaleY(-1)" : "none" }}
          />

          {isRotate && (
            <div className={clasess.profile}>
              <p>Profile</p>
              <p>Log Out</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
