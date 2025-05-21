// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract OrcaCoin is ERC20, Ownable{
    address stakingContract;
    constructor(address _stakingContract) ERC20("OrcaCoin", "ORCA") Ownable(msg.sender) {
        stakingContract = _stakingContract;
    }

    function mint(address _to, uint256 _value) public {
        require(stakingContract == msg.sender);
        _mint(_to, _value);
    }

    function updateStakingContract(address _stakingContract) public onlyOwner {
        stakingContract = _stakingContract;
    }
}