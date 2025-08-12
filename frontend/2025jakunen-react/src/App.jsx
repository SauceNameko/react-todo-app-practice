import './App.css'
import { Route, Routes } from "react-router-dom"
import { AddItemScene } from './components/AddItemScene';
import { EditItemScene } from './components/EditItemScene';
import { Home } from './components/Home';
import { useTask } from './context/TaskContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useEffect } from 'react';

function App() {
  const { message, isLoading } = useTask();
  const { isDarkMode, handleClickThemeChange } = useLocalStorage();
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading])
  return (
    <>
      {!isLoading ?
        <div className={`h-full ${isDarkMode ? "bg-gray-700 text-white" : "bg-white"}`}>
          <div className='flex flex-col items-center '>
            {message != "" ? <div className='text-red-600 text-2xl'>エラー: {message}</div> : ""}
            <Routes>
              <Route path='/' element={<Home onThemeChange={handleClickThemeChange} />}></Route>
              <Route path='/add' element={<AddItemScene />}></Route>
              <Route path='/edit/:id' element={<EditItemScene />}></Route>
            </Routes>
          </div>
        </div >
        :
        <div className='h-screen w-full flex items-center justify-center'>
          <div className=' w-[200px] h-[200px] 
              rounded-full 
              border-[3px] border-sky-500 border-l-transparent
              animate-spin'>
          </div>
        </div>
      }
    </>
  )
}

export default App
