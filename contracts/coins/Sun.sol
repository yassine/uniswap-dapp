pragma solidity >=0.4.22 <0.9.0;

import '@uniswap/v2-periphery/contracts/test/WETH9.sol';

contract Sun is WETH9 {
  constructor() WETH9() public {}
}
