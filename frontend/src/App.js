import React, { useState, Suspense } from "react";
import "./tailwind.generated.css";
import Bookmarks from "./components/Bookmarks.js";
import Spinner from "./components/Spinner.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Notifications } from "./components/notification";
import Groups from "./components/Groups";
import ModalProvider from "./components/ModalProvider";
import { RecoilRoot } from "recoil/dist";

export const ThemeContext = React.createContext({ dark: false });

function App() {
  let [darkTheme, setDarkTheme] = useState(false);

  return (
    <RecoilRoot>
      <ThemeContext.Provider value={{ dark: darkTheme }}>
        <ModalProvider>
          <div className={`${darkTheme ? "bg-gray-700" : ""}`}>
            <Router>
              <Notifications />

              <div>
                <div id="main" className="flex flex-row mt-5">
                  <Switch>
                    <Route path="/">
                      <Suspense fallback={<Spinner />}>
                        <Groups />
                        <Bookmarks />
                      </Suspense>
                    </Route>
                  </Switch>
                </div>
              </div>
            </Router>
          </div>
        </ModalProvider>
      </ThemeContext.Provider>
    </RecoilRoot>
  );
}

export default App;
