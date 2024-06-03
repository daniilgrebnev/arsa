import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCreate } from "../../../../../store/reducers/catalog/catalog"
import { createUpdateWheelModelThunk } from "../../../../../store/reducers/catalog/catalogThunk"

export const AddUpdateTire = () => {
  const dispatch = useDispatch<AppDispatch>()
  const elem = useSelector((state: RootState) => state.catalog.createUpdate.updatedElem)
  const { data } = useSelector((state: RootState) => state.car)

  const account_id = typeof data != "string" && data != null && data.data.account_id
  const [inputText, setInputText] = useState("")
  const [textareaText, setTextareaText] = useState("")

  useEffect(() => {
    setInputText(elem ? elem.name : "")
    setTextareaText(elem ? elem.comment : "")
  }, [elem])
  const { createUpdateType } = useSelector((state: RootState) => state.catalog.createUpdate)

  const submitHandler = () => {
    const id = createUpdateType == "update" && elem ? elem?.id : 0
    const name = inputText
    const comment = textareaText
    dispatch(createUpdateWheelModelThunk({ id, comment, name }, { account_id: account_id }))
    dispatch(setCreate({ isOpen: false }))
  }

  return (
    <div className="font-light w-fit">
      <div className="text-center text-2xl mb-5 ">
        {" "}
        {createUpdateType == "create" && <>Создание </>}
        {createUpdateType == "update" && <>Изменение </>}
        <span>модели шины</span>
      </div>
      <div className="flex items-center justify-center gap-2 flex-col mx-auto my-3">
        <div className="">
          <p className="text-center my-2">Название</p>
          <div className="bg-white px-3 py-1 flex items-center justify-center rounded-lg">
            <input
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              type="text"
              className="bg-transparent text-black focus-within:outline-none"
            />
            <div className="icon-cross text-lg text-red-400"></div>
          </div>
        </div>
        <div className="">
          <p className="text-center my-2">Описание</p>
          <div className="bg-white p-2 rounded-lg">
            <textarea
              onChange={(e) => setTextareaText(e.target.value)}
              value={textareaText}
              className="bg-transparent text-black focus-within:outline-none"
              name=""
              id=""
              cols={30}
              rows={5}
            ></textarea>
          </div>
        </div>
      </div>
      <div
        onClick={submitHandler}
        className="w-1/2 bg-orange-600 mx-auto text-center rounded-lg py-1 mt-6 cursor-pointer hover:bg-orange-700 transition-all"
      >
        {createUpdateType == "create" && <>Создать</>}
        {createUpdateType == "update" && <>Применить</>}
      </div>
    </div>
  )
}
