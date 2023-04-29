declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ENV: string;
      NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_RPC_MAINNET_URL: string;
      NEXT_PUBLIC_RPC_TESTNET_URL: string;
      NEXT_PUBLIC_INFURA_SECRET_KEY: string;
      NEXT_PUBLIC_INFURA_ID: string;
    }
  }
}

export {};
