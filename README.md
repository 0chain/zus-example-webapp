# Züs Example Webapp

Welcome to the Züs Example Webapp! This web application demonstrates the usage of the [zus-js-sdk](https://www.npmjs.com/package/@zerochain/zus-sdk) to interact with the 0chain blockchain. Follow the steps below to run the webapp.

## Getting Started

#### Installation

To install the dependencies, run the following command:

```bash
npm install
# or
yarn
```

#### Running the Development Server

Start the development server using the following command:

```bash
npm run dev
# or
yarn dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Supported Features

This webapp covers demo for two product lines of Zus i.e. bolt and vult.

#### Bolt

Bolt is a cryptocurrency wallet for exchanging ZCN ERC-20 and Ethereum tokens. It also supports token staking, allowing users to earn rewards.

#### Vult

Vult is a decentralized anonymous file-sharing platform. Users can upload files and securely share them with others.

Both Bolt and Vult rely on the [zus-js-sdk](https://www.npmjs.com/package/@zerochain/zus-sdk) to interact with the 0chain blockchain.

### Creating a Webapp using Zus JS SDK

Follow the step-by-step guide below to create a webapp using the Zus JS SDK:

1. Set up a webapp using [Next.js](https://nextjs.org/) or any other framework of your choice.
2. Install the Zus JS SDK by running either of the following commands:

- `npm install @zerochain/zus-sdk`
- `yarn add @zerochain/zus-sdk`

3. Import the following scripts in your `pages/_document.js` file:

```js
  <script defer src="https://cdn.jsdelivr.net/gh/herumi/bls-wasm@v1.0.0/browser/bls.js" ></script>
  <script defer src="https://cdn.jsdelivr.net/gh/golang/go@go1.18.5/misc/wasm/wasm_exec.js" ></script>
```

4. Initialize the Zus JS SDK by following the [zus-js-sdk documentation:](https://github.com/0chain/zus-js-sdk#get-started)

```js
import { init } from '@zerochain/zus-sdk'

const config = {
  // configuration options
}

await init(config)
```

5. Utilize the Zus JS SDK's methods to interact with the 0chain blockchain. Refer to the [zus-js-sdk documentation](https://docs.zus.network/guides/zus-js-sdk/get-started) for detailed information.

#### Common Terms

Here are some common terms used in our code and the 0chain blockchain:

- **Blobber**: A blobber is a storage provider that stores files on behalf of users. Blobbers are paid in ZCN tokens for storing and serving files.
- **Allocation**: An allocation is a group of blobbers used to store files. It defines storage and payment parameters and is paid in ZCN tokens.
- **Miners**: Miners are the nodes that run the 0chain blockchain and are rewarded in ZCN tokens.
- **Sharders**: Sharders are the nodes that run the 0chain blockchain and are rewarded in ZCN tokens.
- **Wallet**: A wallet is a collection of keys used to sign transactions. It is used for blobbers, miners, sharders, and users.
- **ZCN**: ZCN is the token used to pay miners, sharders, blobbers, and users.
- **ERC20**: ERC20 is the token format used by ZCN and Ethereum.
- **Public Key**: A public key is used to verify a signature and transactions.
- **Private Key**: A private key is used to sign transactions.
- **Signature**: A signature verifies that a transaction was signed by a private key.
- **Mnemonics**: Mnemonics are a set of words used to generate a wallet for a user.

### Hackathon Discord Link

Join our Hackathon Discord community for support and discussions:

https://discord.gg/7JSzwpcK55
