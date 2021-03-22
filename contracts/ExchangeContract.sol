pragma solidity >=0.4.22 <0.9.0;

import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';


import "../interfaces/IExchangeOracle.sol";

contract ExchangeContract {

  address payable private _router;
  address private _oracle;
  address private _weth;
  address private _factory;

  constructor(address factory, address payable router, address oracle, address weth) public {
    _router = router;
    _oracle = oracle;
    _weth   = weth;
    _factory = factory;
  }

  function exchangeETHFor(address token, uint allowance) public payable {
    require(allowance > 0, "NULL ALLOWANCE");
    require(token !=  address(0), "NULL TOKEN ADDRESS");
    uint ethAmount    = msg.value;
    require(ethAmount > 0, "NULL PAYMENT");

    uint amountOutMin = IExchangeOracle(_oracle).tokenValueForETH(token, ethAmount);

    amountOutMin = amountOutMin - ((allowance * amountOutMin) / 10000);

    address[] memory path = new address[](2);
    path[0] = _weth;
    path[1] = token;

    IUniswapV2Router02(_router).swapExactETHForTokens{ value: msg.value }(amountOutMin, path, msg.sender, block.timestamp);

  }

}
