// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWShinu is IERC20{
    function mint(address _to, uint256 _value) external;
    function burn(address _from, uint256 _value) external;
}

contract BridgeBase is Ownable{
    address public tokenAddress;
    uint256 public balance;

    event Burn(address indexed _burner, uint256 _amount);

    mapping(address => uint256) public pendingBalance;

    constructor(address _tokenAddress) Ownable(msg.sender){
        tokenAddress = _tokenAddress;
    }   

    function withdraw(IWShinu _tokenAddress, uint256 _amount) public{
        require(pendingBalance[msg.sender] >= _amount);
        pendingBalance[msg.sender] -= _amount;
        _tokenAddress.mint(msg.sender, _amount);
    }

    function burn(IWShinu _tokenAddress, uint256 _amount) public{
        require(address(_tokenAddress) == tokenAddress);
        _tokenAddress.burn(msg.sender, _amount);
        emit Burn(msg.sender, _amount);
    }

    function depositHappenedOnOtherSide(address userAccount, uint256 _amount) public onlyOwner{
        pendingBalance[userAccount] += _amount;
    }
}