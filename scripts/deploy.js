async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const MemeTokenPrediction = await ethers.getContractFactory("MemeTokenPrediction");
  const prediction = await MemeTokenPrediction.deploy("BETTING_TOKEN_ADDRESS");

  console.log("Contract deployed to:", prediction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 