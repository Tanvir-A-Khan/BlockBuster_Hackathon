/* eslint-disable react/prop-types */
import Art from "./Art";

// eslint-disable-next-line react/prop-types
export default function AllArts({ arts, author }) {
  return (
    <section>
      <h1 className=" text-4xl font-bold">All Art works</h1>
      <div className="arts-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 py-2">
        {arts.length > 0
          ? arts.map((art, index) => (
              <Art key={index} art={art} author={author} />
            ))
          : "Nothing Found"}
      </div>
    </section>
  );
}
