import { useRef } from "react";

export const AddItemScene = ({ handleClickAdd }) => {
    const title = useRef();
    const description = useRef();
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">タスクを追加</h2>

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
                />
            </div>

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                onClick={() => handleClickAdd(title.current.value, description.current.value)}
            >
                追加する
            </button>
        </div>
    );
}
