/* eslint-disable no-unused-vars */
import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext";
import { useStateContext } from "../../../contexts/web3";

export default function ArtItem() {
  const { id } = useParams();
  const [art, setArt] = useState({});

  const [deliStatus, setDeliStatus] = useState("");

  const { artworks, artWorksLoading } = useStateContext();
  const { getStatus, getStatusLoading } = useStateContext();

  const { user } = useAuthContext();
  const { verifyArtwork, verifyArtworkLoading } = useStateContext();

  useState(() => {
    const getArtWork = async () => {
      const art = await artworks({ args: [id] });
      if (art?.title) {
        setArt({
          id,
          title: art.title,
          desc: art.description,
          image: art.image,
          price: ethers.utils.formatEther(art.price.toString()),
          quantity: art.quantity.toNumber(),
          status: art.status.toNumber(),
          isLimited: art.isLimitedEdition,
          currentOwner: art.currentOwner,
          verified: art.verified,
        });
      }
    };
    getArtWork();
  }, []);

  const handleCheckDelivery = async () => {
    const res = await getStatus({ args: [id] });
    setDeliStatus(res);
  };

  const handleViewStatus = () => {
    if (art.verified == true) setDeliStatus("The picture is verified");
    else setDeliStatus("The Picture is not verified");
  };

  const handleVerify = async () => {
    try {
      await verifyArtwork({ args: [id] });
      toast.success("Verification Successful");
      location.reload();
    } catch (err) {
      toast.error("Verification Failed");
    }
  };

  return (
    <>
      <div className="my-4 py-3 flex gap-4">
        <div className="img-container-art-view rounded-md">
          <img src={art.image} alt="" className="rounded-md" />
        </div>
        <div className="details grid gap-2">
          {artWorksLoading && "Loading"}
          <h1 className="font-bold text-4xl">{art.title}</h1>
          <p className="w-3/4">{art.desc}</p>
          <p>
            Price <span>{art.price} eth</span>
          </p>
          <p>
            Category:{" "}
            <span>{art.isLimitedEdition ? "Limited" : "General"}</span>
          </p>
        </div>
      </div>
      <div>
        <p>{deliStatus && deliStatus}</p>
        <div className="button-container flex justify-center gap-4">
          <button
            className="text-black bg-slate-300 font-bold p-2 rounded-md hover:bg-slate-400"
            onClick={handleCheckDelivery}
          >
            Delivery Status
          </button>
          {user?.type == "verifier" && (
            <button
              className="text-black bg-cyan-300 font-bold p-2 rounded-md hover:bg-slate-400"
              onClick={handleVerify}
            >
              Verify this art out as an verifier
            </button>
          )}
          <button className="text-black bg-slate-300 font-bold p-2 rounded-md hover:bg-slate-400">
            Buy
          </button>
          <button
            className="text-black bg-slate-300 font-bold p-2 rounded-md hover:bg-slate-400"
            onClick={handleViewStatus}
          >
            Verify Art work
          </button>
        </div>
      </div>
    </>
  );
}
