const { expect } = require("chai");

const BigNumber = require('ethers').BigNumber;
const galaxySetup = require('../scripts/deployment').galaxySetup;

describe("ExchangeFactory", function() {

  it("testETHToEC20Swap", async () => {

    const [ owner ]  = await ethers.getSigners();
    const { exchange, galactics } = await galaxySetup();

    const saturnContext = galactics.filter(it => it.coin.symbol === "STRN")[0]
    const saturn = saturnContext.deployment;
    const WEI_IN_ETH    = BigNumber.from('1000000000000000000')

    const old_saturn_balance = (await saturn.balanceOf(owner.address));

    await exchange.exchangeETHFor(saturn.address, 1000, {
      value: WEI_IN_ETH
    })
    const new_saturn_balance = (await saturn.balanceOf(owner.address));

    const delta_balance = new_saturn_balance.sub(old_saturn_balance)

    /*
      I should get the equivalent of 1 ETH into saturn coins minus 0.3% transaction fee
     */
    const saturn_equivalent = WEI_IN_ETH.mul(saturnContext.coin.exchange);
    expect(saturn_equivalent.sub(delta_balance).mul(1000).div(saturn_equivalent).toNumber())
      .to.be.eq(3)


  });

});
