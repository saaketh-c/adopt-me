import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              name={pet.name}
              animal={pet.type}
              breed={pet.breeds.primary}
              key={pet.id}
              images={pet.photos}
              location={pet.organization_id}
              id={pet.id}
              gender={pet.gender}
              age={pet.age}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
