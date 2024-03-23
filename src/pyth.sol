// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract ExampleContract {
    IPyth pyth;

    constructor(address pythContract) {
        pyth = IPyth(pythContract);
    }

    function getETHUSDPrice(bytes[] memory priceUpdateData) public returns (PythStructs.Price memory) {
        pyth.updatePriceFeeds(priceUpdateData);

        // Replace with the actual priceID for ETH/USD
        bytes32 priceID = 0x...; // ETH/USD priceID
        return pyth.getCurrentPrice(priceID);
    }
}

