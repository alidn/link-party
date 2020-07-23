import React, {
  useState,
  Suspense,
  useEffect,
  unstable_useTransition,
} from 'react';
import './tailwind.generated.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import Groups, {
  currentGroupIDState,
  currentHoverGroupId,
} from './components/Groups';
import ModalProvider from './components/ModalProvider';
import {useRecoilValue} from 'recoil/dist';
import FetcherProvider from './components/FetcherProvider';
import {getBookmarksOfGroup} from './api/bookmarks';
import Spinner from './components/Spinner';
import Notifications from './components/notification';

export const ThemeContext = React.createContext({dark: true});

const Bookmarks = React.lazy(() => import('./components/Bookmarks.js'));

function App() {
  let [darkTheme] = useState(true);
  let currentGroupID = useRecoilValue(currentGroupIDState);
  let hoverGroupID = useRecoilValue(currentHoverGroupId);
  let [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 1200,
  });
  let [comp, setComp] = useState('');
  let [hoverComp, setHoverComp] = useState('');

  const prefetch = (id) => {
    setHoverComp(<Bookmarks reader={getBookmarksOfGroup(id)} />);
  };

  useEffect(() => {
    document.body.style.cursor = isPending ? 'wait' : '';
  }, [isPending]);

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
    <ThemeContext.Provider value={{dark: darkTheme}}>
      <Notifications />
      <ModalProvider>
        <div
          style={{
            backgroundColor: darkTheme ? '#282c35' : '',
            marginTop: '-20px',
          }}
          className={`${darkTheme ? 'bg-gray-900' : ''}`}>
          <div
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%',
              backgroundColor: darkTheme ? '#282c35' : '',
            }}
            id="main"
            className="flex flex-row mt-5">
            <Switch>
              <Route path="/groups/:id">
                <Groups />
                <Suspense fallback={<Spinner />}>{comp}</Suspense>
              </Route>
              <Route path={'/unauthorized'}>
                <h1 className={`${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                  You don't have access to this group.
                </h1>
              </Route>
              <Route path={'*'}>
                <h1 className={`${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                  this page doesn't exist
                </h1>
              </Route>
            </Switch>
          </div>
        </div>
      </ModalProvider>
    </ThemeContext.Provider>
  );
}

export default App;
