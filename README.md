# Decentralized File Sharing System

A secure and decentralized file storage and access control system leveraging Ethereum smart contracts, IPFS for storage, and a React-based frontend with MetaMask integration.

## Getting Started

Install project dependencies:

```bash
npm install
```

## Available Commands

```bash
npx hardhat help                         # Show all available Hardhat commands
npx hardhat test                         # Run the test suite
REPORT_GAS=true npx hardhat test         # Run tests with gas usage report
npx hardhat node                         # Start a local Ethereum node
npx hardhat run scripts/deploy.js        # Deploy contracts to default network
npx hardhat run scripts/deploy.js --network localhost  # Deploy to local Hardhat node
```

## Tech Stack

- **Solidity** – Smart contracts for access control
- **Hardhat** – Ethereum development environment
- **IPFS** – Distributed, content-addressed file storage
- **Pinata** – IPFS pinning service for file persistence
- **React** – Frontend framework
- **MetaMask** – Wallet integration for Ethereum authentication

## Features

- Upload and store files on IPFS
- Manage fine-grained access control via smart contracts
- Grant and revoke file access permissions
- Authenticate users securely using MetaMask
- Intuitive web interface for managing files and permissions
