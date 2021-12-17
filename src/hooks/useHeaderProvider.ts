import { useContext } from "react";
import { HeaderContext } from "../Context/HeaderContext";

export function useHeaderProvider() {
  const context = useContext(HeaderContext);
  return context;
}
