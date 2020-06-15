import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Sidebar.css";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: 0, width: "260px" },
  closed: { opacity: 0, x: "-100%", width: 0 },
};

export default function Sidebar({ isOpen = true }) {
  let location = useLocation();

  return (
    <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
      <div className="container">
        <Tab
          location={location}
          tabName={"All bookmarks"}
          path={"/bookmarks"}
        />
        <Tab location={location} tabName={"Groups"} path={"/groups"} />
        <Tab location={location} tabName={"Tags"} path={"/tags"} />
      </div>
    </motion.nav>
  );
}

function Tab({ location, tabName, path }) {
  return (
    <Link to={path}>
      <div className={"tab" + (location.pathname === path ? " selected" : "")}>
        <span className="image-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15 7v12.97l-4.21-1.81-.79-.34-.79.34L5 19.97V7h10m4-6H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13l2 1V3c0-1.1-.9-2-2-2zm-4 4H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z" />
          </svg>
        </span>

        <span className="name-container">{tabName}</span>
      </div>
    </Link>
  );
}
