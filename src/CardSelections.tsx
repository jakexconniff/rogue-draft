import { useState } from 'react'
import Card from './Card';
import './App.css'

function CardSelections({ cards, selectCard }) {
  return (
    <div className="card-selections m-1 flex border-solid border-black border-2 overflow-x-auto">
    { cards.map((card, index) => {
      return <CardSelection card={card} selectCard={() => {
        selectCard(card)
      }} />
    })}
    </div>
  )
}

export default CardSelections

function CardSelection({ card, selectCard }) {
  return (
    <button onClick={selectCard}>
      <Card card={card} />
    </button>
  )
}
