pragma solidity >=0.4.22 <0.9.0;

interface IExchangeOracle {
  function tokenValueForETH(address token, uint ethAmount) external view returns (uint256);
}
