// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Lottery.sol";

library Jeeps {
    struct Jeep {
        JeepParts parts;
    }

    struct JeepParts {
        uint256 body;
        uint256 colour;
        uint256 accessory;
        uint256 power;
    }

    function toString(Jeep memory jeep) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                Strings.toString(jeep.parts.body),
                "_",
                Strings.toString(jeep.parts.colour),
                "_",
                Strings.toString(jeep.parts.accessory),
                "_",
                Strings.toString(jeep.parts.power)
                )
            );
    }
}

contract LotteryToken is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    string public CID;
    Lottery public lottery;
    Counters.Counter private _tokenIdsCounter;
    mapping(uint256 => Jeeps.Jeep) private _lotteryTickets;

    constructor(Lottery _lottery, string memory _name, string memory _symbol, string memory _CID) ERC721(_name, _symbol) {
        require(bytes(_CID).length > 0, "No CID provided");
        CID = _CID;
        lottery = _lottery;
    }

    /*
        * Returns the jeep data from a tokenId
    */
    function getJeep(uint256 tokenId) public view returns (Jeeps.Jeep memory) {
        return _lotteryTickets[tokenId];
    }

    /*
        * Returns the collection's metadata URI
        * https://docs.opensea.io/docs/contract-level-metadata
    */
    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked("ipfs://", CID, "/collection-metadata.json"));
    }

    /*
        * Returns the token URI
    */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory jsonName;
        if(lottery.isComplete() && !lottery.isWinningTicket(tokenId)){
            // Loser ticket
            jsonName = "destroyed";
        } else {
            // Lottery is not complete or ticket is a winner
            Jeeps.Jeep memory jeep = _lotteryTickets[tokenId];
            jsonName = Jeeps.toString(jeep);
        }
        return string(abi.encodePacked("ipfs://", CID, "/", jsonName, ".json"));
    }

    /*
        * Allows to mint a new token
        * Only the owner (the lottery) can call this function
    */
    function mint(address recipient, Jeeps.Jeep memory jeep) public onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdsCounter.current();
        _safeMint(recipient, tokenId);
        
        _lotteryTickets[tokenId] = jeep;

        _tokenIdsCounter.increment();
        return tokenId;
    }
}