import { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";


function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => r.json())
      .then(data => setToys(data));
    setLoading(false)
    
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    console.log('Received new toy: ', newToy)
    setToys((prevToys) => {
      return [...prevToys, newToy]
    });
  }


  function handleDeleteToy(deletedToyId) {
    const updatedToys = toys.filter((toy) => toy.id !== deletedToyId);
    setToys(updatedToys)
  }

  function handleUpdateToy(updatedToy) {
  //.map() goes through  toys one by one in their current order
  const updatedToys = toys.map((toy) =>
    //if id matches, swap the old toy for the new one from the server
  //if id doesn't match return original toy
    toy.id === updatedToy.id ? updatedToy : toy
  );
  //replace state with new array mantaining same exact order
  setToys(updatedToys);
}


  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {loading ? <h2>Loading...</h2> :
        <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy} />}
    </>
  );
}

export default App;
