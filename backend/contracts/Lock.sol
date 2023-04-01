// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct DigitalArt {
    uint256 price;
    address seller;
}

contract ArtChain is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter private _tokenIDs;
    mapping(uint256 => DigitalArt) public _listings;

    constructor() ERC721("Art Marketplace", "DigiArt") {}

    event ArtTransfer(
        uint256 tokenID,
        address from,
        address to,
        string tokenURI,
        uint256 price
    );

    function createArt(string calldata tokenURI) public {
        _tokenIDs.increment();
        uint256 currentID = _tokenIDs.current();
        _safeMint(msg.sender, currentID);
        _setTokenURI(currentID, tokenURI);
        emit ArtTransfer(currentID, address(0), msg.sender, tokenURI, 0);
    }

    function listArt(uint256 tokenID, uint256 price) public {
        require(price > 0, "Price must be greater than 0.");
        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = DigitalArt(price, msg.sender);
        emit ArtTransfer(tokenID, msg.sender, address(this), "", price);
    }

    function buyArt(uint256 tokenID) public payable {
        DigitalArt memory listing = _listings[tokenID];
        require(listing.price > 0, "Art not listed for Sale");
        require(msg.value == listing.price, "Incorrect Price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        payable(listing.seller).transfer(listing.price.mul(95).div(100));
        emit ArtTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function cancelArt(uint256 tokenID) public {
        DigitalArt memory listing = _listings[tokenID];
        require(listing.price > 0, "Art not listed for Sale");
        require(
            listing.seller == msg.sender,
            "You're not the Seller of this Art"
        );
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit ArtTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance is zero");
        payable(owner()).transfer(balance);
    }
}
