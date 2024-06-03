
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "ts-luxon"
import { setEndTiming, setStartTiming } from "./../../../store/reducers/security/security"
import { RootState } from "./../../../store/store"
import { Popup } from "./../../Popup/Popup"
import { Calendar } from "./Calendar/Calendar"
import "./CustomDateRangePicker.css"

export const DateRangePicker = () => {
  const dispatch = useDispatch()

  const { endTiming, startTiming } = useSelector((state: RootState) => state.security)
  const [startDate, setStartDate] = useState(DateTime.fromMillis(startTiming))
  const [endDate, setEndDate] = useState(DateTime.fromMillis(endTiming))

  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const russianDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]

  const setTimeStart = (e) => {
    let time = e.target.value
    debugger
    setStartDate(startDate.set({ hour: time.slice(0, 2), minute: time.slice(3) }))
  }


  // setInterval(() => {
  //   dispatch(setEndTiming(DateTime.now().toMillis()))
  // }, 60000)

  useEffect(() => {
    dispatch(setStartTiming(startDate.toMillis()))
    dispatch(setEndTiming(endDate.toMillis()))
  }, [startDate, endDate])
  console.log(endTiming, startTiming)
  return (
    <div className="date-range ">
      {isOpenPopup && (
        <Popup title="Период" onClose={() => setIsOpenPopup(false)}>
          <div className="date-range__wrapper-popup ">
            <div className="data-calendar">
              <Calendar currentDate={startDate} setCurrentDate={setStartDate} />
              <div className="data-calendar">
                <input
                  value={startDate.toFormat("HH:mm")}
                  type="time"
                  onChange={(e) => setTimeStart(e)}
                />
              </div>
            </div>
            <div className="data-calendar">
              <Calendar currentDate={endDate} setCurrentDate={setEndDate} />
              <div className="data-calendar">
                <input
                  value={endDate.toFormat("HH:mm")}
                  type="time"
                  onChange={(e) => console.log(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
          <div className="date-range__footer-popup">

            <button className="date-range__button-popup" onClick={() => setIsOpenPopup(false)}>

              Готово
            </button>
          </div>
        </Popup>
      )}
      <div className="date-range__wrapper">
        <button className="date-range__btn" onClick={() => setIsOpenPopup(true)}>
          <div className="date-range__start">
            <div className="date-range__start--date">{startDate.toLocaleString()}</div>
            <div className="date-range__start--time">
              {startDate.toLocaleString(DateTime.TIME_SIMPLE)}
              <span>{russianDays[startDate.weekday - 1]}</span>
            </div>
          </div>
          <div className="date-range__icon icon-calendar"></div>
          <div className="date-range__end">
            <div className="date-range__start--date">{endDate.toLocaleString()}</div>
            <div className="date-range__start--time">
              {endDate.toLocaleString(DateTime.TIME_SIMPLE)}
              <span>{russianDays[endDate.weekday - 1]}</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
