// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HashGenerator {
    bytes32[] public hashedNumbers;

    event HashesGenerated(bytes32[] hashes);

    function generateHashes(uint256 _count, uint256 _maxRange) external {
        require(_count > 0 && _maxRange > 0, "Invalid parameters");

        delete hashedNumbers; // Reset previous hashes

        for (uint256 i = 0; i < _count; i++) {
            uint256 randomNumber = uint256(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, i))
            ) % _maxRange + 1;

            hashedNumbers.push(keccak256(abi.encodePacked(randomNumber)));
        }

        emit HashesGenerated(hashedNumbers);
    }

    function getHashedNumbers() external view returns (bytes32[] memory) {
        // bytes32[] memory numbers = new bytes32[](1);
        // numbers[0] = 0x09d2b8064dad1a2b069e07c70bceac094a1fc862db48ba83ecf826a1a1ba786f;
        // return numbers;
        return hashedNumbers ;
    }
}
