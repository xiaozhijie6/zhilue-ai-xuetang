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

/** 悬停展开的总类面板：三列，排版对齐常见课程站 mega menu */
export type MegaColumn = {
  title: string
  categories: string[]
}

export const MEGA_COLUMNS: MegaColumn[] = [
  {
    title: 'AI 编程工具',
    categories: ['入门起步', '工具安装', '工具用法'],
  },
  {
    title: '前端 / JS',
    categories: ['前端 / JS', '小程序与 App', 'AI生图'],
  },
  {
    title: '技术提升',
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
  filter: 'hot' | 'new' | 'basic' | 'tools' | 'build' | 'image'
}

export const REC_TABS: RecTab[] = [
  { id: 'hot', label: '大家都在看', filter: 'hot' },
  { id: 'basic', label: '刚接触 AI', filter: 'basic' },
  { id: 'tools', label: '工具与安装', filter: 'tools' },
  { id: 'build', label: '网页与 App', filter: 'build' },
  { id: 'image', label: '出图相关', filter: 'image' },
  { id: 'new', label: '刚更新', filter: 'new' },
]

export const HERO_SLIDES = [
  {
    courseId: 'ai-download-guide',
    eyebrow: '国内先跑通',
    title: '别再卡在「下载哪个」这一步',
    subtitle: '先豆包/Kimi 网页版，再决定要不要装编程 IDE',
    cta: '去看安装步骤',
  },
  {
    courseId: 'install-trae',
    eyebrow: '不翻墙编程',
    title: 'Trae 国内版：装好就能改项目文件',
    subtitle: 'trae.cn 直连、手机号登录、内置豆包/DeepSeek',
    cta: '打开 Trae 安装',
  },
  {
    courseId: 'ai-build-website',
    eyebrow: '前端 / JS',
    title: '客户明天要链接，你今晚先出一版',
    subtitle: '区块、文案、配色一起定，本地就能预览',
    cta: '去做网页',
  },
  {
    courseId: 'ai-image-gen',
    eyebrow: '视觉物料',
    title: '海报和封面，提示词写对就不翻车',
    subtitle: '主体、构图、风格统一，多图一套带走',
    cta: '去练生图',
  },
]

export type HomeTrackCard = {
  level: TrackId
  hook: string
  cta: string
}

export const HOME_TRACK_CARDS: HomeTrackCard[] = [
  { level: '基础', hook: '连安装都卡壳？先把常用 AI 装稳', cta: '先过基础' },
  { level: '工具', hook: '想改项目文件？先装 Trae / 灵码，不必翻墙', cta: '去看工具' },
  { level: '进阶', hook: '网页、小程序、App、图——拿出能给人看的东西', cta: '去做作品' },
]
