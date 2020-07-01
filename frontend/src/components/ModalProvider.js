import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export let addModal;

export default function ModalProvider(props) {
  let [modalVisible, setModalVisible] = useState(false);
  let [modal, setModal] = useState(<span></span>);
  let [onOk, setOnOk] = useState(() => {
    return () => {};
  });
  let [onClose, setOnClose] = useState(() => {
    return () => {};
  });

  const showModal = (modal, _onOk, _onClose) => {
    setModal(modal);
    setModalVisible(true);
    if (_onOk) setOnOk(_onOk);
    if (_onOk) setOnClose(_onClose);
  };

  const handleClose = () => {
    onClose();
    setModalVisible(false);
  };

  const handleOk = () => {
    onOk();
    setModalVisible(false);
  };

  useEffect(() => {}, [modalVisible]);

  useEffect(() => {
    addModal = showModal;
  }, []);

  return (
    <div>
      <AnimatePresence>
        {modalVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            style={{
              position: "fixed",
              zIndex: "100",
              width: "55%",
              margin: "5% auto",
              left: 0,
              right: 0,
            }}
            className={`bg-white rounded-lg`}
          >
            {modal}
            <div className={`flex flex-row rounded-lg`}>
              <button
                style={{ color: "#1a73e8" }}
                className={`m-3 p-1 focus:bg-indigo-100 text-gray-700 hover:bg-gray-100 m-3 p-2 text-lg w-20 rounded focus:outline-none`}
                onClick={handleOk}
              >
                Save
              </button>
              <button
                style={{ color: "#1a73e8" }}
                className={`m-3 p-1 focus:bg-indigo-100 text-gray-700 hover:bg-gray-100 m-3 p-2 text-lg w-20 rounded focus:outline-none`}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/*---------------------- Children ---------------------*/}
      <div
        onClick={() => {
          if (modalVisible) {
            onClose();
            setModalVisible(false);
          }
        }}
      >
        <div
          hidden={!modalVisible}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: "10",
            backgroundColor: "gray",
            opacity: 0.4,
          }}
        />
        {props.children}
      </div>
    </div>
  );
}
