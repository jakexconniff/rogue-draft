import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddCards() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected,setSelected] = useState(null);
  useEffect(() => {
    console.log(results);
  }, [results]);

  const scrubSearch = (searchText) => {
    return searchText.split(" ").join("+");
  };

  const performSearch = async () => {
    const response = await axios({
      method: "get",
      url: `https://api.scryfall.com/cards/search?q=${scrubSearch(search)}`,
    });
    console.log(response?.data?.data);
    console.log("uooo");
    setResults(response?.data?.data);
  };

  if (selected) {
    return (
      <div>
        <p>Selected card</p>
        <CardDisplay card={selected} />
      </div>
    )
  }

  return (
    <div className="m-4 h-full w-full">
      <Label htmlFor="card-search">Search for a card</Label>
      <Input
        id="card-search"
        className="w-52"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <Button className="w-52" onClick={performSearch}>
        Submit
      </Button>
      {results && results.map && (
        <div className="grid grid-cols-4 gap-4 justify-items-center items-center p-2">
          {results?.map((result) => {
            return <Card card={result} setSelected={setSelected} />;
          })}
        </div>
      )}
    </div>
  );
}

const Card = ({ card, setSelected }: { card: Object }) => {
  return (
    <button className="w-64">
      <img key={card?.name} src={card?.image_uris?.normal} onClick={() => { setSelected(card) }} />
    </button>
  );
};

const CardDisplay = ({ card, setSelected }: { card: Object }) => {
  return (
    <div className="w-64">
      <img key={card?.name} src={card?.image_uris?.normal} />
    </div>
  );
};
