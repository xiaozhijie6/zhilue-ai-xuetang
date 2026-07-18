import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  CATEGORIES,
  FEATURED_IDS,
  KNOWLEDGE_LIBRARY,
  LEVELS,
  getItem,
  type KnowledgeItem,
  type Level,
} from './data/knowledge'
import { GLOSSARY, GLOSSARY_CATEGORIES } from './data/glossary'
import { ENDPOINT_GROUPS, ENDPOINTS, endpointsByGroup } from './data/endpoints'
import { GUIDE_CATEGORIES, NEWBIE_GUIDES, guidesByCategory, type GuideCategory } from './data/newbie'
import {
  FREE_TILES,
  HERO_SLIDES,
  HOME_TRACK_CARDS,
  REC_TABS,
} from './data/home'
import { HOOK_FEED } from './data/hooks'
import { TRACKS, type TrackId } from './data/tracks'
import { AmbientBackground } from './components/AmbientBackground'
import { AiIcon } from './components/AiIcon'
import { CourseCover } from './components/CourseCover'
import { CourseDetail } from './components/CourseDetail'
import './index.css'

const PHONE_KEY = 'zhilue_phone'
const PROGRESS_KEY = 'zhilue_progress'
type Tab = 'home' | 'track' | 'glossary' | 'guide' | 'learn'
type SortKey = 'hot' | 'new' | 'students'
type RecTabId = (typeof REC_TABS)[number]['id']

const TRACK_LEVELS: TrackId[] = ['基础', '工具', '进阶']

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

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="progress-bar" aria-hidden="true">
      <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
    </div>
  )
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
            level={item.level}
            hot={item.hot}
            title={item.title}
            compact
          />
        </div>
        <div className="gk-row__body">
          <div className="gk-row__tags">
            {item.hot && <i className="tag tag--hot">热门</i>}
            {item.new && <i className="tag tag--new">上新</i>}
            {item.source === '自有资料' && <i className="tag">自有资料</i>}
            <i className={`tag tag--level tag--level-${item.level}`}>{item.level}</i>
          </div>
          <h3>{item.hook}</h3>
          <p>{item.outcome || item.title}</p>
          <div className="gk-row__meta">
            <span>{item.title}</span>
            <span>{item.teacher}</span>
            <span>{item.lessons.length} 步</span>
            {progress > 0 && <span className="gk-row__pct">已完成 {progress}%</span>}
          </div>
        </div>
      </button>
      <button type="button" className="gk-row__cta" onClick={onOpen}>
        查看教程
      </button>
    </article>
  )
}

