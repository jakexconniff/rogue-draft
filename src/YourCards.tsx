import Card from './Card';

export default function YourCards({ cards }) {
  return (
    <div className="m-1 flex border-solid border-black border-2">
      <CardSection cmc={1} stackCards={filterCardsForSection({ cards, cmc: 1 })} />
      <CardSection cmc={2} stackCards={filterCardsForSection({ cards, cmc: 2 })} />
      <CardSection cmc={3} stackCards={filterCardsForSection({ cards, cmc: 3 })} />
      <CardSection cmc={4} stackCards={filterCardsForSection({ cards, cmc: 4 })} />
      <CardSection cmc={5} stackCards={filterCardsForSection({ cards, cmc: 5 })} />
      <CardSection cmc={6} stackCards={filterCardsForSection({ cards, cmc: 6 })} />
    </div>
  );
}

export function CardSection({ cmc, stackCards }) {
  return (
    <div className="w-[200px] h-96">
      <p className="">{cmc}</p>
      <div className="stack flex relative">
        { stackCards?.map((card, index) => {
          return <Card card={card} index={index} stackable />
        })}
      </div>
    </div>
  )
}

function filterCardsForSection({cards, cmc}) {
  return cards.filter((card) => {
    return card.cmc === cmc;
  })
}

// top-[26px] top-[52px] top-[78px] top-[104px] top-[130px] top-[156px] top-[182px]
// top-[208px] top-[234px] top-[260px] top-[286px] top-[312px] top-[338px] top-[364px]
// top-[390px] top-[416px] top-[442px] top-[468px] top-[494px] top-[520px] top-[546px]
// top-[572px] top-[598px] top-[624px] top-[650px] top-[676px] top-[702px] top-[728px]
// top-[754px] top-[780px] top-[806px] top-[832px] top-[858px] top-[884px] top-[910px]
// top-[936px] top-[962
