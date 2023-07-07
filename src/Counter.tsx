import React, { ChangeEvent, ReactNode, useReducer, useState } from "react";
import { useCounter, useTextData } from "./context/CreateContext";


type CounterType = {
  children: (num: number) => ReactNode;
};
const Counter = ({ children }: CounterType) => {
  const { count, increment, decrement } = useCounter();
  const {text,handleInputChange} = useTextData()
  return (
    <div>
      <h1>{children(count)}</h1>
      <button
        onClick={
          increment
        }
      >
        increment
      </button>

      <button
        onClick={
          decrement
        }
      >
        decrement
      </button>

      <input type="text" onChange={handleInputChange} />
      <div>{text}</div>
    </div>
  );
};

export default Counter;
