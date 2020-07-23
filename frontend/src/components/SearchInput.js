import React, {useRef, useEffect} from 'react';
import {motion} from 'framer-motion';

export default function SearchInput(props) {
  let inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener('keyup', function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        search();
      }
    });
    let node = inputRef.current;

    return () => node.removeEventListener('keyup');
  }, [inputRef]);

  const search = () => {
    props.search(inputRef.current.value);
  };

  const clear = () => {
    inputRef.current.value = '';
    props.clear();
  };

  return (
    <div className={`flex flex-row`}>
      <motion.input
        ref={inputRef}
        style={{width: '100%'}}
        className="bg-white focus:outline-none border-indigo-400 border rounded py-2 px-4 block appearance-none leading-normal"
        type="text"
        placeholder="search"></motion.input>{' '}
      <button className={`m-3`} onClick={search}>
        Search
      </button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
