import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import { Client } from "@petfinder/petfinder-js";
import Pagination from "./Pagination";
import "./style.scss";

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [animalTypes, setAnimalTypes] = useState([]);
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const client = new Client({
    apiKey: "oShvE21Gc1tMh5XOj4Gd0GkK0QZKkwP2UGm2cGusZRCbeUEblL",
    secret: "F81fM4hRyVqSNBY6Azp8RNJ2gefl5pZBM25Ewllw",
  });

  useEffect(() => {
    requestPets();
    requestAnimalTypes();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    let search = {};
    if (animal.length) {
      search.type = animal;
    }
    if (breed.length) {
      search.breed = breed;
    }
    if (location.length) {
      search.location = location;
    }

    search.page = currentPage;

    client.animal.search(search).then((resp) => {
      setPets(resp.data.animals);
      setPageSize(resp.data.pagination.count_per_page);
      setTotalCount(resp.data.pagination.total_count);
    });
  }

  async function requestAnimalTypes() {
    client.animalData.types().then((resp) => {
      setAnimalTypes(resp.data.types);
    });
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="City, State OR postal code"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {animalTypes.map((animal) => (
              <option key={animal.name} value={animal.name}>
                {animal.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((allBreed) => (
              <option key={allBreed} value={allBreed}>
                {allBreed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Search</button>
      </form>
      <Results pets={pets} />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default SearchParams;
