// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;
 
abstract contract OracleCallerAbstract {
    address constant oracleContract =
        0x9999999999999999999999999999999999999999;

    event APIResponse(string response);

    function stringToUint64(string memory s) internal pure returns (uint64) {
        bytes memory b = bytes(s);
        uint64 result = 0;
        bool found = false;

        for (uint i = 0; i < b.length; i++) {
            // Convert bytes1 to uint8 for comparison
            uint8 char = uint8(b[i]);
            if (char >= 48 && char <= 57) { // Check if character is between '0' and '9'
                found = true; // Found the start of the numeric part
                result = result * 10 + (char - 48); // Convert ASCII to integer
            } else if (found) {
                // If we have started finding numbers, break on any non-numeric character
                break;
            }
        }
        require(found, "No numeric value found in string");
        return result;
    }

    function _resolveOracle(bytes memory data) internal view returns (uint64 output) {
        (bool success, bytes memory result) = oracleContract.staticcall(data);
        require(success, "API call failed");
        string memory resultString = string(result);
        return stringToUint64(resultString);
    }
}
 
 
 