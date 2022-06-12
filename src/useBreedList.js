import { useState, useEffect } from "react";
import { Client } from "@petfinder/petfinder-js";

const client = new Client({
  apiKey: "oShvE21Gc1tMh5XOj4Gd0GkK0QZKkwP2UGm2cGusZRCbeUEblL",
  secret: "F81fM4hRyVqSNBY6Azp8RNJ2gefl5pZBM25Ewllw",
});

const localCache = {};
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      client.animalData.breeds(animal).then((resp) => {
        let outList = [];
        resp.data.breeds.forEach(function (breed) {
          outList.push(breed.name);
        });

        localCache[animal] = outList || [];
        setBreedList(localCache[animal]);
        setStatus("loaded");
      });
    }
  }, [animal]);

  return [breedList, status];
}
