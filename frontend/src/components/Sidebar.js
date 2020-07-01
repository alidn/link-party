import React, { Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BookmarkIcon = React.lazy(() => import("./icons/bookmark-icon"));

const variants = {
  open: {
    x: 0,
    width: "260px",
  },
  closed: { x: "-300px", zIndex: 10, width: 0 },
};

export default function Sidebar({ isOpen = true }) {
  let location = useLocation();

  return (
    <motion.nav id="" animate={isOpen ? "open" : "closed"} variants={variants}>
      <div className="">
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
      <div className="bg-gray-200 rounded-md m-1 flex-row flex-no-wrap items-center">
        <Suspense fallback="loading">
          <BookmarkIcon />
        </Suspense>
        <span className="">{tabName}</span>
      </div>
    </Link>
  );
}
