import React, { useState, Suspense } from "react";
import "./tailwind.generated.css";
import Bookmarks from "./components/Bookmarks.js";
import Spinner from "./components/Spinner.js";
import AppBar from "./components/AppBar.js";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Notifications } from "./components/notification";
import Groups from "./components/Groups";

export const ThemeContext = React.createContext({ dark: false });

function App() {
  let [selectedGroup, setSelectedGroup] = useState(-1);
  let [darkTheme, setDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark: darkTheme }}>
      <div className={`${darkTheme ? "bg-gray-700" : ""}`}>
        <Router>
          <Notifications />

          <div>
            <div id="main" className="flex flex-row mt-5">
              <Switch>
                <Route path="/">
                  <Suspense fallback={<Spinner />}>
                    <Groups
                      changeGroup={(v) => {
                        setSelectedGroup(v);
                      }}
                    />
                    <Bookmarks
                      selectedGroup={selectedGroup}
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
