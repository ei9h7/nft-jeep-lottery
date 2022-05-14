import Countdown from "@/components/landing/Countdown";
import * as React from "react";
import { Typography } from "@mui/material";
import PolygonChainInfo from "@/config/polygonChain.config";

const Landing: React.FunctionComponent = () => {
  return (
    <div className="landing full-height" id="landing">
      <div className="landing_solar">
        <div className="landing_solar-content">
          <Typography
            variant={"h4"}
            sx={{ mb: "1rem" }}
            component={"h1"}
            color={"white"}
            fontWeight={"bold"}
          >
            Take part in the only blockchain
            <br /> jeep adventure to win a custom
            <br /> V8 Jeep Race Truck
          </Typography>
          <Countdown />
        </div>
      </div>
      <div className="landing_info">
        <Typography
          variant={"h5"}
          component={"h3"}
          color={"white"}
          fontWeight={"bold"}
        >
          NFT contract :
        </Typography>
        <Typography variant={"subtitle1"} color={"white"}>
          {PolygonChainInfo.contractAddress !== ""
            ? PolygonChainInfo.contractAddress
            : "Coming Soon"}
        </Typography>
        <Typography
          variant={"h5"}
          component={"h3"}
          color={"white"}
          fontWeight={"bold"}
        >
          Team wallet :
        </Typography>
        <Typography variant={"subtitle1"} color={"white"}>
          Coming Soon
        </Typography>
      </div>
      <div className="landing_subtitle">
        <div className="landing_subtitle-text">
          <Typography variant={"subtitle1"} component={"h2"} color={"white"}>
            Craft your own NFT Jeep to participate in the first
          </Typography>
        </div>
        <div className="landing_subtitle-text">
          <Typography variant={"subtitle1"} component={"h2"} color={"white"}>
            <span className="secondary-text">blockchain raffle</span>
            for a built V8 Jeep!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Landing;
