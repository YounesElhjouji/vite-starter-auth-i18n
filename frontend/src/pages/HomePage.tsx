import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

function HomePage() {
  const { t } = useTranslation(); // Use the hook
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchMessage() {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch("http://localhost:1111");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setMessage(text);
      } catch (error) {
        console.error("Failed to fetch message:", error);
        setMessage(t("fetchError")); // Use translated error message
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
    fetchMessage();
    // Add t to dependency array if fetchError relies on it,
    // though usually error messages are stable per language load.
  }, [t]); // Add t here

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-3xl font-bold mb-4">
        {t("backendMessageTitle")} {/* Use t function */}
      </h1>
      <p className="text-lg">
        {isLoading ? t("loadingMessage") : message}{" "}
        {/* Show loading or message */}
      </p>
      {/* Add more content here */}
    </div>
  );
}

export default HomePage;
