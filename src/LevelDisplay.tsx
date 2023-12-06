export default function LevelDisplay({ level }) {
  return (
    <div className="absolute right-4 top-4 text-center border-2 border-black rounded-sm p-4">
      <h4>Level</h4>
      <p>{level}</p>
    </div>
  )
}