export const NoDataFromCharts = () => {
  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center backdrop-blur-sm z-30">
      <div className="border-yellow-500 border tracking-wider px-6 py-3 text-lg font-light text-yellow-500 rounded-lg">
        Шина не выбрана
      </div>
    </div>
  )
}
