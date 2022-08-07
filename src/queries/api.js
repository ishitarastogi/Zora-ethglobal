import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import {
  SaleSortKey,
  SortDirection,
} from "@zoralabs/zdk/dist/queries/queries-sdk";

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
};

const zdk = new ZDK(args);

// Query for an NFT collection by its contract address and return some metadata
export const getCollection = async (collectionAddress) => {
  const { name, symbol, totalSupply, description } = await zdk.collection({
    address: collectionAddress,
  });

  return {
    name,
    symbol,
    totalSupply,
    description,
  };
};

// Query for mint data for a given NFT
export const getMintData = async (collectionAddress, tokenId) => {
  const { mints } = await zdk.mints({
    where: {
      tokens: [
        {
          address: collectionAddress,
          tokenId,
        },
      ],
    },
    includeFullDetails: true,
  });
  return {
    mints,
  };
};

// Query for sales data for a given NFT data
export const getSalesData = async (collectionAddress, tokenId) => {
  const { sales } = await zdk.sales({
    where: {
      tokens: [
        {
          address: collectionAddress,
          tokenId,
        },
      ],
    },
    sort: {
      sortKey: SaleSortKey.Time,
      sortDirection: SortDirection.Desc,
    },
    filter: {},
    includeFullDetails: true,
  });

  return {
    sales,
  };
};

export const aggDta = async (address) => {
  const { floorPrice, nftCount, ownerCount, chainTokenPrice } =
    await zdk.collectionStatsAggregate({
      collectionAddress: address,
    });

  return {
    floorPrice,
    nftCount,
  };
};

// Query for miscellaneous data for a given NFT
export const getNftData = async (collectionAddress, tokenId) => {
  const { token } = await zdk.token({
    token: {
      address: collectionAddress,
      tokenId,
    },
  });

  return {
    token,
  };
};
