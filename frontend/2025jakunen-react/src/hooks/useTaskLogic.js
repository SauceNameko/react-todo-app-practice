import { useEffect, useState } from "react";
import { addTodo, getTodo, editTodo, deleteTodo, completeTodo, uncompleteTodo } from "../api/todoApi";
import { useNavigate } from "react-router-dom";

export const useTaskLogic = () => {
    const [list, setList] = useState([]);
    const [message, setMessage] = useState("");
    const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
    const [selectedCompleteIds, setSelectCompleteIds] = useState(new Set());
    const [selectedDeleteIds, setSelectedDeleteIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [serach, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("");

    const navigate = useNavigate()
    //TodoList取得
    const getData = async () => {
        setIsLoading(true);
        try {
            const data = await getTodo();
            if (data.error) {
                setMessage(data.error);
                return;
            }
            setMessage("")
            setList(data)
        } catch (error) {
            console.error(error);
            setMessage(error);
        } finally {
            setIsLoading(false);
        }
    }
    //初期表示
    useEffect(() => {
        getData();
    }, []);
    //タスク追加処理
    const handleClickAdd = async (title, description) => {
        console.log(title, description);

        // setIsLoading(true);
        try {
            const data = await addTodo(title, description);
            if (data.error) {
                setMessage(data.error);
                return;
            }
            setMessage("")
        }
        catch (error) {
            console.log(error);
            setMessage(error);
        } finally {
            // setIsLoading(false);
        }
        navigate("/")
        await getData();
    }
    //タスク更新処理
    const handleClickEdit = async (id, title, description, completed) => {
        setIsLoading(true);
        try {
            const data = await editTodo(id, title, description, completed);
            if (data.error) {
                setMessage(data.error);
                return;
            }
            setMessage("")
        } catch (error) {
            setMessage(error);
            console.log("error");
        } finally {
            setIsLoading(false);
        }

        navigate("/")
        await getData();
    }
    //タスク削除処理
    const handleClickDelete = async (id) => {
        //個別削除する場合
        setIsLoading(true);
        try {
            const confirm = window.confirm("本当に削除しますか？");
            if (confirm) {
                const data = await deleteTodo(id);
                if (data.error) {
                    setMessage(data.error);
                    console.log(error);
                    return
                }
            }

        } catch (error) {
            setMessage(error);
            console.log("error");
        } finally {
            setIsLoading(false);
        }
        //削除後画面更新
        await getData();
    }
    //複数選択ボタンの検知
    const toggleMultiSelectMode = () => {
        setIsMultiSelectMode(!isMultiSelectMode);
    }
    useEffect(() => {
        if (!isMultiSelectMode) {
            setSelectCompleteIds(new Set());
            setSelectedDeleteIds(new Set());
        }
    }, [isMultiSelectMode]);
    //完了チェックボックスからid取得
    const toggleSelectCompleteId = (id) => {
        setSelectCompleteIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        })
    }
    //削除チェックボックスからid取得
    const toggleSelectDeleteId = (id) => {
        setSelectedDeleteIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    //タスク状態変更処理
    const handleClickComplete = async () => {
        setIsLoading(true);
        //完了状態なら未完了に戻す
        for (const id of selectedCompleteIds) {
            const selectItem = list.find(item => item.id == id);
            try {
                if (selectItem.completed) {
                    await uncompleteTodo(id);
                } else {
                    //未完了状態なら完了にする
                    await completeTodo(id);
                }

            } catch (error) {
                setMessage(error);
                console.log("error");
            } finally {

            }
        }
        //完了状態変更後画面更新
        setSelectCompleteIds(new Set());
        await getData();
    }
    //一括削除処理
    const handleClickMultiDelete = async () => {
        setIsLoading(true);
        try {
            const confirm = window.confirm("本当に一括削除しますか？");
            if (confirm) {
                for (const id of selectedDeleteIds) {
                    const data = await deleteTodo(id);
                    if (data.error) {
                        setMessage(data.error);
                        return
                    } else {
                        setMessage("")
                    }
                }
            }
        } catch (error) {
            setMessage(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }

        //一括削除後画面更新
        setSelectedDeleteIds(new Set());
        await getData();
    }
    //検索する関数
    const handleChangeSerach = (e) => {
        setSearch(e.target.value);
    }
    //絞り込み選択状態変更関数
    const handleChangeFilter = (e) => {
        setFilter(e.target.value);
    }
    //並び替え選択状態変更関数
    const handleChangeSort = (e) => {
        setSortKey(e.target.value);
    }
    //絞り込み&検索後の配列
    const filterList = list.filter(item => {
        //文字の部分一致判定処理
        const serachMatch = item.title.toLowerCase().includes(serach.toLowerCase()) ||
            item.description.toLowerCase().includes(serach.toLowerCase());
        //絞り込みの種類
        const completeMatch = filter == "completed";
        const uncompleteMatch = filter == "uncompleted";
        if (completeMatch) return serachMatch && item.completed;
        else if (uncompleteMatch) return serachMatch && !item.completed;
        return serachMatch;
    })
    //並び替え後の配列
    const sortList = filterList.sort((a, b) => {
        switch (sortKey) {
            case "created_at":
                return new Date(b.created_at) - new Date(a.created_at);
            case "updated_at":
                return new Date(b.updated_at) - new Date(a.updated_at);
            case "name":
                return a.title.localeCompare(b.title, "ja");
            case "completed":
                //同じならそのまま追加、違うなら完了状態を先に追加するその後未完了追加
                return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
            default:
                return 0;
        }
    })
    //todoListデータ保存
    const saveCSV = () => {
        const header = Object.keys(sortList[0]).join(",") + "\n";
        let result = header;
        for (const row of sortList) {
            result += row.id + ",";
            result += row.title + ",";
            result += row.description + ",";
            result += row.completed + ",";
            result += row.created_at + ",";
            result += row.updated_at + ",";
            result += "\r\n";
        }
        const blob = new Blob([result], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "tasks.csv";
        link.click();
    }
    const saveJSON = () => {
        const json = JSON.stringify(sortList,null,2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "task.json";
        link.click();
    }
    const handleClickExportData = (format) => {
        if (format == "JSON") {
            saveJSON();
        } else {
            saveCSV();
        }
    }


    return {
        list,
        handleClickAdd,
        handleClickEdit,
        handleClickDelete,
        handleClickComplete,
        handleClickMultiDelete,
        handleChangeFilter,
        handleChangeSerach,
        handleChangeSort,
        toggleMultiSelectMode,
        toggleSelectCompleteId,
        toggleSelectDeleteId,
        handleClickExportData,
        selectedCompleteIds,
        selectedDeleteIds,
        message,
        isMultiSelectMode,
        isLoading,
        filter,
        sortKey,
        filterList: sortList,
    }
}