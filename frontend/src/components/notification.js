import React, { useState, useEffect } from "react";
import "./styles/notification.css";
import { motion } from "framer-motion";

const types = {
  success: "success",
  error: "error",
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

export function Notifications() {
  let [list, setList] = useState([]);
  let id = 0;

  const showNotification = (message, type = "success", timeoutMs = 1000) => {
    id += 1;
    setList((prevList) =>
      prevList.concat({
        id: id,
        type: type,
        message: message
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
      {list.map((notification) => (
        <Notification key={notification.id} message={notification.message} type={notification.type} />
      ))}
    </div>
  );
}

function Notification({ type, message }) {
  return (
    <motion.div
        className={`text-center text-lg shadow-lg align-middle p-5 ${type==="success" ? "text-green-800" : "text-red-800"} ${type==="success" ? "bg-green-100": "bg-red-100"} rounded-lg`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      id="notification"
    >{message}</motion.div>
  );
}
