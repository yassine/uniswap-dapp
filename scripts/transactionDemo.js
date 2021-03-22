const galaxySetup = require("./deployment").galaxySetup
const BigNumber = require('ethers').BigNumber;

async function transaction() {
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

  console.log("delta balance: ", delta_balance.toString())

}

transaction()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
