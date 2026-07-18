import { CoverArt, ICON_BG, ICON_LABEL, resolveIconKey } from './AiIcon'

/** 教程封面：主题色场 + 场景插画（无假头像占位） */
export function CourseCover({
  id,
  category,
  level,
  hot,
  compact,
  title,
}: {
  id: string
  category: string
  teacher?: string
  level?: string
  hot?: boolean
  compact?: boolean
  title?: string
}) {
  const icon = resolveIconKey(id, category)
  const bg = ICON_BG[icon]
  const label = ICON_LABEL[icon]

  return (
    <div
      className={`course-cover ${compact ? 'course-cover--compact' : ''}`}
      style={{ ['--cover' as string]: bg }}
    >
      <CoverArt icon={icon} />
      <div className="course-cover__tags">
        {hot && <em className="course-cover__hot">热门</em>}
        {level && <em>{level}</em>}
      </div>
      <div className="course-cover__caption">
        <strong>{label}</strong>
        {title ? <span>{title}</span> : <span>{category}</span>}
      </div>
    </div>
  )
}
