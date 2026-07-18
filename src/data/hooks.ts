/** 首页能力卡：每条标题句式不同，避免整齐划一 */

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
    hook: 'ChatGPT、Claude、国内常用——下载入口别再瞎搜',
    result: '按 Windows / Mac 找到官方渠道，装完能登录',
    proof: '安装指南',
    level: '基础',
    courseId: 'ai-download-guide',
    tag: '下载',
  },
  {
    id: 'h2',
    hook: '问完还是废话？多半是提示词少了约束',
    result: '角色、任务、限制、输出格式拆开写',
    proof: '提问方法',
    level: '基础',
    courseId: 'prompt-basics',
    tag: '提示词',
  },
  {
    id: 'h3',
    hook: 'Cursor 装好了却不敢点？先改一个小文件练手',
    result: '登录、选模型、完成第一次落盘修改',
    proof: 'Cursor 起步',
    level: '工具',
    courseId: 'cursor-install',
    tag: '起步',
  },
  {
    id: 'h4',
    hook: 'Agent、Rules、@文件分别干什么，别混着用',
    result: '多文件任务、项目规矩、引用范围一次分清',
    proof: 'Cursor 详解',
    level: '工具',
    courseId: 'cursor',
    tag: '详解',
  },
  {
    id: 'h5',
    hook: '官网首页空白很久？先让 AI 铺一版结构',
    result: '首屏、卖点区、案例区、页脚可预览',
    proof: '做网页',
    level: '进阶',
    courseId: 'ai-build-website',
    tag: '网页',
  },
  {
    id: 'h6',
    hook: '小程序别从零画线框，三页骨架可以先生成',
    result: '首页、列表、详情 + 交互说明',
    proof: '小程序',
    level: '进阶',
    courseId: 'ai-build-miniprogram',
    tag: '小程序',
  },
  {
    id: 'h7',
    hook: 'App 还没写代码，先把关键屏讲清楚',
    result: '信息架构、组件清单、流程说明能交给开发',
    proof: 'App 稿',
    level: '进阶',
    courseId: 'ai-build-app',
    tag: 'App',
  },
  {
    id: 'h8',
    hook: '生图老是「差不多」？把主体和风格写死',
    result: '海报、封面、产品图各有一套提示词写法',
    proof: '生图',
    level: '进阶',
    courseId: 'ai-image-gen',
    tag: '生图',
  },
  {
    id: 'h9',
    hook: 'Cursor 连不上模型，九成是域名或 Key 填错',
    result: 'Base URL、模型名、鉴权对照着抄',
    proof: '配置',
    level: '工具',
    courseId: 'domain-api-cheatsheet',
    tag: '配置',
  },
  {
    id: 'h10',
    hook: '只聊天不够？让 AI 真去查文档、改本地文件',
    result: 'MCP 绿灯亮起，完成一次工具调用',
    proof: 'MCP',
    level: '工具',
    courseId: 'mcp-intro',
    tag: 'MCP',
  },
]
