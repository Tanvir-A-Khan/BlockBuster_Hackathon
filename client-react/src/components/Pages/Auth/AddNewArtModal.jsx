import { ArrowLeftCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useStateContext } from "../../../contexts/web3";

// eslint-disable-next-line react/prop-types
export default function AddNewArtModal({ setShow }) {
  const { addArtwork, addArtworkLoading } = useStateContext();
  const [formState, setFormState] = useState({
    title: "",
    desc: "",
    image: "",
    fee: 0,
    quantity: 0,
    authSig: "",
    isLimited: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addArtwork({
        args: [
          formState.desc,
          formState.title,
          formState.image,
          parseInt(formState.fee),
          formState.authSig,
          parseInt(formState.quantity),
          formState.isLimited,
        ],
      });
      toast.success("Successfully added.");
    } catch (err) {
      toast.error(err);
    }
    // console.log(Number(formState.fee));
    setShow(false);
    // location.reload();
  };
  return (
    <form
      className="h-screen fixed w-screen top-0 left-0 bg-slate-800 flex justify-center items-center text-black"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="max-w-[800px] mx-auto grid gap-2  w-full">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-white">Add new Art </h1>
          <span className="cursor-pointer" onClick={() => setShow(false)}>
            <ArrowLeftCircle size={40} color="white" />
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="title" className="text-slate-400 font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="p-2 rounded w-full mt-1"
            required
            value={formState.title}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="desc" className="text-slate-400 font-bold">
            Description
          </label>
          <textarea
            type="text"
            name="desc"
            id="desc"
            className="p-2 rounded w-full mt-1"
            rows={5}
            required
            value={formState.desc}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, desc: e.target.value }))
            }
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="img" className="text-slate-400 font-bold">
            Image
          </label>
          <input
            type="text"
            name="img"
            id="img"
            className="p-2 rounded w-full mt-1"
            required
            value={formState.image}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="fee" className="text-slate-400 font-bold">
            Fee
          </label>
          <input
            type="text"
            name="fee"
            id="fee"
            className="p-2 rounded w-full mt-1"
            required
            value={formState.fee}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, fee: e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="quantity" className="text-slate-400 font-bold">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            className="p-2 rounded w-full mt-1"
            required
            value={formState.quantity}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, quantity: e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="sig" className="text-slate-400 font-bold">
            Author Signature
          </label>
          <input
            type="text"
            name="sig"
            id="sig"
            className="p-2 rounded w-full mt-1"
            required
            value={formState.authSig}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, authSig: e.target.value }))
            }
          />
        </div>
        <div className="input-group flex items-center">
          <label htmlFor="limited" className="text-slate-400 font-bold">
            <input
              type="checkbox"
              name="limited"
              id="limited"
              className="p-2 rounded mt-1 me-2"
              value={formState.isLimited}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, isLimited: e.target.value }))
              }
            />
            Is Limited?
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 bg-slate-300 text-black text-center font-bold p-2 rounded-md disabled:opacity-50"
          disabled={addArtworkLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
