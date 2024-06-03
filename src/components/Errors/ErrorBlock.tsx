import { CrossIcon } from "../../styles/image/CrossIcon"

interface ISkeletonLoading {
  width: string | number
  height: string | number
}

export const ErrorBlock = ({ width, height }: ISkeletonLoading) => {
  return (
    <div
      style={{
        width,
        height,
      }}
      className="absolute backdrop-blur-lg w-full h-full left-0 top-0 z-50 bg-blur-lg grid grid-rows-3 items-center justify-center"
    >
      <div
        style={{
          gridRow: 2,
        }}
        className="flex items-center justify-center"
      >
        <CrossIcon fill="red" width={"50%"} />
      </div>
      <div
        style={{
          gridRow: 3,
        }}
        className="text-xl text-[red] text-center"
      >
        Ошибка получения данных
      </div>
    </div>
  )
}
