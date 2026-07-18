/** 知略内容库：AI 自学知识库 / 教程库 */

export type Level = '基础' | '工具' | '进阶'

export type Lesson = {
  id: string
  title: string
  mins: number
  type: '图文' | '步骤' | '模板' | '实操' | '清单'
}

export type KnowledgeItem = {
  id: string
  title: string
  hook: string
  outcome: string
  category: string
  level: Level
  format: string
  desc: string
  audience: string
  duration: string
  teacher: string
  students: number
  highlights: string[]
  outline: string[]
  lessons: Lesson[]
  source?: '自有资料' | '平台课包'
  hot?: boolean
  new?: boolean
  trackStep?: number
}

export const CATEGORIES = [
  '全部',
  '下载与入门',
  'AI编程工具',
  '提示词工程',
  '用AI做产品',
  'AI生图',
  'API与配置',
  'MCP与工具协议',
  '安全合规',
  '办公提效',
] as const

export const LEVELS: Array<Level | '全部'> = ['全部', '基础', '工具', '进阶']

function L(id: string, rows: Array<[string, number, Lesson['type']]>): Lesson[] {
  return rows.map(([title, mins, type], i) => ({
    id: `${id}-l${i + 1}`,
    title,
    mins,
    type,
  }))
}

function course(
  partial: Omit<
    KnowledgeItem,
    'lessons' | 'outline' | 'highlights' | 'format' | 'audience' | 'duration' | 'teacher' | 'students' | 'hook' | 'outcome'
  > &
    Partial<
      Pick<
        KnowledgeItem,
        | 'format'
        | 'audience'
        | 'duration'
        | 'teacher'
        | 'students'
        | 'highlights'
        | 'outline'
        | 'lessons'
        | 'hot'
        | 'new'
        | 'source'
        | 'trackStep'
        | 'hook'
        | 'outcome'
      >
    >,
  lessonRows: Array<[string, number, Lesson['type']]>,
): KnowledgeItem {
  const lessons = partial.lessons ?? L(partial.id, lessonRows)
  const hook = partial.hook ?? partial.title
  const outcome = partial.outcome ?? `学完能独立掌握「${partial.title}」的核心方法并立刻上手`
  return {
    format: '图文教程 · 步骤拆解',
    audience: 'AI 自学者',
    duration: `${Math.max(1, Math.round(lessons.reduce((n, l) => n + l.mins, 0) / 60))} 小时`,
    teacher: '知略 AI 教研组',
    students: 1200 + (partial.id.length * 137) % 8000,
    highlights: ['步骤可跟做', '产出可验证', '可勾选进度'],
    outline: lessonRows.slice(0, 4).map(([t]) => t),
    hook,
    outcome,
    ...partial,
    lessons,
  }
}

