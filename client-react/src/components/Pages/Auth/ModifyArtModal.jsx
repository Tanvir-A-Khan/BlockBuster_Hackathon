import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/web3";

export default function ModifyArtModal() {
  const { id } = useParams();
  console.log(id);
  const [formState, setFormState] = useState({
    quantity: 0,
  });

  const { updateArtworkQuantity, updateArtworkQuantityLoading } =
    useStateContext();

  const handleSubmit = async () => {
    await updateArtworkQuantity({
      args: [id, Number(formState.quantity)],
    });
  };
  return (
    <form
      className="flex justify-center items-center text-black"
      onSubmit={handleSubmit}
    >
      <div className="max-w-[800px] mx-auto grid gap-2  w-full">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-white">Modify Art </h1>
        </div>
        <div className="input-group">
          <label htmlFor="quantity" className="text-slate-400 font-bold">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="p-2 rounded w-full mt-1"
            required
            value={formState.fee}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, fee: e.target.value }))
            }
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-slate-300 text-black text-center font-bold p-2 rounded-md hover:bg-slate-500 disabled:opacity-50"
          disabled={updateArtworkQuantityLoading}
        >
          Update
        </button>
      </div>
    </form>
  );
}
