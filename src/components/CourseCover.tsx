import { AiIcon, ICON_BG, resolveIconKey } from './AiIcon'

function teacherFace(teacher: string) {
  const chars = teacher.replace(/[^\u4e00-\u9fffA-Za-z]/g, '')
  if (!chars) return '知'
  return chars.slice(0, 2)
}

function teacherLabel(teacher: string) {
  return teacher.replace(/^知略\s*[·•]\s*/, '').trim() || teacher
}

/** 教程封面：品牌色场 + 工具图标 + 整理者（占位） */
export function CourseCover({
  id,
  category,
  teacher,
  level,
  hot,
  compact,
}: {
  id: string
  category: string
  teacher: string
  level?: string
  hot?: boolean
  compact?: boolean
}) {
  const icon = resolveIconKey(id, category)
  const bg = ICON_BG[icon]
  const face = teacherFace(teacher)
  const name = teacherLabel(teacher)

  return (
    <div
      className={`course-cover ${compact ? 'course-cover--compact' : ''}`}
      style={{ ['--cover' as string]: bg }}
    >
      <div className="course-cover__art" aria-hidden="true">
        <span className="course-cover__orb" />
        <span className="course-cover__orb course-cover__orb--2" />
        <AiIcon icon={icon} size={compact ? 48 : 64} className="course-cover__mark" />
      </div>
      <div className="course-cover__tags">
        {hot && <em className="course-cover__hot">热门</em>}
        {level && <em>{level}</em>}
      </div>
      <div className="course-cover__person">
        <span className="course-cover__avatar">{face}</span>
        <span>
          <strong>{name}</strong>
          <i>整理</i>
        </span>
      </div>
    </div>
  )
}
