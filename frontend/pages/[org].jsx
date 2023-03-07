import { useRouter } from 'next/router';
import { useSigner, useProvider, useAccount} from 'wagmi';
import { useState, useEffect } from 'react';
import { contract_address, contract_ABI } from '@/constant';
import { ethers } from 'ethers';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Org() {
  const router = useRouter();
  const { org: orgSlug } = router.query;

  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [org, setOrg] = useState({});
  const [amount, setAmount] = useState(0);
  const [amountCollected, setAmountCollected] = useState(0);
  const [target, setTarget] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const donationContract = new ethers.Contract(contract_address, contract_ABI, signer || provider);

  async function getOrgById(orgId) {
    setFetching(true);
    try {
      const tx = await donationContract.organizations(orgId);
      console.log('Tx-', tx);
      setOrg(tx);
      setAmountCollected(ethers.utils.formatEther(tx.amountCollected));
      setTarget(ethers.utils.formatEther(tx.target));
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  }

  async function donate(orgId) {
    try {
      setLoading(true);
      const tx = await donationContract.donateToOrganization(orgId, { value: ethers.utils.parseUnits(amount, 18) });
      console.log(tx);
      toast('Donation successful');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast('Donation failed');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (orgSlug !== undefined) {
      getOrgById(Number(orgSlug));
    }
  }, [orgSlug]);

  return (
    <section>
      {fetching && (
        <div className="mt-24">
          <Spinner />
        </div>
      )}
      {!fetching && (
        <div className="w-full max-w-screen-lg  my-24 mx-auto px-8 border-2 rounded-md bg-white shadow-md">
          <div className="w-full flex justify-between items-center py-2">
            <div className="w-[25%] ">
              <img className="w-full h-full object-cover" src={org.image} alt="org" />
            </div>
            <div className="w-[70%]">
              <h1 className="text-xl font-bold">{org.name}</h1>
              <h2 className="py-1  text-xl">Amount Collected - {amountCollected}</h2>
              <h2 className="py-1  text-xl">Target Amount - {target}</h2>

              <div className="w-3/4 flex py-4 space-x-2">
                <label className="text-xl">Enter amount - </label>
                <input
                  className="px-2 rounded-lg border-2 p-1"
                  type="text"
                  placeholder="0.01 Matic"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {loading ? (
                <div className='w-24 bg-pink-500 rounded shadow-lg'> 
                  <Spinner />
                </div>
              ) : (
                <button onClick={async () => await donate(orgSlug)} className="font-bold bg-pink-500 text-white rounded px-4 py-2 shadow-lg">
                  Donate
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
