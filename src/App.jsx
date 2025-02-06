import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null);
  // Password Generator Function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ASDFGHJKLQWERTYUIOPZXCVBNMasdfghjklqwertyuiopzxcvbnm";
    if (numberAllowed) str += "1234567890";
    if (character) str += "!@#$%^&*()+__?";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, character]);

  // Generate a new password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  // Copy to Clipboard Function
  const copyToClipboard = () => {
    passwordref.current?.select();
  //  passwordref.current?.setSelectionRange(0,5);
    navigator.clipboard.writeText(password);
    // alert("Password copied to clipboard!");
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 bg-black text-white">
        <h2 className="text-lg font-semibold mb-4">Your Password is:</h2>
        
        {/* Password Input & Copy Button */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-gray-800 text-white"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button 
            onClick={copyToClipboard}
            className="bg-red-700 hover:bg-red-800 text-white shrink-0 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400"
          >
            Copy
          </button>
        </div>

        {/* Password Length Slider */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Length: {length}</label>
          <input
            type="range"
            min={4}
            max={20}
            value={length}
            className="w-full cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        {/* Checkbox Options */}
        <div className="space-y-2">
          {/* Numbers Checkbox */}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
              className="w-5 h-5 accent-red-500 cursor-pointer"
            />
            <label htmlFor="numberInput" className="text-white cursor-pointer">
              Include Numbers
            </label>
          </div>

          {/* Special Characters Checkbox */}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              checked={character}
              id="charInput"
              onChange={() => setCharacter(prev => !prev)}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
            <label htmlFor="charInput" className="text-white cursor-pointer">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
