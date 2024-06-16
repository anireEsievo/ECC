import { useContext } from "react";
import { Context } from "../Context/Context";

export const useAppContext = () => useContext(Context);