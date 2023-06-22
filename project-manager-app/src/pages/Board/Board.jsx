import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import "./styles.css";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  return parsedPayload;
}

export default function QuoteApp() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = decodeToken(token);
  const id = decodedToken.id;

  const [board, setBoard] = useState([]);
  const [fetchCalled, setFetchCalled] = useState(false);
  const [nameBoard, setBoardName] = useState("");
  const [nameCard, setCardName] = useState("");
  const [descriptionCard, setDescriptionCard] = useState("");

  // Obtenemos el board id.
  const currentURL = window.location.href;
  const boardId = currentURL.match(/\/boards\/(\d+)/)[1];
  console.log(boardId);

  const fetchBoard = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${id}/boards/${boardId}/lists`
      );
      const data = response.data;
      setBoard(data);
      console.log("hola");
      console.log("GET: ", data);
    } catch (error) {
      console.log("No cargaron los boards.");
    }
  };

  // Llamar a la función fetchBoards al cargar el componente
  if (!fetchCalled) {
    // Llamar a fetchBoards solo una vez al cargar el componente
    fetchBoard();
    setFetchCalled(true); // Actualizar el estado para indicar que fetchBoards ya ha sido llamado
  }

  const [state, setState] = useState([]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div className="container">
      <button
        type="button"
        className="add-button button-new-group"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
        {/* {currentURL} */}
      </button>
      <button
        type="button"
        className="add-button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 sm-12 ">
              {state.map((el, ind) => (
                <div key={ind} className="list">
                  <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="col mb-4 center-list"
                      >
                        <h2>board_name</h2>
                        {el.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className="mb-3"
                              >
                                <div className="d-flex justify-content-between">
                                  {item.content}
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => {
                                      const newState = [...state];
                                      newState[ind].splice(index, 1);
                                      setState(
                                        newState.filter((group) => group.length)
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
