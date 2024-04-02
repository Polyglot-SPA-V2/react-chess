import React, { Fragment, useState } from "react";
import chessIcon from "../assets/Centaur.png";
import reactIcon from "../assets/React-icon.svg";
import EventEmitter from "reactjs-eventemitter";

const ReactChessHeader = () => {
  const [disabled, setDisabled] = useState(false);
  const quickStartGame = () => {
    EventEmitter.dispatch("quickStartGame", {});
    // fetch("https://polyglot-spa-test.azurewebsites.net")
    //   .then((response) => response.json())
    //   // eslint-disable-next-line no-console
    //   .then((resJson) => console.log(resJson));
    setDisabled(true);
  };

  const showAdvancedConfigModal = () => {
    EventEmitter.dispatch("showAdvancedConfigModal", {});
    setDisabled(true);
  };

  return (
    <Fragment>
      <header className={"container-fluid"} id={"reactSecondaryHeader"}>
        <div className={"row p-2"}>
          <div className={"col-3"}>
            <img className={"w-100 mt-3"} alt={"React logo"} src={reactIcon} />
          </div>
          <div className={"col-6 d-grid gap-2"}>
            <button
              type={"button"}
              className={"btn btn-light w-100 btn-sm"}
              onClick={quickStartGame}
              id={"quickStartGameBtn"}
              disabled={disabled}
            >
              Quick Start
            </button>
            <button
              type={"button"}
              className={"btn btn-light w-100 btn-sm"}
              onClick={showAdvancedConfigModal}
              id={"showAdvancedConfigModalBtn"}
              disabled={disabled}
            >
              Advanced Config
            </button>
          </div>
          <div className={"col-3"}>
            <img className={"w-100"} alt={"Chess Logo"} src={chessIcon} />
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default ReactChessHeader;
