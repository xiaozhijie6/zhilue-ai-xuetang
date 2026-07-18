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
  { category: 'AI编程工具', title: '编程工具', keywords: 'Cursor · 配置', icon: 'cursor' },
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

export const FREE_TILES: FreeTile[] = [
  {
    id: 'f1',
    title: '按系统下载常用 AI',
    desc: 'Windows / Mac 一步步截图级说明',
    icon: 'download',
    courseId: 'ai-download-guide',
  },
  {
    id: 'f2',
    title: '装好 Cursor 开始改代码',
    desc: '安装、登录、第一次对话改文件',
    icon: 'cursor',
    courseId: 'cursor-install',
  },
  {
    id: 'f3',
    title: '一句话做出落地页',
    desc: '用 AI 从需求到可预览网页',
    icon: 'web',
    courseId: 'ai-build-website',
  },
  {
    id: 'f4',
    title: '小程序页面一次出齐',
    desc: '结构、文案、交互说明都能生成',
    icon: 'miniapp',
    courseId: 'ai-build-miniprogram',
  },
  {
    id: 'f5',
    title: '提示词四段式',
    desc: '问得清楚，答得能用',
    icon: 'prompt',
    courseId: 'prompt-basics',
  },
  {
    id: 'f6',
    title: 'AI 出海报与封面',
    desc: '提示词生图与改图流程',
    icon: 'image',
    courseId: 'ai-image-gen',
  },
]

export const COMMUNITY_TOPICS = [
  { tag: '下载', text: 'Cursor 安装包官方地址在哪？Mac 权限怎么开' },
  { tag: '工具', text: 'Agent 模式改多文件，Rules 怎么写才稳' },
  { tag: '网页', text: '用 AI 做的落地页怎么部署到免费域名' },
  { tag: '小程序', text: '生成的页面结构怎么接到微信开发者工具' },
  { tag: '生图', text: '同一角色多张图风格统一怎么写提示词' },
  { tag: '避坑', text: 'API Key 别写进前端和公开仓库' },
]

export type RecTab = {
  id: string
  label: string
  filter: 'hot' | 'new' | 'basic' | 'tools' | 'build' | 'image'
}

export const REC_TABS: RecTab[] = [
  { id: 'hot', label: '热门精选', filter: 'hot' },
  { id: 'basic', label: '基础下载', filter: 'basic' },
  { id: 'tools', label: '编程工具', filter: 'tools' },
  { id: 'build', label: '做网页/App', filter: 'build' },
  { id: 'image', label: 'AI 生图', filter: 'image' },
  { id: 'new', label: '最近更新', filter: 'new' },
]

export const HERO_SLIDES = [
  {
    courseId: 'ai-download-guide',
    eyebrow: '基础',
    title: '照着做：把常用 AI 下载安装到电脑上',
    subtitle: '浏览器版、客户端、账号注册，一步步写清楚',
    cta: '查看下载指南',
  },
  {
    courseId: 'cursor',
    eyebrow: '工具详解',
    title: 'Cursor 从安装到改项目，整页讲透',
    subtitle: 'Chat、Agent、Rules、接模型——不会代码也能上手',
    cta: '打开工具教程',
  },
  {
    courseId: 'ai-build-website',
    eyebrow: '进阶作品',
    title: '用 AI 做出能给人看的网页',
    subtitle: '从一句话需求到布局、文案、可预览页面',
    cta: '开始做网页',
  },
  {
    courseId: 'ai-image-gen',
    eyebrow: '进阶视觉',
    title: '用 AI 做出海报、封面与产品图',
    subtitle: '提示词结构、改图、风格统一一次学会',
    cta: '开始生图',
  },
]

export type HomeTrackCard = {
  level: TrackId
  hook: string
  cta: string
}

export const HOME_TRACK_CARDS: HomeTrackCard[] = [
  { level: '基础', hook: '下载、注册、第一次对话——从零装好 AI', cta: '进入基础' },
  { level: '工具', hook: 'AI 编程工具详解：装好就会改项目', cta: '进入工具' },
  { level: '进阶', hook: '做网页 / 小程序 / App / 生图，拿出作品', cta: '进入进阶' },
]
