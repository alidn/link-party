import React, {useState, useEffect} from 'react';
import './styles/notification.css';
import {motion} from 'framer-motion';

const types = {
  success: 'success',
  error: 'error',
};

let notificationCreator;

export function useNotification() {
  let [addNotification, setAddNotification] = useState(notificationCreator);

  useEffect(() => {
    setTimeout(() => {
      setAddNotification(notificationCreator);
    }, 1000);
  }, []);

  return addNotification;
}

export default function Notifications() {
  let [list, setList] = useState([]);
  let id = 0;

  const showNotification = (message, type = 'success', timeoutMs = 1000) => {
    id += 1;
    setList((prevList) =>
      prevList.concat({
        id: id,
        type: type,
        message: message,
      })
    );

    // TODO: all notifications disappear at the same time.
    setTimeout(() => {
      let filteredList = list.filter((v) => v.id === id);
      setList(filteredList);
    }, timeoutMs);
  };

  useEffect(() => {
    notificationCreator = () => showNotification;
  }, []);

  return (
    <div
      style={{
        marginTop: '10px',
        width: '12vw',
        position: 'fixed',
        height: '0px',
        left: '50%',
        marginLeft: '-7.5vw',
        zIndex: '2',
      }}>
      {list.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
        />
      ))}
    </div>
  );
}

function Notification({type, message}) {
  return (
    <motion.div
      style={{
        boxShadow: `
          0 2.9px 11.9px rgba(0, 0, 0, 0.225),
          0 23px 95px rgba(0, 0, 0, 0.45)
          `,
      }}
      className={`text-center text-xl align-middle p-5 ${
        type === 'success' ? 'text-green-900' : 'text-red-900'
      } ${type === 'success' ? 'bg-green-100' : 'bg-red-100'} rounded-lg`}
      initial={{opacity: 0, y: -100}}
      animate={{opacity: 1, y: 0}}
      id="notification">
      {message}
    </motion.div>
  );
}
