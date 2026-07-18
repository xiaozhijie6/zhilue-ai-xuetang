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
    hook: '安装和注册先过关，别一上来就追新模型',
    promise: '装得上 · 登得进 · 问得清 · Key 不乱贴',
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
    hook: '编程助手按功能拆开用，少走弯路',
    promise: '装 Cursor · 改文件 · 写 Rules · 配模型',
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
    title: '交得出去的作品',
    hook: '该交页面了？按类型选一条线往下做',
    promise: '落地页 · 小程序骨架 · App 说明稿 · 海报封面',
    days: '建议持续练习',
    color: '#b45309',
    steps: [
      {
        title: '先做出能打开的网页',
        result: '本地预览，必要时再部署成链接',
        courseIds: ['ai-build-website', 'ai-landing-page'],
      },
      {
        title: '小程序三页骨架',
        result: '首页、列表、详情带交互说明',
        courseIds: ['ai-build-miniprogram'],
      },
      {
        title: 'App 关键屏说明稿',
        result: '信息架构与组件清单能交给开发',
        courseIds: ['ai-build-app'],
      },
      {
        title: '海报封面出图',
        result: '主体、风格写死，多图一套',
        courseIds: ['ai-image-gen', 'ai-image-brand'],
      },
    ],
  },
]

export function getTrack(id: TrackId) {
  return TRACKS.find((t) => t.id === id)
}
