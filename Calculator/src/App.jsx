import { useState } from 'react'
import Calculator from './Calculator'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>Calculator</h1>
    <Calculator>
   
    </Calculator>
     
      
    </>
  )
}

export default App
