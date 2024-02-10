import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(6);
  const [password, setPassword] = useState("");
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const [includeUpperCase,setUppercase]=useState(false)
  const [copyMessage,setCopyMessage]=useState('')
  const passwordRef=useRef(null)

  const genratePassword = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (includeNumber) str += "1234567890";
    if (includeChar) str += "~!@#$%^&*(){}[]_-+=|";
    if(includeUpperCase) str+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (let i = 1; i <= passwordLength; i++) {
      let index = Math.floor(Math.random() * str.length);
      // console.log(index);
      pass += str.charAt(index);
    }
    setPassword(pass);

    // console.log(includeChar, includeNumber);
  }, [includeChar,includeNumber,includeUpperCase,passwordLength]);

  const copyPasswordToInput=useCallback((e)=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    setCopyMessage('password copied')
    setTimeout(()=>{
      setCopyMessage('')
    },2000)
  },[password])

  useEffect(()=>{
    genratePassword()
  },[genratePassword])

  return (
    <div className="password-generator">
      <div className="input-container">
        <input type="text" placeholder="Password" value={password} readOnly  ref={passwordRef}/>
        <button onClick={copyPasswordToInput}>copy password</button>
       
      </div>
      <div className="options-container">
        <label>Password Length:</label>
        <input
          type="range"
          min="6"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          step="1"
        />
        <span>Length: ({passwordLength})</span>
      </div>
      <div className="options-container">
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setIncludeNumber((prev)=>!prev);
            }}
          />
          Include Numbers
        </label>
      </div>
      <div className="options-container">
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setIncludeChar((prev) => !prev);
            }}
          />
          Include Special Characters
        </label>
      </div>
      <div className="options-container">
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setUppercase((prev) => !prev);
            }}
          />
          INCLUDE UPPERCASE
        </label>
      </div>
      <div className="options-container">
        <p className="copymessage">{copyMessage}</p>
      </div>
    </div>
  );
}

export default App;
