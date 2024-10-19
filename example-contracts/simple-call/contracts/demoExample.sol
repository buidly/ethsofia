// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "./abstracts/OracleCallerAbstract.sol";

contract DemoExample is OracleCallerAbstract {
    uint64 private storedBTCPrice;

    uint64 private maxWeatherEasternEurope;

    // Transaction function to call _resolveOracle and store the result
    function updateBTCPrice() public {
        uint64 result = _resolveOracle("https://aggregator.walrus-testnet.walrus.space/v1/wJOXMI-hmvrcAkN8sewQlE7aKtI_zzV06HCAVaWUwZM");
        storedBTCPrice = result;
    }

    // Transaction function to call _resolveOracle and store the result
    function updateMaxWeather() public {
        uint64 result = _resolveOracle("https://aggregator.walrus-testnet.walrus.space/v1/UNl2jRgM2nvREBYwtAiGXapIIgo5-T14iHzhbrC1tlQ");
        maxWeatherEasternEurope = result;
    }

    // View function to return the BTC price
    function getBTCPrice() public view returns (uint64) {
        return storedBTCPrice;
    }

    // View function to return the max weather price
    function getMaxWeather() public view returns (uint64) {
        return maxWeatherEasternEurope;
    }
}