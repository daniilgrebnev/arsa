import { IObjectWheel } from "@/interfaces/objectSettings"

interface INewWheel extends IObjectWheel {
  innerWheelId: number
}

const wheelTemplate: IObjectWheel = {
  id: 0,
  innerAxleId: 0,
  position: "",
  sensor_number: 0,
  innerWheelId: 0,
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const wheelCreator = (position: "R" | "L"): INewWheel => {
  let newWheel: INewWheel = {
    ...wheelTemplate,
    innerWheelId: getRandomNumber(-40_000, -10_000),
    position: position,
  }

  return newWheel
}
