import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: "EG7SP",
      title: "Create a new project",
      completed: false,
    },
    {
      id: "PuTgo",
      title: "Working call",
      completed: false,
    },
    {
      id: "4fk0v",
      title: "Meet with doctor",
      completed: false,
    },
    {
      id: "BIUmP",
      title: "Go to sleep",
      completed: false,
    },
    {
      id: "V6gm3",
      title: "Take the kids to school",
      completed: false,
    },
    {
      id: "WRRGg",
      title: "Finish dribble marathon",
      completed: false,
    },
    {
      id: "nbztQ",
      title: "Walk with dog",
      completed: false,
    },
    {
      id: "wHDkB",
      title: "Request for a new mac Apple MacBook pro",
      completed: false,
    },
    {
      id: "juKOQ",
      title: "WIFI connection drops and slow internet",
      completed: false,
    },
    {
      id: "VYVqZ",
      title: "Add new partners",
      completed: false,
    },
  ]);
  const [completed, setCompleted] = useState([]);
  const [todo, todoTitle] = useState("");
  const [disable, setDisable] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTodo, setToEdit] = useState({});
  var input = document.getElementById("textInput");
  // DELETES A TODO
  const deleteTodo = (id, i) => {
    var newList = todos;
    newList.splice(i, 1);
    setTodos([...newList]);
  };
  var toEdit = {};
  // MARKS TODO AS COMPLETE
  const completeTodo = (todo, i) => {
    if (!todo.completed) {
      var ntodo = {
        id: todo.id,
        title: todo.title,
        completed: true,
      };
    } else {
      var ntodo = {
        id: todo.id,
        title: todo.title,
        completed: false,
      };
    }
    var newList = [];
    todos.forEach((el) => {
      if (el.id == todo.id) {
        newList.push(ntodo);
      } else {
        newList.push(el);
      }
    });
    setTodos([]);
    setTodos([...newList]);
  };

  const revertTodo = ({ id }) => {};

  // GENERATES ID FOR TODOS
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateId(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // ADDS TODO
  const newTodo = () => {
    if (todo) {
      const ntodo = {
        id: generateId(5),
        title: todo,
        completed: false,
      };
      setTodos([ntodo, ...todos]);
      input.value = "";
      todoTitle("");
    }
  };
  const toggleEdit = (el, i) => {
    setEdit(true);
    toEdit = el;
    console.log(toEdit);
    setTimeout(() => {
      if (input.value) {
        input.value = el.title;
      } else {
        console.log(input);
        // var input = document.getElementById("textInput");
        // input.value = el.title;
      }
    }, 0);
  };
  const saveTodo = () => {
    var newTodo = {
      id: toEdit.id,
      title: todo,
      completed: toEdit.completed,
    };
    console.log(newTodo);
    var newArray = [];
    todos.forEach((t) => {
      if (t.id == toEdit.id) {
        newArray.push(newTodo);
        console.log("new inserted");
      } else {
        newArray.push(t);
      }
    });
    setTodos([]);
    setTodos([...newArray]);
    setToEdit({});
    setEdit(false);
  };
  const cancelEdit = () => {
    setEdit(false);
  };
  //Function handleDragStart(), Its purpose is to store the id of the draggable element.
  function handleDragStart(e) {
    e.dataTransfer.setData("text", e.target.id); //note: using "this" is the same as using: e.target.
  } //end function

  //The dragenter event fires when dragging an object over the target.
  //The css class "drag-enter" is append to the targets object.
  function handleDragEnterLeave(e) {
    if (e.type == "dragenter") {
      // e.target.className = "drag-enter";
    } else {
      // e.target.className = ""; //Note: "this" referces to the target element where the "dragenter" event is firing from.
    }
  } //end function

  //Function handles dragover event eg.. moving your source div over the target div element.
  //If drop event occurs, the function retrieves the draggable element’s id from the DataTransfer object.
  function handleOverDrop(e) {
    e.preventDefault();
    //Depending on the browser in use, not using the preventDefault() could cause any number of strange default behaviours to occur.
    if (e.type != "drop") {
      return; //Means function will exit if no "drop" event is fired.
    }
    //Stores dragged elements ID in var draggedId
    var draggedId = e.dataTransfer.getData("text");
    //Stores referrence to element being dragged in var draggedEl
    var draggedEl = document.getElementById(draggedId);

    //if the event "drop" is fired on the dragged elements original drop target e.i..  it's current parentNode,
    //then set it's css class to ="" which will remove dotted lines around the drop target and exit the function.
    if (draggedEl.parentNode == e.target) {
      // e.target.className = "";
      return; //note: when a return is reached a function exits.
    }
    //Otherwise if the event "drop" is fired from a different target element, detach the dragged element node from it's
    //current drop target (i.e current perantNode) and append it to the new target element. Also remove dotted css class.
    draggedEl.parentNode.removeChild(draggedEl);
    e.target.appendChild(draggedEl); //Note: "this" references to the current target div that is firing the "drop" event.
    console.log(e.target.className, draggedEl);
    // e.target.className = "";
  } //end Function

  //Retrieve two groups of elements, those that are draggable and those that are drop targets:
  var draggable = document.querySelectorAll("[draggable]");
  var targets = document.querySelectorAll("[data-drop-target]");
  //Note: using the document.querySelectorAll() will aquire every element that is using the attribute defind in the (..)

  //Register event listeners for the"dragstart" event on the draggable elements:
  for (var i = 0; i < draggable.length; i++) {
    draggable[i].addEventListener("dragstart", handleDragStart);
  }

  //Register event listeners for "dragover", "drop", "dragenter" & "dragleave" events on the drop target elements.
  for (var i = 0; i < targets.length; i++) {
    targets[i].addEventListener("dragover", handleOverDrop);
    targets[i].addEventListener("drop", handleOverDrop);
    targets[i].addEventListener("dragenter", handleDragEnterLeave);
    targets[i].addEventListener("dragleave", handleDragEnterLeave);
  }

  return (
    <div className="App">
      <div className="header">
        <div>
          <p>My Todos</p>
          <span>Made with React.js</span>
        </div>
      </div>
      <div className="addTodo">
        <input
          id="textInput"
          type="text"
          placeholder="Add Todo..."
          onChange={(e) => {
            todoTitle(e.target.value);
          }}
        ></input>
        {edit ? (
          <div className="morebuttons">
            <button
              disabled={disable}
              onClick={() => {
                saveTodo();
              }}
            >
              Save
            </button>
            <button
              className="delete"
              disabled={disable}
              onClick={() => {
                cancelEdit();
              }}
            >
              cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              disabled={disable}
              onClick={() => {
                newTodo();
              }}
            >
              Add Todo
            </button>
          </div>
        )}
      </div>
      <div className="body">
        {/* <!--First Drop Target--> */}
        {/* onDragOver={handleOverDrop}
          onDrop={handleOverDrop}
          onDragEnter={handleDragEnterLeave}
          onDragLeave={handleDragEnterLeave}  */}
        {/* onDragStart={handleDragStart} */}
        <div data-drop-target="true" className="box1">
          {todos &&
            todos.map((el, i) => {
              return (
                <div
                  key={i}
                  id={`box${i + 1}`}
                  draggable="true"
                  className={el.completed ? "box completed" : "box"}
                >
                  <div
                    className="textWrapper"
                    onClick={() => toggleEdit(el, i)}
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="checkBox"
                        checked={el.completed}
                        onChange={() => completeTodo(el, i)}
                      />
                    </div>
                    <div>
                      <p className={el.completed ? "strike" : ""}>{el.title}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => deleteTodo(el, i)}
                      className="deleteButton"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {/* onDragOver={handleOverDrop}
          onDrop={handleOverDrop}
          onDragEnter={handleDragEnterLeave}
          onDragLeave={handleDragEnterLeave} */}
        <div data-drop-target="true" className="box2"></div>
      </div>
    </div>
  );
};

export default App;
