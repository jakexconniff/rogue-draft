import { useState } from "react";
import "./App.css";
import DeckSelect from "./DeckSelect";
import CardSelections from "./CardSelections";
import YourCards from "./YourCards";
import LevelDisplay from "./LevelDisplay";

function App() {
  const [selectedDeck, selectDeck] = useState(null);
  const [yourCards, setYourCards] = useState([]);
  const [level, setLevel] = useState(0);
  const selectCard = (selection) => {
    setYourCards([...yourCards, selection]);
    setLevel(level + 1);
  };
  return (
    <div className="app">
      {!selectedDeck ? (
        <DeckSelect selectDeck={selectDeck} />
      ) : (
        <>
          <LevelDisplay level={level} />
          <CardSelections cards={selectedDeck.cards} selectCard={selectCard} />
          <YourCards cards={yourCards} />
        </>
      )}
    </div>
  );
}

export default App;
