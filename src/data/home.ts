import type { IconKey } from '../components/AiIcon'
import type { TrackId } from './tracks'

export type CatNav = {
  category: string
  title: string
  keywords: string
  icon: IconKey
}

/** 目录面板短标题（整洁可读，不塞长课名） */
export const MEGA_LABELS: Record<string, string> = {
  'ai-what-is': 'AI 是什么',
  'ai-first-chat': '第一次有效对话',
  'ai-download-guide': 'Windows / Mac 下载安装',
  'ai-account-setup': '账号注册与基础设置',
  'newbie-first-week': '7 天 AI 基础路径',
  'prompt-basics': '提示词入门',
  'ai-daily-office': '办公提效',
  'api-keys-security': 'API Key 安全',
  'tool-pick-compare': '工具怎么选',
  'install-trae': 'Trae 国内版安装',
  'install-lingma': '通义灵码安装',
  'install-cc-switch': 'CC Switch 装与用',
  'cursor-install': 'Cursor 安装（需海外网络）',
  'install-claude-code': 'Claude Code 安装',
  'install-codex': 'OpenAI Codex 安装',
  'install-copilot': 'GitHub Copilot 安装',
  'install-windsurf': 'Windsurf 安装',
  cursor: 'Cursor 用法',
  'cursor-rules': 'Cursor Rules 深度',
  'claude-code': 'Claude Code 用法',
  'tool-localize': 'AI 软件汉化',
  'ai-build-website': '一句话需求到可预览网页',
  'ai-landing-page': '落地页部署上线',
  'ai-build-miniprogram': '微信小程序三页骨架',
  'ai-build-app': 'App 关键屏与流程说明稿',
  'ai-image-gen': '生图提示词怎么写',
  'ai-image-brand': 'AI 品牌视觉统一',
  'api-openai': 'OpenAI API 配置',
  'api-compatible': '兼容网关对照',
  'domain-api-cheatsheet': '域名与接口速查',
  'mcp-intro': 'MCP 是什么',
  'mcp-install': 'MCP 怎么装',
  'prompt-system': '系统提示词',
  'rag-basics': 'RAG 入门',
  'agent-tools': 'Agent 工具调用',
  'hallucination-defense': '防幻觉核查',
  'cost-control': '控成本与限流',
}

/** 悬停目录：四阶分列，跟学习路径一致 */
export type MegaColumn = {
  id: TrackId
  badge: string
  tagline: string
  courseIds: string[]
}

/** 目录四列精选（不把所有课塞进一列，保持整洁） */
export const MEGA_COLUMNS: MegaColumn[] = [
  {
    id: '入门',
    badge: '01 入门',
    tagline: '装稳',
    courseIds: [
      'ai-what-is',
      'ai-first-chat',
      'ai-download-guide',
      'ai-account-setup',
      'newbie-first-week',
    ],
  },
  {
    id: '工具',
    badge: '02 工具',
    tagline: '改文件',
    courseIds: [
      'install-trae',
      'install-lingma',
      'install-cc-switch',
      'cursor-install',
      'install-claude-code',
      'install-codex',
      'install-copilot',
      'install-windsurf',
      'cursor',
      'cursor-rules',
      'claude-code',
      'tool-localize',
    ],
  },
  {
    id: '作品',
    badge: '03 作品',
    tagline: '出成品',
    courseIds: [
      'ai-build-website',
      'ai-landing-page',
      'ai-build-miniprogram',
      'ai-build-app',
      'ai-image-gen',
      'ai-image-brand',
    ],
  },
  {
    id: '精通',
    badge: '04 精通',
    tagline: '接得住',
    courseIds: [
      'prompt-basics',
      'ai-daily-office',
      'api-keys-security',
      'api-openai',
      'domain-api-cheatsheet',
      'mcp-intro',
      'rag-basics',
      'agent-tools',
    ],
  },
]

export type FreeTile = {
  id: string
  title: string
  desc: string
  icon: IconKey
  courseId: string
}

