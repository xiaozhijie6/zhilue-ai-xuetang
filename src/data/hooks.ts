/** 首页能力卡：文字样板全页面统一
 * - hook：场景痛点一句（≤22 字）
 * - result：能力短语，顿号分隔
 * - proof：固定 2 字板块标签（起步/安装/工具/网页/小程序/App/生图/配置/MCP）
 * - level：对应四级递进（入门/工具/作品/精通）
 */

export type HookFeedItem = {
  id: string
  hook: string
  result: string
  proof: string
  level: '入门' | '工具' | '作品' | '精通'
  courseId: string
  tag: string
}

export const HOOK_FEED: HookFeedItem[] = [
  {
    id: 'h1',
    hook: '国内常用先装稳，别再搜破解版下载',
    result: '先网页版、再客户端、不必翻墙',
    proof: '起步',
    level: '入门',
    courseId: 'ai-download-guide',
    tag: '下载',
  },
  {
    id: 'h2',
    hook: '问完还是废话？提示词少了四件套',
    result: '角色、目标、约束、格式拆开写',
    proof: '提示词',
    level: '入门',
    courseId: 'prompt-basics',
    tag: '提示词',
  },
  {
    id: 'h3',
    hook: '不翻墙也能改代码？先把 Trae 装上',
    result: '认 trae.cn、手机号登、改第一个文件',
    proof: '安装',
    level: '工具',
    courseId: 'install-trae',
    tag: '起步',
  },
  {
    id: 'h4',
    hook: 'Agent、Rules、@文件分别干啥，别混',
    result: '多文件、项目规矩、引用范围一次分清',
    proof: '工具',
    level: '工具',
    courseId: 'cursor',
    tag: '详解',
  },
  {
    id: 'h5',
    hook: '官网首页空白？先让 AI 铺一版结构',
    result: '首屏、卖点、案例、页脚可预览',
    proof: '网页',
    level: '作品',
    courseId: 'ai-build-website',
    tag: '网页',
  },
  {
    id: 'h6',
    hook: '小程序别从零画线框，骨架先生成',
    result: '首页、列表、详情、带交互',
    proof: '小程序',
    level: '作品',
    courseId: 'ai-build-miniprogram',
    tag: '小程序',
  },
  {
    id: 'h7',
    hook: 'App 还没写代码，先把关键屏讲清',
    result: '信息架构、组件清单、流程说明',
    proof: 'App',
    level: '作品',
    courseId: 'ai-build-app',
    tag: 'App',
  },
  {
    id: 'h8',
    hook: '生图老是差不多？把主体和风格写死',
    result: '海报、封面、产品图各一套写法',
    proof: '生图',
    level: '作品',
    courseId: 'ai-image-gen',
    tag: '生图',
  },
  {
    id: 'h9',
    hook: 'Cursor 连不上模型，九成填错域名或 Key',
    result: 'Base URL、模型名、鉴权对照着抄',
    proof: '配置',
    level: '精通',
    courseId: 'domain-api-cheatsheet',
    tag: '配置',
  },
  {
    id: 'h10',
    hook: '只聊天不够？让 AI 真去查文档改文件',
    result: 'MCP 绿灯亮、完成一次工具调用',
    proof: 'MCP',
    level: '精通',
    courseId: 'mcp-intro',
    tag: 'MCP',
  },
]
