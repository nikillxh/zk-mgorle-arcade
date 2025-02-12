const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contract from: ${deployer.address}`);

  const GuessingGame = await hre.ethers.getContractFactory("HashGenerator");
  const game = await GuessingGame.deploy();

  await game.waitForDeployment();

  console.log(`GuessingGame deployed to: ${await game.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
