import { useAccount, useSigner, useProvider, useContractRead } from 'wagmi';
import { useState, useEffect } from 'react';
import { donation_ABI, donation_address } from '@/constant';
import { ethers } from 'ethers';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

export default function Home() {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const getOrganizations = async () => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(donation_address, donation_ABI, provider);
      const tx = await contract.getOrganizations();
      console.log(tx);
      setOrgs(tx);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const donateToOrg = async (orgId) => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(donation_address, donation_ABI, signer);
      // const tx = await contract.donateToOrganization(orgId, {ethers.utils.parseUnits(form.target, 18)});
      // console.log(tx);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  async function donate(orgId) {
    try {
      setLoading(true);
      const contract = new ethers.Contract(donation_address, donation_ABI, signer);
      const tx = await contract.donateToOrganization(orgId, { value: ethers.utils.parseUnits(amount, 18) });
      console.log(tx);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <>
      <div>
        <p className="text-pink-500 text-5xl">Home</p>
        <section>
          <div className="w-full flex flex-wrap items-center">
            {orgs &&
              orgs.map((org, index) => (
                <Link
                  key={index}
                  href={'/' + org.id}
                  className="w-72 flex flex-col border-2 border-grey-100 rounded-md shadow-md cursor-pointer mx-4 my-8"
                >
                  <div className="w-full h-48">
                    <img className="w-full h-full object-cover" width={200} height={200} src={org.image} alt="org" />
                  </div>
                  <h2 className="py-4 text-center text-white text-xl font-bold">{org.name}</h2>
                  <h2 className="py-1 text-center text-white text-xl font-medium">
                    Amount Collected - {parseFloat(ethers.utils.formatEther(org.amountCollected)).toFixed(2)}
                  </h2>
                  <h2 className="py-1 text-center text-white text-xl font-medium">
                    Target Amount - {parseFloat(ethers.utils.formatEther(org.target)).toFixed(2)}
                  </h2>
                  <div className="flex p-1 border-y-2">
                    <label className="text-white">Enter amount</label>
                    <input
                      className="rounded-md"
                      type="text"
                      placeholder="0.01"
                      // value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {/* {!loading && (
                      <div className="w-full">
                        <button onClick={donateToOrg(org.id)} className="">
                          Deposit
                        </button>
                      </div>
                    )}
                    {loading && <Spinner />} */}
                    {/* <button onClick={donate(org.id)} className="text-white">Donate</button> */}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
