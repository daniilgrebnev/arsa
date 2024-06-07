import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router"
import { Layout } from "./components/Layout/Layout"
import { Main } from "./pages/Main"

import { Table } from "./pages/Table"
import { thunkGetVehicle } from "./store/reducers/security/securityThunk"

import { RootState } from "./store/store"
import { MapPage } from "./pages/Map"
import { thunkAuth } from "./store/reducers/auth/authThunk"

function App() {
  const dispatch: any = useDispatch()
  const { isAuth } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // dispatch(thunkAuth({ login: "1111", password: "3423", mobile_phone: "" }))
    if (isAuth) {
      dispatch(thunkGetVehicle())
    }
  }, [isAuth])
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/map" element={<MapPage />}></Route>
          <Route path="/asd" element={<MapPage />}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
