
# BlockBuster
**Supply Chain Application for authentic artworks & premium collectibles.**

The application **ArtBlock** is a unique web platform, designed for selling and buying authentic artworks from artists and premium collectibles in physical form from creators around the globe. The platform is built on web3 rails, leveraging blockchain technology and its tools to enforce anonymity, credentials verification, and authenticity.

## Badges



![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Web3.js](https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
## Acknowledgements

 - [Solidity 0.8](https://www.youtube.com/watch?v=xv9OmztShIw&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p)

 - [Thirdweb](https://thirdweb.com/)

 




## Installation

Installation and running of this project to the local machine may vary the dependencies. You may follow the Installation process :

1. Copy the URL for the repository. To clone the repository using HTTPS, under "HTTPS", click. To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click.To clone a repository using GitHub CLI, click GitHub CLI, then click .


2. Open Git Bash. 
3. Change the current working directory to the location where you want the cloned directory.
4. Clone the repository to your local machine using the following command:

```bash
  git clone https://github.com/your-username/your-project.git

```
5. Press Enter to create your local clone.

6. Go to the project directory

```bash
  cd project-Name

```
7. Install dependencies

```bash
  npm install

```



## Run Locally

 Start the Server
```bash
  npm run dev

```
This will start the development server and it will be accessible at http://localhost:port.
Port may vary from machine to machine.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PRIVATE_KEY`

The `PRIVATE_KEY` comes from the MetaMask wallet in this project.
## Deployment

To deploy this project run

```bash
  npm run deploy
```


## API Reference

#### Retrieve MetaMask Wallet Address

```http
  GET /wallet/address
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. MetaMask address under account name  |

#### MetaMask Address Authentication

```http
  GET /wallet/address?api_key=YOUR_API_KEY
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. Your API key for authentication |

#### Ethereum API

```http
  GET window.ethereum.request
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. Return a boolean result |


```http
  GET eth_gasPrice
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. Ethereum API Gas price |

```http
  GET eth_gasPrice
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**.Ethereum API Gas price |

```http
  GET eth_sendTransaction
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**.Ethereum API Gas price |


## Features

- Anonymity for Buyers: Buyers can remain anonymous while purchasing items on the web platform. This feature allows buyers to maintain privacy and confidentiality.
- Suppliers Registration: Artists and creators are required to register themselves on the platform. This registration process enables the platform to verify the authenticity and credibility of the suppliers.
- Verify Authenticity: Buyers can verify the authenticity.
- Request for order anonymously.
- View Order Status: Buyers can view the delivery/supply status of their orders.
 And other features based on the supplier and buyer and verifier.


## Tech Stack

**Client:** React, TailwindCSS

**Smart contract** : Solidity

**Server:** ThreeWeb


## Tools
**IDE** : Visual Studio Code, Remix

**Wallet** :  Metamask

**Environment** : Hardhat
## Screenshots
Home page


![image](https://github.com/MostlyTanvir/BlockBuster_Hackathon/assets/98779204/68755baa-ad72-421c-b751-157976b5f953)

Sign In with Metamask wallet

![image](https://github.com/MostlyTanvir/BlockBuster_Hackathon/assets/98779204/9ad630a3-7438-472f-a9a7-904d74567804)


Add New ArtWork By Supplier

![image](https://github.com/MostlyTanvir/BlockBuster_Hackathon/assets/98779204/786058fe-5a4c-4163-93b5-d05d6193397a)


Filter ArtWork By Condition

![image](https://github.com/MostlyTanvir/BlockBuster_Hackathon/assets/98779204/d86fab10-1423-4b5c-9151-e4360d2f1da3)








## Optimizations

Gas optimization has been used for the smart contract.


## Authors

- [Tanvir Ahmed Khan](https://github.com/mostlyTanvir/)

- [Shahidul Alam](https://github.com/shz-code)

- [Rakibul Hasan Dihan](https://github.com/dihanrh)
