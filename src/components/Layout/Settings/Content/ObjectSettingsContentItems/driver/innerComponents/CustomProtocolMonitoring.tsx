import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { updateDriverSettingsCPM } from "src/store/reducers/objectSettings/objectSettings"
import { ISwitchBody, ObjectSettingsItem } from "../../ObjectSettingsItem"
interface IData {
  name: string
  field: "addr" | "func" | "regNo" | "dataSource" | "use_as_driver_code"
  value: number | boolean
  body?: ISwitchBody[]
}
export const CustomProtocolMonitoring = () => {
  const cpm = useSelector(
    (state: RootState) => state.objectSettings.newData.driver_cards?.CustomProtocolMonitoring,
  )
  const dispatch = useDispatch<AppDispatch>()
  const data: IData[] = [
    {
      name: "addr",
      field: "addr",
      value: cpm?.addr != undefined && cpm.addr,
      body: [
        {
          option: 1,
          name: "Вариант",
        },
        {
          option: 0,
          name: "Вариант1",
        },
        {
          option: 2,
          name: "Вариант2",
        },
      ],
    },
    {
      name: "Функция",
      field: "func",
      value: cpm?.func != undefined && cpm.func,
      body: [
        {
          option: 1,
          name: "Вариант",
        },
        {
          option: 0,
          name: "Вариант1",
        },
        {
          option: 2,
          name: "Вариант2",
        },
      ],
    },
    {
      name: "regNo",
      field: "regNo",
      value: cpm?.regNo != undefined && cpm.regNo,
      body: [
        {
          option: 1,
          name: "Вариант",
        },
        {
          option: 0,
          name: "Вариант1",
        },
        {
          option: 2,
          name: "Вариант2",
        },
      ],
    },
    {
      name: "dataSource",
      field: "dataSource",
      value: cpm?.dataSource != undefined && cpm.dataSource,
      body: [
        {
          option: 1,
          name: "Вариант",
        },
        {
          option: 0,
          name: "Вариант1",
        },
        {
          option: 2,
          name: "Вариант2",
        },
      ],
    },
    {
      name: "Использовать как код карты",
      field: "use_as_driver_code",
      value: cpm?.use_as_driver_code != undefined && cpm.use_as_driver_code,
    },
  ]
  return (
    <div>
      <h2 className="text-center text-xl my-10 font-light">CustomProtocolMonitoring</h2>
      <div className="grid grid-cols-2 px-52 gap-y-5 gap-x-32 w-full justify-center items-center">
        {data.map((item) => (
          <ObjectSettingsItem
            title={item.name}
            value={item.value}
            onChange={(e) => {
              const target = e.target as HTMLInputElement
              // console.log(e.currentTarget.value)
              dispatch(
                updateDriverSettingsCPM({
                  field: item.field,
                  value:
                    typeof item.value == "boolean" ? target.checked : Number(e.currentTarget.value),
                }),
              )
            }}
            type={typeof item.value == "boolean" ? "checkbox" : "switch"}
            body={item.body}
          />
        ))}
      </div>
    </div>
  )
}
