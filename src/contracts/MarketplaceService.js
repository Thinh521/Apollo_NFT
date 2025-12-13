import {ethers} from 'ethers';
import {parseBlockchainError} from '../utils/errors/blockchainErrors';
import {BaseContractService} from './BaseContractService';
import {MARKETPLACE_ABI} from './abi';
import {CONTRACT_ADDRESSES} from './addresses/AddressApolloNFT';

class MarketplaceServiceClass extends BaseContractService {
  constructor() {
    super(MARKETPLACE_ABI, CONTRACT_ADDRESSES.MARKETPLACE_ADDRESS);
  }

  /**
   * Sell NFT
   */
  async listNFT({walletProvider, nftAddress, tokenId, price}) {
    const signer = await this._getSigner(walletProvider);
    const contract = this._connect(walletProvider, signer);

    try {
      const priceInWei = ethers.parseEther(price.toString());

      return await this.sendTx(
        contract.listItem,
        nftAddress,
        tokenId,
        priceInWei,
      );
    } catch (err) {
      throw new Error(parseBlockchainError(err));
    }
  }
}

export const MarketplaceService = new MarketplaceServiceClass();
