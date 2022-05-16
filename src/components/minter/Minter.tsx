import CustomButton from "../utils/CustomButton";
import { Typography } from "@mui/material";
import * as React from "react";
import MinterCreator from "@/components/minter/MinterCreator";
import MinterDisplay from "@/components/minter/MinterDisplay";
import {
  useContractCall,
  useContractFunction,
  useEtherBalance,
  useEthers,
} from "@usedapp/core";
import LotteryContract from "@/hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { Interface } from "@ethersproject/abi";
import { useEffect, useState } from "react";
import { BigNumber, ethers, utils } from "ethers";
import maticIcon from "@/assets/images/icons/matic.png";
import PolygonChainInfo from "@/config/polygonChain.config";
import { useSelector } from "react-redux";

export type Jeep = {
  body: number;
  colour: number;
  accessory: number;
  power: number;
};

const Minter: React.FunctionComponent = () => {
  const minterStore = useSelector((state: any) => state.minter);
  const userStore = useSelector((state: any) => state.user);
  const [curJeep, setCurJeep] = React.useState<Jeep>({
    body: 0,
    colour: 0,
    accessory: 0,
    power: 0,
  });
  const [priceDisplay, setPriceDisplay] = React.useState<string>("X");
  const [priceUsdDisplay, setPriceUsdDisplay] = React.useState<string>("X");
  let priceFeed: any = undefined;
  let pricedUsd: any = undefined;
  if (PolygonChainInfo.contractAddress !== "") {
    priceFeed = useContractCall({
      abi: new Interface(LotteryContract.abi),
      address: PolygonChainInfo.contractAddress,
      method: "getPriceToParticipate",
      args: [],
    });
    pricedUsd = useContractCall({
      abi: new Interface(LotteryContract.abi),
      address: PolygonChainInfo.contractAddress,
      method: "ticketPriceUsd",
      args: [],
    });
  }
  const { account, activateBrowserWallet } = useEthers();
  const userEtherBalance = useEtherBalance(account);
  const userEtherDisplay = userEtherBalance
    ? utils.formatEther(BigNumber.from(userEtherBalance.toString())).slice(0, 5)
    : "";
  const mintActive = minterStore.state === 2;
  const mintJeep = async (): Promise<void> => {
    if (userStore.connected) {
      try {
        const jeepParamsArray = [
          [curJeep.body, curJeep.colour, curJeep.accessory, curJeep.power],
        ];
        await minterStore.contract.participate(jeepParamsArray, {
          from: account,
          value: BigNumber.from(priceFeed.toString()),
        });
      } catch (error: any) {
        console.log(error);
      }
    } else {
      activateBrowserWallet();
    }
  };
  useEffect(() => {
    if (priceFeed) {
      setPriceDisplay(
        utils.formatEther(BigNumber.from(priceFeed.toString())).slice(0, 5)
      );
    }
  }, [priceFeed]);
  useEffect(() => {
    if (pricedUsd) {
      setPriceUsdDisplay((pricedUsd / 100).toString());
    }
  }, [pricedUsd]);

  return (
    <div
      className="minter full-height"
      id="minter"
      style={{
        background: `url("/images/mint-launching.png")`,
        backgroundSize: "cover",
        backgroundPositionY: "100%",
      }}
    >
      <div className="minter_header">
        <Typography
          variant={"h4"}
          component={"h2"}
          sx={{ ml: "4rem", mt: "6.5rem" }}
        >
          MINT YOUR JEEP
        </Typography>
        <Typography
          variant={"subtitle1"}
          component={"h3"}
          sx={{
            ml: "auto",
            mt: "6.5rem",
            mr: "2rem",
            fontSize: "2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {userEtherDisplay ? (
            <span>
              You have : {userEtherDisplay}
              {""}
              <img
                className="matic-icon"
                src={maticIcon}
                style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}
              />
            </span>
          ) : (
            "Not Connected"
          )}{" "}
        </Typography>
        <Typography
          variant={"subtitle1"}
          component={"h3"}
          sx={{
            ml: "auto",
            mt: "6.5rem",
            mr: "2rem",
            fontSize: "2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Unit Price : {priceDisplay}{" "}
          <img
            className="matic-icon"
            src={maticIcon}
            style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}
          />
        </Typography>
      </div>
      <div className="minter_calculator">
        <MinterDisplay jeep={curJeep} />
        <MinterCreator jeep={curJeep} setJeep={setCurJeep} />
      </div>
      <div className="minter_validator">
        <div className="minter_validator-left" />
        <div className="minter_validator-right">
          {mintActive ? (
            <CustomButton onClick={mintJeep}>Mint</CustomButton>
          ) : (
            <CustomButton>Coming Soon</CustomButton>
          )}
          <Typography
            variant={"h4"}
            sx={{
              fontWeight: "500",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            component={"span"}
          >
            {priceDisplay}{" "}
            <img
              className="matic-icon"
              src={maticIcon}
              style={{ marginLeft: "1rem", marginRight: "2rem" }}
            />{" "}
            |
          </Typography>
          <Typography
            variant={"h4"}
            sx={{ fontWeight: "500", fontSize: "2rem", ml: "2rem" }}
            component={"span"}
          >
            {priceUsdDisplay} $
          </Typography>
        </div>
      </div>
      <div className="minter_disclaimer">
        <Typography variant={"subtitle1"} component={"h2"} color={"white"}>
          You can mint as many Jeeps as you want until the countdown. The more
          Jeeps you have,
          <br /> the better your chances of becoming the hero
          of this adventure.
          <br /> By the way,{" "}
          <span className="secondary-text">
            30% of the Jeeps' revenues will be donated
          </span>{" "}
          to <a href="#">charity.</a>.
        </Typography>
      </div>
    </div>
  );
};

export default Minter;
