import { useRouter } from 'next/router';
import { useSigner, useProvider, useAccount, useContract, useContractWrite, useContractRead } from 'wagmi';
import { useState, useEffect } from 'react';
import { donation_address, donation_ABI } from '@/constant';
import { ethers } from 'ethers';
import Spinner from '@/components/Spinner';

export default function Org() {
  const router = useRouter();
  const { org: orgSlug } = router.query;
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [org, setOrg] = useState({});
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const donationContract = new ethers.Contract(donation_address, donation_ABI, signer || provider);

  async function getOrgById(orgId) {
    setLoading(true);
    const id = ethers.BigNumber.from(Number(orgId));
    try {
      const tx = await donationContract.organizations(id);
      console.log(tx);
      setOrg(tx);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(orgSlug);
    console.log(typeof orgSlug);
    getOrgById(1);
  }, []);

  return (
    <section>
      {loading && <Spinner />}
      {!loading && <div className="w-full max-w-screen-lg  my-24 mx-auto px-8 border-2 rounded-md bg-white shadow-md">
        <div className="w-full flex justify-between items-center py-2">
          <div className="w-[25%] ">
            <img className="w-full h-full object-cover" src={org.image} alt="dao" />
          </div>
          <div className="w-[70%]">
            <h1 className="text-xl font-bold">{org.name}</h1>
            <h2 className="py-1  text-xl">
              Amount Collected - {parseFloat(ethers.utils.formatEther(org.amountCollected)).toFixed(2)}
            </h2>
            <h2 className="py-1  text-xl">
              Target Amount - {parseFloat(ethers.utils.formatEther(org.target)).toFixed(2)}
            </h2>

            <div className="w-3/4 flex p-1">
              <label className="text-xl">Enter amount</label>
              <input
                className="px-2 rounded-lg border-2 p-1"
                type="text"
                placeholder="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {!loading && (
              <div className="flex flex-row w-full mt-3 pr-2 justify-center">
                <button onClick={null} className="btn mt-2 w-1/2">
                  Donate
                </button>
              </div>
            )}
            {loading && <Spinner />}
          </div>
        </div>
      </div>}
    </section>
  );
}
