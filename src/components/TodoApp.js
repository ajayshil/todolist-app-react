import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import Loader from "./loader";
import { toast } from "react-toastify"; //toast use only show notification

const TodoApp = () => {
  // UseState Hooks
  const [update, setUpdate] = useState(false);
  const [toUpdateTaskbyId, setToUpdateTaskbyId] = useState(0);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  //  this is basically great request
  useEffect(() => {
    setLoading(true);
    const url = "https://jsonplaceholder.typicode.com/todos";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  // This function is used to add task to the list
  const addTasksToList = () => {
    if (task.trim() === "") {
      return toast.warning("Please enter a task.");
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos/?userId=1", {
        method: "POST",
        body: JSON.stringify({
          title: task,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setList([{ userId: 1, title: task, completed: false }, ...list]);
          toast.success("Task Add Successfully");
        });
      setTask("");
    }
  };

  const handleDelete = (data) => {
    // console.log(data);
    setList(data);
  };

  //  here you can update Tasks
  const updateTask = (data, id) => {
    // console.log(data, id - 1);
    setUpdate(true);
    setTask(data);
    setToUpdateTaskbyId(id - 1);
  };

  //  update task request in Api
  const updatingTask = async () => {
    if (task === "") {
      return;
    }
    await fetch("https://jsonplaceholder.typicode.com/todos/?userId=1", {
      method: "PUT",
      body: JSON.stringify({
        title: task,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUpdate(false);

        const updatedList = list.map((item, ind) => {
          if (ind === toUpdateTaskbyId) {
            item.title = task;
          }
          return item;
        });

        setList(updatedList);
      });
    setTask("");

    toast.success("Task Update Successfully...");
  };

  //  THis function is for handle tasks
  const HandleTaskCompleted = (data, id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
      return item; // add this line to return the updated item
    });
    setList([...list]);
  };

  // fetching contact time it shown the loding animation
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="todo_list_container">
      <h1 className="todoTitle">To Do App</h1>
      <div className="inputcontainar">
        <input
          type="text"
          className="addtoTask"
          placeholder="Write Something....."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        {update ? (
          <img
            className="addtoTaskBtn"
            onClick={() => updatingTask()}
            src="https://cdn-icons-png.flaticon.com/512/1828/1828753.png"
            alt=""
          />
        ) : (
          <img
            className="addtoTaskBtn"
            onClick={() => addTasksToList()}
            src="https://cdn-icons-png.flaticon.com/512/4210/4210903.png"
            alt=""
          />
        )}
      </div>
      {/*  add taksks component */}
      <Tasks
        list={list}
        handleDelete={handleDelete}
        updateTask={updateTask}
        HandleTaskCompleted={HandleTaskCompleted}
        update={update}
      />
    </div>
  );
};

export default TodoApp;