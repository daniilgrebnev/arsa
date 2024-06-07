import { Route, Routes } from "react-router"
import { Layout } from "./components/Layout/Layout"
import { Main } from "./pages/Main"

import { Table } from "./pages/Table"



function App() {
  // const dispatch: any = useDispatch()
  // const { isAuth } = useSelector((state: RootState) => state.auth)



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
