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
  MEGA_COLUMNS,
  MEGA_GLOSSARY,
  MEGA_GUIDES,
  MEGA_LABELS,
  MEGA_LEARN_IDS,
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

const TRACK_LEVELS: TrackId[] = ['入门', '工具', '作品', '精通']

function megaLabel(id: string, fallbackTitle?: string) {
  if (MEGA_LABELS[id]) return MEGA_LABELS[id]
  const head = (fallbackTitle ?? id).split(/[：:]/)[0]?.trim() || id
  return head.length > 18 ? `${head.slice(0, 18)}…` : head
}

type TabBanner = {
  eyebrow: string
  title: string
  accent: string
  lead: string
  hintLabel: string
  hint: string
  stats: [string, string][]
}

const TAB_BANNERS: Record<Exclude<Tab, 'home'>, TabBanner> = {
  track: {
    eyebrow: '四级递进 · 入门 → 工具 → 作品 → 精通',
    title: '学习路径',
    accent: '装得上、改得动、做出来、接得住',
    lead: '入门会用 → 工具能改 → 作品能交 → 精通可控。按结果选台阶，不靠堆课名。',
    hintLabel: '怎么走',
    hint: '先定台阶，再点进教程看完整跟做正文',
    stats: [
      ['4', '学习台阶'],
      ['图文', '逐步跟做'],
      ['国内', '优先直连'],
    ],
  },
  glossary: {
    eyebrow: '名词解释 · 短义 + 详解 + 坑',
    title: '术语词典',
    accent: '听得懂、讲得清、用得对',
    lead: '概念查这里：LLM、Token、RAG、MCP、Base URL 一查到底，不混安装与排错。',
    hintLabel: '怎么查',
    hint: '左侧点词条，右侧看短义、详解、相关术语',
    stats: [
      ['词条', '可检索'],
      ['分类', '快速筛'],
      ['关联', '串起来'],
    ],
  },
  guide: {
    eyebrow: '症状驱动 · 逐步排查',
    title: '避坑指南',
    accent: '对上症状、查清原因、修好翻车',
    lead: '按故障现象入手：你遇到什么 → 为什么 → 怎么排。以装完翻车与配置踩坑为主，少数条目含从零跟做清单。',
    hintLabel: '怎么排',
    hint: '先对症状，再按步骤排查，别一上来重装',
    stats: [
      ['症状', '对号入座'],
      ['原因', '说人话'],
      ['步骤', '可照做'],
    ],
  },
  learn: {
    eyebrow: '登录同步 · 勾选记进度',
    title: '我的进度',
    accent: '学到哪、勾到哪、接着做',
    lead: '记下你跟做到哪一步；点开教程看完整正文，勾选完成步骤，下次接着学。',
    hintLabel: '怎么记',
    hint: '登录后勾选步骤即可，换设备需同一手机号',
    stats: [
      ['进度', '本地记住'],
      ['教程', '点开跟做'],
      ['台阶', '可回路径'],
    ],
  },
}

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
  const [trackLevel, setTrackLevel] = useState<TrackId>('入门')
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
  const [megaKey, setMegaKey] = useState<null | 'track' | 'glossary' | 'guide' | 'learn'>(null)
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
        (c) => c.category === '工具安装' || c.category === '工具用法',
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
      case '入门':
      case '工具':
      case '作品':
      case '精通':
        list = list.filter((c) => c.level === tabMeta.filter)
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

  const pageBanner = tab === 'home' ? null : TAB_BANNERS[tab]
  const bannerStats: [string, string][] | null = pageBanner
    ? tab === 'glossary'
      ? [[String(stats.terms), '术语条目'], ...pageBanner.stats.slice(1)]
      : tab === 'guide'
        ? [[String(NEWBIE_GUIDES.length), '避坑条目'], ...pageBanner.stats.slice(1)]
        : tab === 'track'
          ? [[String(stats.courses), '图文教程'], ...pageBanner.stats.slice(1)]
          : pageBanner.stats
    : null

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
            <button
              type="button"
              className={tab === 'home' ? 'is-on' : ''}
              onClick={() => {
                setMegaKey(null)
                setTab('home')
              }}
            >
              首页
            </button>

            <div
              className={`gk-mega${megaKey === 'track' ? ' is-open' : ''}`}
              onMouseEnter={() => setMegaKey('track')}
              onMouseLeave={() => setMegaKey(null)}
            >
              <button
                type="button"
                className={`gk-mega__trigger${tab === 'track' ? ' is-on' : ''}`}
                aria-expanded={megaKey === 'track'}
                onClick={() => {
                  setTab('track')
                  setMegaKey((k) => (k === 'track' ? null : 'track'))
                }}
              >
                学习台阶
              </button>
              <div className="gk-mega__panel gk-mega__panel--wide" hidden={megaKey !== 'track'}>
                <div className="gk-mega__inner">
                  {MEGA_COLUMNS.map((col) => (
                    <div key={col.id} className="gk-mega__col">
                      <button
                        type="button"
                        className="gk-mega__title"
                        onClick={() => {
                          setMegaKey(null)
                          goToTrack(col.id)
                        }}
                      >
                        {col.badge} · {col.tagline}
                      </button>
                      <ul className="gk-mega__list">
                        {col.courseIds.map((cid) => {
                          const item = getItem(cid)
                          if (!item) return null
                          return (
                            <li key={cid}>
                              <button
                                type="button"
                                onClick={() => {
                                  setMegaKey(null)
                                  openCourse(cid)
                                }}
                              >
                                <i aria-hidden="true">·</i>
                                <em>{megaLabel(cid, item.title)}</em>
                                {item.new ? <b>new</b> : null}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                  <p className="gk-mega__more">
                    <button
                      type="button"
                      onClick={() => {
                        setMegaKey(null)
                        setTab('track')
                      }}
                    >
                      打开学习台阶看全部 →
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`gk-mega${megaKey === 'glossary' ? ' is-open' : ''}`}
              onMouseEnter={() => setMegaKey('glossary')}
              onMouseLeave={() => setMegaKey(null)}
            >
              <button
                type="button"
                className={`gk-mega__trigger${tab === 'glossary' ? ' is-on' : ''}`}
                aria-expanded={megaKey === 'glossary'}
                onClick={() => {
                  setTab('glossary')
                  setMegaKey((k) => (k === 'glossary' ? null : 'glossary'))
                }}
              >
                术语
              </button>
              <div className="gk-mega__panel" hidden={megaKey !== 'glossary'}>
                <div className="gk-mega__inner">
                  {MEGA_GLOSSARY.map((col) => (
                    <div key={col.category} className="gk-mega__col">
                      <button
                        type="button"
                        className="gk-mega__title"
                        onClick={() => {
                          setMegaKey(null)
                          setGCat(col.category)
                          setTab('glossary')
                        }}
                      >
                        {col.category}
                      </button>
                      <ul className="gk-mega__list">
                        {col.termIds.map((id) => {
                          const g = GLOSSARY.find((x) => x.id === id)
                          if (!g) return null
                          return (
                            <li key={g.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setMegaKey(null)
                                  setGCat(col.category)
                                  setGlossaryId(g.id)
                                  setTab('glossary')
                                }}
                              >
                                <i aria-hidden="true">·</i>
                                <em>{g.term}</em>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                  <p className="gk-mega__more">
                    <button
                      type="button"
                      onClick={() => {
                        setMegaKey(null)
                        setGCat('全部')
                        setTab('glossary')
                      }}
                    >
                      查看全部术语 →
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`gk-mega${megaKey === 'guide' ? ' is-open' : ''}`}
              onMouseEnter={() => setMegaKey('guide')}
              onMouseLeave={() => setMegaKey(null)}
            >
              <button
                type="button"
                className={`gk-mega__trigger${tab === 'guide' ? ' is-on' : ''}`}
                aria-expanded={megaKey === 'guide'}
                onClick={() => {
                  setTab('guide')
                  setMegaKey((k) => (k === 'guide' ? null : 'guide'))
                }}
              >
                避坑
              </button>
              <div className="gk-mega__panel" hidden={megaKey !== 'guide'}>
                <div className="gk-mega__inner">
                  {MEGA_GUIDES.map((col) => (
                    <div key={col.category} className="gk-mega__col">
                      <button
                        type="button"
                        className="gk-mega__title"
                        onClick={() => {
                          setMegaKey(null)
                          setGuideCat(col.category)
                          setTab('guide')
                        }}
                      >
                        {col.category}
                      </button>
                      <ul className="gk-mega__list">
                        {col.guideIds.map((id) => {
                          const g = NEWBIE_GUIDES.find((x) => x.id === id)
                          if (!g) return null
                          return (
                            <li key={g.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setMegaKey(null)
                                  setGuideCat(col.category)
                                  setGuideId(g.id)
                                  setTab('guide')
                                }}
                              >
                                <i aria-hidden="true">·</i>
                                <em>{g.title.length > 18 ? `${g.title.slice(0, 18)}…` : g.title}</em>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                  <p className="gk-mega__more">
                    <button
                      type="button"
                      onClick={() => {
                        setMegaKey(null)
                        setGuideCat('全部')
                        setTab('guide')
                      }}
                    >
                      查看全部避坑 →
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`gk-mega${megaKey === 'learn' ? ' is-open' : ''}`}
              onMouseEnter={() => setMegaKey('learn')}
              onMouseLeave={() => setMegaKey(null)}
            >
              <button
                type="button"
                className={`gk-mega__trigger${tab === 'learn' ? ' is-on' : ''}`}
                aria-expanded={megaKey === 'learn'}
                onClick={() => {
                  if (!phone) {
                    setLoginOpen(true)
                    return
                  }
                  setTab('learn')
                  setMegaKey((k) => (k === 'learn' ? null : 'learn'))
                }}
              >
                进度
              </button>
              <div className="gk-mega__panel" hidden={megaKey !== 'learn'}>
                <div className="gk-mega__inner gk-mega__inner--learn">
                  <div className="gk-mega__col">
                    <button
                      type="button"
                      className="gk-mega__title"
                      onClick={() => {
                        setMegaKey(null)
                        if (!phone) setLoginOpen(true)
                        else setTab('learn')
                      }}
                    >
                      我的进度
                    </button>
                    <ul className="gk-mega__list">
                      {MEGA_LEARN_IDS.map((cid) => {
                        const item = getItem(cid)
                        if (!item) return null
                        const pct = courseProgress(cid)
                        return (
                          <li key={cid}>
                            <button
                              type="button"
                              onClick={() => {
                                setMegaKey(null)
                                if (!phone) {
                                  setLoginOpen(true)
                                  return
                                }
                                setLearnId(cid)
                                setTab('learn')
                              }}
                            >
                              <i aria-hidden="true">·</i>
                              <em>{megaLabel(cid, item.title)}</em>
                              {pct > 0 ? <b>{pct}%</b> : null}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="gk-mega__col">
                    <p className="gk-mega__hint">登录后可勾选步骤、接着上次学；点条目进入「进度」页跟做。</p>
                    <button
                      type="button"
                      className="gk-mega__cta"
                      onClick={() => {
                        setMegaKey(null)
                        if (!phone) setLoginOpen(true)
                        else setTab('learn')
                      }}
                    >
                      {phone ? '打开进度页' : '登录看进度'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

      {pageBanner && bannerStats && (
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
              <p className="gk-banner__eyebrow">{pageBanner.eyebrow}</p>
              <h1>
                <span className="gk-banner__line">{pageBanner.title}</span>
                <span className="gk-banner__line gk-banner__line--accent">{pageBanner.accent}</span>
              </h1>
              <p className="gk-banner__lead">{pageBanner.lead}</p>
              <div className="gk-chips" aria-label="快捷入口">
                {tab === 'track' &&
                  TRACK_LEVELS.map((lv) => (
                    <button key={lv} type="button" className="gk-chip" onClick={() => goToTrack(lv)}>
                      {lv}
                    </button>
                  ))}
                {tab === 'glossary' &&
                  GLOSSARY_CATEGORIES.filter((c) => c !== '全部')
                    .slice(0, 4)
                    .map((c) => (
                      <button key={c} type="button" className="gk-chip" onClick={() => setGCat(c)}>
                        {c}
                      </button>
                    ))}
                {tab === 'guide' &&
                  GUIDE_CATEGORIES.filter((c) => c !== '全部')
                    .slice(0, 4)
                    .map((c) => (
                      <button key={c} type="button" className="gk-chip" onClick={() => setGuideCat(c)}>
                        {c}
                      </button>
                    ))}
                {tab === 'learn' && (
                  <>
                    <button type="button" className="gk-chip" onClick={() => goToTrack('入门')}>
                      回学习路径
                    </button>
                    <button type="button" className="gk-chip" onClick={() => setTab('glossary')}>
                      查术语
                    </button>
                  </>
                )}
                <button type="button" className="gk-chip gk-chip--ghost" onClick={() => setTab('home')}>
                  返回首页 →
                </button>
              </div>
            </div>
            <div className="gk-banner__panel">
              {bannerStats.map(([value, label]) => (
                <div key={label} className="gk-banner__stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
              <div className="gk-banner__hint">
                <em>{pageBanner.hintLabel}</em>
                <span>{pageBanner.hint}</span>
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
              还不会问、登不进先补入门；会改文件再进作品；要接 API / Agent 进精通
            </p>
            <div className="track-progression__actions">
              {trackLevel !== '入门' && (
                <button type="button" className="btn btn--ghost-dark" onClick={() => goToTrack('入门')}>
                  ← 回到入门
                </button>
              )}
              {trackLevel === '入门' && (
                <button type="button" className="btn btn--accent" onClick={() => goToTrack('工具')}>
                  下一步：工具 →
                </button>
              )}
              {trackLevel === '工具' && (
                <button type="button" className="btn btn--accent" onClick={() => goToTrack('作品')}>
                  下一步：作品 →
                </button>
              )}
              {trackLevel === '作品' && (
                <button type="button" className="btn btn--accent" onClick={() => goToTrack('精通')}>
                  下一步：精通 →
                </button>
              )}
              {trackLevel === '精通' && (
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
            <strong>怎么走</strong>
            <span>
              入门会用 → 工具能改 → 作品能交 → 精通可控。先定台阶，再点进教程跟做；术语讲概念，避坑查故障。
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

          <section className="home-tracks" aria-label="四级递进入口">
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

          <section className="hook-feed" aria-label="按卡点找教程">
            <div className="home-block-head">
              <div>
                <h2>先挑你现在卡在哪</h2>
                <p className="home-block-desc">每条一个痛点，点进对应教程按步骤跟</p>
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
                        category={course?.category ?? '入门起步'}
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
                <h2>六条快速上手</h2>
                <p className="home-block-desc">安装、Trae、网页、小程序、提示词、生图，各走一条</p>
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
                <h2>按台阶翻</h2>
                <p className="home-block-desc">入门、工具、作品、精通——标签点一下就行</p>
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
                  {stats.courses} 篇已收录 · 按四阶筛选：入门 / 工具 / 作品 / 精通
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
                {LEVELS.map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    className={level === lv ? 'is-on' : ''}
                    onClick={() => {
                      setLevel(lv as Level | '全部')
                      setCategory('全部')
                    }}
                  >
                    {lv === '全部' ? '全部' : `${lv}`}
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
