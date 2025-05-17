// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/MyToken.sol";

contract TestMyToken is Test {
    event Transfer(address indexed from, address indexed to, uint256 value);

    MyToken c;

    function setUp() public {
        c = new MyToken();
    }

    function testMint() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100,"ok");
    } 

    function testTransfer() public {
        c.mint(address(this), 100);
        c.transfer(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 50);
        assertEq(c.balanceOf(address(this)), 50,"ok");
        assertEq(c.balanceOf(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f), 50,"ok");

        //testing that the other person can send back the tokens
        vm.prank(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f);
        c.transfer(address(this), 50);
        assertEq(c.balanceOf(address(this)), 100,"ok");
        assertEq(c.balanceOf(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f), 0,"ok");
    }

    function testApprovals() public {
        c.mint(address(this), 100);
        c.approve(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 50);

        vm.prank(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f);
        c.transferFrom(address(this), 0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 50);

        assertEq(c.balanceOf(address(this)), 50,"ok");
        assertEq(c.balanceOf(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f), 50,"ok");
        assertEq(c.allowance(address(this), 0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f), 0,"ok");
    }

    //This has been depricated
    // function testFailApprovals() public{
    //     c.mint(address(this), 100);
    //     c.approve(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 50);

    //     vm.prank(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f);
    //     c.transferFrom(address(this), 0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 51);
    // }

    function testTransferEmit() public{
        c.mint(address(this), 100);
        vm.expectEmit(true, true, false, true);
        emit Transfer(address(this), 0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 10);
        c.transfer(0xb8fC97fd149F6B93A99d63A0E608b8C66eABd57f, 10);
    }
}