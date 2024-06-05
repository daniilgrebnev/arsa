import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsAuth } from "../../store/reducers/auth/authSlice"
import { thunkAuth, thunkCode } from "../../store/reducers/auth/authThunk"
import { CrossIcon } from "../../styles/image/CrossIcon"
import { Ok } from "../../styles/image/Ok"
import "../../styles/image/animate.css"
import { WheelImage } from "../Table/TPMS/catalog/WheelImage"
import { CodeInput } from "./AuthCode"

export const AuthLogin = () => {
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState("")
  const [focusElem, setFocusElem] = useState<"password" | "login" | null>(null)
  const [loginWriteError, setLoginWriteError] = useState<boolean>(false)
  const [passwordWriteError, setPasswordWriteError] = useState<boolean>(false)
  const { isOpenCodeWidget, isAuth, authErrorText, mobile_phone } = useSelector(
    (state: RootState) => state.auth,
  )
  const dispatch = useDispatch<AppDispatch>()
  const [code, setCode] = useState<string>("")

  // Create refs for the input fields
  const loginInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const typeHandler = (text: string) => {
    setCode(text)
  }
  if (code.length === 4) {
    dispatch(thunkCode(code))
  }

  const submitHandler = () => {
    if (password.length === 0 && login.length === 0) {
      setPasswordWriteError(true)
      setLoginWriteError(true)
      return
    }
    if (password.length === 0) {
      setPasswordWriteError(true)
      return
    } else {
      setPasswordWriteError(false)
    }
    if (login.length === 0) {
      setLoginWriteError(true)
      return
    } else {
      setLoginWriteError(false)
    }
    if (passwordWriteError === true && loginWriteError === true) {
      return
    } else {
      dispatch(thunkAuth({ password, login, mobile_phone }))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, field: "login" | "password") => {
    if (e.key === "Enter") {
      submitHandler()
    }
    if (e.key === "ArrowDown") {
      if (field === "login" && passwordInputRef.current) {
        passwordInputRef.current.focus()
      }
    }
    if (e.key === "ArrowUp") {
      if (field === "password" && loginInputRef.current) {
        loginInputRef.current.focus()
      }
    }
  }

  // Set focus to login input when component mounts
  useEffect(() => {
    if (loginInputRef.current) {
      loginInputRef.current.focus()
    }
  }, [])

  useEffect(() => {}, [isOpenCodeWidget, isAuth])

  return (
    <div className="shadow-xl transition-h w-full h-full bg-slate-800 rounded-xl p-4  relative">
      {isAuth !== true && isOpenCodeWidget && (
        <>
          <div
            style={{
              width: isOpenCodeWidget ? "100%" : "0",
              padding: isOpenCodeWidget ? "2rem" : 0,
            }}
            className="h-fit bg-slate-800  rounded-xl"
          >
            <>
              <p className="text-center text-white text-2xl">Введите код</p>
              <div className="text-center text-white pt-5 text-lg">
                <div className="font-light">Код отправлен на номер:</div>{" "}
                <span className="tracking-wider">{mobile_phone}</span>
              </div>
              <div className="mt-10">
                <CodeInput length={4} />
              </div>
            </>
          </div>
        </>
      )}
      {isAuth === true && (
        <div className="flex flex-col font-light bg-slate-800 h-fit items-center justify-center gap-7">
          <div className="flex items-center justify-center rounded-full  border-4 border-[#047105] p-5">
            <Ok width={100} fill="#047105" />
          </div>
        </div>
      )}
      {!isOpenCodeWidget && isAuth === "loading" && (
        <div className="flex flex-col relative z-[10] font-light bg-slate-800 h-[300px] items-center justify-center gap-7">
          <div className="flex items-center justify-center rounded-full transition-all delay-400 border-[#FC6904] animate-spin p-5">
            <WheelImage width={100} fill="#FC6904" />
          </div>
        </div>
      )}
      {!isOpenCodeWidget && isAuth === "error" && (
        <div className="flex flex-col font-light bg-slate-800 h-fit  items-center justify-center gap-7">
          <div
            style={{
              gridRow: 2,
            }}
            className="flex items-center justify-center rounded-full w-[150px] mx-auto aspect-square border-4 border-[#9d0606] p-1"
          >
            <CrossIcon width={100} fill="#9d0606" />
          </div>
          <div
            style={{
              gridRow: 3,
            }}
            className="   text-center flex flex-col w-full h-full items-center justify-center "
          >
            <div className="mb-10 text-xl text-red-600 tracking-widest ">{authErrorText}</div>
            <p
              onClick={() => dispatch(setIsAuth({ auth: false }))}
              className="font-light flex items-center justify-between bg-orange-500 rounded-lg px-2 py-1 transition-all text-white  hover:bg-orange-600 cursor-pointer gap-3 hover:gap-5"
            >
              Войти заново
            </p>
          </div>
        </div>
      )}
      {!isOpenCodeWidget && isAuth === false && (
        <>
          <div className="flex flex-col font-light bg-slate-800 h-full  items-center justify-center gap-7">
            <div className="text-center font-normal text-orange-500 tracking-wide text-4xl">
              Авторизация
            </div>
            <p className="text-xl text-white font-light">Войдите в свою учетную запись</p>
            <div className="w-2/3">
              <div
                className={`${loginWriteError === true && "border-red-600"} overflow-hidden transition-all text-lg font-inherit border-2 rounded-lg flex items-center justify-center mx-auto w-full ${focusElem === "login" ? "border-orange-400" : "border-slate-600"}`}
              >
                <input
                  type="text"
                  className="outline-none w-full text-white bg-transparent px-4 py-2 "
                  value={login}
                  placeholder="Логин"
                  onFocus={() => setFocusElem("login")}
                  onBlur={() => setFocusElem(null)}
                  onChange={(e) => setLogin(e.target.value)}
                  ref={loginInputRef} // Attach ref to the input
                  onKeyDown={(e) => handleKeyDown(e, "login")} // Add keydown handler
                />
              </div>
              {loginWriteError === true && (
                <div className="text-red-600 px-1 text-lg">Поле должно быть заполнено</div>
              )}
            </div>
            <div className="w-2/3">
              <div
                className={`${passwordWriteError === true && "border-red-600"} transition-all overflow-hidden text-lg font-inherit border-2 rounded-lg flex items-center justify-center mx-auto w-full ${focusElem === "password" ? "border-orange-400" : "border-slate-600"}`}
              >
                <input
                  type="password"
                  className="outline-none w-full bg-transparent text-white px-4 py-2 "
                  placeholder="Пароль"
                  value={password}
                  onFocus={() => setFocusElem("password")}
                  onBlur={() => setFocusElem(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={passwordInputRef} // Attach ref to the password input
                  onKeyDown={(e) => handleKeyDown(e, "password")} // Add keydown handler
                />
              </div>
              {passwordWriteError === true && (
                <div className="text-red-600 px-1 text-lg">Поле пароль быть заполнено</div>
              )}
            </div>
          </div>
          <div className=""></div>
          <div
            onClick={submitHandler}
            className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 px-10 py-3 mx-auto text-xl rounded-lg w-fit text-white mt-10 mb-5 text-center transition-all tracking-widest cursor-pointer select-none"
          >
            Войти
          </div>
        </>
      )}
    </div>
  )
}
