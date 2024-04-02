import React, { useState } from "react";
import Modal from "react-modal";
import EventEmitter from "reactjs-eventemitter";

const AdvancedConfigModal = (props) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      maxWidth: "300px",
      height: "475px",
      margin: "0 auto",
    },
  };
  Modal.setAppElement("body");
  const [fen, setFen] = useState("");
  const [orientation, setOrientation] = useState("white");
  const [selfPlay, setSelfPlay] = useState(false);
  const closeModal = () => {
    EventEmitter.dispatch("hideAdvancedConfigModal", {});
  };
  const handleAdvanceConfigBtnClick = () => {
    let data = {};
    data["fen"] = fen;
    data["orientation"] = orientation;
    data["selfPlay"] = selfPlay;
    EventEmitter.dispatch("hideAdvancedConfigModal", {});
    EventEmitter.dispatch("advancedConfigStartGame", data);
  };
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel={"Advanced Config Modal"}
      style={customStyles}
    >
      <div className={"modal-container"}>
        <div className={"modal-header"}>
          <slot name={"header"}>Advanced Config Options</slot>
        </div>
        <div className={"modal-body"}>
          <slot name={"body"}>
            <div>
              <label htmlFor={"inputFEN"} className={"form-label"}>
                Input FEN
              </label>
              <input
                type={"text"}
                className={"form-control"}
                id={"inputFEN"}
                name={"fen"}
                onChange={(e) => setFen(e.target.value)}
              />
              <div
                id={"fenHelp"}
                className={"form-text"}
                aria-describedby={"fenHelp"}
              >
                If the FEN is invalid the field will be ignored.
              </div>
            </div>
            <div>
              Pick Orientation
              <div className={"form-check"}>
                <input
                  className={"form-check-input"}
                  type={"radio"}
                  name={"inputOrientation"}
                  id={"inputRadioWhite"}
                  value={"white"}
                  checked
                  onChange={(e) => setOrientation(e.target.value)}
                />
                <label
                  className={"form-check-label"}
                  htmlFor={"inputRadioWhite"}
                >
                  {" "}
                  White{" "}
                </label>
              </div>
              <div className={"form-check"}>
                <input
                  className={"form-check-input"}
                  type={"radio"}
                  name={"inputOrientation"}
                  id={"inputRadioBlack"}
                  value={"black"}
                  onChange={(e) => setOrientation(e.target.value)}
                />
                <label
                  className={"form-check-label"}
                  htmlFor={"inputRadioBlack"}
                >
                  {" "}
                  Black{" "}
                </label>
              </div>
            </div>
            <div>
              <div className={"form-check"}>
                <input
                  className={"form-check-input"}
                  type={"checkbox"}
                  id={"inputSelfPlay"}
                  name={"inputSelfPlay"}
                  onChange={(e) => setSelfPlay(e.target.checked)}
                />
                <label className={"form-check-label"} htmlFor={"inputSelfPlay"}>
                  Check to make computer play itself.
                </label>
              </div>
            </div>
          </slot>
        </div>
        <div className={"modal-footer"}>
          <slot name={"footer"}>
            <button
              id={"advancedConfigStartGameBtn"}
              type={"submit"}
              className={"btn btn-dark btn-sm"}
              onClick={handleAdvanceConfigBtnClick}
            >
              OK
            </button>
            <button
              id={"closeAdvancedConfigModalBtn"}
              type={"button"}
              className={"btn btn-dark btn-sm"}
              onClick={closeModal}
            >
              Cancel
            </button>
          </slot>
        </div>
      </div>
    </Modal>
  );
};

export default AdvancedConfigModal;
