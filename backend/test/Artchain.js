const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  let nftMarket;
  let signer;
  let otherSigner;
  before(async ()=> {
    const NFTMarket = await ethers.getContractFactory("ArtChain");
    nftMarket = await NFTMarket.deploy();
    await nftMarket.deployed();
    [signer,otherSigner] = await ethers.getSigners();
  });

  const createNFT = async (tokenURI)=>{
    const transaction = await nftMarket.createNFT(tokenURI);
    const receipt = await transaction.wait();
    const tokenID = receipt.events[0].args.tokenId;
    return tokenID;
  }

  const createAndListNFT = async (price)=>{
    const tokenID = await createNFT("some token uri");
    const transaction = await nftMarket.listNFT(tokenID,price);
    await transaction.wait();
    return tokenID;
  }

  describe("createNFT",async function(){
    const tokenURI = "https://some-token.uri";
    it("Should create NFT with correct owner and tokenURI",async ()=>{
      // Call the create NFT Function
      const transaction = await nftMarket.createNFT(tokenURI);
      const receipt = await transaction.wait();
      const tokenID = receipt.events[0].args.tokenId;

      // Assert that owner of the newly created nft is the address that started the transaction
      const mintedTokenURI = await nftMarket.tokenURI(tokenID);
      expect(mintedTokenURI).to.equal(tokenURI);
      
      // Assert that the owner of the newly created NFT is the address that started the contract.
      const ownerAddress = await nftMarket.ownerOf(tokenID);
      const currentAddress = await signer.getAddress();
      expect(ownerAddress).to.equal(currentAddress);

      // Assert that the NFT transfer event has correct args.
      const args = await receipt.events[1].args;
      expect(args.tokenID).to.equal(tokenID);
      expect(args.from).to.equal(ethers.constants.AddressZero);
      expect(args.to).to.equal(currentAddress);
      expect(args.tokenURI).to.equal(tokenURI);
      expect(args.price).to.equal(0);
    })
  })
  describe("ListNFT", async ()=>{
    const tokenURI = "https://some-token.uri";
    it("Should revert if price is zero",async ()=>{
      const tokenID = await createNFT(tokenURI);
      const transaction = nftMarket.listNFT(tokenID,0);
      await expect(transaction).to.be.revertedWith("NFTMarket: price must be greater than 0");
    })

    it("Should revert if not called by the owner",async ()=>{
      const tokenID = await createNFT(tokenURI);
      const transaction = nftMarket.connect(otherSigner).listNFT(tokenID,12);
      await expect(transaction).to.be.revertedWith("ERC721: caller is not token owner or approved");
    })

    it("Should list the token if all the requirements are met", async ()=>{
      const price = 123;
      const tokenID = await createNFT(tokenURI);
      const transaction = await nftMarket.listNFT(tokenID,price);
      const receipt = await transaction.wait();

      // Ownership should be transferred to the contract.
      const ownerAddress = await nftMarket.ownerOf(tokenID);
      expect(ownerAddress).to.equal(nftMarket.address);

      // NFTtransfer event should have the right arguments.
      const args = await receipt.events[1].args;
      expect(args.tokenID).to.equal(tokenID);
      expect(args.from).to.equal(signer.address);
      expect(args.to).to.equal(nftMarket.address);
      expect(args.tokenURI).to.equal("");
      expect(args.price).to.equal(price);
    })
  })

  describe('buynft', async () => {
    it("Should revert if token of nft is not listed for sale",async ()=>{
      const transaction = nftMarket.buyNFT(9999);
      await expect(transaction).to.be.revertedWith("NFTMarket: nft not listed for sale");
    })

    it("should be revert if the amount of wei sent is not equal price",async ()=>{
      const tokenID = await createAndListNFT(123);
      const transaction = nftMarket.buyNFT(tokenID,{value: 124});
      await expect(transaction).to.be.revertedWith("NFTMarket: incorrect price");
    })
    it("Should transfer ownership to the buyer and send the price to the seller", async ()=>{
      const price = 123;
      const sellerProfit = Math.floor(price*(0.95));
      const fee = price-sellerProfit;
      const initialcontractBalance = await nftMarket.provider.getBalance(nftMarket.address);
      const tokenID = await createAndListNFT(price);
      await new Promise(r=>setTimeout(r,100));
      const oldSellerBalance = await signer.getBalance();
      const transaction = await nftMarket.connect(otherSigner).buyNFT(tokenID,{value:price});
      const receipt = await transaction.wait();

      // 95% of the balance was added to the seller balance
      await new Promise(r=>setTimeout(r,100));
      const newSellerBalance = await signer.getBalance();
      const diff = newSellerBalance.sub(oldSellerBalance);
      expect(diff).to.equal(sellerProfit);

      // 5% of the balance was kept in the contract balance
      const newcontractBalance = await nftMarket.provider.getBalance(nftMarket.address);
      const contractdiff = newcontractBalance.sub(initialcontractBalance);
      expect(contractdiff).to.equal(fee);

      // NFT Ownership was transferred to the buyer.
      const ownerAddress = await nftMarket.ownerOf(tokenID);
      expect(ownerAddress).to.equal(otherSigner.address);

      // NFTTransfer event has the correct arguments.
      const args = await receipt.events[1].args;
      expect(args.tokenID).to.equal(tokenID);
      expect(args.from).to.equal(nftMarket.address);
      expect(args.to).to.equal(otherSigner.address);
      expect(args.tokenURI).to.equal("");
      expect(args.price).to.equal(0);
    })
  })

  describe("cancelListing", async ()=>{
    it("should revert if the NFT is not listed for sale", async ()=>{
      const transaction = nftMarket.cancelListing(9999);
      await expect(transaction).to.be.revertedWith('NFTMarket: nft not listed for sale');
    })

    it("Should revert if the caller is not the seller of the listing", async ()=> {
      const tokenID = await createAndListNFT(123);
      const transaction = nftMarket.connect(otherSigner).cancelListing(tokenID);
      await expect(transaction).to.be.revertedWith("NFTMarket: you're not the seller");
    })

    it("Should transfer the ownership back to the seller",async ()=>{
      const tokenID = await createAndListNFT(123);
      const transaction = await nftMarket.cancelListing(tokenID);
      const receipt = await transaction.wait();

      // Check Ownership transfer
      const ownerAddress = await nftMarket.ownerOf(tokenID);
      expect(ownerAddress).to.equal(signer.address);

      // Check the NFTTransfer event
      const args = await receipt.events[1].args;
      expect(args.tokenID).to.equal(tokenID);
      expect(args.from).to.equal(nftMarket.address);
      expect(args.to).to.equal(signer.address);
      expect(args.tokenURI).to.equal("");
      expect(args.price).to.equal(0);
    })
  })

  describe("Wtihdrawfunds", async ()=>{
    it("Should revert if called by a signer other than the owner", async ()=>{
      const transaction = nftMarket.connect(otherSigner).withdrawFunds();
      await expect(transaction).to.be.revertedWith('Ownable: caller is not the owner');
    })
    it("Should transfer all funds from the contract balance to the owner",async ()=>{
      const contractBalance = await nftMarket.provider.getBalance(nftMarket.address);
      const initialOwnerBalance = await signer.getBalance();
      const transaction = await nftMarket.withdrawFunds();
      const receipt = await transaction.wait();
      await new Promise(r=>setTimeout(r,100));
      const gas = receipt.gasUsed.mul(receipt.effectiveGasPrice);
      const newOwnerBalance = await signer.getBalance()
      const transfer = newOwnerBalance.add(gas).sub(initialOwnerBalance);

      expect(transfer).to.equal(contractBalance);
    })
    it("Should revert if the contract balance is zero",async ()=>{
      const transaction = nftMarket.withdrawFunds();
      await expect(transaction).to.be.revertedWith('NFTMarket: balance is zero');
    })
  })

})

// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// const { expect } = require("chai");

// describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();

//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }

//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );

//       expect(await ethers.provider.getBalance(lock.address)).to.equal(
//         lockedAmount
//       );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
