import { Typography } from "@mui/material";
import * as React from "react";
import { Jeep } from "@/components/minter/Minter";
import minterOptions, { MinterVariant } from "@/config/minterOptions";

const MinterCreator: React.FunctionComponent<{ jeep: Jeep; setJeep: any }> = ({
  jeep,
  setJeep,
}) => {
  return (
    <div className="minter-creator">
      <div className="minter-creator_column">
        <Typography
          variant={"h4"}
          sx={{ fontWeight: "500" }}
          component={"span"}
        >
          Body
        </Typography>
        <Typography
          variant={"h4"}
          sx={{ fontWeight: "500" }}
          component={"span"}
        >
          Colour
        </Typography>
        <Typography
          variant={"h4"}
          sx={{ fontWeight: "500" }}
          component={"span"}
        >
          Accessory
        </Typography>
        <Typography
          variant={"h4"}
          sx={{ fontWeight: "500" }}
          component={"span"}
        >
          Power
        </Typography>
      </div>
      <div className="minter-creator_column">
        <div className="minter-creator_options">
          {minterOptions.body.variants.map((variant: MinterVariant, index: number) => (
            <div
              className={`minter-creator_button ${
                index === jeep.body ? "active" : ""
              }`}
              key={index}
            >
              { /* Name can be displayed with: variant.name */ }
              <img
                src={minterOptions.body.getPath(index)}
                onClick={() => setJeep({ ...jeep, body: index })}
              />
            </div>
          ))}
        </div>
        <div className="minter-creator_options">
          {minterOptions.colour.variants.map((variant: MinterVariant, index: number) => (
            <div
              className={`minter-creator_button ${
                index === jeep.colour ? "active" : ""
              }`}
              key={index}
            >
              { /* Name can be displayed with: variant.name */ }
              <img
                src={minterOptions.colour.getPath(index)}
                onClick={() => setJeep({ ...jeep, colour: index })}
              />
            </div>
          ))}
        </div>
        <div className="minter-creator_options">
          {minterOptions.accessory.variants.map((variant: MinterVariant, index: number) => (
            <div
              className={`minter-creator_button ${
                index === jeep.accessory ? "active" : ""
              }`}
              key={index}
            >
              { /* Name can be displayed with: variant.name */ }
              <img
                src={minterOptions.accessory.getPath(index)}
                onClick={() => setJeep({ ...jeep, accessory: index })}
              />
            </div>
          ))}
        </div>
        <div className="minter-creator_options">
          {minterOptions.power.variants.map((variant: MinterVariant, index: number) => (
            <div
              className={`minter-creator_button ${
                index === jeep.power ? "active" : ""
              }`}
              key={index}
            >
              { /* Name can be displayed with: variant.name */ }
              <img
                src={minterOptions.power.getPath(index)}
                onClick={() => setJeep({ ...jeep, power: index })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinterCreator;
/**/
