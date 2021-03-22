// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const UniswapV2FactoryBuild = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const UniswapV2Router02Build = require('@uniswap/v2-periphery/build/UniswapV2Router02.json')

const BigNumber = require('ethers').BigNumber;
const TOKENS    = require('./tokens').tokens;

async function galaxySetup() {

  const [ owner ]    = await hre.ethers.getSigners();
  const WEI_IN_ETH   = BigNumber.from('1000000000000000000');
  const INIT_COIN    = WEI_IN_ETH.mul(1000000);
  const GalacticCoinFactory = await ethers.getContractFactory("GalacticCoin");
  const Sun                 = await ethers.getContractFactory("Sun");
  const ExchangeOracle      = await ethers.getContractFactory("ExchangeOracle");
  const ExchangeContract    = await ethers.getContractFactory("ExchangeContract");
  const UniswapV2Factory    = ethers.ContractFactory.fromSolidity(UniswapV2FactoryBuild, owner)
  const UniswapV2Router02   = ethers.ContractFactory.fromSolidity(UniswapV2Router02Build, owner)

  const factory = await UniswapV2Factory.deploy(owner.address);
  const oracle  = await ExchangeOracle.deploy();
  const sun     = await Sun.deploy();

  await Promise.all([
    factory.deployed(),
    oracle.deployed(),
    sun.deployed()
  ]);

  const router      = await UniswapV2Router02.deploy(factory.address, sun.address);
  await router.deployed()

  const exchange = await ExchangeContract.deploy(factory.address, router.address, oracle.address, sun.address);
  await exchange.deployed();


  //deploy galactics
  const galactics = await Promise.all(TOKENS.map(async coin =>
    GalacticCoinFactory.deploy(coin.name, coin.symbol, INIT_COIN)
      .then(deployment => ({ deployment, coin }))
  ));
  await Promise.all(galactics.map(it => it.deployment.deployed()))

  // set oracle exchange rates values
  await Promise.all(galactics.map(it => oracle.setTokenValue(it.deployment.address, it.coin.exchange)))

  // set up liquidity
  const sunLiquidity     = BigNumber.from('1000').mul(WEI_IN_ETH);
  await Promise.all(galactics
    .map(it =>
      // adds liquidity for the exchange 'coin <-> eth' and vice versa
      it.deployment.approve(router.address, sunLiquidity.mul(it.coin.exchange))
        .then( () => router.addLiquidityETH(it.deployment.address, sunLiquidity.mul(it.coin.exchange), sunLiquidity.mul(it.coin.exchange), sunLiquidity, owner.address,  Date.now() + 1000 * 60, {
          value: sunLiquidity
        }))
    )
  )

  return {
    factory,
    oracle,
    sun,
    router,
    exchange,
    galactics
  }

}

module.exports = {
  galaxySetup
}
