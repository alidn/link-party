import React, {useContext, useState, useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import {ThemeContext} from '../App';
import {addTagAsync} from '../api/tags';
import {saveGroupAsync} from '../api/groups';

const variants = {
  hidden: {scale: 0.7},
  visible: {scale: 1},
};

export default function AddGroup() {
  let [isAdding, setAdding] = useState(false);
  let {dark} = useContext(ThemeContext);
  let inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const cancel = () => {
    setAdding(false);
  };

  const save = () => {
    saveGroupAsync({
      name: inputRef.current.value,
    }).then(() => {
      setAdding(false);
    });
  };

  return isAdding ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{duration: 0.1}}
      className={`${
        dark ? 'bg-gray-700' : 'bg-gray-100'
      } rounded-lg mt-5 pt-5 pb-5 mb-3
      `}>
      <input
        ref={inputRef}
        style={{width: '80%'}}
        className={`m-3 ${dark ? 'bg-gray-800' : 'bg-white'} ${
          dark && 'text-gray-300'
        } focus:outline-none focus:border-indigo-400 border ${
          dark ? 'border-gray-600' : 'border-gray-300'
        } rounded py-2 px-4 block appearance-none leading-normal`}
        type="text"
        placeholder="group name"
      />
      <div className={`flex flex-row m-3`}>
        <button
          style={{
            color: dark ? '' : '#1a73e8',
            minWidth: '4rem',
            maxWidth: '8rem',
          }}
          onClick={save}
          className={`${
            dark ? 'bg-gray-600' : ''
          } py-1 px-2 rounded   focus:outline-none ${
            dark ? 'text-gray-400' : ''
          }
          ${dark ? 'hover:bg-red-200' : 'hover:bg-gray-200'}
          ${dark ? '' : 'focus:bg-gray-300'}
          
          `}>
          Save
        </button>
        <button
          style={{
            color: dark ? '' : '#1a73e8',
            minWidth: '4rem',
            maxWidth: '8rem',
          }}
          onClick={cancel}
          className={`${
            dark ? 'bg-gray-600' : ''
          } py-1 px-2 rounded   focus:outline-none ${
            dark ? 'text-gray-400' : ''
          }
          ${dark ? 'hover:bg-red-200' : 'hover:bg-gray-200'}
          ${dark ? '' : 'focus:bg-gray-300'}
          
          `}>
          Cancel
        </button>
      </div>
    </motion.div>
  ) : (
    <motion.div
      whileTap={{scale: 0.9}}
      onClick={() => setAdding(true)}
      className={`p-3 mt-5 mb-3 rounded ${
        dark ? 'focus:bg-gray-600' : 'focus:bg-gray-200'
      } ${
        dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
      } cursor-pointer border border-gray-600 border-dashed text-center
      `}>
      <p className={`text-xl ${dark ? 'text-gray-600' : 'text-gray-600'}`}>
        Add Group +{' '}
      </p>
    </motion.div>
  );
}