export const KNOWLEDGE_LIBRARY: KnowledgeItem[] = [
  // ——— 基础：下载与入门 ———
  course(
    {
      id: 'ai-what-is',
      title: 'AI 是什么：对话、写文、改代码、生图各适合什么',
      hook: '5 分钟搞懂 AI 能帮你做什么，不再盲目跟风',
      outcome: '能按场景选对 AI 用法：聊天、办公、编程、做图各走哪条路',
      category: '下载与入门',
      level: '基础',
      desc: '用生活化语言讲清大模型能力边界，建立正确预期。',
      source: '自有资料',
      hot: true,
      trackStep: 0,
    },
    [
      ['AI 不是搜索引擎：它擅长什么、不擅长什么', 10, '图文'],
      ['四种常见用法：对话 / 写文 / 改代码 / 生图', 12, '图文'],
      ['云端 vs 客户端：什么时候需要装软件', 10, '步骤'],
      ['免费版与付费版：怎么判断值不值得升级', 10, '图文'],
      ['国内可用 vs 海外工具：选型一张对照表', 12, '模板'],
      ['自测：你的 3 个真实场景该用哪种 AI', 15, '实操'],
    ],
  ),
  course(
    {
      id: 'ai-first-chat',
      title: '第一次有效对话：从打开页面到拿到可用回答',
      hook: '打开 AI 当天就能问出有用答案，而不是瞎聊',
      outcome: '完成第一次结构化提问，拿到能直接复制使用的回答',
      category: '下载与入门',
      level: '基础',
      desc: '注册后第一次对话的完整流程：选模型、写问题、追问、保存结果。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['打开 ChatGPT / Claude / 国内同类：界面导览', 10, '步骤'],
      ['新建对话 vs 继续旧对话：什么时候该新开', 8, '图文'],
      ['第一条消息怎么写：背景 + 任务 + 格式', 15, '实操'],
      ['回答太长/太泛：三轮追问把结果收窄', 12, '实操'],
      ['复制、导出、保存对话记录的三种方式', 10, '步骤'],
      ['上传图片/文件（若支持）：什么文件适合贴', 12, '图文'],
      ['常见报错：网络、登录、额度 — 对照排查', 10, '清单'],
    ],
  ),
  course(
    {
      id: 'ai-download-guide',
      title: 'Windows / Mac 下载安装常用 AI 全指南',
      hook: '照着步骤把常用 AI 装到电脑上',
      outcome: 'Windows 或 Mac 装好浏览器版与客户端，ChatGPT、Claude、国内常用与 Cursor 入口清楚',
      category: '下载与入门',
      level: '基础',
      desc: 'ChatGPT、Claude、Kimi、通义、豆包等安装路径；Cursor 下载入口与系统要求。',
      source: '自有资料',
      hot: true,
      new: true,
      trackStep: 1,
    },
    [
      ['先选路线：只用浏览器 vs 装客户端 vs 编程 IDE', 10, '图文'],
      ['Windows：ChatGPT / Claude 官方客户端下载与安装', 15, '步骤'],
      ['Mac：从官网下载、拖拽安装与权限弹窗处理', 15, '步骤'],
      ['国内常用：Kimi / 通义 / 豆包 / 智谱 安装与登录', 18, '步骤'],
      ['Cursor 下载页、系统要求与 Apple 芯片说明', 12, '步骤'],
      ['公司网络 / 代理环境下安装失败怎么办', 10, '清单'],
      ['装完自检：能登录、能发消息、能更新', 12, '实操'],
      ['桌面快捷方式与浏览器书签整理建议', 8, '模板'],
    ],
  ),
  course(
    {
      id: 'ai-account-setup',
      title: '账号注册、登录与基础设置',
      hook: '账号一次注册到位：邮箱、手机、地区与隐私选项',
      outcome: '主要 AI 账号注册完成，基础隐私与通知设置按清单勾选',
      category: '下载与入门',
      level: '基础',
      desc: '邮箱验证、手机号、地区限制、多账号管理与基础隐私设置。',
      source: '自有资料',
    },
    [
      ['注册前准备：邮箱、手机号、支付方式（若需）', 10, '清单'],
      ['海外工具：邮箱注册与二次验证流程', 15, '步骤'],
      ['国内工具：手机号登录与实名说明', 12, '步骤'],
      ['登录态同步：同一账号多设备怎么用', 10, '图文'],
      ['隐私设置：训练数据、对话留存、导出删除', 15, '步骤'],
      ['多账号管理：工作号 / 个人号分离建议', 10, '模板'],
      ['账号异常：封禁、验证码、换绑邮箱处理', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'newbie-first-week',
      title: '7 天 AI 基础路径：从零到能独立使用',
      hook: '7 天自学计划：每天 30 分钟，从零到能提问、能办公、懂安全',
      outcome: '7 天清单全部打勾，能独立对话、写提示词、知道密钥不能乱贴',
      category: '下载与入门',
      level: '基础',
      desc: '按天拆分的自学路径，覆盖安装、提问、办公、安全底线。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['Day1：搞懂 AI 能做什么 + 完成第一次对话', 30, '实操'],
      ['Day2：按系统完成下载安装与账号登录', 35, '实操'],
      ['Day3：四段式提示词完成 3 个真实任务', 35, '实操'],
      ['Day4：邮件 / 纪要 / 表格各练 1 次办公场景', 30, '实操'],
      ['Day5：了解 API Key 是什么，完成自查清单', 25, '清单'],
      ['Day6：选一个方向预习（工具 or 做作品）', 30, '图文'],
      ['Day7：复盘：哪些任务 AI 能代劳、哪些必须人工', 25, '实操'],
    ],
  ),

  // ——— 基础：提示词与办公 ———
  course(
    {
      id: 'prompt-basics',
      title: '提示词入门：角色、目标、约束、格式四段式',
      hook: '四段式提示词：同一任务输出质量立刻翻倍',
      outcome: '熟练写角色/目标/约束/格式，10 题改写练习过关',
      category: '提示词工程',
      level: '基础',
      desc: '四件套框架，立刻提升提问质量。',
      source: '自有资料',
      hot: true,
      trackStep: 2,
    },
    [
      ['坏提示 vs 好提示：同一任务对比', 12, '图文'],
      ['四件套：角色 → 任务 → 约束 → 格式', 18, '步骤'],
      ['输出格式：Markdown / JSON / 表格怎么锁', 15, '模板'],
      ['「不知道就说不知道」减少胡编', 10, '图文'],
      ['上下文该贴多少：摘要 vs 全文', 12, '图文'],
      ['改写练习 10 题（办公 / 学习 / 生活）', 25, '实操'],
      ['提示词模板收藏与复用方法', 10, '模板'],
      ['常见翻车：太宽、太长、无验收标准', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'ai-daily-office',
      title: '办公提效：邮件、纪要、PPT 大纲与调研',
      hook: '邮件 / 纪要 / PPT / 调研：四套 prompt 省 2 小时/天',
      outcome: '高频办公场景各练通一遍，建立「AI 起草 + 人工复核」习惯',
      category: '办公提效',
      level: '基础',
      desc: '高频办公场景提示词与复核习惯，不涉及买课或直播话术。',
      hot: true,
    },
    [
      ['邮件与公文：语气、长度、收件人三要素', 18, '实操'],
      ['会议纪要 → 待办：谁、何时、做什么', 18, '实操'],
      ['PPT 大纲：一页一观点 + 演讲备注', 18, '实操'],
      ['快速调研：问题拆解 + 来源标注要求', 20, '实操'],
      ['表格描述任务：让 AI 读懂你的数据结构', 15, '步骤'],
      ['复核清单：数字、人名、日期必查', 10, '清单'],
    ],
  ),
  course(
    {
      id: 'api-keys-security',
      title: 'API Key 安全：存储、轮换与泄露应对',
      hook: '别再泄露 API Key：一套密钥安全规范省几万账单',
      outcome: '密钥存储、轮换、泄露应急流程落地，pre-commit 扫描启用',
      category: '安全合规',
      level: '基础',
      desc: '禁止提交仓库、环境变量、泄露应急 — 自学阶段就要懂的底线。',
      hot: true,
    },
    [
      ['密钥泄露真实案例与代价', 10, '图文'],
      ['禁止：硬编码、提交 Git、前端暴露', 12, '清单'],
      ['正确：环境变量、本地 .env、不分享截图', 15, '步骤'],
      ['.gitignore 与 pre-commit 扫描 sk-', 15, '实操'],
      ['开发 / 个人 Key 隔离：别混用', 12, '图文'],
      ['泄露应急：Revoke → 清历史 → 查账单', 15, '模板'],
      ['给 AI 工具授权时的最小权限原则', 10, '图文'],
    ],
  ),

  // ——— 工具：选型与 Cursor ———
  course(
    {
      id: 'tool-pick-compare',
      title: 'AI 编程工具怎么选：Cursor vs VS Code+Copilot vs 其他',
      hook: '不会写代码也能改项目：先选对工具再深入',
      outcome: '搞清 Cursor / VS Code 插件 / Claude Code 等差异，选出适合自己的一款',
      category: 'AI编程工具',
      level: '工具',
      desc: '面向自学者的工具地图，不绑单一厂商。',
      source: '自有资料',
      hot: true,
      trackStep: 0,
    },
    [
      ['AI 编程工具解决什么问题：补全 vs 改整项目', 12, '图文'],
      ['Cursor：一体化 IDE + Agent 改多文件', 15, '图文'],
      ['VS Code + Copilot / Cline：插件路线', 15, '图文'],
      ['Claude Code / Aider：终端 Agent 路线', 12, '图文'],
      ['国产 Trae / 通义灵码：中文场景速览', 12, '图文'],
      ['对照表：价格、隐私、模型、上手难度', 15, '模板'],
      ['决策树：零基础 / 有代码基础 / 企业各怎么选', 15, '步骤'],
    ],
  ),
  course(
    {
      id: 'cursor-install',
      title: 'Cursor 安装、登录与第一次改文件',
      hook: 'Cursor 装完当天：登录、选模型、改第一个文件',
      outcome: 'Cursor 安装登录完成，用 Chat 完成第一次文件修改',
      category: 'AI编程工具',
      level: '工具',
      desc: '下载、安装、账号、模型选择与首次改码体验。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['官网下载与 Windows / Mac 安装步骤', 15, '步骤'],
      ['首次启动：登录 GitHub / Google / 邮箱', 12, '步骤'],
      ['界面导览：侧边栏、编辑器、Chat 面板', 12, '图文'],
      ['Settings：模型选择与 Privacy Mode 说明', 15, '步骤'],
      ['打开示例文件夹：认识工作区', 10, '步骤'],
      ['第一次 Chat：选中代码 → 提问 → 应用修改', 20, '实操'],
      ['安装后自检清单：能对话、能改文件、能保存', 10, '清单'],
    ],
  ),
  course(
    {
      id: 'cursor',
      title: 'Cursor 完全指南：从安装到 Agent 改项目',
      hook: 'Cursor 整页讲透：从安装到 Agent 改项目',
      outcome: '独立用 Cursor 完成多文件改码、Rules 配置与 Agent 任务拆解',
      category: 'AI编程工具',
      level: '工具',
      desc: 'Chat、Inline、Composer、Agent、@文件、Rules、MCP、模型配置 — 逐步讲透。',
      source: '自有资料',
      hot: true,
      trackStep: 1,
    },
    [
      ['Chat / Ask / Edit / Agent 四种模式对比与切换', 18, '图文'],
      ['Inline Edit：选中代码行内修改', 15, '实操'],
      ['Composer：多文件任务从需求到落地', 22, '实操'],
      ['Agent 模式：自动读文件、改文件、跑命令', 25, '实操'],
      ['@文件、@文件夹、@Codebase 上下文控制', 18, '实操'],
      ['@Docs / @Web：查文档与联网（若开启）', 12, '步骤'],
      ['Terminal 集成：让 Agent 帮你跑命令', 15, '实操'],
      ['Settings 深度：模型、API Key、Base URL', 18, '步骤'],
      ['Privacy Mode、索引与 .cursorignore', 12, '图文'],
      ['常见坑：不改文件、上下文爆炸、计费直觉', 15, '清单'],
      ['从 Ask 切到 Agent 的 checklist', 10, '模板'],
    ],
  ),
  course(
    {
      id: 'cursor-rules',
      title: 'Cursor Rules 深度：.mdc 与项目规范落地',
      hook: '一套 Rules 让 AI 编程助手不再乱改你的项目',
      outcome: '写出可执行的 .mdc Rules，Agent 稳定守规矩',
      category: 'AI编程工具',
      level: '工具',
      desc: 'Rules 语法、层级、与 System Prompt 分工。',
      source: '自有资料',
      new: true,
    },
    [
      ['Rules 文件放哪：项目 vs 用户 vs 团队', 12, '图文'],
      ['.mdc frontmatter 与 globs 匹配范围', 15, '实操'],
      ['写可执行的约束：版本、目录、禁止事项', 18, '实操'],
      ['Rules vs AGENTS.md vs README 分工', 12, '图文'],
      ['示例：React / Python / monorepo 三套模板', 20, '模板'],
      ['Rules 过长导致上下文浪费的裁剪', 12, '图文'],
      ['团队 Review：如何迭代 Rules 版本', 15, '实操'],
    ],
  ),
  course(
    {
      id: 'claude-code',
      title: 'Claude Code：终端里的编程 Agent 速览',
      hook: '终端里有个编程 Agent：修 Bug 不用来回切窗口',
      outcome: '了解 Claude Code 安装与基本用法，知道何时用 CLI Agent',
      category: 'AI编程工具',
      level: '工具',
      desc: 'CLI Agent 安装、权限、仓库级任务与安全边界 — Brief 够用。',
    },
    [
      ['Claude Code 是什么：和 Cursor 的分工', 10, '图文'],
      ['官方安装与鉴权', 15, '步骤'],
      ['仓库级指令写法示例', 20, '实操'],
      ['危险操作防护与权限确认', 12, '清单'],
    ],
  ),

  // ——— 工具：API 与 MCP ———
  course(
    {
      id: 'api-openai',
      title: 'OpenAI API 从零配置到第一请求',
      hook: '30 分钟发出第一条 OpenAI API 请求',
      outcome: 'API Key、SDK、流式输出配通，常见报错能自己排查',
      category: 'API与配置',
      level: '工具',
      desc: 'API Key、Base URL、Chat Completions、流式输出。',
      hot: true,
      trackStep: 2,
    },
    [
      ['注册 OpenAI 账号与组织', 10, '步骤'],
      ['创建 API Key 与项目隔离', 12, '实操'],
      ['计费直觉：输入/输出 Token 怎么算', 12, '图文'],
      ['环境变量与 .env 本地注入', 15, '实操'],
      ['Base URL：https://api.openai.com/v1 含义', 10, '图文'],
      ['curl 第一条 chat/completions', 18, '实操'],
      ['Python / Node SDK 最小可运行示例', 20, '实操'],
      ['messages 角色：system / user / assistant', 15, '图文'],
      ['401 / 429 / 500 报错对照与排查', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'api-compatible',
      title: 'OpenAI 兼容接口与国内网关配置',
      hook: '国内网关填 Cursor：Base URL 对照表复制即用',
      outcome: 'OpenAI 兼容接口在 Cursor 里配通并实测通过',
      category: 'API与配置',
      level: '工具',
      desc: 'base_url、兼容网关、Cursor 填法与排错。',
      hot: true,
    },
    [
      ['OpenAI 兼容接口是什么：同一 SDK 换 base_url', 12, '图文'],
      ['DeepSeek / 国内网关 Base URL 对照', 15, '模板'],
      ['Cursor Settings：Override OpenAI Base URL', 18, '实操'],
      ['模型名映射：gpt-4o vs deepseek-chat', 12, '图文'],
      ['curl 验证兼容网关 /models 与 /chat/completions', 18, '实操'],
      ['401 域名错 / 404 路径错 / 502 网关错', 15, '清单'],
      ['密钥轮换与多环境配置模板', 10, '模板'],
    ],
  ),
  course(
    {
      id: 'domain-api-cheatsheet',
      title: '域名与接口速查：Base URL 复制即用',
      hook: 'Base URL 速查表：OpenAI / Azure / DeepSeek 复制即用',
      outcome: '各厂商域名/路径/鉴权对照表在手，填 Cursor 不再试错',
      category: 'API与配置',
      level: '工具',
      desc: 'OpenAI / Anthropic / Azure / DeepSeek / 兼容网关域名、路径、鉴权对照。',
      hot: true,
      new: true,
      source: '自有资料',
    },
    [
      ['一张表看懂：vendor / base_url / auth 头', 12, '模板'],
      ['OpenAI 官方与 Organization 项目 Key', 10, '图文'],
      ['Anthropic Messages API 域名差异', 12, '图文'],
      ['Azure OpenAI endpoint 拼接规则', 15, '步骤'],
      ['DeepSeek / 硅基等兼容网关填 Cursor', 15, '实操'],
      ['curl 模板：/models 与 /chat/completions', 15, '实操'],
      ['常见填错：少 /v1、https 写成 http', 12, '清单'],
      ['内网代理与环境变量 NO_PROXY', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'mcp-intro',
      title: 'MCP 是什么：模型上下文协议入门',
      hook: 'MCP 是什么：5 分钟搞懂 IDE 怎么接外部工具',
      outcome: '理解 Host/Client/Server 关系，Cursor 里 MCP 绿灯知道意味着什么',
      category: 'MCP与工具协议',
      level: '工具',
      desc: 'MCP 解决什么问题、和 Plugin / Function Calling 关系。',
      hot: true,
      new: true,
      trackStep: 3,
    },
    [
      ['MCP 解决什么问题：工具、数据、IDE 统一协议', 12, '图文'],
      ['Host / Client / Server 三角关系图解', 15, '图文'],
      ['与 Plugin、Function Calling、API 的对比', 15, '图文'],
      ['一次工具调用的完整时序', 12, '步骤'],
      ['常见 MCP Server 能力地图', 10, '图文'],
      ['在 Cursor 里看到 MCP 绿灯意味着什么', 12, '实操'],
      ['stdio vs SSE 传输方式入门', 12, '图文'],
      ['安全直觉：为何需要权限弹窗', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'mcp-install',
      title: '在 Cursor 中安装与配置第一个 MCP',
      hook: 'Cursor 里装第一个 MCP：配置文件复制就能跑',
      outcome: 'mcp.json 配好第一个 Server，权限弹窗与失败排查会处理',
      category: 'MCP与工具协议',
      level: '工具',
      desc: 'mcp.json 配置、本地 Server 启动、权限弹窗处理。',
      hot: true,
    },
    [
      ['配置文件位置：项目 vs 全局', 12, '步骤'],
      ['复制第一个 filesystem / context7 配置', 18, '实操'],
      ['重启 Cursor 与检查 MCP 状态灯', 10, '步骤'],
      ['Agent 里触发一次 tool call 验证', 20, '实操'],
      ['失败排查：路径、Node 版本、权限', 18, '清单'],
      ['多 Server 并存时的命名规范', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'prompt-system',
      title: 'System Prompt 与工具说明写法',
      hook: 'System Prompt 写对了：Agent 行为稳定不跑偏',
      outcome: '系统提示与工具描述写法掌握，能写稳定的 Agent 设定',
      category: '提示词工程',
      level: '工具',
      desc: '给 Agent 写稳定系统设定与工具描述。',
    },
    [
      ['System vs User：谁说了算', 12, '图文'],
      ['系统提示结构：身份、边界、格式、拒答', 18, '步骤'],
      ['工具描述字段：name / description / parameters', 18, '图文'],
      ['示例：客服 Agent 设定实操', 25, '实操'],
      ['版本管理与 A/B 对比方法', 12, '模板'],
    ],
  ),

  // ——— 工具：RAG 与 Agent（保留高价值） ———
  course(
    {
      id: 'rag-basics',
      title: 'RAG 入门：用自有文档让 AI 答得更准',
      hook: '公司文档问答不再胡编：RAG 最小思路当天理解',
      outcome: 'Indexing/Retrieval/Generation 流程掌握，知道何时该用 RAG',
      category: 'API与配置',
      level: '工具',
      desc: '用公司文档回答，减少过期与胡编 — 自学做产品前的知识底座。',
      hot: true,
    },
    [
      ['RAG 解决「过期 + 胡编」的两根支柱', 12, '图文'],
      ['Indexing：切片 → Embedding → 向量库', 15, '步骤'],
      ['Retrieval：相似度、Top-K、阈值', 15, '图文'],
      ['Generation：引用片段 + 拒答策略', 12, '图文'],
      ['Embedding 模型选型与中文效果', 12, '图文'],
      ['最小 Demo 思路：本地 10 页 PDF 问答', 20, '实操'],
      ['RAG vs 纯长上下文：成本与准确对比', 12, '图文'],
    ],
  ),
  course(
    {
      id: 'agent-tools',
      title: 'Agent 工具调用：从 Function 到 MCP 闭环',
      hook: 'Agent 工具闭环：plan → tool → observe 一次跑通',
      outcome: '理解 tools 设计、执行循环、错误重试，知道 MCP 与 Function Calling 怎么选',
      category: 'MCP与工具协议',
      level: '工具',
      desc: '设计 tools、执行循环、错误重试、与 MCP 组合。',
      hot: true,
      new: true,
    },
    [
      ['Agent 循环：plan → tool → observe → answer', 15, '图文'],
      ['tool 描述怎么写模型才爱用', 18, '步骤'],
      ['并行 vs 串行 tool_calls 策略', 12, '图文'],
      ['失败重试：把 stderr 贴回对话', 15, '实操'],
      ['MCP 与原生 Function Calling 怎么选', 12, '图文'],
      ['Human-in-the-loop 审批点设计', 15, '模板'],
      ['端到端 Demo 拆解：查文件 / 写文件', 25, '实操'],
    ],
  ),

  // ——— 进阶：用 AI 做产品 ———
  course(
    {
      id: 'ai-build-website',
      title: '用 AI 做出能给人看的网页',
      hook: '用 AI 从一句话需求到可预览网页',
      outcome: '独立完成一个多区块网页：布局、文案、样式、本地预览',
      category: '用AI做产品',
      level: '进阶',
      desc: 'HTML/CSS/JS 或 React 路线，Cursor Agent 驱动从零搭站。',
      source: '自有资料',
      hot: true,
      new: true,
      trackStep: 0,
    },
    [
      ['写清需求：页面目标、受众、必含区块', 12, '步骤'],
      ['选栈：纯 HTML vs React/Vite 怎么跟 AI 说', 15, '图文'],
      ['Agent 生成项目骨架与目录结构', 20, '实操'],
      ['逐区块迭代：Hero / 特性 / 定价 / FAQ', 25, '实操'],
      ['样式统一：配色、字体、间距 prompt', 18, '实操'],
      ['响应式：移动端断点怎么描述', 15, '步骤'],
      ['本地 npm run dev 预览与截图验收', 15, '实操'],
      ['常见坑：路径错、依赖缺、样式覆盖', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'ai-landing-page',
      title: '用 AI 做出能上线预览的落地页',
      hook: '用 AI 做出能上线预览的落地页',
      outcome: '落地页部署到 Vercel / Netlify / GitHub Pages，拿到可分享链接',
      category: '用AI做产品',
      level: '进阶',
      desc: '从设计稿描述到部署，免费托管一条龙。',
      hot: true,
    },
    [
      ['落地页结构：首屏 / 社会证明 / CTA / 页脚', 12, '模板'],
      ['用 AI 生成文案：标题、副标题、按钮语', 15, '实操'],
      ['Tailwind / 组件库：怎么让 AI 输出统一风格', 18, '步骤'],
      ['表单与埋点：先 mock 再对接真实 API', 15, '实操'],
      ['Git 初始化与推送到 GitHub', 12, '步骤'],
      ['Vercel / Netlify 一键部署', 18, '实操'],
      ['自定义域名与 HTTPS（可选）', 12, '图文'],
      ['上线自检：移动端、加载速度、链接', 10, '清单'],
    ],
  ),
  course(
    {
      id: 'ai-build-miniprogram',
      title: '用 AI 搭微信小程序页面结构',
      hook: '小程序首页到详情页，结构一次生成',
      outcome: '产出首页、列表、详情页结构与 wxml/wxss 草稿，可导入开发者工具',
      category: '用AI做产品',
      level: '进阶',
      desc: '页面结构、交互说明与可导入微信开发者工具的原型稿。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['小程序文件结构：app.json / pages / components', 12, '图文'],
      ['用 AI 写 PRD：页面清单与跳转关系', 15, '步骤'],
      ['首页：轮播、入口、列表区块生成', 20, '实操'],
      ['列表页：分页、空态、加载态', 18, '实操'],
      ['详情页：图文、按钮、分享配置', 18, '实操'],
      ['导入微信开发者工具与预览', 15, '步骤'],
      ['真机调试与常见权限报错', 12, '清单'],
      ['从 AI 草稿到可提交审核的差距说明', 10, '图文'],
    ],
  ),
  course(
    {
      id: 'ai-build-app',
      title: '用 AI 出 App 界面稿与交互说明',
      hook: '不会 UI 设计也能出 App 关键页与流程说明',
      outcome: '信息架构、关键页 wireframe 描述、组件清单一次产出',
      category: '用AI做产品',
      level: '进阶',
      desc: 'React Native / Flutter 或 Figma 描述路线，面向可交付原型。',
      new: true,
    },
    [
      ['先写用户故事：谁、要什么、完成什么', 12, '步骤'],
      ['信息架构：Tab / Stack 导航怎么画', 15, '图文'],
      ['关键页清单：登录、首页、详情、设置', 15, '模板'],
      ['用 AI 生成每页布局与组件说明', 22, '实操'],
      ['React Native / Expo 或 Flutter 选型 prompt', 15, '图文'],
      ['导出为可给开发者的 Markdown 规格', 18, '实操'],
      ['原型工具：v0 / Figma AI 补充视觉', 15, '步骤'],
    ],
  ),

  // ——— 进阶：AI 生图 ———
  course(
    {
      id: 'ai-image-gen',
      title: 'AI 生图入门：提示词出图与改图',
      hook: '用 AI 做出海报、封面与产品图',
      outcome: 'Midjourney / DALL·E / 国内生图工具各练通，能出可用图',
      category: 'AI生图',
      level: '进阶',
      desc: '提示词结构、比例、风格、局部重绘与导出。',
      source: '自有资料',
      hot: true,
      trackStep: 1,
    },
    [
      ['生图工具地图：Midjourney / DALL·E / SD / 国内', 12, '图文'],
      ['提示词结构：主体 + 风格 + 光线 + 构图', 18, '步骤'],
      ['比例与用途：封面 16:9、头像 1:1、海报 2:3', 12, '模板'],
      ['负面提示词：少手指、少文字、少糊', 12, '图文'],
      ['图生图与局部重绘：换背景、改颜色', 20, '实操'],
      ['批量出图与选图 workflow', 15, '实操'],
      ['导出格式、分辨率与压缩', 10, '清单'],
    ],
  ),
  course(
    {
      id: 'ai-image-brand',
      title: 'AI 品牌视觉：统一风格的多张物料',
      hook: '同一品牌多张图风格统一：封面、Banner、头像一套出',
      outcome: '建立品牌色/风格 reference，批量出封面与海报且风格一致',
      category: 'AI生图',
      level: '进阶',
      desc: '风格 reference、seed、LoRA 直觉与品牌规范。',
      new: true,
    },
    [
      ['品牌三件套：主色、字体感、图形语言', 12, '模板'],
      ['风格 reference 图：怎么喂给模型', 15, '步骤'],
      ['系列封面：同一构图模板换文案区', 18, '实操'],
      ['Banner 与社媒尺寸对照表', 10, '模板'],
      ['角色一致：同一人多张表情/姿势', 20, '实操'],
      ['后期：Canva / PS 微调文字与 Logo', 15, '步骤'],
    ],
  ),

  // ——— 进阶：可选短课 ———
  course(
    {
      id: 'hallucination-defense',
      title: '减少 AI 胡编：引用、拒答与复核',
      hook: 'AI 瞎编少一半：Grounding + 引用 + 拒答策略',
      outcome: '知道幻觉类型，会用引用格式与拒答话术，建立复核习惯',
      category: '安全合规',
      level: '进阶',
      desc: '减少瞎编的系统方法：检索引用、低 temperature、人工复核。',
    },
    [
      ['幻觉类型：事实 / 数字 / 引用 / 代码版本', 10, '图文'],
      ['要求 citation：回答必须标注来源', 12, '步骤'],
      ['无依据时拒答话术模板', 10, '模板'],
      ['代码幻觉：锁定版本 + 跑测试再信', 15, '清单'],
    ],
  ),
  course(
    {
      id: 'cost-control',
      title: '成本与限流：Token 账单与模型路由',
      hook: 'Agent 账单别再失控：Token 告警与模型路由一套配齐',
      outcome: '账单拆分、hard limit、模型路由直觉建立，429 有应对策略',
      category: 'API与配置',
      level: '进阶',
      desc: '告警、hard limit、缓存、模型路由，避免 Agent 账单失控。',
      source: '自有资料',
    },
    [
      ['账单维度：model / 功能怎么拆', 12, '图文'],
      ['控制台告警与月度预算设置', 12, '步骤'],
      ['max_tokens 与上下文截断', 12, '图文'],
      ['小模型默认 + 大模型升级路由', 15, '步骤'],
      ['429 限流：退避与重试', 12, '清单'],
    ],
  ),
]

export function getItem(id: string) {
  return KNOWLEDGE_LIBRARY.find((x) => x.id === id)
}

export const FEATURED_IDS = [
  'ai-download-guide',
  'cursor',
  'ai-build-website',
  'ai-build-miniprogram',
  'ai-image-gen',
  'prompt-basics',
  'cursor-install',
  'newbie-first-week',
  'mcp-intro',
  'ai-landing-page',
] as const

export type LearningPath = {
  id: string
  title: string
  desc: string
  count: number
  courseIds: string[]
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-basic',
    title: '基础：从零下载与上手',
    desc: '安装、注册、第一次对话、提示词与办公、安全底线',
    count: 0,
    courseIds: [
      'newbie-first-week',
      'ai-what-is',
      'ai-download-guide',
      'ai-first-chat',
      'ai-account-setup',
      'prompt-basics',
      'ai-daily-office',
      'api-keys-security',
    ],
  },
  {
    id: 'path-tools',
    title: '工具：AI 编程工具详解',
    desc: '选型、Cursor 深潜、API 域名、MCP 与 Agent 工具闭环',
    count: 0,
    courseIds: [
      'tool-pick-compare',
      'cursor-install',
      'cursor',
      'cursor-rules',
      'claude-code',
      'api-openai',
      'domain-api-cheatsheet',
      'api-compatible',
      'mcp-intro',
      'mcp-install',
      'prompt-system',
      'rag-basics',
      'agent-tools',
    ],
  },
  {
    id: 'path-advanced',
    title: '进阶：用 AI 做出真实作品',
    desc: '网页、落地页、小程序、App 界面、生图与成本防控',
    count: 0,
    courseIds: [
      'ai-build-website',
      'ai-landing-page',
      'ai-build-miniprogram',
      'ai-build-app',
      'ai-image-gen',
      'ai-image-brand',
      'hallucination-defense',
      'cost-control',
    ],
  },
].map((p) => ({ ...p, count: p.courseIds.length }))
