import { useContext } from "react";
import { equalidownContext } from "../contexts/equalidown";

export default function TargetNumber() {
  const [equalidownState, dispatch] = useContext(equalidownContext);

  return <div className="target-number">{equalidownState.targetNumber}</div>;
}
