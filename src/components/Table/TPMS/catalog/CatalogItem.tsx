import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { ICatalog, setUpdatedElem } from "../../../../store/reducers/catalog/catalog"
import { deleteWheelModelThunk } from "../../../../store/reducers/catalog/catalogThunk"

interface ICatalogItem extends ICatalog {
  type?: string
}

export const CatalogItem = ({ id, name, comment }: ICatalogItem) => {
  const account_id = useSelector((state: RootState) =>
    typeof state.car.data != "string"
      ? state.car.data != undefined
        ? state.car.data?.data.account_id
        : -1
      : -1,
  )
  const dispatch = useDispatch<AppDispatch>()
  const elem: ICatalog = { id, name, comment }
  return (
    <div className="w-full h-full  flex items-center justify-center">
      <div
        key={id}
        className={`top-0 w-full overflow-hidden rounded-lg bg-gray-200  catalog-card relative transition-all `}
      >
        <>
          <div className="p-4 w-full cursor-pointer  flex items-center justify-between gap-3 ">
            <div className="text-left text-xl text-black flex items-center justify-start  w-full">
              {name}
            </div>
            <div
              onClick={() => {
                dispatch(setUpdatedElem(elem))
              }}
              className="cursor-pointer text-sm text-black top-2 right-2 "
            >
              Изменить
            </div>
            <div
              onClick={() => {
                dispatch(deleteWheelModelThunk(elem.id, account_id))
              }}
              className=" icon-delete text-2xl hover:text-red-600 top-2 right-2 text-red-500"
            ></div>
          </div>
        </>

        {/* <div className='wheel-image'>
					<div className='wheel'>
						{type ? (
							<div className='flex items-center justify-center text-6xl text-black'>
								+
							</div>
						) : (
							<WheelImage text={name} fill='rgb(47, 47, 47)' width={'90%'} />
						)}
					</div>
				</div> */}

        {/* {comment.length > 1 && (
					<div className='p-0.5 max-h-[10%] hover:max-h-full hover:border hover:border-black cursor-default hover:h-full transition-all bottom-0 hover:bottom-[60%] overflow-y-auto relative  bg-gray-200 z-[1000] rounded-lg text-black text-xs overflow-hidden text text-ellipsis'>
						{comment}
					</div>
				)} */}
      </div>
    </div>
  )
}
