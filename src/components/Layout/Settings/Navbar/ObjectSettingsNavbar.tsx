import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { setActiveMenuTab } from "../../../../store/reducers/objectSettings/objectSettings"
import { settingsMenu } from "../menuData"

export const ObjectSettingsNavbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { activeTab, dataToView } = useSelector((state: RootState) => state.objectSettings)

  const data = [...settingsMenu]
  return (
    <div
      style={{
        boxShadow: "0px 0px 30px 10px #bebcbc",
      }}
      className="w-1/5 h-fit font-light"
    >
      <div className="w-[100%] h-[96%] overflow-hidden bg-gray-100 mx-auto rounded-sm flex items-center justify-start gap-5 flex-col py-10">
        {dataToView?.map((i) => (
          <div
            key={i.title}
            style={{
              boxShadow: activeTab == i.tab ? "0px 0px 20px 0px #f2f0f0" : "",
            }}
            onClick={() => dispatch(setActiveMenuTab(i.tab))}
            className={`w-[90%] ml-0 left-0 relative cursor-pointer text-nowrap py-3 px-10 rounded-sm transition-all hover:bg-white ${activeTab == i.tab && "bg-white py-5 font-base left-6 text-lg transition-all w-[100%] hover:bg-white"}`}
          >
            {i.title}
          </div>
        ))}
      </div>
    </div>
  )
}
