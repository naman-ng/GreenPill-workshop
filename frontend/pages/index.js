import { useProvider } from 'wagmi';
import { useState, useEffect } from 'react';
import { contract_ABI, contract_address } from '@/constant';
import { ethers } from 'ethers';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

export default function Home() {
  const provider = useProvider();
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrganizations = async () => {
    try {
      setLoading(true);
      const contract = new ethers.Contract(contract_address, contract_ABI, provider);
      const tx = await contract.getOrganizations();
      console.log("Tx-", tx);
      setOrgs(tx);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <>
      <div>
        <p className="text-pink-500 text-center text-3xl p-4 mt-4">All Organizations</p>
        <section>
          <div className="w-full flex flex-wrap items-center">
            {loading && <Spinner />}
            {!loading &&
              orgs.map((org, index) => (
                <Link
                  key={index}
                  href={'/' + org.id}
                  className="w-72 flex flex-col border-2 border-grey-100 rounded-md shadow-md cursor-pointer mx-4 my-8"
                >
                  <div className="w-full h-60">
                    <img className="w-full h-full object-cover" width={200} height={200} src={org.image} alt="org" />
                  </div>
                  <h2 className="py-4 text-center text-white text-xl font-bold">{org.name}</h2>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
