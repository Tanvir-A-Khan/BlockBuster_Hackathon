/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/web3";
import Art from "./Art";

// eslint-disable-next-line react/prop-types
export default function AllArtsFilter({ arts }) {
  const [type, setType] = useState("default");
  const [sort, setSort] = useState("default");

  const { search } = useStateContext();

  let content;

  content = arts
    .filter((art) => {
      switch (type) {
        case "limited":
          return art.isLimitedEdition == true;
        case "general":
          return art.isLimitedEdition != true;
        default:
          return art;
      }
    })
    .filter((art) => art.title.toLowerCase().includes(search.toLowerCase()));

  const sorting = () => {
    if (sort == "asc") arts.sort((a, b) => b.price - a.price);
    else if (sort == "desc") arts.sort((a, b) => a.price - b.price);
  };

  useEffect(() => {
    sorting();
  }, [sort]);

  console.log(content);

  return (
    <section>
      <h1 className="text-center text-4xl font-bold">All Arts</h1>
      <div className="arts-container md:flex justify-between gap-x-5 my-4 py-2">
        <div className="filter-toggles flex flex-col">
          <h2 className="py-2 font-bold">Filter by Category</h2>
          <div className="toggle min-w-[250px] w-full">
            <div className="checkbox-container">
              <input
                type="radio"
                name="category"
                id="general"
                value="general"
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="general"> General Art works</label>
            </div>
            <div className="checkbox-container">
              <input
                type="radio"
                name="category"
                id="limited"
                value="limited"
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="limited"> Limited Art works</label>
            </div>
          </div>

          <h2 className="py-2 font-bold">Sort by fee</h2>
          <select
            name="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            autoComplete="sort"
            className="text-black text-sm rounded-md"
          >
            <option value="default">Default</option>
            <option value="asc">Fee (Low to High)</option>
            <option value="desc">Fee (High to Low)</option>
          </select>
        </div>
        <div className="arts-container-filered mt-4 grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4 items-center">
          {content.map((art, i) => (
            <Art index={i} art={art} />
          ))}
        </div>
      </div>
    </section>
  );
}
