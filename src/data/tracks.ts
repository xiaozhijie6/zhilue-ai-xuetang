/** 三级路径：基础 → 工具 → 进阶 */

export type TrackId = '基础' | '工具' | '进阶'

export type TrackDef = {
  id: TrackId
  badge: string
  title: string
  hook: string
  promise: string
  days: string
  color: string
  steps: Array<{ title: string; result: string; courseIds: string[] }>
}

export const TRACKS: TrackDef[] = [
  {
    id: '基础',
    badge: '01 基础',
    title: '从零下载与上手',
    hook: '电脑小白也能装好常用 AI，当天开口对话',
    promise: '会下载 · 会注册 · 会提问 · 不踩密钥坑',
    days: '建议 1–3 天',
    color: '#0f766e',
    steps: [
      {
        title: '先搞懂 AI 能帮你干什么',
        result: '知道对话、写文、改代码、生图各自适合什么场景',
        courseIds: ['ai-what-is', 'ai-first-chat'],
      },
      {
        title: '按系统下载与安装',
        result: 'Windows / Mac 装好浏览器端与客户端，账号注册跑通',
        courseIds: ['ai-download-guide', 'ai-account-setup'],
      },
      {
        title: '第一次有效提问',
        result: '用四段式提示词，让回答能直接用',
        courseIds: ['prompt-basics', 'ai-daily-office'],
      },
      {
        title: '安全底线',
        result: '密钥不乱贴、隐私不乱传',
        courseIds: ['api-keys-security'],
      },
    ],
  },
  {
    id: '工具',
    badge: '02 工具',
    title: 'AI 编程工具怎么用',
    hook: '装好 Cursor / 同类工具，不会写代码也能改项目',
    promise: '会安装 · 会对话改文件 · 会 Rules · 会接模型',
    days: '建议 3–7 天',
    color: '#e8891c',
    steps: [
      {
        title: '选工具并装好',
        result: '搞清 Cursor / VS Code 插件 / Claude 等差异，完成安装登录',
        courseIds: ['tool-pick-compare', 'cursor-install'],
      },
      {
        title: 'Cursor 详细用法',
        result: 'Chat、Agent、多文件修改、@文件 全会用',
        courseIds: ['cursor', 'cursor-rules'],
      },
      {
        title: '模型与 API 配置',
        result: 'Key、域名、模型名三件套配通',
        courseIds: ['api-openai', 'domain-api-cheatsheet', 'api-compatible'],
      },
      {
        title: 'MCP 让工具真动手',
        result: '接上文档/文件类 MCP，完成一次真实调用',
        courseIds: ['mcp-intro', 'mcp-install'],
      },
    ],
  },
  {
    id: '进阶',
    badge: '03 进阶',
    title: '用 AI 做出真实作品',
    hook: '网页、小程序、App、海报生图——做出能给人看的东西',
    promise: '能上线一页站 · 能出小程序原型 · 能出 App 界面稿 · 能批量生图',
    days: '建议持续练习',
    color: '#b45309',
    steps: [
      {
        title: '用 AI 做网页',
        result: '从一句话需求到可访问的落地页 / 作品站',
        courseIds: ['ai-build-website', 'ai-landing-page'],
      },
      {
        title: '用 AI 做小程序',
        result: '页面结构、交互说明与可导入的原型稿',
        courseIds: ['ai-build-miniprogram'],
      },
      {
        title: '用 AI 做 App 界面与逻辑稿',
        result: '信息架构、关键页、组件说明一次产出',
        courseIds: ['ai-build-app'],
      },
      {
        title: 'AI 生图与视觉物料',
        result: '提示词出图、改图、做封面与海报',
        courseIds: ['ai-image-gen', 'ai-image-brand'],
      },
    ],
  },
]

export function getTrack(id: TrackId) {
  return TRACKS.find((t) => t.id === id)
}
