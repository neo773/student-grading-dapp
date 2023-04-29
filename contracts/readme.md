## AltDex Smart Contracts

To build the contracts 


```
pnpm build-contracts
```


Run this after initial build or when you modify the contracts to generate TypeScript Types for the contracts


```
pnpm generate-contract-ts
```

Directory Overview
````
📦 contracts
 ┣ 📂 abi -- (Auto Generated ABIs)
 ┃ ┣ 📜 axToken.json
 ┃ ┣ 📜 clearingHouse.json
 ┃ ┣ 📜 dexUtils.json
 ┣ 📂 contract-types -- (Auto Generated TypeScript Types for ABIs)
 ┃ ┣ 📂 ethers
 ┃ ┃ ┣ 📜 clearingHouse.ts
 ┃ ┗ 📂 web3
 ┃ ┃ ┣ 📜 clearingHouse.ts
 ┣ 📂 scripts -- (Utility Scripts)
 ┃ ┗ 📜 generate-contract-ts.sh -- (Generates TypeScript Types)
 ┣ 📂 solidity -- (Main solidity files)
 ┃ ┣ 📜 axToken.sol
 ┃ ┣ 📜 clearingHouse.sol
 ┣ 📂 tests -- (Contracts test)
 ┃ ┗ 📜 main.test.ts
 ┣ 📂 utils -- (Utilities)
 ┃ ┣ 📜 deploy.ts -- (Deploys to network)
 ┃ ┗ 📜 verify.ts -- (Verifies the source code)
 ┣ 📜 .mocharc.json
 ┣ 📜 hardhat.config.ts
 ┣ 📜 helper-hardhat-config.ts
 ┣ 📜 mocha.opts
 ┣ 📜 tsconfig.json
 ┗ 📜 waffle.json
 ````