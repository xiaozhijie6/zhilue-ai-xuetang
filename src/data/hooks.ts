/** 首页能力卡：学完能做出什么（引人入目，但不喊口号） */

export type HookFeedItem = {
  id: string
  hook: string
  result: string
  proof: string
  level: '基础' | '工具' | '进阶'
  courseId: string
  tag: string
}

export const HOOK_FEED: HookFeedItem[] = [
  {
    id: 'h1',
    hook: '电脑小白也能装好 ChatGPT / 国内常用 AI',
    result: '按系统找到下载入口、完成安装与第一次登录',
    proof: '基础 · 下载安装',
    level: '基础',
    courseId: 'ai-download-guide',
    tag: '下载',
  },
  {
    id: 'h2',
    hook: '第一次对话就问出能直接用的回答',
    result: '四段式提示词：角色、任务、约束、输出格式',
    proof: '基础 · 提问',
    level: '基础',
    courseId: 'prompt-basics',
    tag: '提示词',
  },
  {
    id: 'h3',
    hook: '装好 Cursor：不会写代码也能改项目文件',
    result: '安装、登录、用 Agent 完成一次小改动',
    proof: '工具 · Cursor',
    level: '工具',
    courseId: 'cursor-install',
    tag: 'Cursor',
  },
  {
    id: 'h4',
    hook: 'Cursor 全功能详解：Chat / Agent / Rules 一次搞懂',
    result: '多文件修改、@引用、项目规则写清楚',
    proof: '工具详解页',
    level: '工具',
    courseId: 'cursor',
    tag: '详解',
  },
  {
    id: 'h5',
    hook: '一句话需求，做出可预览的官网落地页',
    result: '结构、文案、配色与响应式布局由 AI 协助完成',
    proof: '进阶 · 网页',
    level: '进阶',
    courseId: 'ai-build-website',
    tag: '网页',
  },
  {
    id: 'h6',
    hook: '小程序关键页一次出齐：首页、列表、详情',
    result: '页面结构 + 文案 + 交互说明，方便导入开发工具',
    proof: '进阶 · 小程序',
    level: '进阶',
    courseId: 'ai-build-miniprogram',
    tag: '小程序',
  },
  {
    id: 'h7',
    hook: 'App 界面与流程稿：先做清楚再开发',
    result: '信息架构、关键屏、组件清单可交付给设计/开发',
    proof: '进阶 · App',
    level: '进阶',
    courseId: 'ai-build-app',
    tag: 'App',
  },
  {
    id: 'h8',
    hook: '海报、封面、产品图：提示词出图不翻车',
    result: '会写主体、风格、构图，并做风格统一的多图',
    proof: '进阶 · 生图',
    level: '进阶',
    courseId: 'ai-image-gen',
    tag: '生图',
  },
  {
    id: 'h9',
    hook: 'Key 与域名配通：工具连上模型不报错',
    result: 'Base URL、模型名、鉴权三件套一次核对',
    proof: '工具 · 配置',
    level: '工具',
    courseId: 'domain-api-cheatsheet',
    tag: '配置',
  },
  {
    id: 'h10',
    hook: 'MCP 接上后，AI 能查文档、改本地文件',
    result: '完成一次真实工具调用，而不是只聊天',
    proof: '工具 · MCP',
    level: '工具',
    courseId: 'mcp-intro',
    tag: 'MCP',
  },
]
