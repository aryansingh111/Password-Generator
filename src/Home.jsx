import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  const copy = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (characterAllowed) {
      str += "!@#$%^&*~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto shadow-xl rounded-lg px-6 py-8 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-3xl text-center mb-8 font-bold font-mono">
          Password Generator
        </h1>

        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-6 text-orange-500 bg-gray-200 rounded-l-lg font-semibold"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-4 py-2 shrink-0 hover:bg-blue-800"
            onClick={copy}
            >
            Copy
          </button>
        </div>

        <div className="flex justify-center items-center text-sm gap-x-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="CharInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="CharInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}
