import React from "react";
import { toast } from "react-toastify";

const Tasks = ({
  list,
  handleDelete,
  updateTask,
  update,
  HandleTaskCompleted,
}) => {
  // This function is to do delete Tasks
  const Delete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const afterFilter = list.filter((item, ind) => {
          return ind + 1 !== id;
        });
        handleDelete(afterFilter);
      });

    return toast.success("Delete task SuccessFully..");
  };

  const editT = (id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        updateTask(item.title, ind + 1);
      }
      return item;
    });
  };

  // when checkedbox checked or uncheck
  const markAsCompleted = (id) => {
    list.map((item, ind) => {
      if (ind + 1 === id) {
        HandleTaskCompleted(item, ind + 1);
      }
      return item;
    });
  };

  return (
    <>
      <div className="todo_list_inner_container">
        {list.map((item, ind) => {
          return (
            <div className="todo-list" key={ind}>
              {item.completed ? (
                <input
                  className="checkbox"
                  checked
                  onClick={() => markAsCompleted(ind + 1)}
                  type="checkbox"
                />
              ) : (
                <input
                  className="checkbox"
                  onClick={() => markAsCompleted(ind + 1)}
                  type="checkbox"
                />
              )}
              {item.completed ? (
                <li className="completedTask">{item.title}</li>
              ) : (
                <li>{item.title}</li>
              )}

              {update ? (
                ""
              ) : (
                <img
                  className="edit-btn"
                  onClick={() => editT(ind + 1)}
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                  alt=""
                />
              )}

              <img
                className="delete-btn"
                onClick={() => Delete(ind + 1)}
                src="https://cdn-icons-png.flaticon.com/512/1214/1214926.png"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tasks;