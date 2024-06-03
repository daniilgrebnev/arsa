import { ITableData, WheelPressure } from "@/interfaces/table"

enum PressureCategory {
  GREEN,
  YELLOW,
  RED,
}

const getCategory = (pressure: WheelPressure): PressureCategory => {
  if (pressure.delta && pressure.press !== undefined && pressure.norm !== undefined) {
    const diff = Math.abs(pressure.press - pressure.norm)
    if (diff <= pressure.delta) {
      return PressureCategory.GREEN
    } else if (diff <= pressure.delta) {
      // Предупреждение при превышении допустимого значения на не более чем 2*delta
      return PressureCategory.YELLOW
    }
  }
  return PressureCategory.RED
}

const getCategoryCount = (pressures: WheelPressure[]): [number, number, number] => {
  let greenCount = 0
  let yellowCount = 0
  let redCount = 0
  for (const pressure of pressures) {
    if (pressure.press == null || !pressure.press) {
      yellowCount++ // Если данные о давлении отсутствуют, считаем желтыми
    } else {
      const category = getCategory(pressure)
      if (category === PressureCategory.GREEN) {
        greenCount++
      } else if (category === PressureCategory.RED) {
        redCount++
      }
    }
  }
  return [redCount, yellowCount, greenCount]
}

const sortByWheelPressure = (data: ITableData[], direction?: boolean): ITableData[] => {
  const newData = [...data] // Копируем исходный массив
  newData.sort((a, b) => {
    const [aGreen, aYellow, aRed] = getCategoryCount(a.wheel_pressure)
    const [bGreen, bYellow, bRed] = getCategoryCount(b.wheel_pressure)

    if (a.wheel_pressure.length === 0 && b.wheel_pressure.length === 0) {
      return 0 // Если оба массива пусты, сохраняем текущий порядок
    }

    if (a.wheel_pressure.length === 0) {
      return direction ? 1 : -1 // Если только у первого элемента пустой массив, то он должен быть в конце
    }

    if (b.wheel_pressure.length === 0) {
      return direction ? -1 : 1 // Если только у второго элемента пустой массив, то он должен быть в конце
    }

    if (direction) {
      if (aRed !== bRed) {
        return aRed - bRed
      }
      if (aGreen !== bGreen) {
        return aGreen - bGreen
      }
      if (aYellow !== bYellow) {
        return aYellow - bYellow
      }
    } else {
      if (aGreen !== bGreen) {
        return bGreen - aGreen
      }
      // Сначала сортируем по количеству красных в убывающем порядке
      if (aRed !== bRed) {
        return bRed - aRed
      }
      if (aYellow !== bYellow) {
        return bYellow - aYellow
      }
    }

    // Затем по количеству зеленых в убывающем порядке
    // Потом по количеству желтых в убывающем порядке
    return 0 // Если все категории одинаковы, сохраняем текущий порядок
  })

  // Перемещаем элементы с полностью желтыми массивами вниз
  if (direction) {
    newData.sort((a, b) => {
      if (
        getCategoryCount(a.wheel_pressure)[1] === a.wheel_pressure.length &&
        getCategoryCount(b.wheel_pressure)[1] !== b.wheel_pressure.length
      ) {
        return 1
      }
      if (
        getCategoryCount(b.wheel_pressure)[1] === b.wheel_pressure.length &&
        getCategoryCount(a.wheel_pressure)[1] !== a.wheel_pressure.length
      ) {
        return -1
      }
      return 0
    })
  } else {
    newData.sort((a, b) => {
      if (
        getCategoryCount(a.wheel_pressure)[1] === a.wheel_pressure.length &&
        getCategoryCount(b.wheel_pressure)[1] !== b.wheel_pressure.length
      ) {
        return -1
      }
      if (
        getCategoryCount(b.wheel_pressure)[1] === b.wheel_pressure.length &&
        getCategoryCount(a.wheel_pressure)[1] !== a.wheel_pressure.length
      ) {
        return 1
      }
      return 0
    })
  }

  return newData
}

// Merge sorted groups back into one array, preserving the order

export const tableSort = (dataArr: ITableData[], sortName: string, direction: boolean) => {
  let data = [...dataArr]
  switch (sortName) {
    case "category_name":
      data.sort((a: any, b: any) => {
        return a.category_id - b.category_id
      })

      break
    case "vehicle_name":
      // Сортировка по полю vehicle_name
      data.sort((a, b) => {
        return a.vehicle_name.localeCompare(b.vehicle_name)
      })
      break
    case "last_event_date":
      // Сортировка по полю last_event_date
      data.sort((a, b) => {
        return a.last_event_date - b.last_event_date
      })
      break
    case "axes_count":
      // Сортировка по полю axes_count
      data.sort((a, b) => {
        return a.axes_count - b.axes_count
      })
      break
    case "press":
      data = sortByWheelPressure(data, direction)

      break

    case "t-delta":
      // Сортировка по полю t-delta
      // data.sort((a, b) => {
      //     // Ваша логика сортировки по полю t-delta
      //     // Верните отрицательное число, если a меньше b, положительное, если a больше b, и 0, если они равны
      // });
      break
    case "t-wheel_model_names":
      data.sort((a, b) => {
        // Получаем значения wmn первого элемента массива wheel_pressure или undefined, если массив пуст
        const wmnA = a.wheel_pressure.length > 0 ? a.wheel_pressure[0].wmn : undefined
        const wmnB = b.wheel_pressure.length > 0 ? b.wheel_pressure[0].wmn : undefined

        // Если один из элементов имеет пустой массив wheel_pressure, помещаем его в конец
        if (wmnA === undefined && wmnB !== undefined) {
          return 1
        }
        if (wmnA !== undefined && wmnB === undefined) {
          return -1
        }

        // Сравниваем значения wmn и возвращаем результат сравнения
        if (wmnA && wmnB && wmnA < wmnB) {
          return -1
        }
        if (wmnA && wmnB && wmnA > wmnB) {
          return 1
        }
        return 0
      })
      break
    default:
  }

  return direction ? data : data.reverse()
}
