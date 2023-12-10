const hre = require("hardhat");

async function main() {
  const initFunds = 1; // Initial funds for the contract
  const FundManagement = await hre.ethers.getContractFactory("FundManagement");
  const fundManagement = await FundManagement.deploy(initFunds);
  await fundManagement.deployed();

  console.log(`FundManagement contract deployed to: ${fundManagement.address} with initial funds: ${initFunds} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
