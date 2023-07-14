/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Art({ art, author }) {
  const { title, desc, image, price, id } = art;

  return (
    <div className="art bg-slate-700  rounded-md grid gap-2">
      <Link to={`/art/${id}`} className="img-container art">
        <img src={image} alt="" className=" rounded-md" />
      </Link>
      <div className="details p-4 grid gap-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>{desc}</p>
        <p>
          Price <span>{price} eth</span>
        </p>
        {author && (
          <div className="author-actions">
            <Link
              to={`/art/modify/${id}`}
              className="mt-4 bg-yellow-300 text-black text-center font-bold p-2 rounded-md hover:bg-yellow-500"
            >
              Update
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
