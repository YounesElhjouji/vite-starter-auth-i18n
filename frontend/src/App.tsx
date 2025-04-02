import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchMessage() {
      const response = await fetch("http://localhost:1111");
      console.log("response", response);
      const text = await response.text();
      setMessage(text);
    }
    fetchMessage();
  });

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <p className="text-3xl">Message from the backend</p>
      <p>{message}</p>
    </div>
  );
}

export default App;
