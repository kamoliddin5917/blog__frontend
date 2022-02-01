import { useContext } from "react";
import { ctx } from "../context/Auth";

const useAcount = (setterOnly) => {
  const { acount, setAcount } = useContext(ctx);

  return setterOnly ? [setAcount] : [acount, setAcount];
};

export default useAcount;
