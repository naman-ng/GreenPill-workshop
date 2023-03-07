import { useAccount, useSigner, useProvider, useContractRead } from "wagmi";

export default function Dashboard() {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  

  return (
    <div>
      <p className="text-pink-500 text-5xl">Dashboard</p>
    </div>
  );
}
