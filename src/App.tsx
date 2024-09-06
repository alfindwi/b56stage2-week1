import { useEffect } from "react"
import { useAppDispatch } from "./hooks/use-store"
import { AppRoute } from "./routes"
import { setUser } from "./store/auth-slice"

function App() {
  const dispatch = useAppDispatch()
  
  async function checkAuth() {
    const id = Number(localStorage.getItem("id") as string);
    const email = localStorage.getItem("email") as string ;
    const fullname = localStorage.getItem("fullname") as string ;
    dispatch(setUser({
      id,
      email,
      fullname,
    }))
  }

  useEffect(() => {
    checkAuth()
  }, [])

  
  return (
    <AppRoute/>
  )
}


export default App
