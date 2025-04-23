# Result Dapp 🔗

Result Dapp is a decentralized grading system built on blockchain technology. It is built with TypeScript, Tailwind, NextJS, and Solidity. Result Dapp allows educational institutions to store and manage student records in a secure and tamper-proof way on the blockchain.

## Overview

The core functionality of Result Dapp relies on the efficient and secure storage of student records. To achieve this, the system employs Merkle root trees and stores the actual data off-chain in IPFS.

## Demo


https://user-images.githubusercontent.com/62795688/235324376-3627efa2-05bd-4fa2-bd67-33c8a14bf6b3.mp4


## Screenshots

<img width="1439" alt="Screenshot 2023-04-30 at 2 01 49 AM" src="https://user-images.githubusercontent.com/62795688/235323055-4444ad37-f681-48aa-bbf0-7f17f1bd137a.png">

<img width="1439" alt="Screenshot 2023-04-30 at 2 02 34 AM" src="https://user-images.githubusercontent.com/62795688/235323100-d81cf7fe-0a71-4fb3-a70d-e08975d59ae8.png">

![image](https://user-images.githubusercontent.com/62795688/235323222-286020bc-9b85-4922-8246-f0e3f74604d4.png)

<img width="1439" alt="Screenshot 2023-04-30 at 2 04 45 AM" src="https://user-images.githubusercontent.com/62795688/235323341-1083d81c-6ecc-459f-aada-73a8403523d8.png">


![image](https://user-images.githubusercontent.com/62795688/235323248-78846307-d121-48dc-b264-ef3429b13f3c.png)

<img width="1439" alt="Screenshot 2023-04-30 at 2 09 09 AM" src="https://user-images.githubusercontent.com/62795688/235323320-7daefe1e-9b8d-4569-be75-652244fe396d.png">



## Features 🚀

- **Super Admin:** The super admin has the authority to add or delete new admins.

- **Bulk Upload:** Result Dapp allows for bulk upload of student records from an Excel file through drag and drop.

- **Cost-effective:** Result Dapp is extremely cost-effective as it uses Merkle root tree to store data in the blockchain. The actual data is stored off-chain in IPFS.

- **Auto Deploy Contract:** Result Dapp has an auto-deploy contract feature with Hardhat deployer.

## Technology Stack 💻

- TypeScript
- Tailwind
- tRPC
- NextJS
- Solidity
- IPFS (self-hosted via Docker)

## Prerequisites 🔑

Before getting started with Result Dapp, you need to have the following:

- **BscScan Testnet API Key:** You can obtain a BscScan Testnet API Key by creating an account on [BscScan](https://testnet.bscscan.com/), and then generating an API Key from the API Dashboard.

- **Docker:** You need Docker installed to run a self-hosted IPFS node for file storage.

- **Wallet Private Key:** You will also need a Wallet Private Key to deploy the contracts and interact with the blockchain. Make sure to keep your Wallet Private Key secure and never share it with anyone.

- **SMTP Settings:** You will need to contact your email service provider or check their documentation to obtain the SMTP settings required to send emails. These settings will typically include the SMTP server address, port number, and authentication credentials.
You can obtain a test account at [ethereal.email](https://ethereal.email/),  by visiting their website and clicking on the "Create Account" button. This will give you access to a temporary email account that you can use to test your email functionality.

## Getting Started 🚀

To get started with Result Dapp, follow these steps:

1. **Clone the repository**.
2. **To configure your environment variables, you need to:**
<br>
Rename the file named `.env.development.sample` to `.env.development` and the file named `.env.local.sample` to `.env.local`
<br>
Replace the placeholder keys in these files with the keys obtained during the prerequisites step.

3. **Set up IPFS with Docker**.
```bash
# Run the IPFS setup script
chmod +x setup-ipfs.sh
./setup-ipfs.sh
```

4. **Set up smart contract**.
```bash
cd contracts/
npm install
npm run build-contracts
npm run generate-contract-ts
npm run deploy-testnet
```

5. Run the application.
```bash
cd client/
npm install
npm run dev
```

## Available Commands 🛠️

- `generate-contract-ts`: Generates TypeScript contract bindings from Solidity contracts.
- `build-contracts`: Builds the contracts using Waffle.
- `deploy-testnet`: Deploys the contracts to the testnet using Hardhat.
- `deploy-mainnet`: Deploys the contracts to the mainnet using Hardhat.
- `setup-ipfs.sh`: Sets up a self-hosted IPFS node with Docker.


## License 🔑

Result Dapp is released under the MIT License. See `LICENSE` for more information.
