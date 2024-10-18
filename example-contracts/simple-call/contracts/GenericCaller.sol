// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "./OracleCallerAbstract.sol";

contract GenericCaller is OracleCallerAbstract {

    function callAPI(bytes memory data) public view returns (uint64 output) {
        uint64 result = _resolveOracle(data);
        return result;
    }
}
