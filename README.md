# Sol Forge

Sol Forge is a sleek and modern web application built for interacting with the Solana blockchain. It provides a user-friendly interface for common wallet operations on the devnet, making it an excellent tool for developers and enthusiasts to test and experiment with Solana.

## ✨ Features

- **Wallet Connectivity:** Seamlessly connect to your favorite Solana wallets using the Solana Wallet Adapter.
- **Balance Display:** View your current SOL balance in real-time.
- **Airdrop Requester:** Quickly request SOL from the devnet faucet to fund your test wallet.
- **Token Sender:** Easily send SOL to any other Solana wallet address.
- **Message Signing:** Sign custom messages with your wallet to verify ownership.
- **Modern UI:** A beautiful, responsive interface built with Tailwind CSS, featuring a dark, futuristic theme.
- **Notifications:** Get instant feedback on your actions with toast notifications.

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/) for notifications

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [Bun](https://bun.sh/) (optional, but recommended for faster installation)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/solana-forge.git
    cd solana-forge
    ```

2.  Install the dependencies:
    ```sh
    bun install
    ```
    or if you prefer npm:
    ```sh
    npm install
    ```

### Running the Application

Start the development server:

```sh
bun run dev
```
or
```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) in your browser to see the application.

## 💡 Usage

1.  **Connect Your Wallet:** Click the "Select Wallet" button to connect your Solana wallet (e.g., Phantom, Solflare). Ensure your wallet is set to the **Devnet**.
2.  **Request an Airdrop:** If you need funds for testing, use the "Request Airdrop" feature to get some devnet SOL.
3.  **Send Tokens:** Transfer SOL to another wallet by entering the recipient's address and the amount.
4.  **Sign a Message:** Verify your wallet's ownership by typing a message and signing it.

