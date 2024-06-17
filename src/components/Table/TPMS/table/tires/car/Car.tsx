import { Driver, ICategoryMaket, IPressureDaum, Settings } from "@/interfaces/car"
import { AppDispatch, RootState } from "@/store/store"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ErrorBlock } from "../../../../../../components/Errors/ErrorBlock"
import { NullableDate } from "../../../../../../components/NullableDate/NullableDate"
import { axlesInit } from "../../../../../../helpers/axlesInitter"
import { setOpenCatalog } from "../../../../../../store/reducers/catalog/catalog"
import { getCatalogThunk } from "../../../../../../store/reducers/catalog/catalogThunk"
import { setOpenSwitchHistory } from "../../../../../../store/reducers/switchTireHistory/switchTireHistory"
import { InfoWidget } from "./InfoWidget"
import { Truck } from "./carTypes/Truck"
import { CatalogIcon } from "./icons/CatalogIcon"
import { MapIcon } from "./icons/MapIcon"
import { SwitchHistoryIcon } from "./icons/SwitchHistoryIcon"

export interface ICarData {
  account_id: number
  category_maket: ICategoryMaket
  category_name: string
  driver: Driver
  pressure_data: IPressureDaum[]
  settings: Settings
  vehicle_id: number
  vehicle_last_event_date: number
  vehicle_name: string
  vehicle_uid: string
}

const Car = () => {
  // const [dataArr, setDataArr] = useState<ICarData>()
  const [openInfoWidget, setOpenInfoWidget] = useState(false)
  const { data, vehicle_uid, vehicle_wheel_info } = useSelector((state: RootState) => state.car)

  const dataArr = typeof data != "string" && data?.data
  const dispatch = useDispatch<AppDispatch>()
  const { isOpenWidget, wheel_id } = useSelector((state: RootState) => state.car)
  const account_id = useSelector(
    (state: RootState) => typeof state.car.data != "string" && state.car.data?.data?.account_id,
  )

  useEffect(() => {
    setOpenInfoWidget(isOpenWidget)
  }, [data, isOpenWidget, wheel_id])

  const isNoSensors = data != null && dataArr && dataArr.pressure_data.length == 0
  const axles = !isNoSensors ? axlesInit(dataArr) : null
  return (
    <div className="w-full h-full ">
      <div className="bg-gray-100  w-full h-full  flex flex-col items-end justify-end border-t-[1px] text-center border-t-orange-400">
        {dataArr && data && (
          <div
            style={{ gridTemplateColumns: "30% 30% 30%" }}
            className=" w-full absolute top-0  h-[7%] bg-gray-300 text-sm grid items-center justify-between"
          >
            <span
              title={typeof dataArr != "undefined" ? dataArr.vehicle_name : ""}
              className="text-nowrap cursor-default text-ellipsis overflow-hidden"
            >
              {typeof dataArr != "undefined" && dataArr.vehicle_name}
            </span>
            <span
              title={
                typeof dataArr != "undefined" && dataArr.driver.driver_name !== null
                  ? dataArr.driver.driver_name
                  : dataArr.driver.driver_code
                    ? dataArr.driver.driver_code.toString()
                    : "Н/д"
              }
              className="text-nowrap cursor-default text-ellipsis overflow-hidden"
            >
              {dataArr.driver.driver_name !== null ? (
                dataArr.driver.driver_name
              ) : dataArr.driver.driver_code ? (
                dataArr.driver.driver_code
              ) : (
                <span className="text-red-600">Водитель - н\д</span>
              )}
            </span>
            {dataArr.vehicle_last_event_date > 0 ? (
              <span
                title={moment(dataArr.vehicle_last_event_date * 1000).fromNow()}
                className="text-nowrap cursor-default text-ellipsis overflow-hidden"
              >
                {moment(dataArr.vehicle_last_event_date * 1000).format("HH:mm  DD.MM.yyyy")}
              </span>
            ) : (
              <p className="text-red-500">Никогда</p>
            )}
          </div>
        )}

        <div className="w-full  flex items-center justify-center h-full">
          {vehicle_uid.length > 0 && (
            <div className="absolute top-[10%] left-2 p-2 flex flex-col gap-2rounded-lg text-left">
              <div className="bg-[#FFEEDA] hover:bg-opacity-35 cursor-pointer rounded-lg border border-[#fc6904] p-1">
                <MapIcon width={100} fill="#fc6904" />
              </div>
              <div className="flex items-center justify-between bg-[#FFEEDA]  mt-2 rounded-lg border border-[#fc6904] p-1">
                <div
                  onClick={() => {
                    dispatch(setOpenCatalog(true))
                    if (typeof account_id == "number") {
                      dispatch(getCatalogThunk(account_id))
                    }
                  }}
                  className="flex items-center hover:bg-gray-400 p-1  cursor-pointer justify-center bg-[#FFEEDA] hover:bg-opacity-35  rounded-lg"
                >
                  <CatalogIcon fill="#fc6904" width={35} />
                </div>
                <div className="flex items-center justify-center mt-2 rounded-lg w-0.5 h-10 my-auto bg-[#fc6904]"></div>
                <div
                  onClick={() => dispatch(setOpenSwitchHistory(true))}
                  className="flex items-center hover:bg-gray-400 p-1  cursor-pointer justify-center bg-[#FFEEDA] hover:bg-opacity-35  rounded-lg"
                >
                  <SwitchHistoryIcon fill="#fc6904" width={35} />
                </div>
              </div>
            </div>
          )}

          <div className="">
            {openInfoWidget &&
              vehicle_uid.length > 0 &&
              vehicle_uid != null &&
              wheel_id != null && <InfoWidget />}
          </div>
          {data == "error" && <ErrorBlock width={"100%"} height={"100"} />}

          <div className="  h-fit transition-all">
            {axles !== null && <Truck front={axles.front} back={axles.back} />}
          </div>
        </div>
        {data == "loading" && <NullableDate color="#049f38" text="Загрузка" />}
        {data == null && (
          <div className="absolute bottom-0 h-[93%] left-0 w-full">
            <NullableDate color="#9f8204" text="Не выбран объект" />
          </div>
        )}
        {axles == null && (
          <div className="absolute bottom-0 h-[93%] left-0 w-full">
            <NullableDate color="#d00505" text="Нет датчиков" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Car
