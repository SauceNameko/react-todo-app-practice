import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";

export const ListItem = ({ item }) => {
    const { isMultiSelectMode,
        handleClickDelete: onDelete,
        toggleSelectCompleteId,
        toggleSelectDeleteId } = useTask();
    return (
        <>
            <div className="w-[30%] mb-6 rounded-2xl shadow border border-gray-400 bg-white overflow-hidden">
                <div className={`bg-sky-500 text-white text-[18px] font-semibold px-4 py-3 ${item.completed ? "line-through" : ""}`}>
                    {item.title}
                </div>
                <div className={`px-5 py-4 text-gray-800 text-base ${item.completed ? "line-through" : ""}`}>
                    {item.description}
                </div>
                {isMultiSelectMode ?
                    <>
                        <div className="px-5 flex items-center gap-2 text-gray-700 text-sm mb-2">
                            <input
                                type="checkbox"
                                defaultChecked={item.completed}
                                className="form-checkbox h-4 w-4 text-green-600"
                                onChange={() => toggleSelectCompleteId(item.id)}
                                id={`checkbox-completed-${item.id}`}
                            />
                            <label htmlFor={`checkbox-completed-${item.id}`}>: 完了選択</label>
                        </div>
                        <div className="px-5 flex items-center gap-2 text-red-700 text-sm mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-orange-600"
                                onChange={() => toggleSelectDeleteId(item.id)}
                                id={`checkbox-delete-${item.id}`}
                            />
                            <label htmlFor={`checkbox-delete-${item.id}`}>: 削除選択</label>
                        </div>
                    </>
                    : ""}



                <div className="px-5 pb-4 text-sm text-gray-500 flex justify-end">
                    {item.created_at}
                </div>

                <div className="px-5 pb-4 mt-2 flex justify-end gap-3">
                    <Link to={`/edit/${item.id}`}>
                        <button
                            className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
                        >
                            編集
                        </button>
                    </Link>
                    <button
                        className="px-3 py-1 text-sm bg-red-500 hover:bg-red-700 text-white rounded"
                        onClick={() => onDelete(item.id)}
                    >
                        削除
                    </button>
                </div>
            </div>
        </>
    );
};
