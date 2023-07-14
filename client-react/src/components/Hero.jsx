export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-4 py-2">
      <div className="hero-text">
        <h1 className="text-4xl font-bold">Art-blocker</h1>
        <p className="w-3/4 text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
          incidunt quam tempore perspiciatis quae dolorum rerum minima
          consectetur ipsam cum. Doloremque veritatis eum suscipit nemo iste
          culpa officiis praesentium quod vitae, id ullam error voluptatem
          deleniti. Fugiat, autem quis nobis libero rerum nisi soluta ducimus
          et? Facilis iusto est non.
        </p>
      </div>
      <div className="hero-img mt-4 md:mt-0">
        <div className="img-container">
          <img
            src="https://img.freepik.com/free-vector/nft-non-fungible-token-concept-with-neon-light-effect_1017-36944.jpg?w=2000"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
