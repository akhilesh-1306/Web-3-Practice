// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/OrcaCoin.sol";

contract OrcaCoinTest is Test {
    OrcaCoin c;

    function setUp() public {
        c = new OrcaCoin(msg.sender);
    }  

    function testInitialSupply() public view {
        assert(c.totalSupply() == 0);
    }

    //They have depricated testFailMint
    // function test_RevertIf_MintFails() public{
    //     vm.startPrank(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f);
    //     c.mint(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 10);
    // }

    function testMint() public{
        vm.startPrank(msg.sender);
        c.mint(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 10);
        assert(c.balanceOf(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f) == 10);
    }
}