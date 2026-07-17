import type { IconKey } from '../components/AiIcon'
import type { TrackId } from './tracks'

export type CatNav = {
  category: string
  title: string
  keywords: string
  icon: IconKey
}

export const CAT_NAV: CatNav[] = [
  { category: '商业落地', title: '变现实战', keywords: '短视频 · 成交 · 交付', icon: 'biz' },
  { category: '提示词工程', title: '提示词', keywords: '结构 · 模板 · 场景', icon: 'prompt' },
  { category: 'AI编程工具', title: '编程工具', keywords: 'Cursor · Agent', icon: 'cursor' },
  { category: 'Agent与自动化', title: '自动化', keywords: '工作流 · Agent', icon: 'agent' },
  { category: 'API与配置', title: 'API', keywords: '密钥 · 域名', icon: 'openai' },
  { category: 'MCP与工具协议', title: 'MCP', keywords: '工具协议', icon: 'mcp' },
  { category: '知识库与RAG', title: '知识库', keywords: '少幻觉', icon: 'rag' },
  { category: '办公提效', title: '办公提效', keywords: '文档 · 表格', icon: 'office' },
  { category: '安全合规', title: '安全合规', keywords: '脱敏 · 审计', icon: 'security' },
  { category: '大模型认知', title: '模型认知', keywords: 'Token · 选型', icon: 'model' },
]

export type FreeTile = {
  id: string
  title: string
  desc: string
  icon: IconKey
  courseId: string
}

/** 快速上手入口 */
export const FREE_TILES: FreeTile[] = [
  {
    id: 'f1',
    title: '写出能打爆的短视频标题',
    desc: '学完能独立改标题与开场',
    icon: 'prompt',
    courseId: 'viral-hook-writing',
  },
  {
    id: 'f2',
    title: '用 AI 跑通一条抖音',
    desc: '选题到脚本到发布',
    icon: 'biz',
    courseId: 'ai-douyin-pipeline',
  },
  {
    id: 'f3',
    title: '用 Cursor 改自己的项目',
    desc: '不会代码也能动手',
    icon: 'cursor',
    courseId: 'cursor',
  },
  {
    id: 'f4',
    title: '搭一套自动交付流程',
    desc: '付款后自动发课与跟进',
    icon: 'agent',
    courseId: 'auto-money-pipeline',
  },
  {
    id: 'f5',
    title: '写出稳定可用的提示词',
    desc: '四段式模板当天能用',
    icon: 'prompt',
    courseId: 'prompt-basics',
  },
  {
    id: 'f6',
    title: '给 AI 接上外部工具',
    desc: 'MCP 查文档、改文件',
    icon: 'mcp',
    courseId: 'mcp-intro',
  },
]

export const COMMUNITY_TOPICS = [
  { tag: '爆款', text: '前 3 秒钩子：数字冲击还是反常识更猛？' },
  { tag: '到账', text: '录播课自动发货，你们用啥工具搭？' },
  { tag: '避坑', text: 'API Key 写进仓库，账单一夜翻倍' },
  { tag: '成交', text: '有播放没加微：漏斗卡在哪一步' },
  { tag: '提效', text: 'Cursor Agent 改多文件，Rules 怎么写' },
  { tag: '矩阵', text: '一条选题拆 10 条，质量会不会塌' },
]

export type RecTab = {
  id: string
  label: string
  filter: 'hot' | 'new' | 'money' | 'tools' | 'auto' | 'newbie'
}

export const REC_TABS: RecTab[] = [
  { id: 'hot', label: '热门精选', filter: 'hot' },
  { id: 'money', label: '变现实战', filter: 'money' },
  { id: 'newbie', label: '新手必学', filter: 'newbie' },
  { id: 'tools', label: '工具上手', filter: 'tools' },
  { id: 'auto', label: '自动化', filter: 'auto' },
  { id: 'new', label: '最近更新', filter: 'new' },
]

export const HERO_SLIDES = [
  {
    courseId: 'viral-hook-writing',
    eyebrow: '短视频增长',
    title: '学完能写出冲播放的标题与开场',
    subtitle: '掌握前 3 秒结构，用 AI 批量打磨脚本',
    cta: '开始这门课',
  },
  {
    courseId: 'auto-money-pipeline',
    eyebrow: '自动化变现',
    title: '学完能搭「付款即发货」的自动流水线',
    subtitle: '发课、打卡、复购提醒少靠人工盯梢',
    cta: '开始这门课',
  },
  {
    courseId: 'newbie-first-week',
    eyebrow: '新手 7 天',
    title: '学完能独立完成第一条 AI 内容',
    subtitle: '从提示词到工具，再到可发布的成稿',
    cta: '从新手开始',
  },
  {
    courseId: 'private-domain-convert',
    eyebrow: '私域成交',
    title: '学完能把播放量接到微信成交',
    subtitle: '评论引导、主页话术到成交跟进一套带走',
    cta: '开始这门课',
  },
]

export type HomeTrackCard = {
  level: TrackId
  hook: string
  cta: string
}

export const HOME_TRACK_CARDS: HomeTrackCard[] = [
  { level: '新手', hook: '7 天做出第一条能播的内容', cta: '进入新手村' },
  { level: '熟练', hook: '搭流水线，批量交付不靠加班', cta: '进入熟练工' },
  { level: '老手', hook: '自动化飞轮，睡后也能到账', cta: '进入老手局' },
]
