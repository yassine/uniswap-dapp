// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract ExchangeOracle {

  address private _owner;
  mapping (address => uint256) private exchange;

  constructor() public {
    _owner = msg.sender;
  }

  function tokenValueForETH(address token, uint ethAmount) external view returns (uint256 amount){
    require(exchange[token] != uint256(0));
    amount = exchange[token] * (ethAmount);
  }

  function setTokenValue(address token, uint perOneETH) public {
    require(msg.sender == _owner);
    exchange[token] = perOneETH;
  }

}
