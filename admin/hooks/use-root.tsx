import { useState, useEffect } from "react";

export const useRoot = () => {
  const [mounted, setMounted] = useState(false);

  const root =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  console.log("root here");
  console.log(root);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return root;
};
