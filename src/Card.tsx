export default function Card({ card, index, stackable }) {
  return (
    <div className={`h-[262px] w-[187px] mx-1 ${stackable ? `absolute top-[${index * 26}px]` : ''}`}>
      <img key={card?.name + Math.random()} src={card?.image_uris?.normal} />
    </div>
  )
}