"use client";
import Image from "next/image";
import { useState } from "react";
import { IndexType, NumberLiteralType } from "typescript";

export default function Home() {
  const [board, setBoard] = useState([
    ["", "", ""],// ["", "", ""]=>item ,"" =>cell
    ["", "", ""],
    ["", "", ""],
  ]);
 
  const [turn, setTurn] = useState("x");

  const ninetabe = (row: number, col: number) => {
    let array = board;

    if (board[row][col] === ""){
      array[row][col] = turn;
      setBoard(array);
  
      if (turn === "x") {
        setTurn("o");
      } else setTurn("x");
    }
  };
  return (
    <main className="flex items-center justify-center h-full">
      <div className="flex flex-col bg-black  text-white p-4 [&>div>button]:w-52 [&>div>button]:h-52 [&>div>button]:text-center [&>div>button]:flex [&>div>button]:items-center  [&>div>button]:justify-center [&>div>button]:text-7xl  rounded-lg">
        {/*board is array and item is array  */}
        {board.map((item,row) => (
          <div   className={ `flex flex-row ${row===2?"":"border-b border-solid border-white"}`} key={`row-${row}`}>
            {item.map((cell,col) => (
              <button
                className={`${col===2?"":"border-r border-solid border-white"}`}
                onClick={() => ninetabe(row, col)}
                key={`col-${col}`}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
