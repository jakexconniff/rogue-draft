import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://pqydowgqthtdvjtuiaiz.supabase.co", import.meta.env.VITE_SUPABASE_ANON_KEY);

export default async function addCard() {
  try {
    const { data, error } = await supabase
    .from("cards")
    .insert({
      id: 1,
      scryfall_id: "a78584e8-bb82-4977-a27d-68b1befe9b3b",
      name: "Nature's Lore",
      cmc: 2,
      image_uri: "https://cards.scryfall.io/normal/front/a/7/a78584e8-bb82-4977-a27d-68b1befe9b3b.jpg?1690004941",
      color: null,
      mana_cost: "{1}{G}"
    })
    .select();
    console.log(data);
    console.log(error);
  } catch (error) {
    console.log(error);
  }
}

addCard();