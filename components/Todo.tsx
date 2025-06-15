"use client";

import { FC, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS } from "../graphql/queries";
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "../graphql/mutations";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Todo: FC = () => {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTodo({
        variables: {
          input: {
            title: newTodo.title,
            description: newTodo.description,
            status: "pending",
          },
        },
      });
      setNewTodo({ title: "", description: "" });
      refetch();
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case "pending":
          newStatus = "in_progress";
          break;
        case "in_progress":
          newStatus = "done";
          break;
        case "done":
          newStatus = "pending";
          break;
        default:
          newStatus = "pending";
      }

      await updateTodo({
        variables: {
          input: {
            id,
            status: newStatus,
          },
        },
      });
      refetch();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo({
        variables: {
          input: { id },
        },
      });
      refetch();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="main-wrapper">
      <div className="main">
        <h1>Your Items</h1>

        <form onSubmit={handleCreateTodo}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Todo</button>
        </form>

        <div className="todo-list">
          {data?.todos.map((todo: Todo) => (
            <div key={todo.id} className="todo-item">
              <div className="todo-content">
                <h3 className="todo-content-title">{todo.title}</h3>
                <p className="todo-content-desc">{todo.description}</p>
                <div className="todo-date">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="todo-actions">
                <button
                  onClick={() => handleUpdateStatus(todo.id, todo.status)}
                  className={`status-button ${todo.status}`}
                >
                  {todo.status}
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
