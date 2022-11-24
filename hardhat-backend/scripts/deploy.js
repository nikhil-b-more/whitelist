const { ethers } = require("hardhat");


async function main() {
  const whitelistContract = await ethers.getContractFactory("Whitelist");

  const deployWhitelist = await whitelistContract.deploy(10);
  console.log("deploying contract");

  await deployWhitelist.deployed();
  console.log('contract deployed at :',deployWhitelist.address )
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
