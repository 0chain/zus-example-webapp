# Züs Example Webapp

Welcome to the Züs Example Webapp! This web application demonstrates the usage of the [zus-js-sdk](https://www.npmjs.com/package/@zerochain/zus-sdk) to interact with the 0chain blockchain. 

- [Züs Example Webapp]()
  - [Züs Overview](#züs-overview)
  - [Getting Started](#getting-started)
  - [Hackathon Discord Link](#hackathon-discord-link)


### Preview

<div align="center">
  
  https://www.loom.com/share/423667e8aa444ca6b0c8183a5eceb20f
  
</div>

## Züs Overview

[Züs](https://zus.network/) is a high-performance cloud on a fast blockchain offering privacy and configurable uptime. It is an alternative to traditional cloud S3 and has shown better performance on a test network due to its parallel data architecture. The technology uses erasure code to distribute the data between data and parity servers. Züs storage is configurable to provide flexibility for IT managers to design for desired security and uptime, and can design a hybrid or a multi-cloud architecture with a few clicks using [Blimp's](https://blimp.software/) workflow, and can change redundancy and providers on the fly.

For instance, the user can start with 10 data and 5 parity providers and select where they are located globally, and later decide to add a provider on-the-fly to increase resilience, performance, or switch to a lower cost provider.

Users can also add their own servers to the network to operate in a hybrid cloud architecture. Such flexibility allows the user to improve their regulatory, content distribution, and security requirements with a true multi-cloud architecture. Users can also construct a private cloud with all of their own servers rented across the globe to have a better content distribution, highly available network, higher performance, and lower cost.

[The QoS protocol](https://medium.com/0chain/qos-protocol-weekly-debrief-april-12-2023-44524924381f) is time-based where the blockchain challenges a provider on a file that the provider must respond within a certain time based on its size to pass. This forces the provider to have a good server and data center performance to earn rewards and income.

The [privacy protocol](https://zus.network/build) from Züs is unique where a user can easily share their encrypted data with their business partners, friends, and family through a proxy key sharing protocol, where the key is given to the providers, and they re-encrypt the data using the proxy key so that only the recipient can decrypt it with their private key.

Züs has ecosystem apps to encourage traditional storage consumption such as [Blimp](https://blimp.software/), a S3 server and cloud migration platform, and [Vult](https://vult.network/), a personal cloud app to store encrypted data and share privately with friends and family, and [Chalk](https://chalk.software/), a zero upfront cost permanent storage solution for NFT artists.

Other apps are [Bolt](https://bolt.holdings/), a wallet that is very secure with air-gapped 2FA split-key protocol to prevent hacks from compromising your digital assets, and it enables you to stake and earn from the storage providers; [Atlus](https://atlus.cloud/), a blockchain explorer and [Chimney](https://demo.chimney.software/), which allows anyone to join the network and earn using their server or by just renting one, with no prior knowledge required.

## Getting Started

Follow the steps below to run the webapp.

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
  <script defer src="https://cdn.jsdelivr.net/gh/golang/go@go1.20.4/misc/wasm/wasm_exec.js" ></script>
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
