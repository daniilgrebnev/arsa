import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import { TPages, setRoutePage } from "../store/reducers/routing/routerSlice"

interface IPages {
  page: string
  image: string
  link: TPages
}

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>()
  const items: IPages[] = [
    {
      page: "СКДШ",
      image: "images/TPMS.png",
      link: "tpms",
    },
    {
      page: "Карта",
      image: "images/map.png",
      link: "map",
    },
  ]
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        style={{
          gridTemplateColumns: "repeat(5, 250px)",
        }}
        className="w-full  p-10 mx-auto gap-7 flex flex-wrap items-center justify-center"
      >
        {items.map((page, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => dispatch(setRoutePage(page.link))}
          >
            <div className=" w-[300px] h-[200px]  border border-orange-600 mx-auto rounded-lg overflow-hidden transition-all hover:bg-gray-100">
              <img
                className="w-full h-4/5 rounded-lg p-1 overflow-hidden  mx-auto"
                src={page.image}
                alt="СКДШ"
              />
              <div className="text-center h-1/5 flex items-center justify-center border-t border-t-orange-600 max-h-[50px] ">
                {page.page}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
