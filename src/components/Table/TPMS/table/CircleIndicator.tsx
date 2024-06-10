import { WheelPressure } from "@/interfaces/table"
import { DateTime } from "ts-luxon"
import Arrow from "./Icons/Arrow"

interface IPropsWP extends WheelPressure {
  valid_period: number
}

export const colorInit = ({ press, norm, delta, d, valid_period }: IPropsWP) => {
  const yellow = d && DateTime.now().toSeconds() - d >= valid_period // Задержка больше 30 минут
  const green = press && norm && delta && press >= norm - delta && press <= norm + delta // Давление в пределах нормы с учетом дельта
  const redUp = press && norm && delta && press >= norm + delta // Давление выше нормы с учетом дельта
  const redDown = (press && norm && delta && press <= norm - delta) || press == (null || 0) // Давление ниже нормы с учетом дельта
  const gray = d === 0 || d === null // Задержка равна 0 или не определена

  let color!: string
  let arrowDirection: string | null = null
  let colorName!: string

  if (yellow) {
    color = "bg-amber-400"
    colorName = "yellow"
  } else if (redUp || redDown) {
    color = "bg-red-600"
    arrowDirection = !redUp ? "up" : "down"
    colorName = "red"
  } else if (green) {
    color = "bg-green-600"
    colorName = "green"
  } else if (gray) {
    color = "bg-gray-400"
    colorName = "gray"
  } else {
    color = "bg-pink-600"
  }
  return { color, arrowDirection, colorName }
}

export const CircleIndicator = ({ press, norm, delta, d, valid_period }: IPropsWP) => {
  const { color, arrowDirection } = colorInit({ press, norm, delta, d, valid_period })

  return (
    <div
      className={` text-white h-auto transition-all aspect-square max-h-5 rounded-full relative flex items-center justify-center ${color}`}
    >
      {arrowDirection && arrowDirection == "up" && (
        <div className="  w-full h-full flex items-center  justify-center rotate-180">
          <Arrow fill="white" width="50%" />
        </div>
      )}
      {arrowDirection && arrowDirection == "down" && (
        <div className="  w-full h-full flex items-center transition-all justify-center">
          <Arrow fill="white" width="50%" />
        </div>
      )}
    </div>
  )
}
