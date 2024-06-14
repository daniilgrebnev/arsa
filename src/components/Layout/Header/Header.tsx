import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { TPages, setRoutePage } from "../../../store/reducers/routing/routerSlice"
import { SettingsOpenHandler } from "../Settings/SettingsOpenHandler"
import "./style.css"

interface INavItem {
  title: string
  link: TPages
}

const Header = () => {
  const { page } = useSelector((state: RootState) => state.router)
  const dispatch = useDispatch<AppDispatch>()
  const navItems: INavItem[] = [
    {
      title: "СКДШ",
      link: "tpms",
    },
    {
      title: "Трек",
      link: "map",
    },
  ]

  return (
    <header className="bg-gray-200 w-full min-h-5 border-b-orange-400 border-b-[1px] px-4 flex items-center justify-start h-[6vh]">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-3 ">
          {navItems.map((item: INavItem, index: number) => (
            <div
              onClick={() => dispatch(setRoutePage(item.link))}
              className={`relative cursor-pointer ${page == item.link && "border-b border-b-orange-500 text-orange-500"}`}
              key={index}
            >
              {item.title}
            </div>
          ))}
        </div>
        <SettingsOpenHandler />
      </nav>
    </header>
  )
}

export default Header
