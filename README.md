

# Sub-scaff

A decentralized social media platform built with Ethereum smart contracts, React, and Scaffold-ETH-2. This platform allows users to register, create posts, like posts, and add comments, all while leveraging the power of blockchain technology for security and transparency.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a simple decentralized social media application built on sepolia testnet where users can register, create posts, like posts, and comment on posts. All actions are recorded on the blockchain, ensuring transparency and security. 

## Features

- User Registration
- Create Posts
- Like Posts
- Add Comments
- View All Posts

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Blockchain:** Ethereum, Hardhat, Ethers.js
- **Other Libraries:** SweetAlert2, Wagmi


## Getting Started

### Installation

 **Clone the repository:**

   ```bash
   git clone https://github.com/fourWayz/sub-scaff.git
   cd sub-scaff
   ```
Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

 On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

 On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

## Usage

1. **Register a User:**

   Enter a username and click "Register". Your account will be registered on the blockchain.

2. **Create a Post:**

   Once registered, you can create a post by entering the content and clicking "Create Post".

3. **Like a Post:**

   Click the "Like" button on any post to like it.

4. **Add a Comment:**

   Enter a comment in the input field below a post and click "Comment".

## Smart Contracts

The smart contracts are located in the `contracts` directory. The main contract is `Social.sol`, which includes functions for registering users, creating posts, liking posts, and adding comments.

### Deployment

The deployment script is located in the `scripts` directory. Use Hardhat to compile and deploy the contracts to a local blockchain or any Ethereum network.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
