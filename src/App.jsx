import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AuthService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import{Header,Footer} from "./components"
import { Outlet } from "react-router-dom"

function App() {


  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
      AuthService.getCurrentUser()
      .then((userData)=>{
        if (userData) {
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=> setLoading(false))
  },[dispatch])

   
  return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
       <div className="w-full block text-black">
           <Header/>
           <main>
           TODO:  <Outlet />
           </main>
           <Footer/>
       </div>
   </div>
   )
  : null;

}

export default App
