import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "ts-luxon"

import { setEndTiming } from "../../../../store/reducers/security/security"
import { ISwitchReq, setOpenSwitch } from "../../../../store/reducers/switchTire/switchTire"
import { switchTireThunk } from "../../../../store/reducers/switchTire/switchTireThunk"
import { setRerenderSwitchHistory } from "../../../../store/reducers/switchTireHistory/switchTireHistory"
import { Ok } from "../../../../styles/image/Ok"
import { ChangeTire } from "./ChangeTire"
import { SwitchTireList } from "./SwitchTireList"

export const SwitchTire = () => {
  const [switchTireId, setSwitchTireId] = useState(0)
  const [textareaText, setTextareaText] = useState("")
  const [switchAll, setSwitchAll] = useState(false)

  const [] = useState()
  const { isOpenChange, tireId, switchHistoryTire } = useSelector(
    (state: RootState) => state.switchTire,
  )

  // const account_id = useSelector((state: RootState) => state.car.data.data.account_id)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    switchHistoryTire != null && setTextareaText(switchHistoryTire.description)
    setSwitchTireId(tireId || switchHistoryTire?.id || 0)
  }, [tireId])
  const { vehicle_uid } = useSelector((state: RootState) => state.car)
  const wheel_id = useSelector((state: RootState) => state.car.wheel_id) || 0
  const { startTiming } = useSelector((state: RootState) => state.security)
  const current_Id = switchHistoryTire != null ? switchHistoryTire?.wheel_id : wheel_id
  const submitHandler = () => {
    dispatch(setEndTiming(DateTime.now().toMillis()))
    const body: ISwitchReq = {
      wheel_id: switchAll ? 0 : current_Id,
      wheel_model_id: tireId != null ? tireId : 0,
      vehicle_uid,
      id: switchHistoryTire == null ? 0 : switchHistoryTire.id,
      start_date: Math.round(DateTime.now().toSeconds()),
      reason_replacement: textareaText,
    }
    console.log(body)
    // Обработка пустого значения
    if (
      body.wheel_id >= 0 &&
      typeof body.wheel_id != "undefined" &&
      body.vehicle_uid.length > 0 &&
      body.wheel_model_id != 0 &&
      body.start_date > 0 &&
      body.reason_replacement.length > 0
    ) {
      dispatch(switchTireThunk({ body, vehicle_uid }))
      dispatch(setRerenderSwitchHistory())
    } else {
      alert("ERROR FATAL")
    }
  }
  return (
    <div className="absolute left-0 top-0 bg-white bg-opacity-85 flex items-center justify-center gap-6 w-full h-full z-[500]">
      <div className="bg-stone-800 relative w-1/4 h-fit pb-24 text-white p-4 rounded-lg">
        <div
          onClick={() => dispatch(setOpenSwitch())}
          className="icon-cross text-red-500 hover:text-red-600 text-lg cursor-pointer absolute right-0 top-0 p-4"
        ></div>
        <div className="text-3xl text-center font-light ">Замена шины</div>
        {<SwitchTireList />}

        <p className="text-lg font-light text-center my-4">Причина замены</p>
        <div className="bg-white px-2 py-1 w-fit mx-auto rounded-lg text-black flex items-center justify-between">
          <textarea
            onChange={(e) => setTextareaText(e.target.value)}
            placeholder="Name"
            value={textareaText}
            name=""
            id=""
            cols={30}
            rows={3}
            className="focus-within:outline-none resize-none bg-transparent font-light"
          ></textarea>
        </div>
        <div className="">
          <p className="text-lg font-light text-center my-4">Дата замены</p>
          <div className=" px-2 py-1 w-fit mx-auto rounded-lg text-black flex items-center justify-between">
            <input type="datetime-local" className="bg-transparent text-white" />
          </div>
        </div>
        <div
          onClick={() => setSwitchAll(!switchAll)}
          className="mt-5 cursor-pointer flex items-center justify-center w-full gap-3"
        >
          <div
            className={`w-5 flex items-center justify-center rounded-sm aspect-square ${switchAll ? "bg-orange-500" : "border border-orange-500"}`}
          >
            {switchAll && <Ok fill="white" width={15} />}
          </div>
          <div className="text-sm font-light">Поменять на всех колесах</div>
        </div>
        <div className="absolute bottom-0 py-6 w-full flex items-center justify-center">
          <button
            onClick={submitHandler}
            className="bg-orange-600 active:bg-orange-800 px-10 py-2 hover:bg-orange-700 transition-all rounded-lg"
          >
            Применить
          </button>
        </div>
      </div>
      {isOpenChange && <ChangeTire />}
    </div>
  )
}