function CatalogCard({
  item,
  progress,
  onOpen,
}: {
  item: KnowledgeItem
  progress: number
  onOpen: () => void
}) {
  return (
    <button type="button" className="home-card home-card--catalog" onClick={onOpen}>
      <CourseCover
        id={item.id}
        category={item.category}
        level={item.level}
        hot={item.hot}
        title={item.title}
      />
      <strong className="home-card__hook">{item.hook}</strong>
      <em className="home-card__title">{item.title}</em>
      <span className="home-card__outcome">
        {item.outcome} · {item.level}
      </span>
      {progress > 0 && <span className="home-card__progress">已学 {progress}%</span>}
    </button>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [trackLevel, setTrackLevel] = useState<TrackId>('基础')
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
  const [guideCat, setGuideCat] = useState<GuideCategory>('全部')
  const [guideId, setGuideId] = useState<string>(NEWBIE_GUIDES[0]?.id ?? '')
  const [guideQuery, setGuideQuery] = useState('')
  const [endpointGroup, setEndpointGroup] = useState<(typeof ENDPOINT_GROUPS)[number]>('全部')
  const [progressMap, setProgressMap] = useState(loadProgress)
  const [learnId, setLearnId] = useState<string>(FEATURED_IDS[0])
  const [heroIndex, setHeroIndex] = useState(0)
  const [recTab, setRecTab] = useState<RecTabId>('hot')

  const goToTrack = (levelId: TrackId) => {
    setTrackLevel(levelId)
    setTab('track')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openCatalog = (opts?: { category?: (typeof CATEGORIES)[number]; query?: string; level?: Level | '全部' }) => {
    setTab('home')
    if (opts?.category) setCategory(opts.category)
    if (opts?.level) setLevel(opts.level)
    if (opts?.query !== undefined) setQuery(opts.query)
    window.setTimeout(() => {
      document.getElementById('course-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
  }

  const selected = selectedId ? getItem(selectedId) : null
  const glossaryItem = GLOSSARY.find((g) => g.id === glossaryId) ?? null
  const guideItem = NEWBIE_GUIDES.find((g) => g.id === guideId) ?? NEWBIE_GUIDES[0] ?? null
  const learnCourse = getItem(learnId) ?? KNOWLEDGE_LIBRARY[0]
  const activeTrack = TRACKS.find((t) => t.id === trackLevel) ?? TRACKS[0]
  const endpointList = useMemo(() => endpointsByGroup(endpointGroup), [endpointGroup])
  const guideList = useMemo(() => {
    const q = guideQuery.trim().toLowerCase()
    return guidesByCategory(guideCat).filter((g) => {
      if (!q) return true
      return `${g.title}${g.symptom}${g.why}${g.steps.join('')}${g.bestPractice.join('')}`.toLowerCase().includes(q)
    })
  }, [guideCat, guideQuery])
  const heroSlide = HERO_SLIDES[heroIndex]
  const heroCourse = getItem(heroSlide.courseId)

  useEffect(() => {
    if (guideList.length === 0) return
    if (!guideList.some((g) => g.id === guideId)) {
      setGuideId(guideList[0].id)
    }
  }, [guideList, guideId])

  useEffect(() => {
    if (tab !== 'home') return
    const t = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 5200)
    return () => window.clearInterval(t)
  }, [tab])

  useEffect(() => {
    if (tab === 'home' && query.trim()) {
      window.setTimeout(() => {
        document.getElementById('course-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 40)
    }
  }, [query, tab])

  useEffect(() => {
    if (selectedId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedId])

  const stats = useMemo(() => {
    const lessons = KNOWLEDGE_LIBRARY.reduce((n, c) => n + c.lessons.length, 0)
    return {
      courses: KNOWLEDGE_LIBRARY.length,
      lessons,
      terms: GLOSSARY.length,
      tools: KNOWLEDGE_LIBRARY.filter(
        (c) => c.category === 'AI编程工具与智能体安装' || c.category === 'AI编程工具',
      ).length,
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = KNOWLEDGE_LIBRARY.filter((item) => {
      if (category !== '全部' && item.category !== category) return false
      if (level !== '全部' && item.level !== level) return false
      if (!q) return true
      return `${item.hook}${item.outcome}${item.title}${item.desc}${item.category}${item.teacher}`
        .toLowerCase()
        .includes(q)
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
      case 'basic':
        list = list.filter((c) => c.level === '基础')
        break
      case 'tools':
        list = list.filter(
          (c) => c.category === 'AI编程工具与智能体安装' || c.category === 'AI编程工具',
        )
        break
      case 'build':
        list = list.filter((c) => c.category === '用AI做产品')
        break
      case 'image':
        list = list.filter((c) => c.category === 'AI生图')
        break
      case 'new':
        list = list.filter((c) => c.new || c.hot).sort((a, b) => Number(!!b.new) - Number(!!a.new))
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

  return (
    <div className="gk">
      <AmbientBackground />
      <PhoneLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={onLogin} />

      <header className="gk-top">
        <div className="gk-top__inner">
          <button type="button" className="gk-logo" onClick={() => setTab('home')}>
            知略 <span>AI 学堂</span>
          </button>
          <nav className="gk-tabs" aria-label="主导航">
            {(
              [
                ['home', '首页'],
                ['track', '学习路径'],
                ['glossary', '术语词典'],
                ['guide', '避坑指南'],
                ['learn', '我的进度'],
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
                placeholder={
                  tab === 'glossary'
                    ? '搜索术语…'
                    : tab === 'guide'
                      ? '搜索避坑问题、最佳实践…'
                      : '搜索教程、工具、做网页…'
                }
                value={tab === 'glossary' ? gQuery : tab === 'guide' ? guideQuery : query}
                onChange={(e) => {
                  if (tab === 'glossary') setGQuery(e.target.value)
                  else if (tab === 'guide') setGuideQuery(e.target.value)
                  else setQuery(e.target.value)
                }}
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

      {tab === 'home' && (
        <div className="home-level-bar" aria-label="进阶等级">
          {TRACK_LEVELS.map((lv) => (
            <button
              key={lv}
              type="button"
              className="home-level-pill"
              onClick={() => goToTrack(lv)}
            >
              {lv}
            </button>
          ))}
        </div>
      )}

      {tab !== 'home' && (
        <div
          className="gk-banner gk-banner--result"
          onPointerMove={(e) => {
            const el = e.currentTarget
            const r = el.getBoundingClientRect()
            el.style.setProperty('--bx', `${((e.clientX - r.left) / r.width) * 100}%`)
            el.style.setProperty('--by', `${((e.clientY - r.top) / r.height) * 100}%`)
          }}
        >
          <div className="gk-banner__inner">
            <div className="gk-banner__copy">
              <p className="gk-banner__eyebrow">图文跟做 · 可勾进度</p>
              <h1>
                <span className="gk-banner__line">知略 AI 知识库</span>
                <span className="gk-banner__line gk-banner__line--accent">装得上、改得动、做得出来</span>
              </h1>
              <p className="gk-banner__lead">
                {stats.courses} 篇教程，覆盖安装入门、Cursor 等工具，以及网页 / 小程序 / App / 生图实操。
              </p>
              <div className="gk-chips" aria-label="快捷入口">
                {TRACK_LEVELS.map((lv) => (
                  <button key={lv} type="button" className="gk-chip" onClick={() => goToTrack(lv)}>
                    {lv}
                  </button>
                ))}
                <button type="button" className="gk-chip gk-chip--ghost" onClick={() => setTab('home')}>
                  返回首页 →
                </button>
              </div>
            </div>
            <div className="gk-banner__panel">
              <div className="gk-banner__stat">
                <strong>{stats.courses}</strong>
                <span>图文教程</span>
              </div>
              <div className="gk-banner__stat">
                <strong>3</strong>
                <span>学习阶段</span>
              </div>
              <div className="gk-banner__stat">
                <strong>{stats.terms}</strong>
                <span>术语条目</span>
              </div>
              <div className="gk-banner__hint">
                <em>跟着做</em>
                <span>每篇写清：下载什么、点哪里、最后能做出什么</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRACK */}
      {tab === 'track' && (
        <main className="gk-main track-page">
          <div className="track-level-pills" aria-label="切换等级">
            {TRACK_LEVELS.map((lv) => (
              <button
                key={lv}
                type="button"
                className={trackLevel === lv ? 'is-on' : ''}
                onClick={() => setTrackLevel(lv)}
              >
                {lv}
              </button>
            ))}
          </div>

          <header
            className="track-hero"
            style={{ ['--track-color' as string]: activeTrack.color }}
          >
            <span className="track-hero__badge">{activeTrack.badge}</span>
            <h1>{activeTrack.title}</h1>
            <p className="track-hero__hook">{activeTrack.hook}</p>
            <p className="track-hero__promise">{activeTrack.promise}</p>
            <span className="track-hero__days">{activeTrack.days}</span>
          </header>

          <div className="track-steps">
            {activeTrack.steps.map((step, i) => (
              <section key={step.title} className="track-step">
                <div className="track-step__head">
                  <em>STEP {String(i + 1).padStart(2, '0')}</em>
                  <h2>{step.title}</h2>
                  <p className="track-step__result">→ {step.result}</p>
                </div>
                <div className="track-step__courses">
                  {step.courseIds.map((cid) => {
                    const item = getItem(cid)
                    if (!item) return null
                    return (
                      <CourseRow
                        key={cid}
                        item={item}
                        progress={courseProgress(cid)}
                        onOpen={() => openCourse(cid)}
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          <aside className="track-progression">
            <p>
              <strong>怎么往下走：</strong>
              装不稳先补基础；会装了再啃工具；要交活再进作品线
            </p>
            <div className="track-progression__actions">
              {trackLevel !== '基础' && (
                <button type="button" className="btn btn--ghost-dark" onClick={() => goToTrack('基础')}>
                  ← 回到基础
                </button>
              )}
              {trackLevel !== '工具' && trackLevel === '基础' && (
                <button type="button" className="btn btn--accent" onClick={() => goToTrack('工具')}>
                  下一步：工具 →
                </button>
              )}
              {trackLevel === '工具' && (
                <button type="button" className="btn btn--accent" onClick={() => goToTrack('进阶')}>
                  下一步：进阶 →
                </button>
              )}
              {trackLevel === '进阶' && (
                <button type="button" className="btn btn--ghost-dark" onClick={() => openCatalog()}>
                  浏览全部教程 →
                </button>
              )}
            </div>
          </aside>
        </main>
      )}

      {/* GLOSSARY */}
      {tab === 'glossary' && (
        <main className="gk-main gk-glossary">
          <h2 className="gk-section-title">术语词典 · 概念怎么讲</h2>
          <p className="gk-section-desc">
            这里不是教程步骤，而是名词解释：LLM、Token、RAG、MCP、Base URL 等（共 {GLOSSARY.length} 条），含手把手理解与常见坑。
          </p>
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
                <div className="gk-glossary__detail">
                  {glossaryItem.detail.split(/\n\n+/).map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                </div>
                {glossaryItem.howto && glossaryItem.howto.length > 0 && (
                  <>
                    <h3>手把手怎么做</h3>
                    <ol className="gk-glossary__steps">
                      {glossaryItem.howto.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </>
                )}
                {glossaryItem.domains && glossaryItem.domains.length > 0 && (
                  <>
                    <h3>相关域名 / 地址</h3>
                    <ul className="gk-glossary__domains">
                      {glossaryItem.domains.map((d) => (
                        <li key={d}>
                          {d.startsWith('http') ? (
                            <a href={d} target="_blank" rel="noreferrer">
                              <code>{d}</code>
                            </a>
                          ) : (
                            <code>{d}</code>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {glossaryItem.pitfalls && glossaryItem.pitfalls.length > 0 && (
                  <>
                    <h3>常见坑</h3>
                    <ul className="gk-glossary__pitfalls">
                      {glossaryItem.pitfalls.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </>
                )}
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

          <section className="gk-endpoints">
            <div className="home-block-head">
              <div>
                <h2 className="gk-section-title">域名与接口速查</h2>
                <p className="gk-section-desc">配置 Cursor / SDK 时对照 Base URL，避免填错导致连不上。</p>
              </div>
            </div>
            <div className="gk-filters gk-filters--sm">
              {ENDPOINT_GROUPS.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={endpointGroup === g ? 'is-on' : ''}
                  onClick={() => setEndpointGroup(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="gk-endpoints__grid">
              {endpointList.map((ep) => (
                <article key={ep.id} className="gk-endpoint-card">
                  <header>
                    <em>{ep.vendor}</em>
                    <h3>{ep.name}</h3>
                  </header>
                  <p className="gk-endpoint-card__url">
                    <code>{ep.baseUrl}</code>
                  </p>
                  <p>{ep.notes}</p>
                  <p className="gk-endpoint-card__auth">鉴权：{ep.auth}</p>
                  {ep.typicalModels && (
                    <p className="gk-endpoint-card__models">型号示例：{ep.typicalModels.join(' · ')}</p>
                  )}
                  {ep.tips && (
                    <ul>
                      {ep.tips.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  <a href={ep.docsUrl} target="_blank" rel="noreferrer">
                    官方文档 →
                  </a>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* GUIDE */}
      {tab === 'guide' && (
        <main className="gk-main gk-guide">
          <h2 className="gk-section-title">避坑指南 · 症状驱动排查</h2>
          <p className="gk-section-desc">
            和「学习路径 / 教程正文」不同：这里按故障现象入手——你遇到什么 → 为什么 → 逐步排查 → 最佳实践（共{' '}
            {NEWBIE_GUIDES.length} 篇）。不会教你从零安装，专治翻车。
          </p>
          <div className="gk-filters">
            {GUIDE_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={guideCat === c ? 'is-on' : ''}
                onClick={() => setGuideCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="gk-guide__layout">
            <aside className="gk-guide__side">
              {guideList.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={guideId === g.id ? 'is-on' : ''}
                  onClick={() => setGuideId(g.id)}
                >
                  <em>{g.level}</em>
                  <strong>{g.title}</strong>
                  <span>{g.category}</span>
                </button>
              ))}
              {guideList.length === 0 && <p className="gk-empty">没有匹配条目</p>}
            </aside>
            {guideItem && (
              <article className="gk-guide__article">
                <p className="gk-glossary__cat">
                  {guideItem.category} · {guideItem.level}
                </p>
                <h1>{guideItem.title}</h1>
                <div className="gk-guide__block">
                  <h3>你可能遇到</h3>
                  <p>{guideItem.symptom}</p>
                </div>
                <div className="gk-guide__block">
                  <h3>为什么会这样</h3>
                  <p>{guideItem.why}</p>
                </div>
                <div className="gk-guide__block">
                  <h3>手把手排查 / 操作</h3>
                  <ol className="gk-glossary__steps">
                    {guideItem.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
                <div className="gk-guide__block gk-guide__block--bp">
                  <h3>最佳实践</h3>
                  <ul className="gk-glossary__pitfalls">
                    {guideItem.bestPractice.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                {guideItem.checklist && (
                  <div className="gk-guide__block">
                    <h3>完成清单</h3>
                    <ul className="gk-guide__check">
                      {guideItem.checklist.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {guideItem.relatedTerms && guideItem.relatedTerms.length > 0 && (
                  <>
                    <h3>相关术语</h3>
                    <div className="gk-glossary__related">
                      {guideItem.relatedTerms.map((rid) => {
                        const g = GLOSSARY.find((x) => x.id === rid)
                        return (
                          <button
                            key={rid}
                            type="button"
                            onClick={() => {
                              setGlossaryId(rid)
                              setTab('glossary')
                            }}
                          >
                            {g?.term ?? rid}
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
                {guideItem.relatedCourses && guideItem.relatedCourses.length > 0 && (
                  <>
                    <h3>推荐去学（完整跟做正文）</h3>
                    <div className="gk-glossary__related">
                      {guideItem.relatedCourses.map((cid) => {
                        const c = getItem(cid)
                        if (!c) return null
                        return (
                          <button key={cid} type="button" onClick={() => openCourse(cid)}>
                            {c.hook || c.title}
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </article>
            )}
          </div>

          <section className="gk-endpoints" style={{ marginTop: '1.5rem' }}>
            <h2 className="gk-section-title">排查时常用域名（速贴）</h2>
            <p className="gk-section-desc">
              连不上 API 时先核对这些 Base URL；概念解释去「术语词典」，完整跟做步骤去对应教程正文。
            </p>
            <div className="gk-endpoints__grid">
              {ENDPOINTS.slice(0, 6).map((ep) => (
                <article key={ep.id} className="gk-endpoint-card">
                  <h3>{ep.name}</h3>
                  <p className="gk-endpoint-card__url">
                    <code>{ep.baseUrl}</code>
                  </p>
                  <p>{ep.notes}</p>
                </article>
              ))}
            </div>
            <button type="button" className="btn btn--ghost-dark" style={{ marginTop: '0.75rem' }} onClick={() => setTab('glossary')}>
              查看全部域名与接口 →
            </button>
          </section>
        </main>
      )}

      {/* LEARN */}
      {tab === 'learn' && phone && (
        <main className="gk-main gk-learn">
          <div className="gk-learn__bar">
            <div>
              <h2>我的进度</h2>
              <p>已登录 {maskPhone(phone)} · 勾选步骤记进度，点开教程看完整跟做正文</p>
            </div>
            <button type="button" className="btn btn--ghost-dark" onClick={logout}>
              退出登录
            </button>
          </div>
          <div className="gk-learn__grid">
            <aside>
              <p className="gk-learn__label">正在跟做</p>
              {FEATURED_IDS.map((id) => {
                const c = getItem(id)
                if (!c) return null
                const pct = courseProgress(id)
                return (
                  <button
                    key={id}
                    type="button"
                    className={learnId === id ? 'is-on' : ''}
                    onClick={() => setLearnId(id)}
                  >
                    <em>{pct}% 完成</em>
                    <span>{c.hook}</span>
                    <ProgressBar pct={pct} />
                  </button>
                )
              })}
              <button type="button" className="btn btn--ghost-dark" onClick={() => setTab('home')}>
                去首页选更多
              </button>
            </aside>
            <section className="gk-learn__read">
              <p className="gk-learn__hook">{learnCourse.hook}</p>
              <h1>{learnCourse.title}</h1>
              <p>{learnCourse.outcome || learnCourse.desc}</p>
              <button type="button" className="btn btn--accent" style={{ margin: '0.75rem 0' }} onClick={() => openCourse(learnCourse.id)}>
                打开教程跟做 →
              </button>
              <div className="gk-lessons" style={{ marginTop: '1rem' }}>
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

      {/* HOME */}
      {tab === 'home' && (
        <main className="gk-main home home--mixed">
          <div className="home-promo home-promo--ink">
            <strong>怎么读</strong>
            <span>
              表面只作导览与选题；完整安装步骤、官网链接与跟做正文在点进教程后展开。「学习路径」推进，「术语」讲概念，「避坑」排查故障
            </span>
          </div>

          <section className="home-hero home-hero--cinema" aria-label="本周精选">
            <div className="home-carousel">
              {heroCourse && (
                <button
                  type="button"
                  className="home-slide home-slide--warm"
                  onClick={() => openCourse(heroCourse.id)}
                >
                  <div className="home-slide__glow" />
                  <div className="home-slide__copy">
                    <p className="home-slide__eye">{heroSlide.eyebrow}</p>
                    <h2>{heroSlide.title}</h2>
                    <p>{heroSlide.subtitle}</p>
                    <div className="home-slide__meta">
                      <span>{heroCourse.lessons.length} 步</span>
                      <span>{heroCourse.level}</span>
                      <span>{heroCourse.duration}</span>
                    </div>
                    <span className="home-slide__cta">{heroSlide.cta}</span>
                  </div>
                  <div className="home-slide__visual">
                    <CourseCover
                      id={heroCourse.id}
                      category={heroCourse.category}
                      level={heroCourse.level}
                      hot={heroCourse.hot}
                      title={heroCourse.title}
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
          </section>

          <section className="home-tracks" aria-label="三级进阶入口">
            {HOME_TRACK_CARDS.map((card) => {
              const track = TRACKS.find((t) => t.id === card.level)!
              return (
                <button
                  key={card.level}
                  type="button"
                  className="home-track-portal"
                  style={{ ['--track-color' as string]: track.color }}
                  onClick={() => goToTrack(card.level)}
                >
                  <span className="home-track-portal__badge">{track.badge}</span>
                  <strong className="home-track-portal__hook">{card.hook}</strong>
                  <em>{track.title} · {track.days}</em>
                  <span className="home-track-portal__cta">{card.cta} →</span>
                </button>
              )
            })}
          </section>

          <section className="hook-feed" aria-label="先挑卡住的点">
            <div className="home-block-head">
              <div>
                <h2>先挑一个你现在卡的点</h2>
                <p className="home-block-desc">标题各写各的，点进对应教程按步骤跟</p>
              </div>
            </div>
            <div className="hook-feed__list">
              {HOOK_FEED.map((feed) => {
                const course = getItem(feed.courseId)
                return (
                  <article key={feed.id} className="hook-card">
                    <div className="hook-card__cover">
                      <CourseCover
                        id={feed.courseId}
                        category={course?.category ?? '下载与入门'}
                        level={feed.level}
                        title={course?.title ?? feed.tag}
                        compact
                      />
                    </div>
                    <div className="hook-card__top">
                      <i className="hook-card__tag">{feed.tag}</i>
                      <i className={`hook-card__level hook-card__level--${feed.level}`}>{feed.level}</i>
                    </div>
                    <h3 className="hook-card__hook">{feed.hook}</h3>
                    <p className="hook-card__result">{feed.result}</p>
                    <p className="hook-card__proof">{feed.proof}</p>
                    <button type="button" className="hook-card__cta" onClick={() => openCourse(feed.courseId)}>
                      打开教程 →
                    </button>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="home-free">
            <div className="home-block-head">
              <div>
                <h2>六条捷径</h2>
                <p className="home-block-desc">安装、Cursor、网页、小程序、提示词、生图，各走各的</p>
              </div>
              <button type="button" onClick={() => openCatalog()}>
                全部教程 →
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
          </section>

          <section className="home-rec">
            <div className="home-block-head">
              <div>
                <h2>按心情翻</h2>
                <p className="home-block-desc">刚接触、写代码、做页面、出图——标签点一下就行</p>
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
                <button key={item.id} type="button" className="home-card" onClick={() => openCourse(item.id)}>
                  <CourseCover
                    id={item.id}
                    category={item.category}
                    level={item.level}
                    hot={item.hot}
                    title={item.title}
                  />
                  <strong className="home-card__hook">{item.hook}</strong>
                  <em className="home-card__title">{item.title}</em>
                  <span>
                    {item.outcome} · {item.level}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="home-list-block" id="course-catalog">
            <div className="home-block-head">
              <div>
                <h2>全部教程</h2>
                <p className="home-block-desc">
                  {stats.courses} 篇已收录，可按分类、阶段筛选，或搜索「下载 / Cursor / 网页 / 生图」
                </p>
              </div>
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

            <div className="gk-toolbar gk-toolbar--compact home-catalog-toolbar">
              <div className="gk-filters gk-filters--sm">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={category === cat ? 'is-on' : ''}
                    onClick={() => setCategory(cat as (typeof CATEGORIES)[number])}
                  >
                    {cat}
                  </button>
                ))}
              </div>
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

            <p className="home-catalog-count">当前显示 {filtered.length} 篇教程</p>

            <div className="home-catalog-grid">
              {filtered.map((item) => (
                <CatalogCard
                  key={item.id}
                  item={item}
                  progress={courseProgress(item.id)}
                  onOpen={() => openCourse(item.id)}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="gk-empty">没有匹配教程，试试换分类或清空搜索。</p>
            )}
          </section>
        </main>
      )}

      {selected && (
        <CourseDetail
          course={selected}
          progress={courseProgress(selected.id)}
          phone={phone}
          onBack={() => setSelectedId(null)}
          onStart={() => {
            setLearnId(selected.id)
            setSelectedId(null)
            requireLogin()
          }}
          onToggleLesson={toggleLesson}
          progressMap={progressMap}
        />
      )}

      <footer className="gk-footer">
        <div>知略 AI 知识库 · 自学教程与步骤拆解</div>
        <div>
          {stats.courses} 课 · {stats.terms} 术语 · 电话登录
        </div>
      </footer>
    </div>
  )
}
