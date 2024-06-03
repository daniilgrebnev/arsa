import { IIcon } from "@/components/Table/TPMS/table/tires/car/Truck"

export const WaitingIcon = ({ width, fill }: IIcon) => {
  return (
    <svg
      id="Icons"
      fill={fill}
      width={width}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <path d="M5,18v.184A2.993,2.993,0,0,0,6,24H18a2.993,2.993,0,0,0,1-5.816V18a7,7,0,0,0-3.413-6A7,7,0,0,0,19,6V5.816A2.993,2.993,0,0,0,18,0H6A2.993,2.993,0,0,0,5,5.816V6a7,7,0,0,0,3.413,6A7,7,0,0,0,5,18Zm13,4H6a1,1,0,0,1,0-2H18a1,1,0,0,1,0,2ZM6,2H18a1,1,0,0,1,0,2H6A1,1,0,0,1,6,2ZM7,6H17A5,5,0,0,1,7,6ZM17,18H7a5,5,0,0,1,10,0Z" />
    </svg>
  )
}
