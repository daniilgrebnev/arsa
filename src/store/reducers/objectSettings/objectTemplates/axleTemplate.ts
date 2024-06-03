import { IWheelAx } from "@/interfaces/objectSettings"
import { wheelCreator } from "./wheelTemplate"

interface ICreateAxle extends IWheelAx {
  innerAxleId: number
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const axleTemplate: ICreateAxle = {
  id: 0,
  innerAxleId: 0,
  pressure_norm: 0,
  pressure_delta: 0,
  temperature_max: 0,
  wheels: [],
}

export const axleCreator = (): ICreateAxle => {
  const newWheels = [[wheelCreator()], [wheelCreator()]]
  const newAxle: ICreateAxle = {
    ...axleTemplate,
    wheels: newWheels,
    innerAxleId: getRandomNumber(-40_000, -10_000),
  }
  return newAxle
}
