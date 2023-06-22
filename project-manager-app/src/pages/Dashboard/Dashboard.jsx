import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal"; // Ventanas emergentes.
import "./styles.css";

Modal.setAppElement(document.getElementById("root"));

function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  return parsedPayload;
}

function Dashboard() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = decodeToken(token);
  // const email = decodedToken.email;
  const id = decodedToken.id;

  const [boards, setBoards] = useState([]);
  const [fetchCalled, setFetchCalled] = useState(false); // Variable de estado adicional
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
    console.log("TEST - SE HA CREADO UN BOARD.");
    console.log("Name:", name);
    console.log("Description:", description);

    const url = "http://localhost:3001/boards/create"; // La URL de la API para crear un nuevo tablero

    // Crear un objeto con los datos del nuevo tablero
    const data = {
      name: name,
      id: id,
      description: description,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData); // Hacer algo con la respuesta del servidor
        setShowModal(false);
        // Actualizar el estado de boards si es necesario
        // setBoards([...boards, responseData]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setFetchCalled(false);
    setShowModal(false);
  }

  return (
    <section id="dashboard" role="dashboard">
      <div className="container">
        <h1>YOUR BOARDS</h1>
        <button className="create-button" onClick={() => setShowModal(true)}>
          Create board
        </button>

        {/* Ventana emergente para la creación de boards. */}
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Create New Board"
          className="modal-container"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <h1 className="modal-title">Create New Board</h1>
            <p>Enter board name:</p>
            <input
              className="modal-input"
              type="text"
              placeholder="Board name"
              onChange={(e) => setName(e.target.value)}
            />
            <p>Enter board description:</p>
            <textarea
              className="modal-textarea"
              placeholder="Board description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="modal-buttons">
              <button onClick={handleCreateBoard} className="buttonCreate">
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="buttonCancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        {boards.length > 0 ? (
          boards.map((board) => (
            <Link
              to={`users/${id}/boards/${board.id}/lists`}
              key={board.id}
              className="board-link"
            >
              <div className="board">
                <div className="board-content">
                  <div className="">
                    <h2 className="board-title">{board.name}</h2>
                  </div>
                  <p className="">{board.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-boards-message">No boards available</p>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
