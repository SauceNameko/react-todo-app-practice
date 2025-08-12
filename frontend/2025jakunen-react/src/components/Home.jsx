import { Link } from "react-router-dom"
import { ListItem } from "./ListItem"
import { useTask } from "../context/TaskContext"
import { useRef } from "react"
export const Home = ({ onThemeChange }) => {
    const formatRef = useRef(null);
    const {
        filterList,
        toggleMultiSelectMode: onMultiSelectMode,
        isMultiSelectMode,
        handleClickComplete: onComplete,
        handleClickMultiDelete: onMultiDelete,
        filter,
        handleChangeFilter: onFilter,
        handleChangeSerach: onSerach,
        handleChangeSort: onSort,
        handleClickExportData: onExportData,
        sortKey
    } = useTask();

    return (
        <div className="w-full flex flex-col items-center px-4">
            <h1 className="text-6xl font-bold my-10 text-center">Todoアプリ</h1>
            <div className="flex items-center w-2/4 justify-around">
                <Link to={"/add"} className="px-10 py-4 rounded-2xl bg-pink-300 hover:bg-pink-400 text-white transition mb-10 text-[18px]">
                    <button>
                        タスク追加画面へ
                    </button>
                </Link>
                <button className="px-10 py-4 rounded-2xl 
                bg-sky-300 hover:bg-sky-400 
                text-white transition mb-10 text-[18px]"
                    onClick={onThemeChange}
                >テーマ切り替え</button>
            </div>
            <div className="flex justify-around w-2/4">
                <button onClick={onMultiSelectMode} className="px-10 
            py-4 rounded-2xl bg-yellow-600 
            hover:bg-yellow-700 text-white 
            transition mb-10 text-[18px]" >{isMultiSelectMode ? "終了" : "複数選択モード"}</button>
                {isMultiSelectMode &&
                    <>
                        <button className="px-10 py-4 
                        rounded-2xl bg-orange-300 
                        hover:bg-orange-400 text-white 
                        transition mb-10 text-[18px]"
                            onClick={onComplete}
                        >
                            完了ステータスを変更
                        </button>
                        <button className="px-10 py-4 
                        rounded-2xl bg-red-500 hover:bg-red-700 
                        text-white transition mb-10 text-[18px]"
                            onClick={onMultiDelete}
                        >
                            一括削除
                        </button>
                    </>
                }
            </div>
            <div className="my-5 flex justify-between items-center bg-gray-100 px-5 py-3">
                <div>
                    <span className="text-gray-700">保存形式：</span>
                    <select name="format" id="format" className="
                    px-4 py-2 text-gray-700 bg-white 
                    border border-gray-300 rounded-md
                    shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-blue-500
                    " ref={formatRef}>
                        <option value="JSON">JSON</option>
                        <option value="CSV">CSV</option>
                    </select>
                </div>
                <button className="bg-purple-400 
                rounded-sm text-white cursor-pointer
                px-3 py-2 ml-3"
                    onClick={() => onExportData(formatRef.current.value)} >タスク保存</button>
                {/* 絞り込み */}
                <select name="" id="" className="px-4 py-2 text-gray-700 bg-white 
                border border-gray-300 rounded-md
                shadow-sm focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-blue-500 ml-3"
                    value={filter}
                    onChange={onFilter}
                >
                    <option value=" ">すべて</option>
                    <option value="uncompleted">未完了</option>
                    <option value="completed">完了</option>
                </select>

                <select name="" id="" className="px-4 py-2 text-gray-700 bg-white 
                border border-gray-300 rounded-md
                shadow-sm focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-blue-500
                ml-3"
                    value={sortKey}
                    onChange={onSort}
                >
                    <option value="created_at">作成日時</option>
                    <option value="updated_at">更新日時</option>
                    <option value="name">名前</option>
                    <option value="completed">完了状態</option>
                </select>

                <div className="ml-3">
                    <label htmlFor="search" className="text-gray-700">タスク検索：</label>
                    <input type="text" name="search" id="search"
                        className="bg-white text-gray-700 border
                         border-gray-300 foucs:border-blue-500
                         focus:ring-blue-500 focus:outline-none
                          focus:outline-none focus:ring-2"
                        onChange={onSerach}
                    />
                </div>

            </div>
            <div className="todo-list w-full flex flex-col items-center gap-6">
                {filterList.map((item, index) => (
                    <ListItem key={index} item={item} />
                ))}
            </div>
        </div>
    )
}
