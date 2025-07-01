import { Link } from "react-router-dom"
import { ListItem } from "./ListItem"
import { useEffect } from "react";

export const Home = ({ list, getData }) => {
    //ホームに戻るたびに画面更新
    useEffect(() => {
        getData()
    }, []);
    return (
        <div className="w-full flex flex-col items-center px-4">
            <h1 className="text-6xl font-bold my-10 text-center">Todoアプリ</h1>
            <Link to={"/add"}>
                <button className="px-10 py-4 rounded-2xl bg-pink-300 hover:bg-pink-400 transition mb-10 text-[18px]">
                    タスク追加画面へ
                </button>
            </Link>
            <div className="todo-list w-full flex flex-col items-center gap-6">
                {list.map((item, index) => (
                    <ListItem key={index} item={item} />
                ))}
            </div>
        </div>
    )
}
