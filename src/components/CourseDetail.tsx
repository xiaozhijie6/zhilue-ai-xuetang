import { CourseCover } from './CourseCover'
import type { KnowledgeItem } from '../data/knowledge'

export function CourseDetail({
  course,
  progress,
  phone,
  onBack,
  onStart,
  onToggleLesson,
  progressMap,
}: {
  course: KnowledgeItem
  progress: number
  phone: string | null
  onBack: () => void
  onStart: () => void
  onToggleLesson: (courseId: string, lessonId: string) => void
  progressMap: Record<string, string[]>
}) {
  const doneCount = progressMap[course.id]?.length ?? 0

  return (
    <main className="gk-main course-detail">
      <button type="button" className="course-detail__back" onClick={onBack}>
        ← 返回知识库
      </button>

      <div className="course-detail__hero">
        <div className="course-detail__visual">
          <CourseCover
            id={course.id}
            category={course.category}
            level={course.level}
            hot={course.hot}
            title={course.title}
          />
        </div>
        <div className="course-detail__info">
          <div className="course-detail__tags">
            <span className={`level-badge level-badge--${course.level}`}>{course.level}</span>
            <span>{course.category}</span>
            {course.hot && <i className="tag tag--hot">热门</i>}
            {course.new && <i className="tag tag--new">上新</i>}
            {course.source === '自有资料' && <i className="tag">图文教程</i>}
          </div>
          <p className="course-detail__hook">{course.hook}</p>
          <p className="course-detail__outcome">
            <span className="course-detail__outcome-label">跟做后你能</span>
            {course.outcome}
          </p>
          <h1 className="course-detail__title">{course.title}</h1>
          <p className="course-detail__desc">{course.desc}</p>
          <div className="course-detail__meta">
            <span>整理：{course.teacher}</span>
            <span>{course.lessons.length} 个步骤</span>
            <span>{course.duration}</span>
            <span className="course-detail__progress">进度 {progress}%</span>
          </div>
          <div className="course-detail__actions">
            <button type="button" className="btn btn--accent" onClick={onStart}>
              {phone ? '开始跟做' : '登录后记录进度'}
            </button>
            <button type="button" className="btn btn--ghost-dark" onClick={onBack}>
              返回列表
            </button>
          </div>
          <div className="course-detail__trust">
            <span>✓ 图文步骤</span>
            <span>✓ 可勾选进度</span>
            <span>✓ 持续更新</span>
          </div>
        </div>
      </div>

      <div className="course-detail__body">
        <section className="course-detail__left">
          <h2>这篇带你做出</h2>
          <ul className="course-detail__list">
            {course.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <h2>内容概览</h2>
          <ol className="course-detail__list">
            {course.outline.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ol>
        </section>

        <section className="course-detail__right">
          <h2>
            步骤清单
            <em>
              {doneCount}/{course.lessons.length} 已勾选
            </em>
          </h2>
          <div className="gk-lessons">
            {course.lessons.map((lesson, i) => {
              const done = progressMap[course.id]?.includes(lesson.id)
              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={`gk-lesson ${done ? 'is-done' : ''}`}
                  onClick={() => onToggleLesson(course.id, lesson.id)}
                >
                  <em>{String(i + 1).padStart(2, '0')}</em>
                  <strong>{lesson.title}</strong>
                  <span>
                    {lesson.type} · 约 {lesson.mins} 分钟
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
