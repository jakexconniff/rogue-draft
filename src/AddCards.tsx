import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SupabaseContext from "./SupabaseContext";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function AddCards() {
  const supabase = useContext(SupabaseContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [numInBaseDeck, setNumInBaseDeck] = useState("0");
  const [addToCardPool, setAddToCardPool] = useState(false);
  const [minLevel, setMinLevel] = useState(0);
  useEffect(() => {
    console.log(results);
  }, [results]);

  const scrubSearch = (searchText) => {
    return searchText.split(" ").join("+");
  };

  const getDecks = async () => {
    const { data, error } = await supabase.from("decks").select("*");
    // Should store these in indexedDB for performance eventually.
    setDecks(data);
  };

  const performSearch = async () => {
    const response = await axios({
      method: "get",
      url: `https://api.scryfall.com/cards/search?q=${scrubSearch(search)}`,
    });
    setResults(response?.data?.data);
  };

  if (selected) {
    return (
      <div>
        <p className="p-2">Selected card</p>
        <CardDisplay card={selected} />

        {decks && (
          <>
            {/* Probably ul instead of buttons */}
            <h3 className="p-2">Add this card to deck?</h3>
            {decks.map((deck) => {
              return (
                <button
                  className="p-2"
                  onClick={() => {
                    setSelectedDeck(deck);
                  }}
                >
                  {deck.name}
                </button>
              );
            })}
          </>
        )}
        {selectedDeck && (
          <div className="flex flex-col p-2">
            <h3 className="p-2">Selected Deck</h3>
            <h4 className="p-2">{selectedDeck.name}</h4>
            <Label className="p-2" htmlFor="numInBaseDeck">
              Add how many to base deck:
            </Label>
            <Input
              id="numInBaseDeck"
              className="w-52 p-2"
              onChange={(event) => {
                setNumInBaseDeck(event.target.value);
              }}
            />
            <Button className="w-52 p-2" onClick={performSearch}>
              Confirm
            </Button>
            <div className="flex items-center">
              <Checkbox className="" id="addToCardPool" checked={addToCardPool} onCheckedChange={setAddToCardPool} />
              <Label
                className="p-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="addToCardPool"
              >
                Add to card pool?
              </Label>
            </div>
            { addToCardPool &&
              <>
                <Label className="p-2" htmlFor="numInBaseDeck">
                  Minimum Level - {minLevel}
                </Label>
                <Slider
                  defaultValue={[0]}
                  max={50}
                  step={1}
                  className={cn("w-[60%] p-2")}
                  onValueChange={(value) => { setMinLevel(value[0])}}
                />
              </>
            }
          </div>
        )}
      </div>
    );
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
            return (
              <Card
                card={result}
                setSelected={setSelected}
                getDecks={getDecks}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const Card = ({ card, setSelected, getDecks }: { card: Object }) => {
  return (
    <button className="w-64">
      <img
        key={card?.name}
        src={card?.image_uris?.normal}
        onClick={() => {
          setSelected(card);
          getDecks();
        }}
      />
    </button>
  );
};

const CardDisplay = ({ card, setSelected }: { card: Object }) => {
  return (
    <div className="w-64 p-2">
      <img key={card?.name} src={card?.image_uris?.normal} />
    </div>
  );
};
