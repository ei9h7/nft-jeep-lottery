interface MinterOptions {
  body: MinterPart;
  colour: MinterPart;
  accessory: MinterPart;
  power: MinterPart;
}

class MinterPart {
  name: string; // Used for OpenSea "trait_type"
  basePath: string;
  variants: Array<MinterVariant>;
  
  constructor(_name: string, _basePath: string, _variants: Array<MinterVariant>) {
    this.basePath = _basePath;
    this.name = _name;
    this.variants = _variants;
  }
  
  getPath(index: number): string {
    return `${this.basePath}${index + 1}.png`;
  }
}

interface MinterVariant {
  name: string;
}

const options: MinterOptions = {
  body: new MinterPart("Body", "/images/layers/body/body_", 
  [
    { name: "Wrangler" },
    { name: "Unlimited" },
    { name: "JK8" },
    { name: "Gladiator" },
    { name: "Topless" }
  ]),
  colour: new MinterPart("Colour", "/images/layers/colour/colour_", 
  [
    { name: "Dune" },
    { name: "Black" },
    { name: "White" },
    { name: "Orange" },
    { name: "Green" }
  ]),
  accessory: new MinterPart("Accessory", "/images/layers/accessory/accessory_", 
  [
    { name: "Roof Rack" },
    { name: "Mud Tires" },
    { name: "Antenna" },
    { name: "Lights" },
    { name: "Armor" }
  ]),
  power: new MinterPart("Power", "/images/layers/power/power_", 
  [
    { name: "LS Swap" },
    { name: "Hemi Swap" },
    { name: "Supercharged" },
    { name: "3.6L" },
    { name: "Squirrel Power" }
  ])
};
export default options;
export type { MinterPart, MinterVariant };