import { NavLink } from "react-router-dom"
import { SettingsOpenHandler } from "../Settings/SettingsOpenHandler"
import "./style.css"

interface INavItem {
  title: string
  link: string
}

const Header = () => {
  const navItems: INavItem[] = [
    {
      title: "СКДШ",
      link: "/table",
    },
    {
      title: "Трек",
      link: "/map",
    },
  ]

  return (
    <header className="bg-gray-200 w-full min-h-5 border-b-orange-400 border-b-[1px] px-4 flex items-center justify-start h-[6vh]">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-3 ">
          {navItems.map((item: INavItem, index: number) => (
            <NavLink className="relative" to={item.link} key={index}>
              {item.title}
            </NavLink>
          ))}
        </div>
        <SettingsOpenHandler />
      </nav>
    </header>
  )
}

export default Header
