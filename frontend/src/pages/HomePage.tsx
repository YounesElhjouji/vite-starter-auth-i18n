import { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await fetch("http://localhost:1111");
        console.log("response", response);
        const text = await response.text();
        setMessage(text);
      } catch (error) {
        console.error("Failed to fetch message:", error);
        setMessage("Failed to fetch message from backend.");
      }
    }
    fetchMessage();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Message from the backend</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
}

export default HomePage;
