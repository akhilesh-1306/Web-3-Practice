// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

interface IOrcaCoin{
    function mint(address _to, uint256 _value) external;
}

contract StakingContract {
    mapping(address => uint) public stakes;
    mapping(address => uint) public unclaimedRewards;
    mapping(address => uint) public lastUpdatedTime;
    address coinAddress;
    constructor(address _coinAddress) {
        coinAddress = _coinAddress;
    }

    function stake() public payable{
        require(msg.value > 0);
        if(lastUpdatedTime[msg.sender] == 0){
            lastUpdatedTime[msg.sender] = block.timestamp;
        }
        else{
            unclaimedRewards[msg.sender] += ((block.timestamp - lastUpdatedTime[msg.sender]) * stakes[msg.sender]) ;
            lastUpdatedTime[msg.sender] = block.timestamp;
        }
        stakes[msg.sender] += msg.value;
    }

    function unstake(uint _amount) public {
        require(stakes[msg.sender] >= _amount);
        unclaimedRewards[msg.sender] += ((block.timestamp - lastUpdatedTime[msg.sender]) * stakes[msg.sender]) ;
        lastUpdatedTime[msg.sender] = block.timestamp;
        // payable(msg.sender).transfer(_amount);
        stakes[msg.sender] -= _amount;
    }

    function getRewards(address _address) public view returns(uint){
        uint currReward = unclaimedRewards[_address];
        uint lastUpdated = lastUpdatedTime[_address];
        uint newReward = (block.timestamp - lastUpdated) * stakes[_address];   
        return currReward + newReward;
    }

    function claimRewards() public{
        uint currReward = unclaimedRewards[msg.sender];
        uint lastUpdated = lastUpdatedTime[msg.sender];
        uint newReward = ((block.timestamp - lastUpdated) * stakes[msg.sender] ) ; 

        IOrcaCoin(msg.sender).mint(msg.sender, currReward + newReward);

        unclaimedRewards[msg.sender] = 0;
        lastUpdatedTime[msg.sender] = block.timestamp;
    }

    function stakeOf(address _address) public view returns(uint){
        return stakes[_address];
    }
}