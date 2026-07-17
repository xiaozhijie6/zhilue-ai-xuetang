import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  CATEGORIES,
  FEATURED_IDS,
  KNOWLEDGE_LIBRARY,
  LEARNING_PATHS,
  LEVELS,
  getItem,
  type KnowledgeItem,
  type Level,
} from './data/knowledge'
import { GLOSSARY, GLOSSARY_CATEGORIES } from './data/glossary'
import {
  CAT_NAV,
  COMMUNITY_TOPICS,
  FREE_TILES,
  HERO_SLIDES,
  REC_TABS,
} from './data/home'
import { AmbientBackground } from './components/AmbientBackground'
import { AiIcon, CourseIcon } from './components/AiIcon'
import { CourseCover } from './components/CourseCover'
import './index.css'

const PHONE_KEY = 'zhilue_phone'
const PROGRESS_KEY = 'zhilue_progress'

type Tab = 'courses' | 'paths' | 'glossary' | 'learn'
type SortKey = 'hot' | 'new' | 'students'

function maskPhone(phone: string) {
  if (phone.length < 7) return phone
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`
}

function isValidPhone(phone: string) {
  return /^1\d{10}$/.test(phone)
}

function loadProgress(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') as Record<string, string[]>
  } catch {
    return {}
  }
}

function saveProgress(map: Record<string, string[]>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(map))
}

function PhoneLoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: (phone: string) => void
}) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 40)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (countdown <= 0) return
    const t = window.setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => window.clearTimeout(t)
  }, [countdown])

  if (!open) return null

  const sendCode = () => {
    if (!isValidPhone(phone)) {
      setError('请输入正确的 11 位手机号')
      return
    }
    setError('')
    setSent(true)
    setCountdown(60)
    setCode('123456')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidPhone(phone)) return setError('请输入正确的 11 位手机号')
    if (!sent) return setError('请先获取验证码')
    if (!/^\d{4,6}$/.test(code)) return setError('请输入验证码')
    onSuccess(phone)
  }

  return (
    <div className="login-overlay" onClick={onClose} role="presentation">
      <div className="login-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="login-modal__close" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <h2>手机号登录</h2>
        <p className="login-modal__desc">演示站验证码：点获取后默认 123456</p>
        <form className="login-form" onSubmit={submit}>
          <label>
            <span>手机号</span>
            <input
              ref={inputRef}
              value={phone}
              maxLength={11}
              inputMode="numeric"
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
              placeholder="11 位手机号"
            />
          </label>
          <label>
            <span>验证码</span>
            <div className="login-form__code">
              <input
                value={code}
                maxLength={6}
                inputMode="numeric"
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="验证码"
              />
              <button type="button" className="login-form__send" disabled={countdown > 0} onClick={sendCode}>
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </label>
          {error && <p className="login-form__error">{error}</p>}
          <button className="btn btn--accent" type="submit">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

function CourseRow({
  item,
  progress,
  onOpen,
}: {
  item: KnowledgeItem
  progress: number
  onOpen: () => void
}) {
  return (
    <article className="gk-row">
      <button type="button" className="gk-row__main" onClick={onOpen}>
        <div className="gk-row__cover-wrap">
          <CourseCover
            id={item.id}
            category={item.category}
            teacher={item.teacher}
            level={item.level}
            hot={item.hot}
            compact
          />
        </div>
        <div className="gk-row__body">
          <div className="gk-row__tags">
            {item.hot && <i className="tag tag--hot">热门</i>}
            {item.new && <i className="tag tag--new">上新</i>}
            {item.source === '自有资料' && <i className="tag">自有资料</i>}
            <i className="tag">{item.level}</i>
          </div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
          <div className="gk-row__meta">
            <span>{item.teacher}</span>
            <span>{item.lessons.length} 讲</span>
            <span>{item.students.toLocaleString()} 人学过</span>
            <span>{item.duration}</span>
            {progress > 0 && <span className="gk-row__pct">已学 {progress}%</span>}
          </div>
        </div>
      </button>
      <button type="button" className="gk-row__cta" onClick={onOpen}>
        查看详情
      </button>
    </article>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('courses')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [glossaryId, setGlossaryId] = useState<string | null>(GLOSSARY[0]?.id ?? null)
  const [phone, setPhone] = useState<string | null>(() => sessionStorage.getItem(PHONE_KEY))
  const [loginOpen, setLoginOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('全部')
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('全部')
  const [sort, setSort] = useState<SortKey>('hot')
  const [gCat, setGCat] = useState<(typeof GLOSSARY_CATEGORIES)[number]>('全部')
  const [gQuery, setGQuery] = useState('')
  const [progressMap, setProgressMap] = useState(loadProgress)
  const [learnId, setLearnId] = useState<string>(FEATURED_IDS[0])
  const [heroIndex, setHeroIndex] = useState(0)
  const [recTab, setRecTab] = useState<(typeof REC_TABS)[number]['id']>('hot')
  const [catalogOpen, setCatalogOpen] = useState(false)

  const openCatalog = (opts?: { category?: (typeof CATEGORIES)[number]; query?: string }) => {
    if (opts?.category) setCategory(opts.category)
    if (opts?.query !== undefined) setQuery(opts.query)
    setCatalogOpen(true)
    window.setTimeout(() => {
      document.getElementById('course-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
  }

  const selected = selectedId ? getItem(selectedId) : null
  const glossaryItem = GLOSSARY.find((g) => g.id === glossaryId) ?? null
  const learnCourse = getItem(learnId) ?? KNOWLEDGE_LIBRARY[0]
  const heroSlide = HERO_SLIDES[heroIndex]
  const heroCourse = getItem(heroSlide.courseId)

  useEffect(() => {
    if (tab !== 'courses') return
    const t = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 5200)
    return () => window.clearInterval(t)
  }, [tab])

  useEffect(() => {
    if (tab === 'courses' && query.trim()) setCatalogOpen(true)
  }, [query, tab])

  const stats = useMemo(() => {
    const lessons = KNOWLEDGE_LIBRARY.reduce((n, c) => n + c.lessons.length, 0)
    return {
      courses: KNOWLEDGE_LIBRARY.length,
      lessons,
      terms: GLOSSARY.length,
      tools: KNOWLEDGE_LIBRARY.filter((c) => c.category === 'AI编程工具').length,
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = KNOWLEDGE_LIBRARY.filter((item) => {
      if (category !== '全部' && item.category !== category) return false
      if (level !== '全部' && item.level !== level) return false
      if (!q) return true
      return `${item.title}${item.desc}${item.category}${item.teacher}`.toLowerCase().includes(q)
    })
    list = [...list].sort((a, b) => {
      if (sort === 'students') return b.students - a.students
      if (sort === 'new') return Number(!!b.new) - Number(!!a.new) || b.students - a.students
      return Number(!!b.hot) - Number(!!a.hot) || b.students - a.students
    })
    return list
  }, [query, category, level, sort])

  const glossaryFiltered = useMemo(() => {
    const q = gQuery.trim().toLowerCase()
    return GLOSSARY.filter((g) => {
      if (gCat !== '全部' && g.category !== gCat) return false
      if (!q) return true
      return `${g.term}${g.en ?? ''}${g.short}${g.detail}`.toLowerCase().includes(q)
    })
  }, [gCat, gQuery])

  const recommended = useMemo(() => {
    const tabMeta = REC_TABS.find((t) => t.id === recTab) ?? REC_TABS[0]
    let list = [...KNOWLEDGE_LIBRARY]
    switch (tabMeta.filter) {
      case 'new':
        list = list.filter((c) => c.new || c.hot).sort((a, b) => Number(!!b.new) - Number(!!a.new))
        break
      case 'tools':
        list = list.filter((c) => c.category === 'AI编程工具')
        break
      case 'mcp':
        list = list.filter((c) => c.category === 'MCP与工具协议')
        break
      case 'api':
        list = list.filter((c) => c.category === 'API与配置')
        break
      case 'rag':
        list = list.filter(
          (c) => c.category === '知识库与RAG' || c.category === '大模型认知' || c.id.includes('multimodal'),
        )
        break
      default:
        list = list.filter((c) => c.hot || FEATURED_IDS.includes(c.id as (typeof FEATURED_IDS)[number]))
        list.sort((a, b) => b.students - a.students)
    }
    return list.slice(0, 8)
  }, [recTab])

  const courseProgress = (id: string) => {
    const item = getItem(id)
    if (!item?.lessons.length) return 0
    return Math.round(((progressMap[id]?.length ?? 0) / item.lessons.length) * 100)
  }

  const toggleLesson = (courseId: string, lessonId: string) => {
    setProgressMap((prev) => {
      const set = new Set(prev[courseId] ?? [])
      if (set.has(lessonId)) set.delete(lessonId)
      else set.add(lessonId)
      const next = { ...prev, [courseId]: [...set] }
      saveProgress(next)
      return next
    })
  }

  const openCourse = (id: string) => {
    setSelectedId(id)
    setTab('courses')
  }

  const requireLogin = (then?: () => void) => {
    if (phone) {
      then?.()
      setTab('learn')
      return
    }
    setLoginOpen(true)
  }

  const onLogin = (p: string) => {
    sessionStorage.setItem(PHONE_KEY, p)
    setPhone(p)
    setLoginOpen(false)
    setTab('learn')
  }

  const logout = () => {
    sessionStorage.removeItem(PHONE_KEY)
    setPhone(null)
  }

  /* ——— Detail overlay ——— */
  const detailPanel =
    selected && (
      <div className="gk-detail-mask" onClick={() => setSelectedId(null)} role="presentation">
        <div className="gk-detail" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
          <button type="button" className="gk-detail__close" onClick={() => setSelectedId(null)}>
            关闭
          </button>
          <div className="gk-detail__hero">
            <CourseIcon id={selected.id} category={selected.category} size={72} />
            <div className="gk-detail__tags">
              <span>{selected.category}</span>
              <span>{selected.level}</span>
              {selected.hot && <span className="tag tag--hot">热门</span>}
            </div>
          </div>
          <h2>{selected.title}</h2>
          <p className="gk-detail__desc">{selected.desc}</p>
          <div className="gk-detail__meta">
            <span>{selected.teacher}</span>
            <span>{selected.lessons.length} 讲</span>
            <span>{selected.students.toLocaleString()} 人学过</span>
            <span>{selected.duration}</span>
            <span>进度 {courseProgress(selected.id)}%</span>
          </div>
          <div className="gk-detail__actions">
            <button
              type="button"
              className="btn btn--accent"
              onClick={() => {
                setLearnId(selected.id)
                setSelectedId(null)
                requireLogin()
              }}
            >
              {phone ? '开始学习' : '登录后学习'}
            </button>
            <button type="button" className="btn btn--ghost-dark" onClick={() => setSelectedId(null)}>
              返回列表
            </button>
          </div>
          <h3>你将了解</h3>
          <ul className="gk-detail__list">
            {selected.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h3>大纲</h3>
          <ol className="gk-detail__list">
            {selected.outline.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ol>
          <h3>课时（点击勾选试学进度）</h3>
          <div className="gk-lessons">
            {selected.lessons.map((lesson, i) => {
              const done = progressMap[selected.id]?.includes(lesson.id)
              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={`gk-lesson ${done ? 'is-done' : ''}`}
                  onClick={() => toggleLesson(selected.id, lesson.id)}
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
        </div>
      </div>
    )

  return (
    <div className="gk">
      <AmbientBackground />
      <PhoneLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={onLogin} />
      {detailPanel}

      <header className="gk-top">
        <div className="gk-top__inner">
          <button type="button" className="gk-logo" onClick={() => setTab('courses')}>
            知略 <span>AI 学堂</span>
          </button>
          <nav className="gk-tabs" aria-label="主导航">
            {(
              [
                ['courses', '课程'],
                ['paths', '学习路径'],
                ['glossary', '术语词典'],
                ['learn', '学习中心'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={tab === id ? 'is-on' : ''}
                onClick={() => {
                  if (id === 'learn' && !phone) {
                    setLoginOpen(true)
                    return
                  }
                  setTab(id)
                }}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="gk-top__right">
            <div className="gk-search">
              <input
                type="search"
                placeholder={tab === 'glossary' ? '搜索术语…' : '搜索课程、工具、API、MCP…'}
                value={tab === 'glossary' ? gQuery : query}
                onChange={(e) => (tab === 'glossary' ? setGQuery(e.target.value) : setQuery(e.target.value))}
              />
            </div>
            {phone ? (
              <button type="button" className="gk-user" onClick={() => setTab('learn')}>
                {maskPhone(phone)}
              </button>
            ) : (
              <button type="button" className="gk-login" onClick={() => setLoginOpen(true)}>
                登录
              </button>
            )}
          </div>
        </div>
      </header>

      {tab !== 'courses' && (
        <div
          className="gk-banner"
          onPointerMove={(e) => {
            const el = e.currentTarget
            const r = el.getBoundingClientRect()
            el.style.setProperty('--bx', `${((e.clientX - r.left) / r.width) * 100}%`)
            el.style.setProperty('--by', `${((e.clientY - r.top) / r.height) * 100}%`)
          }}
        >
          <div className="gk-banner__inner">
            <div className="gk-banner__copy">
              <p className="gk-banner__eyebrow">Interactive Showcase</p>
              <h1>
                <span className="gk-banner__line">把 AI 知识摊开看</span>
                <span className="gk-banner__line gk-banner__line--accent">工具 · API · MCP · 术语</span>
              </h1>
              <p className="gk-banner__lead">
                {stats.courses} 门课 · {stats.tools} 个编程工具专题 · {stats.terms} 条术语 ·{' '}
                {stats.lessons} 讲。
              </p>
              <div className="gk-chips" aria-label="快捷筛选">
                {(
                  [
                    ['AI编程工具', 'AI编程工具'],
                    ['API与配置', 'API'],
                    ['MCP与工具协议', 'MCP'],
                    ['提示词工程', '提示词'],
                    ['知识库与RAG', 'RAG'],
                    ['大模型认知', '模型'],
                  ] as const
                ).map(([cat, label]) => (
                  <button
                    key={cat}
                    type="button"
                    className={`gk-chip ${category === cat ? 'is-on' : ''}`}
                    onClick={() => {
                      setCategory(cat)
                      setTab('courses')
                      setQuery('')
                    }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  className="gk-chip gk-chip--ghost"
                  onClick={() => {
                    setTab('glossary')
                    setGCat('全部')
                  }}
                >
                  术语词典 →
                </button>
              </div>
            </div>
            <div className="gk-banner__panel">
              <div className="gk-banner__stat">
                <strong>{stats.courses}</strong>
                <span>课程专栏</span>
              </div>
              <div className="gk-banner__stat">
                <strong>{stats.tools}</strong>
                <span>编程工具</span>
              </div>
              <div className="gk-banner__stat">
                <strong>{stats.terms}</strong>
                <span>专有名词</span>
              </div>
              <div className="gk-banner__hint">
                <em>指针靠近</em>
                <span>背景节点会推开并连线</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PATHS */}
      {tab === 'paths' && (
        <main className="gk-main">
          <h2 className="gk-section-title">学习路径</h2>
          <p className="gk-section-desc">按主题打包，点路径进入对应课程列表。</p>
          <div className="gk-paths">
            {LEARNING_PATHS.map((path) => (
              <button
                key={path.id}
                type="button"
                className="gk-path"
                onClick={() => {
                  setCategory('全部')
                  setQuery('')
                  setTab('courses')
                  // filter by showing path courses via query on first course title - better: set a path filter
                  setSelectedId(null)
                  sessionStorage.setItem('zhilue_path', path.id)
                  setCategory(
                    path.id === 'path-ide'
                      ? 'AI编程工具'
                      : path.id === 'path-api'
                        ? 'API与配置'
                        : path.id === 'path-mcp'
                          ? 'MCP与工具协议'
                          : path.id === 'path-prompt'
                            ? '提示词工程'
                            : path.id === 'path-rag'
                              ? '知识库与RAG'
                              : '商业落地',
                  )
                }}
              >
                <strong>{path.title}</strong>
                <span>{path.desc}</span>
                <em>{path.count} 门课程</em>
              </button>
            ))}
          </div>
          <h2 className="gk-section-title">路径包含课程（可点开）</h2>
          <div className="gk-list">
            {LEARNING_PATHS.flatMap((p) => p.courseIds)
              .filter((id, i, arr) => arr.indexOf(id) === i)
              .map((id) => getItem(id))
              .filter(Boolean)
              .map((item) => (
                <CourseRow
                  key={item!.id}
                  item={item!}
                  progress={courseProgress(item!.id)}
                  onOpen={() => openCourse(item!.id)}
                />
              ))}
          </div>
        </main>
      )}

      {/* GLOSSARY */}
      {tab === 'glossary' && (
        <main className="gk-main gk-glossary">
          <h2 className="gk-section-title">AI 术语词典</h2>
          <p className="gk-section-desc">专有名称解释：LLM、Token、RAG、MCP、Function Calling…</p>
          <div className="gk-filters">
            {GLOSSARY_CATEGORIES.map((c) => (
              <button key={c} type="button" className={gCat === c ? 'is-on' : ''} onClick={() => setGCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="gk-glossary__layout">
            <aside className="gk-glossary__side">
              {glossaryFiltered.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={glossaryId === g.id ? 'is-on' : ''}
                  onClick={() => setGlossaryId(g.id)}
                >
                  <strong>{g.term}</strong>
                  {g.en && <span>{g.en}</span>}
                </button>
              ))}
            </aside>
            {glossaryItem && (
              <article className="gk-glossary__article">
                <p className="gk-glossary__cat">{glossaryItem.category}</p>
                <h1>
                  {glossaryItem.term}
                  {glossaryItem.en ? <em> · {glossaryItem.en}</em> : null}
                </h1>
                <p className="gk-glossary__short">{glossaryItem.short}</p>
                <p className="gk-glossary__detail">{glossaryItem.detail}</p>
                {glossaryItem.related && glossaryItem.related.length > 0 && (
                  <>
                    <h3>相关术语</h3>
                    <div className="gk-glossary__related">
                      {glossaryItem.related.map((rid) => {
                        const g = GLOSSARY.find((x) => x.id === rid)
                        if (!g) return null
                        return (
                          <button key={rid} type="button" onClick={() => setGlossaryId(rid)}>
                            {g.term}
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </article>
            )}
          </div>
        </main>
      )}

      {/* LEARN */}
      {tab === 'learn' && phone && (
        <main className="gk-main gk-learn">
          <div className="gk-learn__bar">
            <div>
              <h2>学习中心</h2>
              <p>已登录 {maskPhone(phone)} · 进度保存在本机</p>
            </div>
            <button type="button" className="btn btn--ghost-dark" onClick={logout}>
              退出登录
            </button>
          </div>
          <div className="gk-learn__grid">
            <aside>
              <p className="gk-learn__label">我的课程</p>
              {FEATURED_IDS.map((id) => {
                const c = getItem(id)
                if (!c) return null
                return (
                  <button
                    key={id}
                    type="button"
                    className={learnId === id ? 'is-on' : ''}
                    onClick={() => setLearnId(id)}
                  >
                    <em>{courseProgress(id)}%</em>
                    <span>{c.title}</span>
                  </button>
                )
              })}
              <button type="button" className="btn btn--ghost-dark" onClick={() => setTab('courses')}>
                去课程库选更多
              </button>
            </aside>
            <section>
              <h1>{learnCourse.title}</h1>
              <p>{learnCourse.desc}</p>
              <div className="gk-lessons">
                {learnCourse.lessons.map((lesson, i) => {
                  const done = progressMap[learnCourse.id]?.includes(lesson.id)
                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      className={`gk-lesson ${done ? 'is-done' : ''}`}
                      onClick={() => toggleLesson(learnCourse.id, lesson.id)}
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
      )}

      {/* COURSES */}
      {tab === 'courses' && (
        <main className="gk-main home">
          <div className="home-promo">
            <strong>本周上新</strong>
            <span>Cursor · Claude Code · MCP · API 工程手册持续更新</span>
            <button type="button" onClick={() => openCourse('mcp-intro')}>
              免费领 MCP 入门 →
            </button>
          </div>

          <section className="home-market" aria-label="首页货架">
            <aside className="home-cats-rail">
              {CAT_NAV.map((nav) => (
                <button
                  key={nav.category}
                  type="button"
                  className={category === nav.category ? 'is-on' : ''}
                  onClick={() => openCatalog({ category: nav.category as (typeof CATEGORIES)[number] })}
                >
                  <AiIcon icon={nav.icon} size={26} />
                  <span>
                    <strong>{nav.title}</strong>
                    <em>{nav.keywords}</em>
                  </span>
                </button>
              ))}
            </aside>

            <div className="home-carousel">
              {heroCourse && (
                <button
                  type="button"
                  className="home-slide"
                  onClick={() => openCourse(heroCourse.id)}
                >
                  <div className="home-slide__glow" />
                  <div className="home-slide__copy">
                    <p className="home-slide__eye">{heroSlide.eyebrow}</p>
                    <h2>{heroSlide.title}</h2>
                    <p>{heroSlide.subtitle}</p>
                    <div className="home-slide__meta">
                      <span>{heroCourse.lessons.length} 讲</span>
                      <span>{heroCourse.level}</span>
                      <span>{heroCourse.students.toLocaleString()} 人学过</span>
                      <span>{heroCourse.teacher.replace(/^知略\s*[·•]\s*/, '')}</span>
                    </div>
                    <span className="home-slide__cta">{heroSlide.cta}</span>
                  </div>
                  <div className="home-slide__visual">
                    <CourseCover
                      id={heroCourse.id}
                      category={heroCourse.category}
                      teacher={heroCourse.teacher}
                      level={heroCourse.level}
                      hot={heroCourse.hot}
                    />
                  </div>
                </button>
              )}
              <div className="home-carousel__dots">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={s.courseId}
                    type="button"
                    className={i === heroIndex ? 'is-on' : ''}
                    aria-label={`幻灯片 ${i + 1}`}
                    onClick={() => setHeroIndex(i)}
                  />
                ))}
              </div>
            </div>

            <aside className="home-aside">
              <div className="home-gift">
                <div className="home-gift__badge">新人礼</div>
                <h3>{phone ? `你好，${maskPhone(phone)}` : '登录解锁学习进度'}</h3>
                <ul>
                  <li>免费速览工具课</li>
                  <li>勾选课时自动留存</li>
                  <li>术语词典随时查</li>
                </ul>
                {phone ? (
                  <button type="button" className="btn btn--accent" onClick={() => setTab('learn')}>
                    进入学习中心
                  </button>
                ) : (
                  <button type="button" className="btn btn--accent" onClick={() => setLoginOpen(true)}>
                    登录 / 注册
                  </button>
                )}
              </div>
              <div className="home-paths-mini">
                <p className="home-paths-mini__label">按目标学</p>
                {LEARNING_PATHS.slice(0, 4).map((path) => (
                  <button key={path.id} type="button" onClick={() => setTab('paths')}>
                    <strong>{path.title.replace('路线', '')}</strong>
                    <em>{path.count} 门</em>
                  </button>
                ))}
              </div>
            </aside>
          </section>

          <section className="home-spotlight" aria-label="精选速达">
            {FEATURED_IDS.slice(0, 4).map((id) => {
              const item = getItem(id)
              if (!item) return null
              return (
                <button
                  key={id}
                  type="button"
                  className="home-spotlight__card"
                  onClick={() => openCourse(id)}
                >
                  <CourseIcon id={item.id} category={item.category} size={42} />
                  <span>
                    <strong>{item.title}</strong>
                    <em>
                      {item.level} · {item.students.toLocaleString()} 人在学
                    </em>
                  </span>
                </button>
              )
            })}
          </section>

          <section className="home-mid">
            <div className="home-free">
              <div className="home-block-head">
                <div>
                  <h2>免费开学</h2>
                  <p className="home-block-desc">先上手再系统学，零门槛进门</p>
                </div>
                <button type="button" onClick={() => openCatalog()}>
                  全部课程 →
                </button>
              </div>
              <div className="home-free__grid">
                {FREE_TILES.map((tile) => (
                  <button
                    key={tile.id}
                    type="button"
                    className="home-free__card"
                    onClick={() => openCourse(tile.courseId)}
                  >
                    <AiIcon icon={tile.icon} size={48} />
                    <span>
                      <strong>{tile.title}</strong>
                      <em>{tile.desc}</em>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <aside className="home-tribe">
              <div className="home-block-head">
                <h2>大家在聊</h2>
                <span>实时</span>
              </div>
              <ul>
                {COMMUNITY_TOPICS.map((t) => (
                  <li key={t.text}>
                    <i>{t.tag}</i>
                    <button
                      type="button"
                      onClick={() =>
                        openCatalog({
                          category: '全部',
                          query: t.text.replace(/[？?].*$/, '').slice(0, 8),
                        })
                      }
                    >
                      {t.text}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="home-rec">
            <div className="home-block-head">
              <div>
                <h2>为你推荐</h2>
                <p className="home-block-desc">热门主讲课，点开就能看大纲</p>
              </div>
            </div>
            <div className="home-rec__tabs">
              {REC_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={recTab === t.id ? 'is-on' : ''}
                  onClick={() => setRecTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="home-rec__grid">
              {recommended.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="home-card"
                  onClick={() => openCourse(item.id)}
                >
                  <CourseCover
                    id={item.id}
                    category={item.category}
                    teacher={item.teacher}
                    level={item.level}
                    hot={item.hot}
                  />
                  <strong>{item.title}</strong>
                  <span>
                    {item.students.toLocaleString()} 人学过 · {item.lessons.length} 讲
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="home-list-block" id="course-catalog">
            <button
              type="button"
              className={`home-catalog-toggle ${catalogOpen ? 'is-open' : ''}`}
              aria-expanded={catalogOpen}
              onClick={() => {
                if (catalogOpen) setCatalogOpen(false)
                else openCatalog()
              }}
            >
              <span className="home-catalog-toggle__text">
                <strong>完整课程目录</strong>
                <em>
                  {stats.courses} 门课已收录
                  {category !== '全部' ? ` · 筛选「${category}」` : ''}
                  {query.trim() ? ` · 搜索「${query.trim()}」` : ''}
                </em>
              </span>
              <span className="home-catalog-toggle__action">
                {catalogOpen ? '收起' : '展开'}
                <i aria-hidden="true">{catalogOpen ? '▴' : '▾'}</i>
              </span>
            </button>

            {catalogOpen && (
              <div className="home-catalog-panel">
                <div className="home-block-head">
                  <p className="home-block-desc" style={{ margin: 0 }}>
                    当前显示 {filtered.length} 门，点行即可看大纲与课时
                  </p>
                  <div className="gk-sort">
                    {(
                      [
                        ['hot', '综合'],
                        ['new', '上新'],
                        ['students', '热度'],
                      ] as const
                    ).map(([k, label]) => (
                      <button
                        key={k}
                        type="button"
                        className={sort === k ? 'is-on' : ''}
                        onClick={() => setSort(k)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="gk-toolbar gk-toolbar--compact">
                  <div className="gk-filters gk-filters--sm">
                    {LEVELS.map((lv) => (
                      <button
                        key={lv}
                        type="button"
                        className={level === lv ? 'is-on' : ''}
                        onClick={() => setLevel(lv as Level | '全部')}
                      >
                        {lv}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="gk-list">
                  {filtered.map((item) => (
                    <CourseRow
                      key={item.id}
                      item={item}
                      progress={courseProgress(item.id)}
                      onOpen={() => openCourse(item.id)}
                    />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <p className="gk-empty">没有匹配课程，试试换分类或清空搜索。</p>
                )}
                <div className="home-catalog-panel__foot">
                  <button type="button" onClick={() => setCatalogOpen(false)}>
                    收起目录
                  </button>
                </div>
              </div>
            )}
          </section>

        </main>
      )}

      <footer className="gk-footer">
        <div>
          知略 AI 学堂 · 知识展示站
        </div>
        <div>
          {stats.courses} 课 · {stats.terms} 术语 · 电话登录
        </div>
      </footer>
    </div>
  )
}
