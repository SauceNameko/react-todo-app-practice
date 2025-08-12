import { createContext, useContext } from "react";
import { useTaskLogic } from "../hooks/useTaskLogic"
const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
    const task = useTaskLogic();
    return (
        <TaskContext.Provider value={task}>
            {children}
        </TaskContext.Provider>
    )
}
export const useTask = () => {
    return useContext(TaskContext);
}