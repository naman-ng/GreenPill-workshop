import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navabar() {
  return (
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
  );
}
