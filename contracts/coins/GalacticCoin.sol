// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract GalacticCoin is ERC20 {
  constructor(string memory name, string memory symbol, uint initSupply) ERC20(name, symbol) {
    _mint(msg.sender, initSupply);
  }
}
