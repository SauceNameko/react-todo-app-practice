import { useEffect, useState } from "react";
import { addTodo, getTodo, editTodo } from "../api/todoApi";
import { Link, useNavigate } from "react-router-dom";

export const useTask = () => {
    const [list, setList] = useState([]);
    const navigate = useNavigate()
    //TodoList取得
    const getData = async () => {
        const data = await getTodo();
        if (data.error) {
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
    const handleClickAdd = (title, description) => {
        const addData = async () => {
            const data = await addTodo(title, description);
            if (data.error) {
                console.log("error");
                return
            }
        }
        addData();
    }
    //タスク更新処理
    const handleClickEdit = (id, title, description, completed) => {
        console.log(id, title, description, completed);

        const editData = async () => {
            const data = await editTodo(id, title, description, completed);
            if (data.error) {
                console.log("error");
                return
            }
        }
        editData();
        navigate("/")
    }
    return { list, getData, handleClickAdd, handleClickEdit }
}