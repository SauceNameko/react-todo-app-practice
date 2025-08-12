import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { useTask } from "../context/TaskContext";

export const EditItemScene = () => {
    const { list, handleClickEdit: onEdit } = useTask();
    const [item, setItem] = useState([]);
    const title = useRef();
    const description = useRef();
    const { id } = useParams();
    const [isChecked, setIsChecked] = useState(false);
    //現在のタスクデータを抽出
    useEffect(() => {
        if (list.length == 0) return;
        const data = list.find(value => value.id == id);
        setItem(data);
        setIsChecked(data.completed);
    }, [list]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-gray-700">
            <h2 className="text-3xl font-semibold mb-6 text-center">タスクを編集</h2>

            <div className="mb-4">
                <label htmlFor="title" className="text-[20px] font-medium text-gray-700 mb-2">
                    タイトル
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="タイトルを入力"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    ref={title}
                    defaultValue={item.title}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    詳細情報
                </label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="タスクの詳細情報を入力"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    ref={description}
                    defaultValue={item.description}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="completed" className="text-sm font-medium text-gray-700 mb-1">
                    タスク完了
                </label>
                <input type="checkbox"
                    name="completed"
                    id="completed"
                    className="mx-2"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
            </div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                onClick={() =>
                    onEdit(
                        id,
                        title.current.value,
                        description.current.value,
                        isChecked
                    )}
            >
                編集する
            </button>
        </div>
    );
}