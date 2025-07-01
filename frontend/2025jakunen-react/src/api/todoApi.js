import { api } from "../api/apiPath";
// 一覧表示
export const getTodo = async () => {
    const res = await fetch(`${api}/todos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    const data = await res.json();
    return data;
}
// タスク追加
export const addTodo = async (title, description) => {
    const res = await fetch(`${api}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    })
    const data = await res.json();
    return data;
}
// タスク編集
export const editTodo = async (id, title, description, completed) => {
    const res = await fetch(`${api}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed })
    })
    const data = await res.json();
    return data;
}