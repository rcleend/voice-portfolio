import { useState, useEffect, useCallback } from "react";

const API_KEY_STORAGE_KEY = "tmp::voice_api_key";

const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      console.log("prompting for api key");
      promptForApiKey();
    }
  }, []);

  const promptForApiKey = () => {
    const newApiKey = prompt("Please enter your OpenAI API Key") || "";
    if (newApiKey) {
      updateApiKey(newApiKey);
    }
  };

  const updateApiKey = useCallback((newApiKey: string) => {
    window.localStorage.setItem(API_KEY_STORAGE_KEY, newApiKey);
    setApiKey(newApiKey);
  }, []);

  const resetApiKey = useCallback(() => {
    window.localStorage.removeItem(API_KEY_STORAGE_KEY);
    promptForApiKey();
  }, []);

  return {
    apiKey,
    updateApiKey,
    resetApiKey,
  };
};

export default useApiKey;
