import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useGlobalContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
}
