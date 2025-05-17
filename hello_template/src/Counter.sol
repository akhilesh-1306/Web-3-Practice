// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Counter {
    uint private num;

    constructor(uint _num){
        num = _num;
    }

    function increment() public {
        num++;
    }

    function decrement() public {
        num--;
    }

    function getNum() public view returns(uint){
        return num;
    }
}
