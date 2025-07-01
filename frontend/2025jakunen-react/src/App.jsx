import './App.css'
import { Route, Link, Routes } from "react-router-dom"
import { AddItemScene } from './components/AddItemScene';
import { EditItemScene } from './components/EditItemScene';
import { Home } from './components/Home';
import { useTask } from './hooks/useTask';
function App() {
  const { list, getData, handleClickAdd, handleClickEdit } = useTask();
  return (
    <div className='flex flex-col items-center mt-[60px]'>
      <Routes>
        <Route path='/' element={<Home list={list} getData={getData} />}></Route>
        <Route path='/add' element={<AddItemScene handleClickAdd={handleClickAdd} />}></Route>
        <Route path='/edit/:id' element={<EditItemScene list={list} handleClickEdit={handleClickEdit} />}></Route>
      </Routes>

    </div>
  )
}

export default App
