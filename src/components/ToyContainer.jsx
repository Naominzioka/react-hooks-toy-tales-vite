
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDeleteToy, onUpdateToy }) {

  return (
    <div id="toy-collection">{/* Render the collection of ToyCards */}
      {toys.map(toy => <ToyCard
        key={toy.id}
        toy={toy}
        onDeleteToy={onDeleteToy}
        onUpdateToy={onUpdateToy}
      />
      )}
    </div>
  )
}

export default ToyContainer;
