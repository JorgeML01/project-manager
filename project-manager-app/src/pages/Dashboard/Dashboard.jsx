import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // Ventanas emergentes.
import "./styles.css";

function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  return parsedPayload;
}

function Dashboard() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = decodeToken(token);
  const email = decodedToken.email;
  const id = decodedToken.id;

  const [boards, setBoards] = useState([]);
  const [fetchCalled, setFetchCalled] = useState(false); // Variable de estado adicional
  const [showModal, setShowModal] = useState(false);

  const fetchBoards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${id}/boards`
      );
      const data = response.data;
      setBoards(data); // Actualizar el estado con los datos de la respuesta
      console.log("GET: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  // Llamar a la función fetchBoards al cargar el componente
  if (!fetchCalled) {
    // Llamar a fetchBoards solo una vez al cargar el componente
    fetchBoards();
    setFetchCalled(true); // Actualizar el estado para indicar que fetchBoards ya ha sido llamado
  }

  function handleCreateBoard() {
    // Lógica para crear el tablero
    // ...

    // Cerrar la ventana emergente
    setShowModal(false);
  }

  return (
    <section id="dashboard" role="dashboard">
      <div className="container">
        <h1>YOUR BOARDS</h1>
        <button className="create-button" onClick={() => setShowModal(true)}>
          Create board
        </button>

        {/* Ventana emergente */}
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Create New Board"
        >
          <h1>Create New Board</h1>
          <p>Enter board name:</p>
          <input type="text" placeholder="Board name" />
          <p>Enter board description:</p>
          <textarea placeholder="Board description"></textarea>
          <button onClick={handleCreateBoard}>Create</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>

        {boards.length > 0 ? (
          boards.map((board) => (
            <div key={board.id} className="board">
              <h2>{board.name}</h2>
              <p>{board.description}</p>
            </div>
          ))
        ) : (
          <p className="no-boards-message">No boards available</p>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
