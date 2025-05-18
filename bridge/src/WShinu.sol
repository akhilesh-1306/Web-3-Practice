// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract WShinu is ERC20, Ownable {
    constructor() ERC20("WShinu", "WSHN") Ownable(msg.sender) {

    }

    function mint(address _to, uint256 _value) public onlyOwner {
        _mint(_to, _value);
    }

    function burn(address _from, uint256 _value) public onlyOwner {
        _burn(_from, _value);
    }
}