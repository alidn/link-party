import React, { useState, Suspense } from "react";
import "./App.css";
import Bookmarks from "./components/Bookmarks.js";
import Spinner from "./components/Spinner.js";
import AppBar from "./components/AppBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Notifications } from "./components/notification";
import BookmarkEditModal from "./components/BookmarkEditModal";

function App() {
  let [isSidebarOpen, setSidebarOpen] = useState(true);
  let [lowOpacity, setLowOpacity] = useState(false);

  let toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);
  const changeOpacity = (v) => {
    setLowOpacity(v);
  };

  let [isEditing, setEditing] = useState(false);

  const log = (v) => {
    if (v) {
      setLowOpacity(true);
      console.log("Here");
    } else {
      setLowOpacity(false);
    }
    setEditing(v);
  };

  return (
    <Router>
      <Notifications />
      <BookmarkEditModal
        setEditing={log}
        hidden={!isEditing}
        title="LinkMine"
        description="A long description"
        url="www.linkmin.ca"
      />
      <div className={lowOpacity ? "low-opacity" : ""}>
        <AppBar toggleSidebar={toggleSidebar} />
        <div id="main">
          <Sidebar isOpen={isSidebarOpen} />
          <Switch>
            <Route path="/bookmarks">
              <Suspense fallback={<Spinner />}>
                <Bookmarks setEditing={log} setLowOpacity={changeOpacity} />
              </Suspense>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
