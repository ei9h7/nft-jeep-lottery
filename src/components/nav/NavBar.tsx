import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import ConnectButton from "@/components/nav/ConnectButton";
import logoName from "@/assets/images/logo-name.png";
import logoJeep from "@/assets/images/logo-jeep.png";
import { saveAs } from "file-saver";
import whitePaper from "@/assets/whitepaper.pdf";
import { SaveAltSharp } from "@mui/icons-material";
type Menu = {
  label: string;
  id: string;
};

const NavBar: React.FunctionComponent = () => {
  const [curMenu, setCurMenu] = React.useState("#landing");
  const menus: Menu[] = [
    { label: "Home", id: "#landing" },
    { label: "Mint", id: "#minter" },
    //{ label: "Hangar", id: "#hangar" },
    { label: "Roadmap", id: "#roadmap" },
    { label: "Team", id: "#team" },
    { label: "White Paper", id: "" },
  ];
  const isActive = (menu: string): any => {
    if (curMenu === menu) {
      return "active";
    }
    return "";
  };
  const navigateTo = (menu: Menu): void => {
    if (menu.label !== "Lite Paper") {
      setCurMenu(menu.id);
    }
  };
  const downloadLitePaper = (): void => {
    console.log(whitePaper);
    saveAs(whitePaper, "SpaceTombo_WhitePaper.pdf");
  };
  return (
    <AppBar className="main-menu" color="transparent">
      <div className="main-menu_logo">
        <img src={logoName} className="logo-name" />
        <img src={logoJeep} className="logo-jeep" />
      </div>
      <div className="main-menu_menu">
        {menus.map((menu: Menu, index: number) => {
          const marginLeft = index === 0 ? "6rem" : "4rem";
          const href = menu.id;
          if (menu.label !== "White Paper") {
            return (
              <Link
                key={index}
                sx={{ ml: marginLeft, cursor: "pointer" }}
                className={`${isActive(menu.id)}`}
                underline="none"
                onClick={() => navigateTo(menu)}
                href={href}
              >
                {menu.label}
              </Link>
            );
          }
          return (
            <Link
              key={index}
              sx={{ ml: marginLeft, cursor: "pointer" }}
              className={`${isActive(menu.id)}`}
              underline="none"
              href="#"
              onClick={downloadLitePaper}
            >
              {menu.label}
            </Link>
          );
        })}
      </div>
      <ConnectButton>Connect Wallet</ConnectButton>
    </AppBar>
  );
};

export default NavBar;
