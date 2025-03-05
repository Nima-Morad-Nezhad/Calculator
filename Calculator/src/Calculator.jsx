import React from "react";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import { useState } from "react";
const  btnValue = [
   ["C", "-/+", "%","/"],
   [7, 8,9 , "X"],
   [4, 5 , 6, "-"],
   [1 , 2 , 3, "+"],
   [0 , "." , "="]
 ]
 const toLocaleString = (num) =>
   String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
 
 const removeSpaces = (num) => num.toString().replace(/\s/g, "");
function Calculator(){
   const {calc, setCalc} = useState({
      sign: "",
      num: 0,
      res:0
   })
 

 
return(
 <div className="Calculator">
    
 <Screen value={0}/>
<ButtonBox>
{btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
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
 </div>

)
}
export default Calculator;