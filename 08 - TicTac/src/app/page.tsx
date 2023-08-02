"use client";
import Image from "next/image";
import { useState } from "react";
import { IndexType, NumberLiteralType } from "typescript";

export default function Home() {
  const [board, setBoard] = useState([
    ["", "", ""], // ["", "", ""]=>item ,"" =>cell
    ["", "", ""],
    ["", "", ""],
  ]);

  const [turn, setTurn] = useState("x");

  const [open, setOpen] = useState(false);
  const [draw, setDraw] = useState(false);
  const ninetabe = (row: number, col: number) => {
    let array = board;

    if (board[row][col] === "") {
      array[row][col] = turn;
      setBoard(array);

      for (let i = 0; i < 3; i++) {
        if (
          array[i][0] == array[i][1] &&
          array[i][1] == array[i][2] &&
          array[i][0] != ""
        ) {
          setOpen(true);
          return;
        }
      }

      for (let j = 0; j < 3; j++) {
        if (
          array[0][j] == array[1][j] &&
          array[1][j] == array[2][j] &&
          array[0][j] != ""
        ) {
          setOpen(true);
          return;
        }
      }

      if (
        array[0][0] == array[1][1] &&
        array[1][1] == array[2][2] &&
        array[0][0] != ""
      ) {
        setOpen(true);
        return;
      }

      if (
        array[0][2] == array[1][1] &&
        array[1][1] == array[2][0] &&
        array[0][2] != ""
      ) {
        setOpen(true);
        return;
      }
      // if(array[0][0]==array[0][1] && array[0][1]==array[0][2]) {
      //   setOpen(true)
      // }
      // if(array[1][0]==array[1][1] && array[0][1]==array[1][2]) {
      //   setOpen(true)
      // }
      // if(array[2][0]==array[2][1] && array[2][1]==array[2][2]) {
      //   setOpen(true)
      // }

      let counter = 0;
      array.map((item) => {
        item.map((cell) => {
          if (cell === "") {
            counter += 1;
          }
        });
      });
      if (counter == 0){
        setDraw(true)
      }

      if (turn === "x") {
        setTurn("o");
      } else setTurn("x");
    }
  };

  return (
    <main className="flex flex-col gap-2 items-center justify-center h-full">
      <div className="flex flex-col bg-black  text-white p-4 [&>div>button]:w-52 [&>div>button]:h-52 [&>div>button]:text-center [&>div>button]:flex [&>div>button]:items-center  [&>div>button]:justify-center [&>div>button]:text-7xl  rounded-lg">
        {/*board is array and item is array  */}
        {board.map((item, row) => (
          <div
            className={`flex flex-row ${
              row === 2 ? "" : "border-b border-solid border-white"
            }`}
            key={`row-${row}`}
          >
            {item.map((cell, col) => (
              <button
                className={`${
                  col === 2 ? "" : "border-r border-solid border-white"
                }`}
                onClick={() => ninetabe(row, col)}
                key={`col-${col}`}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      {open && (
        <div className="text-center text-purple-800 font-bold text-lg">
          {" "}
          <h1>{turn}you won!</h1>
        </div>
      )}

      {draw && (
        <div className="text-center text-purple-800 font-bold text-lg">
          {" "}
          <h1>draw!</h1>
        </div>
      )}
    </main>
  );
}
