import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import "chessboard-element";
import { Chess, validateFen } from "chess.js";

const ChessboardWrapper = forwardRef((props, ref) => {
  const chessboardRef = useRef();
  const [orientation, setOrientation] = useState("white");
  const [draggablePieces, setDraggablePieces] = useState(false);
  let playingAdvancedGame = false;
  let game, randomMoveInterval;
  const makeRandomMove = async () => {
    let possibleMoves = game.moves();
    // game over
    if (!game.isGameOver() && possibleMoves.length === 0) {
      clearInterval(randomMoveInterval);
      return;
    }
    const request = await fetch("https://polyglot-spa-test.azurewebsites.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameFen: game.fen() }),
    });
    const move = await request.json();
    const [from, to] = Object.entries(move)[0];
    game.move({
      from: from.toLowerCase(),
      to: to.toLowerCase(),
    });
    chessboardRef.current.setPosition(game.fen());
  };
  const addEventListeners = () => {
    chessboardRef.current.addEventListener("drag-start", (e) => {
      // eslint-disable-next-line no-unused-vars
      const { source, piece, position, orientation } = e.detail;

      // do not pick up pieces if the game is over
      if (game.isGameOver()) {
        e.preventDefault();
        return;
      }

      // only pick up pieces for White
      if (piece.search(/^b/) !== -1) {
        e.preventDefault();
        return;
      }
    });
    chessboardRef.current.addEventListener("drop", (e) => {
      const { source, target, setAction } = e.detail;

      // see if the move is legal
      const move = game.move({
        from: source,
        to: target,
        promotion: "q", // NOTE: always promote to a queen for example simplicity
      });

      // illegal move
      if (move === null) {
        setAction("snapback");
        return;
      }

      // make random legal move for black
      window.setTimeout(makeRandomMove, 250);
    });
    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    chessboardRef.current.addEventListener("snap-end", () => {
      chessboardRef.current.setPosition(game.fen());
    });
  };
  useImperativeHandle(ref, () => ({
    advancedConfigStartGame: (data) => {
      if (!playingAdvancedGame) {
        playingAdvancedGame = !playingAdvancedGame;
        game = new Chess();
        let result = validateFen(data.fen);

        if (data.fen && result.ok) {
          chessboardRef.current.setPosition(data.fen, false);
          game.load(data.fen);
        } else {
          chessboardRef.current.start(false);
        }
        setOrientation(data.orientation);
        if (data.selfPlay) {
          randomMoveInterval = window.setInterval(makeRandomMove, 500);
        } else {
          setDraggablePieces(true);
          addEventListeners();
          if (game.turn() === "b") {
            window.setTimeout(makeRandomMove, 500);
          }
        }
      }
    },
    quickStartGame: () => {
      game = new Chess();
      chessboardRef.current.start(false);
      addEventListeners();
    },
  }));
  return (
    <div id={"chessBoardBackground"}>
      <chess-board
        id={"reactChessBoard"}
        ref={chessboardRef}
        orientation={orientation}
        draggable-pieces={draggablePieces}
      />
    </div>
  );
});

export default ChessboardWrapper;
