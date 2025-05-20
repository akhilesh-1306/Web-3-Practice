// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

//Implementing proxyContract + delegatecall + fallback()

//This is the original contract that will be deployed
contract StakingContract {
    mapping(address => uint256) public stakes;
    uint256 public totalStake;
    address owner;
    //for upgradability
    address implementation;

    constructor(address _implementation){
        implementation = _implementation;
        owner = msg.sender;
    }

    function stake() public payable{
        (bool success,) = implementation.delegatecall(msg.data);
        require(success, "delegatecall failed");
    }
    
    //Handles upgradability through delegatecall
    function unstake(uint256 _amount) public {
        (bool success,) = implementation.delegatecall(
                abi.encodeWithSignature("unstake(uint256)", _amount)
            );
        require(success, "delegatecall failed");
    }

    function setImplementation(address _implementation) public{
        require(msg.sender == owner);
        implementation = _implementation;
    }

    //Used to handle new function upgradability
    fallback() external {
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "delegatecall failed");
    }
}

//Buggy implementation
contract ImplementationV1{
    mapping(address => uint256) public stakes;
    uint256 public totalStake;

    constructor(){

    }
    function stake() public payable{
        require(msg.value > 0);
        stakes[msg.sender] += msg.value;
        totalStake += msg.value;
    }

    function unstake(uint256 _amount) public {
        require(stakes[msg.sender] >= _amount); 
        payable(msg.sender).transfer(_amount / 2);
        totalStake -= _amount;
        stakes[msg.sender] -= _amount;
    }
}

//Correct implementation
contract ImplementationV2{
    mapping(address => uint256) public stakes;
    uint256 public totalStake;

    constructor(){

    }
    function stake() public payable{
        require(msg.value > 0);
        stakes[msg.sender] += msg.value;
        totalStake += msg.value;
    }

    function unstake(uint256 _amount) public {
        require(stakes[msg.sender] >= _amount); 
        payable(msg.sender).transfer(_amount);
        totalStake -= _amount;
        stakes[msg.sender] -= _amount;
    }
}