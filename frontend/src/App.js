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
import Groups, {
  currentGroupIDState,
  currentHoverGroupId,
} from './components/Groups';
import ModalProvider from './components/ModalProvider';
import {useRecoilValue} from 'recoil/dist';
import FetcherProvider from './components/FetcherProvider';
import {getBookmarksOfGroup} from './api/bookmarks';
import SpinnerCircle from './components/SpinnerCircle';

export const ThemeContext = React.createContext({dark: false});

const Bookmarks = React.lazy(() => import('./components/Bookmarks.js'));

function App() {
  let [darkTheme] = useState(false);
  let currentGroupID = useRecoilValue(currentGroupIDState);
  let hoverGroupID = useRecoilValue(currentHoverGroupId);
  let [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 500,
  });
  let [comp, setComp] = useState('');
  let [hoverComp, setHoverComp] = useState('');

  const prefetch = (id) => {
    setHoverComp(<Bookmarks reader={getBookmarksOfGroup(id)} />);
  };

  useEffect(() => {
    prefetch(hoverGroupID);
  }, [hoverGroupID]);

  useEffect(() => {
    startTransition(() => {
      if (hoverComp === '') {
        setComp(<Bookmarks reader={getBookmarksOfGroup(currentGroupID)} />);
      } else {
        setComp(hoverComp);
      }
    });
  }, [currentGroupID]);

  return (
    <FetcherProvider>
      <ThemeContext.Provider value={{dark: darkTheme}}>
        <ModalProvider>
          <div
            style={darkTheme ? {backgroundColor: '#282c35'} : {}}
            className={`${darkTheme ? 'bg-gray-900' : ''}`}>
            <Router>
              <div
                style={{position: 'fixed', width: '100%'}}
                id="main"
                className="flex flex-row mt-5">
                <Switch>
                  <Route path="/:id">
                    <Groups />
                    <Suspense
                      fallback={<SpinnerCircle width={35} height={35} />}>
                      {comp}
                    </Suspense>
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        </ModalProvider>
      </ThemeContext.Provider>
    </FetcherProvider>
  );
}

export default App;
