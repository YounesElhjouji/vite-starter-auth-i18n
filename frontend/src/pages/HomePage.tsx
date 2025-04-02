import { useEffect, useState } from "react";

function HomePage() {
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchMessage() {
      try {
        // Ensure your backend URL is correct
        const response = await fetch("http://localhost:1111");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setMessage(text);
      } catch (error) {
        console.error("Failed to fetch message:", error);
        setMessage("Failed to fetch message from backend.");
      }
    }
    fetchMessage();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Remove screen width/height/backgrounds - handled by App.tsx's main container
    // Add styling for the *content* of the page as needed
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Message from the backend</h1>
      <p className="text-lg">{message}</p>
      {/* Add more content here */}
      <div className="mt-8">
        This is the home page content area. It sits within the main container.
      </div>
    </div>
  );
}

export default HomePage;
