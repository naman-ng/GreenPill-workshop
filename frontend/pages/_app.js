import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import Navabar from '@/components/Navbar';

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
          <Navabar />
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
