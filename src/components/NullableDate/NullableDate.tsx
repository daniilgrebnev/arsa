interface INullableBlock {
  color: string
  text: string
}

export const NullableDate = ({ color, text }: INullableBlock) => {
  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center backdrop-blur-sm z-30">
      <div
        style={{
          borderColor: color,
          color: color,
        }}
        className=" border tracking-wider px-6 py-3 text-lg font-light  rounded-lg"
      >
        {text}
      </div>
    </div>
  )
}
