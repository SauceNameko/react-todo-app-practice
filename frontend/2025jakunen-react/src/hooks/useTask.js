import { useEffect, useState } from "react";
import { addTodo, getTodo, editTodo, deleteTodo } from "../api/todoApi";
import { Link, useNavigate } from "react-router-dom";

export const useTask = () => {
    const [list, setList] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    //TodoList取得
    const getData = async () => {
        const data = await getTodo();
        if (data.error) {
            setMessage(data.error);
            console.log("error");
            return;
        }
        setList(data);
    }
    //初期表示
    useEffect(() => {
        getData();
    }, []);
    //タスク追加処理
    const handleClickAdd = async (title, description) => {
        const data = await addTodo(title, description);
        if (data.error) {
            setMessage(data.error);
            console.log("error");
            return
        }

    }
    //タスク更新処理
    const handleClickEdit = async (id, title, description, completed) => {
        const data = await editTodo(id, title, description, completed);
        if (data.error) {
            setMessage(data.error);
            console.log("error");
            return
        }
        navigate("/")
    }
    //タスク削除処理
    const handleClickDelete = async (id) => {
        const confirm = window.confirm("本当に削除しますか？");
        if (confirm) {
            const data = await deleteTodo(id);
            if (data.error) {
                setMessage(data.error);
                console.log("error");
                return
            }
            //削除後画面更新
            await getData();
        }
    }
    return {
        list,
        getData,
        handleClickAdd,
        handleClickEdit,
        handleClickDelete,
        message
    }
}