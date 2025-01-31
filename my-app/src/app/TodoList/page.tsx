"use client";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todoText, setTodoText] = useState<string>(""); // เก็บข้อความของ To-Do ใหม่
  const [todos, setTodos] = useState<Todo[]>([]); // เก็บรายการ To-Do
  const [error, setError] = useState<string>(""); // เก็บข้อความ error
  const [isEditing, setIsEditing] = useState<boolean>(false); // เช็คว่าอยู่ในโหมดแก้ไข
  const [editTodoId, setEditTodoId] = useState<number | null>(null); // เก็บ ID ของ To-Do ที่กำลังแก้ไข

  const addTodo = () => {
    if (!todoText.trim()) {
      setError("กรุณากรอกข้อความ To-Do");
      return;
    }

    // ตรวจสอบว่ามี To-Do ที่ซ้ำกันหรือไม่
    const isDuplicate = todos.some((todo) => todo.text.toLowerCase() === todoText.toLowerCase());

    if (isDuplicate) {
      setError("ข้อความ To-Do นี้มีอยู่แล้ว");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    setTodos([...todos, newTodo]); // เพิ่ม To-Do ใหม่ลงในรายการ
    setTodoText(""); // เคลียร์ช่องกรอกข้อความ
    setError(""); // ล้างข้อความ error
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // ลบ To-Do
  };

  const startEditing = (id: number, text: string) => {
    setIsEditing(true);
    setEditTodoId(id);
    setTodoText(text);
  };

  const editTodo = () => {
    if (!todoText.trim()) {
      setError("กรุณากรอกข้อความ To-Do");
      return;
    }

    // ตรวจสอบว่ามี To-Do ที่ซ้ำกันขณะแก้ไข (ยกเว้น To-Do ที่กำลังแก้ไข)
    const isDuplicate = todos.some(
      (todo) => todo.text.toLowerCase() === todoText.toLowerCase() && todo.id !== editTodoId
    );

    if (isDuplicate) {
      setError("ข้อความ To-Do นี้มีอยู่แล้ว");
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === editTodoId ? { ...todo, text: todoText } : todo
      )
    );
    setIsEditing(false);
    setTodoText(""); // เคลียร์ช่องกรอกข้อความ
    setEditTodoId(null); // รีเซ็ตการแก้ไข
    setError(""); // ล้างข้อความ error
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600">To-Do List</h1>

      {/* Input สำหรับเพิ่มหรือแก้ไข To-Do */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder={isEditing ? "Edit your To-Do" : "Add a new To-Do"}
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={isEditing ? editTodo : addTodo}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isEditing ? "Save" : "Add"}
        </button>
      </div>

      {/* แสดงข้อความ error ถ้าไม่มีการกรอก */}
      {error && <p className="text-red-500">{error}</p>}

      {/* แสดงรายการ To-Do */}
      <ul className="w-full max-w-lg space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="w-5 h-5"
              />
              <span
                className={`ml-3 text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}
              >
                {todo.text}
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => startEditing(todo.id, todo.text)}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
