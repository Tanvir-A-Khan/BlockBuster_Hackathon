/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";

import { useContractWrite } from "@thirdweb-dev/react";
//import { ethers } from 'ethers';
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

const StateContext = createContext();
const sdk = ThirdwebSDK.fromPrivateKey(
  import.meta.env.VITE_PRIVATE_KEY,
  Sepolia
);

const contract = await sdk.getContract(
  "0xB8D5bE5ecB42309F0a34EC30557F3246AbD0714e"
);

// eslint-disable-next-line react/prop-types
export const StateContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const [arts, setArts] = useState([]);

  const { mutateAsync: registerSupplier, isLoading: registerSupplierLoading } =
    useContractWrite(contract, "registerSupplier");

  const { mutateAsync: registerVerifier, isLoading: registerVerifierLoading } =
    useContractWrite(contract, "registerVerifier");

  const { mutateAsync: suppliers, isLoading: suppliersLoading } =
    useContractWrite(contract, "suppliers");

  const { mutateAsync: verifiers, isLoading: verifiersLoading } =
    useContractWrite(contract, "verifiers");

  const { mutateAsync: addArtwork, isLoading: addArtworkLoading } =
    useContractWrite(contract, "addArtwork");

  const { mutateAsync: buyArtwork, isLoading: buyArtworkLoading } =
    useContractWrite(contract, "buyArtwork");

  const { mutateAsync: initDelivery, isLoading: initDeliveryLoading } =
    useContractWrite(contract, "initDelivery");

  const {
    mutateAsync: offerLimitedEditionArtwork,
    isLoading: offerLimitedEditionArtworkLoading,
  } = useContractWrite(contract, "offerLimitedEditionArtwork");

  const { mutateAsync: reqbuyArtwork, isLoading: reqbuyArtworkLoading } =
    useContractWrite(contract, "reqbuyArtwork");

  const {
    mutateAsync: updateArtworkQuantity,
    isLoading: updateArtworkQuantityLoading,
  } = useContractWrite(contract, "updateArtworkQuantity");

  const { mutateAsync: verifyArtwork, isLoading: verifyArtworkLoading } =
    useContractWrite(contract, "verifyArtwork");

  const { mutateAsync: artWorkCount, isLoading: artWorkCountLoading } =
    useContractWrite(contract, "artWorkCount");

  const { mutateAsync: artworks, isLoading: artworksLoading } =
    useContractWrite(contract, "artworks");

  const { mutateAsync: artWorkToOwner, isLoading: artWorkToOwnerLoading } =
    useContractWrite(contract, "artWorkToOwner");

  const { mutateAsync: buyersArtworks, isLoading: buyersArtworksLoading } =
    useContractWrite(contract, "buyersArtworks");

  const { mutateAsync: getBuyerArtworks, isLoading: getBuyerArtworksLoading } =
    useContractWrite(contract, "getBuyerArtworks");

  const { mutateAsync: getStatus, isLoading: getStatusLoading } =
    useContractWrite(contract, "getStatus");

  const {
    mutateAsync: getSupplierArtWorks,
    isLoading: getSupplierArtWorksLoading,
  } = useContractWrite(contract, "getSupplierArtWorks");

  const {
    mutateAsync: getVerifierArtWorks,
    isLoading: getVerifierArtWorksLoading,
  } = useContractWrite(contract, "getVerifierArtWorks");

  useEffect(() => {
    if (contract) getArts();
  }, []);

  const getArts = async () => {
    const data = await contract.call("getAllArtworks");

    const parsedArts = data.map((art, i) => ({
      id: i,
      title: art.title,
      desc: art.description,
      image: art.image,
      price: ethers.utils.formatEther(art.price.toString()),
      quantity: art.quantity.toNumber(),
      status: art.status.toNumber(),
      isLimited: art.isLimitedEdition,
      currentOwner: art.currentOwner,
      verified: art.verified,
    }));

    setArts(parsedArts);
  };

  return (
    <StateContext.Provider
      value={{
        contract,
        arts,
        registerSupplier,
        registerSupplierLoading,
        registerVerifier,
        registerVerifierLoading,
        suppliers,
        suppliersLoading,
        verifiers,
        verifiersLoading,
        addArtwork,
        addArtworkLoading,
        artworks,
        artworksLoading,
        getSupplierArtWorks,
        getSupplierArtWorksLoading,
        updateArtworkQuantity,
        updateArtworkQuantityLoading,
        getStatus,
        getStatusLoading,
        search,
        setSearch,
        verifyArtwork,
        verifyArtworkLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
