import './App.css'
import { Route, Link, Routes } from "react-router-dom"
import { AddItemScene } from './components/AddItemScene';
import { EditItemScene } from './components/EditItemScene';
import { Home } from './components/Home';
import { useTask } from './hooks/useTask';

function App() {
  const { list,
    getData,
    handleClickAdd,
    handleClickEdit,
    handleClickDelete,
    message
  } = useTask();

  return (
    <div className='flex flex-col items-center mt-[60px]'>
      {message != "" ? <div className='text-red-600 text-2xl'>エラー: {message}</div> : ""}
      <Routes>
        <Route path='/' element={<Home list={list} getData={getData} handleClickDelete={handleClickDelete} />}></Route>
        <Route path='/add' element={<AddItemScene handleClickAdd={handleClickAdd} />}></Route>
        <Route path='/edit/:id' element={<EditItemScene list={list} handleClickEdit={handleClickEdit} />}></Route>
      </Routes>

    </div>
  )
}

export default App
