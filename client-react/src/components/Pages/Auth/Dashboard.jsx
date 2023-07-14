/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/authContext";
import { useStateContext } from "../../../contexts/web3";
import AddNewArtModal from "./AddNewArtModal";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);
  const [supplierWorks, setSupplierWorks] = useState([]);

  const { getSupplierArtWorks, getSupplierArtWorksLoaing } = useStateContext();

  // console.log(getSupplierArtWorks);

  useEffect(() => {
    const getData = async () => {
      const res = await getSupplierArtWorks({
        args: [user.wallet],
      });
      console.log(res);
    };
    getData();
  }, []);

  return (
    <>
      <div className="">
        <h1 className="text-4xl font-bold">Welcome back user</h1>
        <p className="mt-4">
          Wallet Address:{" "}
          <span className="text-slate-400">
            {user?.wallet ? user.wallet : "0x1234......."}
          </span>
        </p>
      </div>
      {show && <AddNewArtModal setShow={setShow} />}
      <button
        className="mt-4 bg-slate-300 text-black text-center font-bold p-2 rounded-md hover:bg-slate-500"
        onClick={() => setShow(true)}
      >
        Add New Art Work
      </button>
      <div className="my-4">{/* <AllArts author /> */}</div>
    </>
  );
}
