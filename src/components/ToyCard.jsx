function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
const {id, name, image, likes} = toy;

const handleDelete = () => {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE"
  })
  .then(r => {
          if (!r.ok) {throw new Error("failed to delete toy") }
          console.log("Item deleted")
          onDeleteToy(id)
        })
      .catch(error => console.log(error.message))
  
}
function handleLikes() {
  const newLikes = likes + 1;

  fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: newLikes, // Send only the key you want to change
      }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        onUpdateToy(updatedToy); // Update the state in App.js
      })
      .catch(error => console.error("My fetch error:", error))
}

  return (
    <div className="card" data-testid="toy-card">

      <h2>{toy.name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikes}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
