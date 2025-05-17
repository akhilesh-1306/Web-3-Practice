// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Counter.sol";

contract TestCounter is Test {
    Counter c;

    function setUp() public {
        c = new Counter(100);
    }

    function testInc() public {
        c.increment();
        assertEq(c.getNum(),101,"ok");
    }

    function testDec() public {
        c.decrement();
        assertEq(c.getNum(),99,"ok");
    }
}
