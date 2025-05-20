// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

import "forge-std/Test.sol";

import "../StakingContract.sol";

contract StakingContractTest is Test {
    StakingContract c;

    function setUp() public {
        c = new StakingContract();
    }
}