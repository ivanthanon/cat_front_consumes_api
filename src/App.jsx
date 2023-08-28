import { useEffect, useState } from "react";
import "../style.css";

let firstWord;
const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
import { getRandomFact } from "./services/facts";

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact));
  }, []);

  useEffect(() => {
    if (!fact) return;
    firstWord = fact.split(" ", 3).join(" ");
    fetch(
      CAT_ENDPOINT_IMAGE_URL
    )
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  const handleClick = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
  };

  return (
    <main>
      <h1>App de Gatitos</h1>
      <button onClick={handleClick}>Retry</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
            alt={`Image extracted using the first word for ${fact}`}
          />
        )}
      </section>
    </main>
  );
}
