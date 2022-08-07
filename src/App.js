import { useEffect, useState } from "react";
import {
  getCollection,
  getMintData,
  getNftData,
  getSalesData,
} from "./queries/api";

function App() {
  const [collectionAddress, setCollectionAddress] = useState(
    "0xc729Ce9bF1030fbb639849a96fA8BBD013680B64"
  );
  const [tokenId, setTokenId] = useState("246");
  const [collectionData, setCollectionData] = useState({});
  const [salesData, setSalesData] = useState({});
  const [mintData, setMintData] = useState({});
  const [nftData, setNftData] = useState({});

  useEffect(() => {
    (async () => {
      const collectionData = await getCollection(collectionAddress);
      const mintData = await getMintData(collectionAddress, tokenId);
      const salesData = await getSalesData(collectionAddress, tokenId);
      const nftData = await getNftData(collectionAddress, tokenId);

      console.log({ collectionData });
      console.log({ mintData });
      console.log({ salesData });
      console.log({ nftData });

      setCollectionData(collectionData);
      setMintData(mintData);
      setSalesData(salesData);
      setNftData(nftData);
    })();
  }, [collectionAddress, tokenId]);

  return (
    <div>
      <h1>NFT historical data explorer 🐠</h1>
      <label htmlFor="collectionAddress">Collection:</label>
      <input
        id="collectionAddress"
        value={collectionAddress}
        onChange={(e) => setCollectionAddress(e.target.value)}
      />
      <br />
      <br />

      <label htmlFor="tokenId">Token ID:</label>
      <input
        id="tokenId"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
    </div>
  );
}

export default App;
