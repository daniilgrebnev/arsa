import { Layout } from "./components/Layout/Layout"

import { useSelector } from "react-redux"
import { Main } from "./pages/Main"
import { MapPage } from "./pages/Map"
import { Table } from "./pages/Table"
import { RootState } from "./store/store"

function App() {
  // const dispatch: any = useDispatch()
  // const { isAuth } = useSelector((state: RootState) => state.auth)
  const { page } = useSelector((state: RootState) => state.router)
  return (
    <>
      <Layout>
        <>
          {page === "main" && <Main />}
          {page === "tpms" && <Table />}
          {page === "map" && <MapPage />}
        </>
      </Layout>
    </>
  )
}

export default App
