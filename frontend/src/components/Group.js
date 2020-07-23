import React, {useContext, useState} from 'react';
import {ThemeContext} from '../App';
import {useHistory, useParams} from 'react-router-dom';
import {useSetRecoilState} from 'recoil/dist';
import {motion} from 'framer-motion';
import {currentHoverGroupId} from './Groups';
import Tooltip from './Tooltip';

const LinkIcon = React.lazy(() => import('./icons/link'));

export function Group({index, data, style}) {
  let themeContext = useContext(ThemeContext);
  let history = useHistory();
  let [creatorName] = useState('');
  let {id: groupID} = useParams();
  const {name, id, inviteEditUrl, inviteViewUrl, dateCreated} = data[index];
  let setHoverGroupId = useSetRecoilState(currentHoverGroupId);

  const handleHover = () => {
    setHoverGroupId(id);
  };

  const handleClick = () => {
    history.push('/groups/' + id);
    sessionStorage.setItem('group-id', id);
    // setCurrentGroupID(id);
  };

  return (
    <motion.div
      whileTap={{y: 5}}
      onClick={handleClick}
      onMouseEnter={handleHover}
      style={{
        backgroundColor: groupID === id && themeContext.dark ? '#363c48' : '',
        ...style,
        overflow: 'visible',
        top: style.top + 5,
        height: style.height - 5,
      }}
      className={`mt-2 rounded-lg p-5 border ${
        groupID == id
          ? ` border-transparent ${
              themeContext.dark ? 'bg-gray-700' : ' bg-indigo-100'
            }`
          : ` ${
              themeContext.dark
                ? 'hover:border-gray-500'
                : 'hover:border-indigo-300'
            }  border-transparent`
      }  `}>
      <div
        style={{
          justifyContent: 'space-between',
        }}
        className={`flex flex-row space-between stretch no-wrap`}>
        <span>
          <span
            className={`${
              themeContext.dark ? 'text-gray-300' : 'text-gray-700'
            } text-sm`}>
            {creatorName} /{' '}
          </span>
          <span
            className={`${
              themeContext.dark ? 'text-gray-400' : 'text-gray-800'
            } text-lg`}>
            {name}
          </span>
        </span>
        <div
          onClick={(e) => {
            e.preventDefault();
            console.log('Hello worl');
            e.stopPropagation();
          }}
          className={`cursor-pointer transform transition-all duration-300 hover:scale-110`}></div>
      </div>
      <div
        className={`${
          themeContext.dark ? 'text-gray-400' : 'text-gray-700'
        } text-sm`}>
        <span>21 members</span>
      </div>
    </motion.div>
  );
}
