// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "./abstracts/OracleCallerAbstract.sol";

contract DemoExample is OracleCallerAbstract {
    uint64 private storedBTCPrice;

    uint64 private maxWeatherEasternEurope;

    event PriceUpdated(uint64);

    event WeatherUpdated(uint64);

    // Transaction function to call _resolveOracle and store the result
    function updateBTCPrice() public {
        uint64 result = _resolveOracle("BTC_price_feed_definition_URL");
        storedBTCPrice = result;
        
        emit PriceUpdated(result);
    }

    // Transaction function to call _resolveOracle and store the result
    function updateMaxWeather() public {
        uint64 result = _resolveOracle("weather_price_feed_definition_URL");
        maxWeatherEasternEurope = result;

        emit WeatherUpdated(result);
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