import { ethers } from 'ethers';
import { RPC_URL } from './config';
import { CONTRACT_ADDRESSES } from './addresses/AddressFarmTraceability';
import { FARM_TRACEABILITY_ABI } from './abi';

const provider = new ethers.JsonRpcProvider(RPC_URL);

const farmContract = new ethers.Contract(
  CONTRACT_ADDRESSES.FARM_TRACEABILITY,
  FARM_TRACEABILITY_ABI,
  provider,
);

// đọc dữ liệu
export const getFarm = async farmId => {
  try {
    const data = await farmContract.getFarm(farmId);
    return {
      id: Number(data[0]),
      name: data[1],
      location: data[2],
      owner: data[3],
    };
  } catch (error) {
    console.log('Lỗi khi đọc farm:', error);
    throw error;
  }
};

// ghi dữ liệu
export const createFarm = async (name, location, privateKey) => {
  try {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = farmContract.connect(wallet);
    const tx = await contractWithSigner.createFarm(name, location);
    await tx.wait();
    console.log('Tạo farm thành công!');
  } catch (error) {
    console.log('Lỗi khi tạo farm:', error);
    throw error;
  }
};
