import { useCallback, useEffect, useState } from "react";
// import { useStateContext } from "../../../contexts/web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext";
import { useStateContext } from "../../../contexts/web3";

export default function Signup() {
  const [val, setVal] = useState("");
  const [seller, setSeller] = useState(true);
  const [verifier, setVerifier] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialState = { accounts: [] };
  const [, setWallet] = useState(initialState);

  const navigate = useNavigate();

  const {
    registerSupplier,
    registerSupplierLoading,
    registerVerifier,
    registerVerifierLoading,
  } = useStateContext();

  const { setUser } = useAuthContext();

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider();
      setHasProvider(Boolean(provider));
    };

    getProvider();
  }, []);

  const updateWallet = async (accounts) => {
    setVal(accounts[0]);
    setWallet({ accounts });
    setLoading(false);
  };

  const handleConnect = useCallback(async () => {
    setLoading(true);
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  }, []);

  useEffect(() => {
    if (hasProvider) handleConnect();
  }, [handleConnect, hasProvider]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (seller == true) {
        await registerSupplier({
          args: [val],
        });
        setUser({ wallet: val, type: "supplier" });
        localStorage.setItem("type", "supplier");
      } else if (seller == false) {
        await registerVerifier({
          args: [val],
        });
        setUser({ wallet: val, type: "verifier" });
        localStorage.setItem("type", "verifier");
      }
      navigate("/");
      localStorage.setItem("user", val);
      toast.success("Registration Successful");
    } catch (error) {
      toast.error("You are already registered");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center my-4">Sign Up</h1>
      <form
        className="flex flex-col gap-2 w-full my-4 py-2 text-black"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="wallAdd" className="text-center font-bold text-white">
          Wallet Address
        </label>
        <div className="flex max-w-[800px] w-full mx-auto">
          <input
            type="text"
            id="wallAdd"
            placeholder="0x0099123...."
            className="p-2 rounded-s w-full"
            value={val}
            disabled={
              loading || registerSupplierLoading || registerVerifierLoading
            }
            onChange={(e) => setVal(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-slate-800 w-24 font-bold p-2 rounded-md text-white disabled:opacity-50 disabled:cursor-none"
            disabled={
              loading || registerSupplierLoading || registerVerifierLoading
            }
          >
            Submit
          </button>
        </div>
        <div className="flex justify-center gap-4">
          <div className="input-group flex items-center">
            <label htmlFor="seller" className="text-slate-400 font-bold">
              <input
                type="radio"
                name="type"
                id="seller"
                className="p-2 rounded mt-1 me-2"
                required
                defaultChecked={seller}
                onChange={() => {
                  setSeller(true);
                  setVerifier(false);
                }}
              />
              Seller
            </label>
          </div>{" "}
          <div className="input-group max-w-[800px] flex items-center">
            <label htmlFor="limited" className="text-slate-400 font-bold">
              <input
                type="radio"
                name="type"
                id="limited"
                className="p-2 rounded mt-1 me-2"
                required
                defaultChecked={verifier}
                onChange={() => {
                  setVerifier(true);
                  setSeller(false);
                }}
              />
              Verifier
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
