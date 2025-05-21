// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/StakingContract.sol";
import "../src/OrcaCoin.sol";

contract StakingContractTest is Test {
    OrcaCoin coin;
    StakingContract c;

    function setUp() public {
        coin = new OrcaCoin(address(this));
        c = new StakingContract(address(coin));
        coin.updateStakingContract(address(c));

    }

    function testStake() public{
        c.stake{value:200}();
        assert(c.stakeOf(address(this)) == 200);
    }

    function testUnstake() public{
        vm.startPrank(address(this));
        c.stake{value:200}();
        c.unstake(100);
        assert(c.stakeOf(address(this)) == 100);
    }

    function testGetRewards() public {
        uint value = 1 ether;
        c.stake{value: value}();
        vm.warp(block.timestamp + 1);
        uint rewards = c.getRewards(address(this));

        assert(rewards == 1 ether);
    }
}