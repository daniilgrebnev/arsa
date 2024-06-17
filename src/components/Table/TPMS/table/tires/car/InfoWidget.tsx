import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "ts-luxon"
import { setCloseWidget } from "../../../../../../store/reducers/car/car"
import { setOpenSwitch } from "../../../../../../store/reducers/switchTire/switchTire"
import "./style.css"

export const InfoWidget = (state: any) => {
  const [openSubMenu, setOpenSubmenu] = useState(false)
  const [isViewCross, setViewCross] = useState(false)

  const { vehicle_wheel_info, wheel_id, vehicle_uid } = useSelector((state: RootState) => state.car)
  const currentVehicle: any | null =
    wheel_id && vehicle_wheel_info
      ? vehicle_wheel_info?.filter((item) => item.wheel_id == wheel_id)[0]
      : null
  useEffect(() => {}, [vehicle_wheel_info, wheel_id, vehicle_uid])
  const info = [
    {
      title: "Текущие значения",
      options: "none",
      active:
        currentVehicle?.data.sensor_data.d != null &&
        currentVehicle?.data.sensor_data.d != 0 &&
        currentVehicle?.data.sensor_data.press &&
        currentVehicle?.data.sensor_data.t,
      data: [
        {
          dataName: "press",
          title: "Давление",
          value:
            currentVehicle?.data.sensor_data.press >= 0 &&
            currentVehicle.data.sensor_data.press != null
              ? currentVehicle?.data.sensor_data.press + " кПа"
              : "Н/д",
        },
        {
          dataName: "temp",
          title: "Температура",
          value:
            currentVehicle?.data.sensor_data.t >= 0 && currentVehicle.data.sensor_data.t != null
              ? currentVehicle?.data.sensor_data.t + "ºC"
              : "Н/д",
        },
        {
          dataName: "temp",
          title: "Посл. информация",
          value:
            currentVehicle?.data.sensor_data.d != null &&
            currentVehicle?.data.sensor_data.d != 0 &&
            DateTime.fromSeconds(currentVehicle?.data.sensor_data.d).toLocaleString(
              DateTime.DATETIME_SHORT,
            ),
        },
      ],
    },
    {
      title: "Нормы",
      options: "none",
      active:
        currentVehicle?.data.wheel_model.start_date != null &&
        currentVehicle?.data.wheel_model.start_date != 0 &&
        currentVehicle?.data.wheel_model.name &&
        currentVehicle?.data.wheel_model.reason_repl,
      data: [
        {
          dataName: "press-norm",
          title: "Норма давления",
          value:
            currentVehicle?.data.norm.press + " кПа +/- " + currentVehicle.data.norm.delta + " кПа",
        },
        {
          dataName: "temp-norm",
          title: "Макс. температура",
          value: currentVehicle?.data.norm.t_max + "ºC",
        },
        {
          dataName: "sensor-number",
          title: "Номер сенсора",
          value: currentVehicle?.data.sensor_data.sn,
        },
      ],
    },
    {
      title: "Шина",
      options: "tire",
      active:
        currentVehicle?.data.wheel_model.start_date != null &&
        currentVehicle?.data.wheel_model.start_date != 0 &&
        currentVehicle?.data.wheel_model.name &&
        currentVehicle?.data.wheel_model.reason_repl,
      data: [
        {
          dataName: "installation-date",
          title: "Дата установки",
          value:
            currentVehicle?.data.wheel_model.start_date != null &&
            currentVehicle?.data.wheel_model.start_date != 0 &&
            DateTime.fromSeconds(currentVehicle?.data.wheel_model.start_date).toLocaleString(
              DateTime.DATETIME_SHORT,
            ),
        },
        {
          dataName: "temp-norm",
          title: "Производитель",
          value: currentVehicle?.data.wheel_model.name,
        },
        {
          dataName: "temp",
          title: "Причина замены",
          value: currentVehicle?.data.wheel_model.reason_repl,
        },
      ],
    },
  ]

  const dispatch = useDispatch<AppDispatch>()
  const activeContainers = info.filter((item) => item.active !== false).length

  return (
    <div
      onMouseEnter={() => setViewCross(true)}
      onMouseLeave={() => setViewCross(false)}
      className="absolute left-0 bottom-0 w-full h-[93%] bg-white bg-opacity-85 z-10 pt-5 pb-2 px-2"
    >
      {isViewCross && (
        <div
          onClick={() => dispatch(setCloseWidget())}
          className="icon-cross text-red-500 text-lg cursor-pointer p-2 absolute right-2 top-2 rounded-lg bg-white hover:bg-gray-200 active:bg-gray-300 z-[500]"
        ></div>
      )}

      <div className="flex items-start justify-center gap-2 h-full">
        {info.map((item, index) => (
          <div
            className={` border border-orange-500 p-1 h-full overflow-hidden relative w-1/3 rounded-lg bg-white bg-opacity-70`}
          >
            <h3 className="text-lg h-12 flex items-center justify-center text-center">
              {item.title}
            </h3>
            <div className="text-sm flex flex-col gap-3  items-center justify-center w-full font-light mt-3 text-left last:border-none  ">
              {item.data.map((item, index) => (
                <div className="w-full py-2 h-14 mx-auto  border-b border-b-black">
                  <div>{item.title}</div>
                  <div className="font-normal text-sm text-orange-500">{item.value}</div>
                </div>
              ))}
              {item.options == "tire" && (
                <div className="bg-white p-1 text-sm w-10/12 active:text-orange-500 flex flex-col hover:bg-gray-100 gap-1 absolute bottom-2 text-center border border-orange-500 rounded-lg">
                  <div
                    onClick={() => {
                      dispatch(setOpenSwitch())
                    }}
                    className="   font-light cursor-pointer "
                  >
                    Заменить
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
