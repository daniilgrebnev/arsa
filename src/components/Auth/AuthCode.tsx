import { AppDispatch } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setIsAuth, setOpenCodeWidget } from "../../store/reducers/auth/authSlice"
import { thunkCode } from "../../store/reducers/auth/authThunk"

export const CodeInput = ({ length = 4 }) => {
  const [code, setCode] = useState(Array(length).fill({ num: null }))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeStop, setTimeStop] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        const newCode = [...code]
        newCode[currentIndex] = { num: e.key }
        setCode(newCode)

        // Move to the next index if it exists
        if (currentIndex < length - 1) {
          setCurrentIndex(currentIndex + 1)
        }
      } else if (e.key === "Backspace") {
        const newCode = [...code]
        newCode[currentIndex - 1] = { num: null }
        setCode(newCode)

        // Move to the previous index if it exists
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1)
        }
        return
      }
    }

    // Add event listener
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      // Remove event listener on cleanup
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [code, currentIndex, length])

  useEffect(() => {
    if (timeLeft === 0) {
      dispatch(setIsAuth({ auth: "error", text: "Время истекло!" }))
      dispatch(setOpenCodeWidget(false))
      return
    }
    const codeReady = code.filter((i) => i.num != null)
    if (codeReady.length == 4) {
      const finalCode = codeReady.map((i) => i.num).join("")
      dispatch(thunkCode(finalCode))
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId) // Cleanup interval on component unmount
  }, [timeLeft, dispatch])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`
  }

  return (
    <div>
      <div className="w-screen h-screen absolute left-0 top-0 z-40"></div>
      <div className="flex justify-center gap-3">
        {code.map((num, index) => (
          <div
            key={index}
            className="w-12 h-12 text-white border border-orange-400 rounded-lg  flex items-center justify-center text-2xl"
          >
            <p>{num.num !== null ? num.num : ""}</p>
          </div>
        ))}
      </div>
      <div className="text-white font-light text-center mt-10">
        {timeStop ? (
          <div className="px-6 py-2 bg-slate-950 w-fit rounded-lg hover:bg-slate-900 mx-auto">
            Отправить еще раз
          </div>
        ) : (
          <p>Осталось: {formatTime(timeLeft)}</p>
        )}
      </div>
    </div>
  )
}
