import { IWheelAx } from "@/interfaces/objectSettings"
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import {
  createWheel,
  removeAxle,
} from "../../../../../../../store/reducers/objectSettings/objectSettings"
import { AxleSide } from "./AxleSide"
import { Plus } from "./icons/Plus"

interface IAxle {
  data: IWheelAx
  changeAxle?: () => void
}

export const Axle = ({ data, changeAxle }: IAxle) => {
  const dispatch = useDispatch<AppDispatch>()
  console.log(data)

  // Определение высоты каждой из сторон
  const leftSideHeight = Math.ceil(data.wheels.length / 2)
  const rightSideHeight = data.wheels.length - leftSideHeight

  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          gridTemplateColumns: "46% 8% 46%",
        }}
        className=" grid grid-cols-3 w-1/2 gap-10 justify-start items-center relative"
      >
        <div className=" grid-cols-2 items-center justify-end  ">
          <div
            style={{
              gridTemplateColumns: "5% 70%",
            }}
            className="flex items-center justify-end "
          >
            <div
              onClick={() =>
                dispatch(
                  createWheel({
                    position: "left",
                    id: data.innerAxleId ? data.innerAxleId : data.id,
                  }),
                )
              }
              className="border-2  border-gray-300 mx-5 h-20 w-10 flex items-center justify-center"
            >
              <Plus fill="black" width={20} />
            </div>
            <div className="ml-3">
              {data.wheels.slice(0, leftSideHeight).map((item, index) => (
                <AxleSide key={index} side={item} position="L" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 items-center justify-center">
          <div className="w-0.5 h-20 bg-gray-400"></div>
          <div className="w-0.5 h-20 bg-gray-400"></div>
        </div>

        <div className=" items-center ">
          <div
            style={{
              gridTemplateColumns: "70% 5%",
            }}
            className="flex items-center justify-start  "
          >
            <div className="mr-3">
              {data.wheels.slice(leftSideHeight).map((item, index) => (
                <AxleSide key={index} side={item} position="R" />
              ))}
            </div>
            <div
              onClick={() =>
                dispatch(
                  createWheel({
                    position: "right",
                    id: data.innerAxleId ? data.innerAxleId : data.id,
                  }),
                )
              }
              className="border-2 border-gray-300 mx-5 h-20 w-10 flex items-center justify-center"
            >
              <Plus fill="black" width={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full ">
        <div
          onClick={() => dispatch(removeAxle(data.innerAxleId ? data.innerAxleId : data.id))}
          className="icon-delete relative aspect-square w-fit p-1 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded  bg-white  text-red-500 "
        ></div>
      </div>
    </div>
  )
}
