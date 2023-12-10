// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FundManagement {
    address payable public fundOwner;
    uint256 public totalFunds;

    event FundsDeposited(address indexed depositor, uint256 amount);
    event FundsWithdrawn(address indexed withdrawer, uint256 amount);
    event NFTPurchased(address indexed purchaser, uint256 amount);

    modifier onlyFundOwner() {
        require(msg.sender == fundOwner, "You are not the fund owner");
        _;
    }

    constructor(uint256 initialFunds) payable {
        fundOwner = payable(msg.sender);
        totalFunds = initialFunds;
    }

    function getTotalFunds() public view returns (uint256) {
        return totalFunds;
    }

    function depositFunds() public payable onlyFundOwner {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        totalFunds += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function withdrawFunds(uint256 withdrawalAmount) public onlyFundOwner {
        require(withdrawalAmount > 0, "Withdrawal amount must be greater than zero");
        require(totalFunds >= withdrawalAmount, "Insufficient funds for withdrawal");
        totalFunds -= withdrawalAmount;
        payable(fundOwner).transfer(withdrawalAmount);
        emit FundsWithdrawn(msg.sender, withdrawalAmount);
    }

    function purchaseNFT(uint256 purchaseAmount) public onlyFundOwner {
        require(purchaseAmount > 0, "Purchase amount must be greater than zero");
        require(totalFunds >= purchaseAmount, "Insufficient funds for NFT purchase");
        totalFunds -= purchaseAmount;
        emit NFTPurchased(msg.sender, purchaseAmount);
    }
}
