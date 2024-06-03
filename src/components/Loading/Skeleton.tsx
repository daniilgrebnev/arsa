import "./skeleton.css"

interface ISkeletonLoading {
  width: string | number
  height: string | number
}

export const Skeleton = ({ width, height }: ISkeletonLoading) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className="rounded-lg skeleton-container overflow-hidden"
    >
      <div className="skeleton-line"></div>
    </div>
  )
}
