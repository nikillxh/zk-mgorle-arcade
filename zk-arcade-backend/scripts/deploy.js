const hre = require("hardhat");

async function main() {
  const LocalToken = await hre.ethers.getContractFactory("LocalToken");
  const token = await LocalToken.deploy();
  
  // Wait for the contract to be deployed
  await token.waitForDeployment();
  
  // Get the deployed contract address using the new method
  const address = await token.getAddress();
  
  console.log("LocalToken deployed to:", address);
  
  // Optional: Wait for a few block confirmations
  await token.deploymentTransaction()?.wait(3);
  
  // Log deployment details for verification
  console.log("Deployment transaction hash:", token.deploymentTransaction()?.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
