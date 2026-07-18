/** 静态浅色氛围背景（无指针跟随、无动画） */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__mesh" />
      <div className="ambient__grid" />
    </div>
  )
}
