import { useState } from 'react'
import { CourseCover } from './CourseCover'
import type { KnowledgeItem } from '../data/knowledge'
import { getTutorialBody } from '../data/tutorialBodies'

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
  const body = getTutorialBody(course.id)
  const [activeLesson, setActiveLesson] = useState(0)
  const lesson = course.lessons[activeLesson]

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
              {phone ? '记录进度并跟做' : '登录后记录进度'}
            </button>
            <button type="button" className="btn btn--ghost-dark" onClick={onBack}>
              返回列表
            </button>
          </div>
        </div>
      </div>

      <div className="course-detail__teach">
        <aside className="course-detail__toc">
          <h2>
            步骤目录
            <em>
              {doneCount}/{course.lessons.length}
            </em>
          </h2>
          <div className="gk-lessons">
            {course.lessons.map((l, i) => {
              const done = progressMap[course.id]?.includes(l.id)
              return (
                <button
                  key={l.id}
                  type="button"
                  className={`gk-lesson ${done ? 'is-done' : ''} ${i === activeLesson ? 'is-on' : ''}`}
                  onClick={() => {
                    setActiveLesson(i)
                    document.getElementById(`teach-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  <em>{String(i + 1).padStart(2, '0')}</em>
                  <strong>{l.title}</strong>
                  <span>
                    {l.type} · 约 {l.mins} 分钟
                  </span>
                </button>
              )
            })}
          </div>
          {lesson && (
            <button
              type="button"
              className="btn btn--accent course-detail__mark"
              onClick={() => onToggleLesson(course.id, lesson.id)}
            >
              {progressMap[course.id]?.includes(lesson.id) ? '取消勾选本步' : '勾选：本步已跟做'}
            </button>
          )}
        </aside>

        <article className="course-detail__article">
          {body ? (
            <>
              <header className="teach-intro">
                <p className="teach-intro__badge">跟做说明：请边看边在电脑上点；蓝链为官方网址，建议复制到浏览器地址栏，不要搜「破解版」。</p>
                {body.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </header>

              {(() => {
                const allLinks = [
                  ...(body.refs ?? []),
                  ...body.sections.flatMap((s) => s.links ?? []),
                ]
                const seen = new Set<string>()
                const uniq = allLinks.filter((l) => {
                  if (seen.has(l.url)) return false
                  seen.add(l.url)
                  return true
                })
                if (uniq.length === 0) return null
                return (
                  <div className="teach-official">
                    <h3>本课官方链接（先收藏）</h3>
                    <ul className="teach-links">
                      {uniq.map((link) => (
                        <li key={link.url}>
                          <a href={link.url} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                          <code className="teach-official__url">{link.url}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })()}

              {body.sections.map((sec, si) => (
                <section
                  key={sec.title}
                  className={`teach-section ${si === activeLesson || body.sections.length <= course.lessons.length ? '' : ''}`}
                  id={`teach-${si}`}
                >
                  <h2>
                    <span>{String(si + 1).padStart(2, '0')}</span>
                    {sec.title}
                  </h2>
                  {sec.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                  {sec.steps && sec.steps.length > 0 && (
                    <ol className="teach-steps">
                      {sec.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  )}
                  {sec.tip && <p className="teach-tip">提示：{sec.tip}</p>}
                  {sec.links && sec.links.length > 0 && (
                    <ul className="teach-links">
                      {sec.links.map((link) => (
                        <li key={link.url}>
                          <a href={link.url} target="_blank" rel="noreferrer">
                            {link.label} →
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section className="teach-section teach-section--check">
                <h2>跟做完成清单</h2>
                <ul className="teach-check">
                  {body.checklist.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>

              {body.refs && body.refs.length > 0 && (
                <section className="teach-section">
                  <h2>参考来源</h2>
                  <ul className="teach-links">
                    {body.refs.map((r) => (
                      <li key={r.url}>
                        <a href={r.url} target="_blank" rel="noreferrer">
                          {r.label} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          ) : (
            <div className="teach-fallback">
              <h2>{lesson?.title ?? course.title}</h2>
              <p>{course.desc}</p>
              <p className="teach-tip">本篇正文正在扩充。可先按右侧步骤标题自行练习，或先读「下载指南 / Cursor / 做网页」等已有完整正文的教程。</p>
              <ul className="course-detail__list">
                {course.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </main>
  )
}
