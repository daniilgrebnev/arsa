import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router"
import { Layout } from "./components/Layout/Layout"
import { Main } from "./pages/Main"
import { MapPage } from "./pages/Map"
import { Table } from "./pages/Table"
import { thunkGetVehicle } from "./store/reducers/security/securityThunk"

import { RootState } from "./store/store"

function App() {
  const dispatch: any = useDispatch()
  const { isAuth } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuth) {
      dispatch(thunkGetVehicle())
    }
  }, [isAuth])
  return (
    <>
      {/* <div className="absolute w-screen z-[2000] h-screen bg-gray-100 top-0 left-0 flex items-center justify-center">
        <TableTestUI />
      </div> */}

      <Layout>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/map" element={<MapPage />}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
