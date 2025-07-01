import { Link } from "react-router-dom";

export const ListItem = ({ item }) => {
    return (
        <div className="w-[30%] mb-6 rounded-2xl shadow border border-gray-400 bg-white overflow-hidden">
            <div className="bg-sky-500 text-white text-[18px] font-semibold px-4 py-3">
                {item.title}
            </div>
            <div className="px-5 py-4 text-gray-800 text-base">
                {item.description}
            </div>
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
                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                >
                    削除
                </button>
            </div>
        </div>
    );
};
