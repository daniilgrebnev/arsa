import { WheelPressure } from "@/interfaces/table"
import React from "react"
import { CircleIndicator, colorInit } from "./CircleIndicator"

interface IProps {
  data: WheelPressure[]
  valid_period: number
}

export const CircleIndicatorContainer: React.FC<IProps> = ({ data, valid_period }) => {
  if (!data || data.length === 0) {
    return null // Ничего не отображать, если данных о шинах нет
  }

  // Группируем данные по цветам
  const groupedByColor = data.reduce((acc, wheel) => {
    let colorName = colorInit({
      press: wheel.press,
      d: wheel.d,
      valid_period,
      norm: wheel.norm,
      delta: wheel.delta,
    }).colorName
    // Объединяем оба варианта красного цвета

    if (!acc[colorName]) {
      acc[colorName] = []
    }
    acc[colorName].push(wheel)
    return acc
  }, {})

  // Определяем порядок цветов в соответствии с количеством элементов
  const sortedColors = Object.keys(groupedByColor).sort(
    (a, b) => groupedByColor[b].length - groupedByColor[a].length
  )

  // Проверяем, есть ли зеленые круговые индикаторы

  // Если есть зеленые круговые индикаторы, перемещаем их в начало списка цветов

  // Формируем отсортированный массив круговых индикаторов
  const sortedCircles = sortedColors.map((color) => groupedByColor[color]).flat()

  // Отображаем компоненты в нужном порядке цветов
  return (
    <div className="flex grid-row-1 items-center justify-left gap-1 p-1">
      {sortedCircles.map((item, index) => (
        <div className="w-full max-w-4">
          <CircleIndicator
            key={`${item.color}-${index}`}
            press={item.press}
            delta={item.delta}
            norm={item.norm}
            d={item.d}
            valid_period={valid_period}
          />
        </div>
      ))}
    </div>
  )
}