/** 每条标题句式故意不同，避免读起来像同一模板 */
export const FREE_TILES: FreeTile[] = [
  {
    id: 'f1',
    title: 'Win / Mac 装 AI，别再到处找下载页',
    desc: '官方入口、安装勾选项、第一次打开',
    icon: 'download',
    courseId: 'ai-download-guide',
  },
  {
    id: 'f2',
    title: '不翻墙，今晚就把 Trae 跑起来',
    desc: 'trae.cn 下载、手机号登录、改掉第一个文件',
    icon: 'cursor',
    courseId: 'install-trae',
  },
  {
    id: 'f3',
    title: '明天能发出去的落地页长什么样？',
    desc: '需求一句话，布局文案一起出',
    icon: 'web',
    courseId: 'ai-build-website',
  },
  {
    id: 'f4',
    title: '微信小程序三页骨架直接生成',
    desc: '首页 · 列表 · 详情，带着交互说明',
    icon: 'miniapp',
    courseId: 'ai-build-miniprogram',
  },
  {
    id: 'f5',
    title: '同一句话，为什么别人问得更准',
    desc: '角色、目标、约束、格式拆开写',
    icon: 'prompt',
    courseId: 'prompt-basics',
  },
  {
    id: 'f6',
    title: '封面图别再找设计师排期了',
    desc: '出图、改图、统一风格怎么写',
    icon: 'image',
    courseId: 'ai-image-gen',
  },
]

export const COMMUNITY_TOPICS = [
  { tag: '下载', text: 'Trae 国内版官网是 trae.cn 还是 trae.ai？别下错' },
  { tag: '工具', text: '不翻墙先装 Trae 还是通义灵码？怎么选' },
  { tag: '网页', text: '落地页部署到免费域名踩过哪些坑' },
  { tag: '小程序', text: '生成的结构怎么接到微信开发者工具' },
  { tag: '生图', text: '同一角色多张图，风格老是飘怎么办' },
  { tag: '避坑', text: 'API Key 写进仓库，账单一夜翻倍的真实案例' },
]

export type RecTab = {
  id: string
  label: string
  filter: 'hot' | 'new' | '入门' | '工具' | '作品' | '精通'
}

export const REC_TABS: RecTab[] = [
  { id: 'hot', label: '大家都在看', filter: 'hot' },
  { id: '入门', label: '入门起步', filter: '入门' },
  { id: '工具', label: '工具与安装', filter: '工具' },
  { id: '作品', label: '网页与出图', filter: '作品' },
  { id: '精通', label: 'API 与 Agent', filter: '精通' },
  { id: 'new', label: '刚更新', filter: 'new' },
]

export const HERO_SLIDES = [
  {
    courseId: 'ai-download-guide',
    eyebrow: '01 入门 · 先跑通',
    title: '别再卡在「下载哪个」这一步',
    subtitle: '先网页版、再客户端、不必翻墙',
    cta: '去看入门台阶',
  },
  {
    courseId: 'install-trae',
    eyebrow: '02 工具 · 不翻墙',
    title: 'Trae 国内版：装好就能改项目',
    subtitle: 'trae.cn 直连、手机号登、内置国产模型',
    cta: '去看工具台阶',
  },
  {
    courseId: 'ai-build-website',
    eyebrow: '03 作品 · 能交活',
    title: '客户明天要链接，今晚先出一版',
    subtitle: '区块、文案、配色、本地预览',
    cta: '去看作品台阶',
  },
  {
    courseId: 'ai-image-gen',
    eyebrow: '03 作品 · 出物料',
    title: '海报和封面，提示词写对就不翻车',
    subtitle: '主体、构图、风格、多图一套',
    cta: '去看作品台阶',
  },
]

export type HomeTrackCard = {
  level: TrackId
  hook: string
  cta: string
}

/** 文字样板统一：hook=痛点疑问一句；cta=「去X台阶」 */
export const HOME_TRACK_CARDS: HomeTrackCard[] = [
  { level: '入门', hook: '连安装都卡壳？先把常用 AI 装稳', cta: '去入门台阶' },
  { level: '工具', hook: '想改项目文件？先装 Trae / 灵码，不必翻墙', cta: '去工具台阶' },
  { level: '作品', hook: '要做给人看的东西？网页、小程序、App、图', cta: '去作品台阶' },
  { level: '精通', hook: '会改文件了？往下接 API、Agent 与成本', cta: '去精通台阶' },
]
