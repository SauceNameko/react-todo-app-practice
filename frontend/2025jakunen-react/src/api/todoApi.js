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

// タスク削除
export const deleteTodo = async (id) => {
    const res = await fetch(`${api}/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    if (res.status == 204) return true;
    else {
        const data = await res.json();
        return data;
    }
}

// タスク完了
export const completeTodo = async (id) => {
    const res = await fetch(`${api}/todos/${id}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    const data = await res.json();
    return data;
}

// タスク完了
export const uncompleteTodo = async (id) => {
    const res = await fetch(`${api}/todos/${id}/uncomplete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    const data = await res.json();
    return data;
}