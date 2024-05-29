import { useRef } from 'react';


export default function Start({setUsername}) {

  const inputRef = useRef();
  const handleClick =() => {
    inputRef.current.value && setUsername(inputRef.current.value);
  }

  return (
    <div className="start">
      <p>"Who Wants To Be a Millionaire?"</p>
      <p>
        <ul>
        <li>You need to answer 15 multiple-choice questions about crypto correctly in a row to earn $1000000.</li>
        <li>You have only 60 seconds to answer each question.</li>
        <li>If your answer incorrectly, you win the money that you earned answering the last question.</li>
        <li>Highly recommended prior playing the game to study cryptocurrencies section of the Robin Noob (Bitcoin, Ethereum, Solana..).</li>
        <li>To agree the terms - enter your name and click "Start"</li>
        </ul>
        </p>
         <input placeholder="enter your name" className="startInput" ref={inputRef} />
        <button className="startButton" onClick={handleClick}>Start</button>
    </div>
  )
}
