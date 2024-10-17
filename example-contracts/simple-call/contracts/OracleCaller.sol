// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract OracleCaller {
    address constant oracleContract =
        0x9999999999999999999999999999999999999999;

    function callAPI(bytes memory data) public view returns (bytes memory) {
        (bool success, bytes memory result) = oracleContract.staticcall(data);
        require(success, "API call failed");
        return result;
    }
}
