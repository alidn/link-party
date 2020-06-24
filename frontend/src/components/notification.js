import React, { useState, useEffect } from "react";
import "./styles/notification.css";
import { motion } from "framer-motion";

const types = {
  success: "success",
  error: "error",
};

let notificationCreator;

export function useNotification() {
  let [addNotif, setAddNotif] = useState(notificationCreator);

  useEffect(() => {
    setTimeout(() => {
      setAddNotif(notificationCreator);
    }, 1000);
  }, []);

  return addNotif;
}

export function Notifications() {
  let [list, setList] = useState([]);
  let id = 0;

  const showNotification = (type, timeoutMs) => {
    id += 1;
    setList((prevList) =>
      prevList.concat({
        id: id,
        type: type,
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
    <div id="notification-container">
      {list.map((notif) => (
        <Notification key={notif.id} type={notif.type} />
      ))}
    </div>
  );
}

function Notification({ type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      id="notification"
    ></motion.div>
  );
}
