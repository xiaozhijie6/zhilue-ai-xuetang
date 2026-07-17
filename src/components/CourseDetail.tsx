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
        ← 返回
      </button>

      <div className="course-detail__hero">
        <div className="course-detail__visual">
          <CourseCover
            id={course.id}
            category={course.category}
            teacher={course.teacher}
            level={course.level}
            hot={course.hot}
          />
        </div>
        <div className="course-detail__info">
          <div className="course-detail__tags">
            <span className={`level-badge level-badge--${course.level}`}>{course.level}</span>
            <span>{course.category}</span>
            {course.hot && <i className="tag tag--hot">热门</i>}
            {course.new && <i className="tag tag--new">上新</i>}
            {course.source === '自有资料' && <i className="tag">自有资料</i>}
          </div>
          <p className="course-detail__hook">{course.hook}</p>
          <p className="course-detail__outcome">
            <span className="course-detail__outcome-label">学完你能</span>
            {course.outcome}
          </p>
          <h1 className="course-detail__title">{course.title}</h1>
          <p className="course-detail__desc">{course.desc}</p>
          <div className="course-detail__meta">
            <span>{course.teacher}</span>
            <span>{course.lessons.length} 讲</span>
            <span>{course.students.toLocaleString()} 人学过</span>
            <span>{course.duration}</span>
            <span className="course-detail__progress">已学 {progress}%</span>
          </div>
          <div className="course-detail__actions">
            <button type="button" className="btn btn--accent" onClick={onStart}>
              {phone ? '开始学习' : '登录后学习'}
            </button>
            <button type="button" className="btn btn--ghost-dark" onClick={onBack}>
              返回列表
            </button>
          </div>
          <div className="course-detail__trust">
            <span>✓ 学完有产出</span>
            <span>✓ 可试听</span>
            <span>✓ 持续更新</span>
          </div>
        </div>
      </div>

      <div className="course-detail__body">
        <section className="course-detail__left">
          <h2>这门课带你做出</h2>
          <ul className="course-detail__list">
            {course.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <h2>课程大纲</h2>
          <ol className="course-detail__list">
            {course.outline.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ol>
        </section>

        <section className="course-detail__right">
          <h2>
            课时目录
            <em>
              {doneCount}/{course.lessons.length} 已完成
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
                    {lesson.type} · {lesson.mins} 分钟
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
