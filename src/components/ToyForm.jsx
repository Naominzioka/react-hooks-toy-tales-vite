import { useState } from "react";

function ToyForm({ onAddToy }) {
  //state to input values user types
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  })

  //update the specific state field based on the input's 'name' attribute
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault()

    //send the new toy data to the server

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, likes: 0 })
    })
      .then(r => {
        if (!r.ok) { throw new Error("failed to create new toy") }
        return r.json()
      })
      .then(newToy => {
        //update the parent state (App.js) to display the new toy immediately
        onAddToy(newToy);
        setFormData({
          name: "",
          image: ""
        });
      })
      .catch(error => console.log("Error:", error.message))

  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"

        />
      </form>
    </div>
  );
}

export default ToyForm;
