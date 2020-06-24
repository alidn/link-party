import React, { useState, Suspense } from "react";
import "./tailwind.generated.css";
import Bookmarks from "./components/Bookmarks.js";
import Spinner from "./components/Spinner.js";
import AppBar from "./components/AppBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Notifications } from "./components/notification";
import BookmarkEditModal from "./components/BookmarkEditModal";
import Groups from "./components/Groups";

export const ThemeContext = React.createContext({ dark: false });

function App() {
  let [isSidebarOpen, setSidebarOpen] = useState(true);
  let [lowOpacity, setLowOpacity] = useState(false);
  let [darkTheme, setDarkTheme] = useState(false);
  let [selectedGroup, setSelecetdGroup] = useState(0);

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
    <ThemeContext.Provider value={{ dark: darkTheme }}>
      <div className={`${darkTheme ? "bg-gray-700" : ""}`}>
        <Router>
          <button onClick={() => setDarkTheme((v) => !v)}>dark</button>
          <Notifications />
          <BookmarkEditModal
            setEditing={log}
            hidden={!isEditing}
            title="LinkMine"
            description="A long description"
            url="www.linkmin.ca"
          />
          <div>
            <AppBar toggleSidebar={toggleSidebar} />
            <div id="main" className="flex flex-row">
              <Switch>
                <Route path="/">
                  <Suspense fallback={<Spinner />}>
                    <Groups
                      changeGroup={(v) => {
                        console.log("here");
                        setSelecetdGroup(v);
                      }}
                    />
                    <Bookmarks
                      selectedGroup={selectedGroup}
                      setEditing={log}
                      setLowOpacity={changeOpacity}
                    />
                  </Suspense>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
