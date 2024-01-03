"use client";
import { useState, useEffect } from "react";

export function useProfile() {
  const [data, setData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
        setIsLoaded(true);
      });
    });
  }, []);

  return { isLoaded, data };
}
