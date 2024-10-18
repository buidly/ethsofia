// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract OracleCaller {
    address constant oracleContract =
        0x9999999999999999999999999999999999999999;

    event APIResponse(string response);

    function callAPI(bytes memory data) public view returns (string memory) {
        (bool success, bytes memory result) = oracleContract.staticcall(data);
        require(success, "API call failed");
        string memory converted = string(result);
        return converted;
    }

    function callAPITx(bytes memory data) public {
        (bool success, bytes memory result) = oracleContract.staticcall(data);
        require(success, "API call failed");

        string memory converted = string(result);

        emit APIResponse(converted);
    }
}
