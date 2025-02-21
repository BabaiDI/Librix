function Lorem() {
  return (
    <>
      {Array.from({ length: 90 }, (_, index) => (
        <div key={index}>
          <h1>Lorem: {index + 1}</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            neque quasi cum ab obcaecati sapiente. Harum, modi enim? Ducimus
            consequatur perspiciatis tenetur temporibus excepturi nulla enim,
            alias itaque quas animi.
          </p>
        </div>
      ))}
    </>
  );
}

export default Lorem;
