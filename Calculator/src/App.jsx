import { useState } from 'react'

import React from "react";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import './App.css'
import Calculator from './Calculator'
const  btnValue = [
   ["C", "-/+", "%","/"],
   [7, 8 , 9 , "X"],
   [4, 5 , 6, "-"],
   [1 , 2 , 3, "+"],
   [0 , "." ,"="]
 ]
 const toLocaleString = (num) =>
   String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
 
 const removeSpaces = (num) => num.toString().replace(/\s/g, "");


 



function App() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res:0
 });

 const numClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  if (removeSpaces(calc.num).length < 16) {
    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === "0"
          ? "0"
          : removeSpaces(calc.num) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
      res: !calc.sign ? 0 : calc.res,
    });
  }
};

const commaClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
  });
};

const signClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    sign: value,
    res: !calc.res && calc.num ? calc.num : calc.res,
    num: 0,
  });
};

const equalsClickHandler = () => {
  if (calc.sign && calc.num) {
    const math = (a, b, sign) =>
      sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b;

    setCalc({
      ...calc,
      res:
        calc.num === "0" && calc.sign === "/"
          ? "Can't divide with 0"
          : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
      sign: "",
      num: 0,
    });
  }
};

const invertClickHandler = () => {
  setCalc({
    ...calc,
    num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
    res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
    sign: "",
  });
};

const percentClickHandler = () => {
  let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
  let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

  setCalc({
    ...calc,
    num: (num /= Math.pow(100, 1)),
    res: (res /= Math.pow(100, 1)),
    sign: "",
  });
};

const resetClickHandler = () => {
  setCalc({
    ...calc,
    sign: "",
    num: 0,
    res: 0,
  });
};

  return (
    <>
     <h1>Calculator</h1>
    <Calculator>
    <Screen value={calc.num ? calc.num : calc.res}/>
<ButtonBox>
{btnValue.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "-/+"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
  </ButtonBox>
    </Calculator>
   
    
     
      
    </>
  )
}

export default App;
