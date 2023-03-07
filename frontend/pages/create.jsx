import { useSigner } from 'wagmi';
import { useState, useEffect } from 'react';
import { contract_ABI, contract_address } from '@/constant';
import { ethers } from 'ethers';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
  const { data: signer } = useSigner();
  const [formInput, updateFormInput] = useState({ name: '', image: '', amount: '' });
  const [loading, setLoading] = useState(false);

  const createOrganization = async () => {
    try {
      setLoading(true);
      const contract = new ethers.Contract(contract_address, contract_ABI, signer);
      const tx = await contract.createOrganization(
        formInput.name,
        ethers.utils.parseEther(formInput.amount),
        formInput.image
      );
      console.log(tx);
      toast('Organization Created successfully');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast('Organization Creation failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <p className="justify-center text-center text-pink-500 text-5xl pt-6">Create Organization</p>
        <input
          placeholder="Organization Name"
          className="mt-8 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <input
          placeholder="Image"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, image: e.target.value })}
        />
        <input
          placeholder="Target Amount"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, amount: e.target.value })}
        />

        {!loading && (
          <button onClick={createOrganization} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
            Create Organization
          </button>
        )}

        {loading && (
          <div className="mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
            <Spinner />{' '}
          </div>
        )}
      </div>
    </div>
  );
}
