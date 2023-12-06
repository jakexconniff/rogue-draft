import catalog from "./cards.json";
const { cards, decks } = catalog;

// TODO: Start here
export default function DeckSelect({ selectDeck, setIsAddingCards }) {
  return (
    <div className="flex">
      <aside className="w-64 text-center">
        <p className="mx-auto">Welcome!</p>
        <button className="mx-auto" onClick={() => { setIsAddingCards(true); }}>Add Cards</button>
      </aside>
      <div>
        <h3>Select your starting deck.</h3>
        <div className="">
          {decks?.map((deck) => {
            const scrubbedDeck = prepareDeck(deck);
            return (
              <button
                className="w-52"
                onClick={() => {
                  selectDeck(scrubbedDeck);
                }}
              >
                <h3 className="text-center">{scrubbedDeck.name}</h3>
                <img
                  className="w-52"
                  src={scrubbedDeck.cards[0].image_uris.normal}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function prepareDeck(deck) {
  // Not ideal, this should probably be SQL.
  const deckCards = deck.cards.map((deckCard) => {
    const match = cards.filter((card) => {
      return card.id === deckCard.id;
    })[0];
    return { ...deckCard, ...match };
  });
  return { name: deck.name, cards: deckCards };
}
