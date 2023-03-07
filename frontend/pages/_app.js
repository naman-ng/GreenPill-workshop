import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';


const { chains, provider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: 'KM1Kv-cqY7LlaPsoximQwOASxTzExuR5' }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Donation Dapp',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <ToastContainer />
        <div className="top-0 flex flex-col w-screen h-screen bg-black overflow-hidden">
          <nav className="border-b p-6 flex flex-col justify-between">
            <div className="flex flex-row justify-between">
              <div className="text-4xl font-bold text-white">Donation Dapp</div>
              <ConnectButton />
            </div>
            <div className="flex mt-4">
              <Link href="/">
                <p className="mr-4 text-pink-500">Home</p>
              </Link>
              <Link href="/create">
                <p className="mr-6 text-pink-500">Create</p>
              </Link>
              <Link href="/dashboard">
                <p className="mr-6 text-pink-500">Dashboard</p>
              </Link>
            </div>
          </nav>
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
