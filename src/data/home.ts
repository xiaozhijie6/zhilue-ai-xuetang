import type { IconKey } from '../components/AiIcon'
import type { TrackId } from './tracks'

export type CatNav = {
  category: string
  title: string
  keywords: string
  icon: IconKey
}

export const CAT_NAV: CatNav[] = [
  { category: '下载与入门', title: '下载安装', keywords: '注册 · 第一次对话', icon: 'download' },
  {
    category: 'AI编程工具与智能体安装',
    title: '工具安装',
    keywords: 'Trae · 灵码 · 不翻墙',
    icon: 'cursor',
  },
  { category: 'AI编程工具', title: '工具用法', keywords: 'Agent · Rules', icon: 'agent' },
  { category: '用AI做产品', title: '做作品', keywords: '网页 · 小程序 · App', icon: 'web' },
  { category: 'AI生图', title: '生图视觉', keywords: '海报 · 封面', icon: 'image' },
  { category: '提示词工程', title: '提示词', keywords: '结构 · 模板', icon: 'prompt' },
  { category: 'API与配置', title: 'API', keywords: '密钥 · 域名', icon: 'openai' },
  { category: 'MCP与工具协议', title: 'MCP', keywords: '接工具', icon: 'mcp' },
  { category: '安全合规', title: '安全', keywords: '脱敏 · 密钥', icon: 'security' },
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
    eyebrow: '能发出去的页面',
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
