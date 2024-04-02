import React, { Fragment, useEffect, useRef } from "react";
import ChessboardWrapper from "./components/ChessboardWrapper";
import ReactChessHeader from "./components/ReactChessHeader";
import AdvancedConfigModal from "./components/AdvancedConfigModal";
import EventEmitter from "reactjs-eventemitter";
import "./css/reactChess.css";

export default function Root() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const chessboardRef = useRef();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let emitter;
    let getWindowEmitterMaxTriers = null;

    const attachEmitter = () => {
      return new Promise((resolve, reject) => {
        waitForEmitterOnWindow(resolve, reject);
      });
    };

    const waitForEmitterOnWindow = (resolve, reject) => {
      if (!getWindowEmitterMaxTriers) {
        getWindowEmitterMaxTriers = 10;
      }
      if (!window.emitter) {
        if (getWindowEmitterMaxTriers > 0) {
          setTimeout(waitForEmitterOnWindow.bind(this, resolve, reject), 300);
        }
      } else {
        resolve();
      }
    };

    attachEmitter().then(() => {
      emitter = window.emitter;
      emitter.emit("hello", "React MFE");
    });

    EventEmitter.subscribe("quickStartGame", (event) => {
      chessboardRef.current.quickStartGame();
    });
    EventEmitter.subscribe("advancedConfigStartGame", (event) => {
      chessboardRef.current.advancedConfigStartGame(event);
    });
    EventEmitter.subscribe("showAdvancedConfigModal", (event) => {
      openModal();
    });
    EventEmitter.subscribe("hideAdvancedConfigModal", (event) => {
      closeModal();
    });
  });
  return (
    <Fragment>
      <AdvancedConfigModal isOpen={modalIsOpen} />
      <ReactChessHeader />
      <ChessboardWrapper ref={chessboardRef} />
    </Fragment>
  );
}
