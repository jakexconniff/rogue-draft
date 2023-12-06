import { useState, useEffect } from "react";
import "./App.css";
import DeckSelect from "./DeckSelect";
import CardSelections from "./CardSelections";
import YourCards from "./YourCards";
import LevelDisplay from "./LevelDisplay";
import { createClient } from "@supabase/supabase-js";
import addCard from "./lib/addCard";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import AddCards from "./AddCards";

const supabase = createClient(
  "https://pqydowgqthtdvjtuiaiz.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [session, setSession] = useState(null);
  // Should be using React Router, add later. (Want to stay focused)
  const [addingCards, setIsAddingCards] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const start = async () => {
      const card = await addCard();
      console.log(card);
    };
    start();
    return () => subscription.unsubscribe();
  }, []);
  const [selectedDeck, selectDeck] = useState(null);
  const [yourCards, setYourCards] = useState([]);
  const [level, setLevel] = useState(0);
  const selectCard = (selection) => {
    setYourCards([...yourCards, selection]);
    setLevel(level + 1);
  };

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }
  if (addingCards) {
    return <AddCards />
  }
  if (!selectedDeck) {
    return <DeckSelect selectDeck={selectDeck} setIsAddingCards={setIsAddingCards} />;
  }

  return (
    <div className="app">
      <>
        <LevelDisplay level={level} />
        <CardSelections cards={selectedDeck.cards} selectCard={selectCard} />
        <YourCards cards={yourCards} />
      </>
    </div>
  );
}

export default App;
