import { ethers } from 'hardhat';
import { expect } from 'chai';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const NFToken = await ethers.getContractFactory('DevNFToken');
  const devNFToken = await NFToken.deploy();
  await devNFToken.deployed();
  console.log(devNFToken.address);

  const mintTx = await devNFToken.mint();
  await mintTx.wait();
  let owner_balance = await devNFToken.balanceOf(deployer.address);
  expect(owner_balance).to.equal(1);

  const burnTx = await devNFToken.burn(0);
  await burnTx.wait()
  owner_balance = await devNFToken.balanceOf(deployer.address);
  expect(owner_balance).to.equal(0);

  const pauseTx = await devNFToken.pause();
  await pauseTx.wait();
  expect(await devNFToken.paused()).to.be.true;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

