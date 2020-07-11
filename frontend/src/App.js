import React, {
  useState,
  Suspense,
  useEffect,
  unstable_useTransition,
} from 'react';
import './tailwind.generated.css';
// import Bookmarks from "./components/Bookmarks.js";
import Spinner from './components/Spinner.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Notifications} from './components/notification';
import Groups, {currentGroupIDState} from './components/Groups';
import ModalProvider from './components/ModalProvider';
import {useRecoilValue} from 'recoil/dist';
import FetcherProvider from './components/FetcherProvider';
import {getBookmarksOfGroup} from './api/bookmarks';
import SpinnerCircle from './components/SpinnerCircle';

export const ThemeContext = React.createContext({dark: false});

const Bookmarks = React.lazy(() => import('./components/Bookmarks.js'));

function App() {
  let [darkTheme] = useState(true);
  let currentGroupID = useRecoilValue(currentGroupIDState);
  let [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 1500,
  });
  let [comp, setComp] = useState('');

  useEffect(() => {
    startTransition(() => {
      setComp(<Bookmarks reader={getBookmarksOfGroup(currentGroupID)} />);
    });
  }, [currentGroupID]);

  return (
    <FetcherProvider>
      <ThemeContext.Provider value={{dark: darkTheme}}>
        <ModalProvider>
          {isPending && <Spinner />}
          <div
            style={darkTheme ? {backgroundColor: '#282c35'} : {}}
            className={`${darkTheme ? 'bg-gray-900' : ''}`}>
            <Router>
              <div>
                <div id="main" className="flex flex-row mt-5">
                  <Switch>
                    <Route path="/">
                      <Groups />
                      <Suspense
                        fallback={<SpinnerCircle width={40} height={40} />}>
                        {comp}
                      </Suspense>
                    </Route>
                  </Switch>
                </div>
              </div>
            </Router>
          </div>
        </ModalProvider>
      </ThemeContext.Provider>
    </FetcherProvider>
  );
}

export default App;
