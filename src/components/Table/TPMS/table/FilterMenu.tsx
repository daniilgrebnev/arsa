import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { getActiveTires } from "../../../../helpers/getActiveTires"
import { FilterMenuItem } from "./tires/FilterMenuItem"

interface IFilterItems {
  filterName: string | string[]
  label: string
  children?: IFilterItems[]
}

interface IFilter {
  first: IFilterItems[]
  second: IFilterItems[]
  third: IFilterItems[]
  four: IFilterItems[]
}

function extractWheels(data) {
  // Создаем объект для хранения уникальных колес
  const wheels = {}

  // Проходимся по каждой строке в массиве данных
  data.forEach((entry) => {
    // Разбиваем строку на отдельные элементы
    const elements = entry.split("; ")

    // Проходимся по каждому элементу
    elements.forEach((element) => {
      // Убираем лишние пробелы
      const wheel = element.trim()

      // Добавляем колесо в объект, если оно уникально
      if (!wheels[wheel]) {
        wheels[wheel] = true
      }
    })
  })

  // Возвращаем массив уникальных колес
  return Object.keys(wheels)
}

export const FilterMenu = () => {
  const data = useSelector((state: RootState) => state.table.data)
  const tires = getActiveTires(typeof data != "string" ? data : [])

  const filterNames = tires.map((tire) => `tire-${tire}`)

  const filters: IFilter = {
    first: [
      {
        filterName: "allNorm",
        label: "Все шины в норме",
      },
      {
        filterName: "allNotNorm",
        label: "Вне нормы",
      },

      {
        filterName: "olderData",
        label: "Устаревшие данные",
      },
      {
        filterName: "noSensors",
        label: "Нет датчиков",
      },
      {
        filterName: "sensorsWrong",
        label: "Не верная настройка датчиков",
      },
    ],
    second: [
      {
        filterName: "noData",
        label: "Нет данных",
      },
      {
        filterName: "delay30minFromTS",
        label: "Задержка данных от 30 минут",
      },
      {
        filterName: "noDataFromTS",
        label: "Нет данных от машины от 30 минут",
      },
      {
        filterName: ["truck", "auto", "tractor"],
        label: "Типы",
        children: [
          {
            filterName: "truck",
            label: "Грузовые",
          },
          {
            filterName: "auto",
            label: "Легковые",
          },
          {
            filterName: "tractor",
            label: "Трактор",
          },
        ],
      },
    ],
    third: [
      {
        filterName: "workWithCard",
        label: "Водитель зарегистрирован",
      },
      {
        filterName: "workWithoutCard",
        label: "Работа без карты водителя",
      },
      {
        filterName: "cardWithoutDriver",
        label: "C картой водителя",
      },
    ],
    four: [
      {
        filterName: filterNames,
        label: "Используемые шины",
        children: [],
      },
      {
        filterName: "noDataFromTire",
        label: "Нет данных о шине",
      },
    ],
  }
  const tiresChildren: any = []
  for (let i = 0; i < tires.length; i++) {
    const currentTire = tires[i]
    const currentTireChild = {
      label: currentTire,
      filterName: `tire-${currentTire}`,
    }
    filters.four[0].children?.push(currentTireChild)
  }

  return (
    <div className=" flex items-start mt-3 gap-1 justify-center relative">
      <div className="text-left text-nowrap bg-gray-100 box-shadow-lg p-1 rounded-lg">
        <div className="text-center mb-4">Давление</div>
        {filters.first.map((item, index) => (
          <div className="" key={index}>
            {<FilterMenuItem label={item.label} filterName={item.filterName} />}
          </div>
        ))}
      </div>
      <div className="bg-gray-100 box-shadow-lg p-1 rounded-lg">
        <div className="text-center mb-4">Информация о ТС</div>
        {filters.second.map((item, index) => {
          return (
            <div className="" key={index}>
              {
                <FilterMenuItem
                  label={item.label}
                  filterName={item.filterName}
                  children={item.children && item.children}
                />
              }
            </div>
          )
        })}
      </div>
      <div className="bg-gray-100 box-shadow-lg p-1 rounded-lg">
        <div className="text-center mb-4">Резина</div>
        {filters.third.map((item, index) => {
          return (
            <div className="" key={index}>
              {<FilterMenuItem label={item.label} filterName={item.filterName} />}
            </div>
          )
        })}
      </div>
      <div className="bg-gray-100 box-shadow-lg p-1 rounded-lg">
        <div className="text-center mb-4">Шины</div>
        {filters.four.map((item, index) => {
          return (
            <div className="" key={index}>
              {
                <FilterMenuItem
                  label={item.label}
                  filterName={item.filterName}
                  children={item.children && item.children}
                />
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}
