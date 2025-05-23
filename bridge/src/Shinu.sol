// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Shinu is ERC20, Ownable {
    constructor() ERC20("Shinu", "SHN") Ownable(msg.sender) {  

    }

    function mint(address _to, uint256 _value) public onlyOwner {
        _mint(_to, _value);
    }
}

