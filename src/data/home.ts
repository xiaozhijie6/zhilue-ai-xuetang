import type { IconKey } from '../components/AiIcon'
import type { TrackId } from './tracks'
import { CATEGORY_COLUMNS } from './knowledge'

export type CatNav = {
  category: string
  title: string
  keywords: string
  icon: IconKey
}

/** 顶部多列总类导航文案（顺序跟 CATEGORY_COLUMNS 一致） */
const CAT_META: Record<string, { title: string; keywords: string; icon: IconKey }> = {
  入门起步: { title: '入门起步', keywords: '下载 · 注册 · 第一次对话', icon: 'download' },
  '前端 / JS': { title: '前端 / JS', keywords: '网页 · 落地页 · HTML/React', icon: 'web' },
  '小程序与 App': { title: '小程序与 App', keywords: '微信小程序 · 移动端', icon: 'miniapp' },
  工具安装: { title: '工具安装', keywords: 'Trae · 灵码 · Cursor · 不翻墙', icon: 'cursor' },
  工具用法: { title: '工具用法', keywords: 'Agent · Rules · 工作流', icon: 'agent' },
  提示词工程: { title: '提示词工程', keywords: '结构 · 模板 · 系统提示', icon: 'prompt' },
  办公提效: { title: '办公提效', keywords: '邮件 · 纪要 · PPT', icon: 'office' },
  API与配置: { title: 'API与配置', keywords: '密钥 · 域名 · 网关', icon: 'openai' },
  'MCP与Agent': { title: 'MCP与Agent', keywords: '接工具 · 多步调用', icon: 'mcp' },
  AI生图: { title: 'AI生图', keywords: '海报 · 封面 · 品牌视觉', icon: 'image' },
  安全与成本: { title: '安全与成本', keywords: '脱敏 · 密钥 · 账单', icon: 'security' },
}

export const CAT_NAV: CatNav[] = CATEGORY_COLUMNS.map((category) => {
  const meta = CAT_META[category] ?? {
    title: category,
    keywords: '',
    icon: 'default' as IconKey,
  }
  return { category, ...meta }
})

/** 悬停展开的总类面板：四列对齐四级递进 */
export type MegaColumn = {
  title: string
  categories: string[]
}

export const MEGA_COLUMNS: MegaColumn[] = [
  {
    title: '01 入门 · 装稳',
    categories: ['入门起步'],
  },
  {
    title: '02 工具 · 改文件',
    categories: ['工具安装', '工具用法'],
  },
  {
    title: '03 作品 · 出成品',
    categories: ['前端 / JS', '小程序与 App', 'AI生图'],
  },
  {
    title: '04 精通 · 接得住',
    categories: ['提示词工程', '办公提效', 'API与配置', 'MCP与Agent', '安全与成本'],
  },
]

export type FreeTile = {
  id: string
  title: string
  desc: string
  icon: IconKey
  courseId: string
}

/**
 * 文字样板（全页面统一）：
 * - title：场景痛点一句（≤18 字）
 * - desc：动作清单，顿号分隔
 */
export const FREE_TILES: FreeTile[] = [
  {
    id: 'f1',
    title: '装 AI 老是下到假站？先认准官方入口',
    desc: '认入口、按系统装、第一次打开',
    icon: 'download',
    courseId: 'ai-download-guide',
  },
  {
    id: 'f2',
    title: '不翻墙也想改代码？今晚先把 Trae 装上',
    desc: '认 trae.cn、手机号登、改第一个文件',
    icon: 'cursor',
    courseId: 'install-trae',
  },
  {
    id: 'f3',
    title: '客户明天要链接？今晚先铺一版网页',
    desc: '定区块、写文案、本地预览',
    icon: 'web',
    courseId: 'ai-build-website',
  },
  {
    id: 'f4',
    title: '小程序别从零画？三页骨架一次铺开',
    desc: '首页、列表、详情、带交互',
    icon: 'miniapp',
    courseId: 'ai-build-miniprogram',
  },
  {
    id: 'f5',
    title: '问完还是废话？提示词少了四件套',
    desc: '角色、目标、约束、格式拆开写',
    icon: 'prompt',
    courseId: 'prompt-basics',
  },
  {
    id: 'f6',
    title: '出图老是差不多？把主体和风格写死',
    desc: '主体、风格、比例、负面词',
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
