import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/style.css";

import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AuthContextProvider } from "./contexts/authContext";
import { StateContextProvider } from "./contexts/web3";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Sepolia}>
      <AuthContextProvider>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </AuthContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
