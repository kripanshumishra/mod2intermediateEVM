# Ethereum Smart Contract Interaction - React App

This React application interacts with an Ethereum smart contract deployed on the Ethereum network. It allows users to connect their MetaMask wallet, view their account, check the contract address, deposit funds, withdraw funds, and buy an NFT.

## Prerequisites

- MetaMask wallet installed in your browser.

## Project Structure

- `index.js`: React application entry point.
- `FundManagement.json`: ABI of the deployed FundManagement smart contract.


# FundManagement Smart Contract

This Ethereum smart contract, written in Solidity, is designed for fund management. It includes functionality for depositing funds, withdrawing funds, and checking the total funds in the contract.

## Contract Details

- **Contract Name:** FundManagement
- **Solidity Version:** ^0.8.9

## Contract Features

### `constructor(uint256 initialFunds) payable`
- Initializes the contract with an initial fund balance.

### `function getTotalFunds() public view returns (uint256)`
- Returns the total funds currently held in the contract.

### `function depositFunds() public payable onlyFundOwner`
- Allows the contract owner to deposit funds into the contract.

### `function withdrawFunds(uint256 withdrawalAmount) public onlyFundOwner`
- Allows the contract owner to withdraw funds from the contract.

## Modifiers

### `onlyFundOwner`
- Restricts certain functions to be callable only by the contract owner.

## Events

### `FundsDeposited(address indexed depositor, uint256 amount)`
- Emitted when funds are deposited into the contract.

### `FundsWithdrawn(address indexed withdrawer, uint256 amount)`
- Emitted when funds are withdrawn from the contract.

## Usage

1. Deploy the contract to an Ethereum network.
2. Interact with the contract using Ethereum wallets or dApps.
3. Deposit funds, withdraw funds, and query the total funds.
es, deployment instructions, or considerations.


# React App

## Usage

1. Connect your MetaMask wallet by clicking the "Connect" button.
2. Once connected, your Ethereum account address will be displayed.
3. Optionally, toggle the contract address display to see the deployed contract address.
4. Use the provided buttons to deposit funds, withdraw funds, or buy an NFT.



# How to run the Project 

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
