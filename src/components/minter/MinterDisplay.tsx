import * as React from "react";
import { Jeep } from "@/components/minter/Minter";
import minterOptions from "@/config/minterOptions";

const MinterDisplay: React.FunctionComponent<{ jeep: Jeep }> = ({ jeep }) => {
  return (
    <div className="minter-display">
      <img className="body" src={`${minterOptions.body.getPath(jeep.body)}`} />
      <img className="colour" src={`${minterOptions.colour.getPath(jeep.colour)}`} />
      <img className="accessory" src={`${minterOptions.accessory.getPath(jeep.accessory)}`} />
      {jeep.power !== undefined ? (
        <img
          className="power"
          src={`${minterOptions.power.getPath(jeep.power)}`}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MinterDisplay;
