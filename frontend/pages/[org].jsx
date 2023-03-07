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
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [amountCollected, setAmountCollected] = useState(0);
  const [target, setTarget] = useState(0);
  const [orgId, setOrgId] = useState();

  const donationContract = new ethers.Contract(donation_address, donation_ABI, signer || provider);

  async function getOrgById() {
    setLoading(true);
    const id = ethers.BigNumber.from(Number(orgId));
    try {
      const tx = await donationContract.organizations(id);
      console.log(tx);
      setOrg(tx);
      setAmountCollected(ethers.utils.formatEther(tx.amountCollected));
      setTarget(ethers.utils.formatEther(tx.target));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function donate() {
    const id = ethers.BigNumber.from(Number(orgId));
    try {
      setLoading(true);
      const tx = await donationContract.donateToOrganization(id, { value: ethers.utils.parseUnits(amount, 18) });
      console.log(tx);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setOrgId(orgSlug);
    if (orgId) {
      getOrgById();
    }
  }, [orgSlug])
  
  useEffect(() => {
    console.log(orgSlug);
    // getOrgById();
  }, []);

  return (
    <section>
      <div className="w-full max-w-screen-lg  my-24 mx-auto px-8 border-2 rounded-md bg-white shadow-md">
        <div className="w-full flex justify-between items-center py-2">
          <div className="w-[25%] ">
            <img className="w-full h-full object-cover" src={org.image} alt="dao" />
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
              <div className="mt-4 bg-pink-500 rounded px-4 py-2 shadow-lg">
                <Spinner />{' '}
              </div>
            ) : (
              <button onClick={donate} className="font-bold bg-pink-500 text-white rounded px-4 py-2 shadow-lg">
                Donate
              </button>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
