// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("Akhilesh", "AKH") {}
      
    function mint(address _to, uint256 _value) public{
        _mint(_to, _value);
    }
}