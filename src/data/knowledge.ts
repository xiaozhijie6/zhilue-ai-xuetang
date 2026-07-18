/** 知略内容库：AI 自学知识库 / 教程库 */

export type Level = '入门' | '工具' | '作品' | '精通'

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

/** 教程总类：多列导航按此顺序展示（前端相关靠前） */
export const CATEGORIES = [
  '全部',
  '入门起步',
  '前端 / JS',
  '小程序与 App',
  '工具安装',
  '工具用法',
  '提示词工程',
  '办公提效',
  'API与配置',
  'MCP与Agent',
  'AI生图',
  '安全与成本',
] as const

/** 顶部多列总类（不含「全部」），一列一类 */
export const CATEGORY_COLUMNS = CATEGORIES.filter((c) => c !== '全部')

/** 安装大类简称，便于文案引用 */
export const INSTALL_CATEGORY = '工具安装' as const

export const LEVELS: Array<Level | '全部'> = ['全部', '入门', '工具', '作品', '精通']

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
  const outcome = partial.outcome ?? `跟做完你能独立掌握「${partial.title}」并立刻上手`
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
  // ——— 基础：入门起步 ———
  course(
    {
      id: 'ai-what-is',
      title: 'AI 是什么：对话、写文、改代码、生图各适合什么',
      hook: '5 分钟搞懂 AI 能帮你做什么，不再盲目跟风',
      outcome: '能按场景选对 AI 用法：聊天、办公、编程、做图各走哪条路',
      category: '入门起步',
      level: '入门',
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
      category: '入门起步',
      level: '入门',
      desc: '注册后第一次对话的完整流程：选模型、写问题、追问、保存结果。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['打开页面并点「新对话」（附官方网址）', 10, '步骤'],
      ['反例 vs 正例：为什么三个字没用', 8, '图文'],
      ['复制模板：背景+任务+格式写出第一条', 18, '实操'],
      ['第二轮第三轮追问：照抄改结构与定稿', 15, '实操'],
      ['复制到记事本 + 对话重命名', 12, '实操'],
      ['可选：上传附件总结（有 📎 再做）', 12, '步骤'],
      ['报错对照：转圈、额度、答非所问', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'ai-download-guide',
      title: 'Windows / Mac 下载安装常用 AI 全指南',
      hook: '国内优先：先网页版跑通，再决定要不要装客户端',
      outcome: '国内网页版能聊天；清楚海外客户端可跳过；知道编程去 Trae.cn / 通义灵码',
      category: '入门起步',
      level: '入门',
      desc: '小白逐步：先豆包/Kimi；ChatGPT/Claude/Cursor 标为可选；编程指向 Trae 与灵码。',
      source: '自有资料',
      hot: true,
      new: true,
      trackStep: 1,
    },
    [
      ['确认电脑系统：Windows winver / Mac 关于本机', 8, '步骤'],
      ['先选路线：国内网页版优先，海外客户端可选', 10, '图文'],
      ['跟做：豆包/Kimi 网页版登录并发第一条消息', 20, '实操'],
      ['可选：Windows ChatGPT 官方下载（网络可达时）', 18, '步骤'],
      ['可选：Claude 官网下载（打不开就跳过）', 15, '步骤'],
      ['Mac：ChatGPT 桌面版注意芯片与系统版本', 12, '步骤'],
      ['手机 App：应用商店认准开发者再安装', 12, '步骤'],
      ['要写代码：去 Trae.cn / 通义灵码，不必先装 Cursor', 15, '步骤'],
      ['装不上对照表：转圈、假网站、验证码', 15, '清单'],
      ['自检与书签整理：下次不再靠搜索', 10, '实操'],
    ],
  ),
  course(
    {
      id: 'ai-account-setup',
      title: '账号注册、登录与基础设置',
      hook: '手机号怎么点、邮件在哪找：注册一次就能继续学',
      outcome: '至少一个 AI 账号注册成功，会删对话、会记登录方式',
      category: '入门起步',
      level: '入门',
      desc: '国内手机号逐步注册；ChatGPT/Claude 注册与登录方式陷阱；隐私三分钟设置。',
      source: '自有资料',
    },
    [
      ['注册前准备：手机能否收短信、邮箱能否打开', 10, '清单'],
      ['国内：豆包手机号+验证码逐步点击', 18, '实操'],
      ['通义：淘宝/支付宝扫码登录怎么走', 12, '步骤'],
      ['ChatGPT：Google/微软/邮箱注册与「登错号」防范', 20, '步骤'],
      ['Claude：claude.ai 注册与打不开时的替代', 12, '步骤'],
      ['隐私三分钟：删对话、训练数据开关、别发密码', 15, '实操'],
      ['登录失败对照：验证码、垃圾箱、无痕窗口', 15, '清单'],
    ],
  ),
  course(
    {
      id: 'newbie-first-week',
      title: '7 天 AI 基础路径：从零到能独立使用',
      hook: '7 天自学计划：每天 30 分钟，从零到能提问、能办公、懂安全',
      outcome: '7 天清单全部打勾，能独立对话、写提示词、知道密钥不能乱贴',
      category: '入门起步',
      level: '入门',
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
      level: '入门',
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
      level: '入门',
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
      category: '安全与成本',
      level: '入门',
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

  // ——— 工具安装（每个工具一篇独立安装） ———
  course(
    {
      id: 'tool-pick-compare',
      title: '先选再装：国内直连优先的工具地图',
      hook: '默认不翻墙：先 Trae 国内版 / 通义灵码，海外工具标成可选',
      outcome: '选出国内能直连的主工具；清楚哪些需要海外网络再决定要不要装',
      category: '工具安装',
      level: '工具',
      desc: '国内优先：Trae.cn、通义灵码、国内 API；海外 Cursor/Claude/Codex 标网络要求。',
      source: '自有资料',
      hot: true,
      trackStep: 0,
    },
    [
      ['本站默认：国内用户、不依赖翻墙', 10, '图文'],
      ['国内直连首选：Trae 国内版 vs 通义灵码', 15, '模板'],
      ['每个工具擅长什么 + 网络要求对照表', 15, '模板'],
      ['登录 vs 国内 API Key：两条路', 12, '图文'],
      ['CC Switch：给 Claude Code/Codex 配国内中转 Key', 12, '图文'],
      ['决策树：零基础只装国内 → 有需要再碰海外', 15, '步骤'],
    ],
  ),
  course(
    {
      id: 'install-trae',
      title: 'Trae 国内版安装：不翻墙的 AI 编程 IDE',
      hook: '国内首选：trae.cn 直连下载，豆包/DeepSeek，手机号就能登',
      outcome: '从 trae.cn 装好并登录，不用翻墙完成第一次 AI 改文件',
      category: '工具安装',
      level: '工具',
      desc: '务必下国内版 trae.cn（不是 trae.ai）；登录；内置国产模型；可选自定义 API。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['为什么国内优先 Trae.cn：直连、中文、免海外支付', 10, '图文'],
      ['认准 trae.cn，不要下成海外版 trae.ai', 12, '步骤'],
      ['Windows / Mac 安装逐步', 15, '步骤'],
      ['手机号 / 抖音 / 飞书登录', 12, '步骤'],
      ['选内置模型（豆包 / DeepSeek 等）开始用', 15, '实操'],
      ['第一次 AI 改文件验证', 18, '实操'],
      ['可选：设置里填国内 API Key', 12, '步骤'],
      ['排错：下错国际版、登录、模型排队', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'install-lingma',
      title: '通义灵码安装：VS Code 国内插件',
      hook: '已有 VS Code？装通义灵码，阿里云登录，国内直连补全',
      outcome: 'VS Code 装好通义灵码并登录阿里云，补全/对话可用',
      category: '工具安装',
      level: '工具',
      desc: 'lingma.aliyun.com；扩展市场装插件；阿里云账号登录；国内模型。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['通义灵码擅长什么：VS Code 里国内直连 AI', 10, '图文'],
      ['准备：安装官方 VS Code', 12, '步骤'],
      ['扩展市场搜索安装通义灵码 / Qoder CN', 15, '步骤'],
      ['阿里云账号登录', 15, '步骤'],
      ['验证补全与智能问答', 15, '实操'],
      ['模型选择与排错', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'install-cc-switch',
      title: 'CC Switch 安装：国内中转 API Key 一键切换',
      hook: '要用 Claude Code/Codex 但不直连官方？用 CC Switch 填国内供应商 Key',
      outcome: '装好 CC Switch，会添加国内/合规供应商的 Base URL + API Key 并启用',
      category: '工具安装',
      level: '工具',
      desc: '先装好 CLI；再装 CC Switch；优先配可直连的国内 API 供应商，避免依赖翻墙。',
      source: '自有资料',
      hot: true,
      new: true,
    },
    [
      ['什么时候才需要 CC Switch（国内路径）', 10, '图文'],
      ['官网与 GitHub Releases 下载安装', 15, '步骤'],
      ['添加供应商：国内可直连的 Base URL + Key', 20, '实操'],
      ['启用到 Claude Code / Codex 并重启终端验证', 15, '实操'],
      ['安全：只信官方下载，Key 不外传', 10, '清单'],
    ],
  ),
  course(
    {
      id: 'cursor-install',
      title: 'Cursor 安装（可选·常需海外网络）',
      hook: '可选：Cursor 能力强，但国内常要稳定海外网络，不翻墙请先用 Trae',
      outcome: '在网络可达时装好 Cursor；否则跳过改用 Trae 国内版',
      category: '工具安装',
      level: '工具',
      desc: '网络提示在前；官网下载；登录；API Key；第一次改文件。',
      source: '自有资料',
      new: true,
    },
    [
      ['网络提示：国内直连可能不稳定，优先 Trae.cn', 10, '图文'],
      ['Cursor 擅长什么：多文件 Diff、Agent', 10, '图文'],
      ['官网 download 安装（网络可达时）', 18, '步骤'],
      ['账号登录与第一次改文件', 20, '实操'],
      ['配置 API Key / Base URL', 15, '步骤'],
      ['排错：打不开官网、登录失败 → 改用 Trae', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'install-claude-code',
      title: 'Claude Code 安装（可选·配合国内中转）',
      hook: '可选：终端强 Agent；官方登录常需海外网络，国内用 CC Switch + 中转 Key',
      outcome: '能安装 claude；用 CC Switch 配可直连供应商，不依赖翻墙官方站',
      category: '工具安装',
      level: '工具',
      desc: '网络说明；安装命令；国内路径用 CC Switch 填中转 API，少走官方 OAuth。',
      source: '自有资料',
      new: true,
    },
    [
      ['网络与账号：官方 Claude 登录 vs 国内中转 Key', 12, '图文'],
      ['擅长什么：仓库级终端任务', 8, '图文'],
      ['安装脚本（下载脚本若失败见排错）', 15, '步骤'],
      ['推荐：跳过官方登录，用 CC Switch 配国内 Key', 20, '实操'],
      ['验证与排错', 15, '清单'],
    ],
  ),
  course(
    {
      id: 'install-codex',
      title: 'OpenAI Codex 安装（可选·配合国内中转）',
      hook: '可选：OpenAI 系 CLI；官方站点常需海外网络，国内用中转 Key',
      outcome: '能安装 codex；用 CC Switch 配可直连 OpenAI 兼容接口',
      category: '工具安装',
      level: '工具',
      desc: '网络说明；安装；国内用兼容 Base URL + Key，不强调官方 ChatGPT 登录。',
      source: '自有资料',
      new: true,
    },
    [
      ['网络提示：platform.openai.com 可能打不开', 10, '图文'],
      ['安装 @openai/codex 或官方脚本', 15, '步骤'],
      ['用 CC Switch 配国内 OpenAI 兼容 Key', 20, '实操'],
      ['验证与排错', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'install-copilot',
      title: 'GitHub Copilot 安装（可选·常需海外网络）',
      hook: '可选：GitHub 补全；国内登录/订阅常不稳，优先通义灵码',
      outcome: '网络可达时完成安装；否则改用通义灵码',
      category: '工具安装',
      level: '工具',
      desc: '网络提示；VS Code 扩展；国内替代指向通义灵码。',
      source: '自有资料',
    },
    [
      ['网络提示：优先通义灵码', 10, '图文'],
      ['安装扩展与 GitHub 登录（网络可达时）', 18, '步骤'],
      ['验证与排错 / 改走灵码', 12, '清单'],
    ],
  ),
  course(
    {
      id: 'install-windsurf',
      title: 'Windsurf 安装（可选·常需海外网络）',
      hook: '可选：Cascade 很强，但国内网络不稳时请先用 Trae.cn',
      outcome: '网络可达再装；否则跳过',
      category: '工具安装',
      level: '工具',
      desc: '网络提示在前；安装登录简述；国内替代 Trae。',
      source: '自有资料',
    },
    [
      ['网络提示与国内替代', 10, '图文'],
      ['下载安装与 Cascade 验证（网络可达时）', 18, '步骤'],
      ['排错', 10, '清单'],
    ],
  ),

  // ——— 工具用法（装好之后） ———
  course(
    {
      id: 'cursor',
      title: 'Cursor 用法：从 Chat 到 Agent 改项目',
      hook: 'Cursor 已装好？这篇专讲用法，不再重复安装步骤',
      outcome: '独立用 Cursor 完成多文件改码、Rules 配置与 Agent 任务拆解',
      category: '工具用法',
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
      category: '工具用法',
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
      title: 'Claude Code 用法：仓库级任务与安全边界',
      hook: 'Claude Code 已装好？这篇讲怎么下指令、怎么控权限',
      outcome: '会写仓库级指令，知道何时批准危险操作',
      category: '工具用法',
      level: '工具',
      desc: '安装见「Claude Code 安装」专篇；本篇专注用法与安全。',
    },
    [
      ['和 Cursor 的分工：何时开终端 Agent', 10, '图文'],
      ['仓库级指令写法：范围 + 验收标准', 20, '实操'],
      ['plan 先确认再改代码', 15, '实操'],
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
      level: '精通',
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
      level: '精通',
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
      level: '精通',
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
      category: 'MCP与Agent',
      level: '精通',
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
      category: 'MCP与Agent',
      level: '精通',
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
      level: '精通',
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
      level: '精通',
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
      category: 'MCP与Agent',
      level: '精通',
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

  // ——— 进阶：前端 / JS · 小程序与 App ———
  course(
    {
      id: 'ai-build-website',
      title: '从一句话需求到可预览网页',
      hook: '客户明天要链接，今晚先出一版能打开的页面',
      outcome: '独立完成一个多区块网页：布局、文案、样式、本地预览',
      category: '前端 / JS',
      level: '作品',
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
      title: '落地页部署上线：拿到能分享的链接',
      hook: '页面做好了不够，还要有人点得开的地址',
      outcome: '落地页部署到 Vercel / Netlify / GitHub Pages，拿到可分享链接',
      category: '前端 / JS',
      level: '作品',
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
      title: '微信小程序三页骨架怎么生成',
      hook: '别从零画线框：首页、列表、详情一次铺开',
      outcome: '产出首页、列表、详情页结构与 wxml/wxss 草稿，可导入开发者工具',
      category: '小程序与 App',
      level: '作品',
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
      title: 'App 关键屏与流程说明稿',
      hook: '代码还没写，先把四个关键屏讲清楚',
      outcome: '信息架构、关键页 wireframe 描述、组件清单一次产出',
      category: '小程序与 App',
      level: '作品',
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
      title: '生图提示词：海报、封面怎么写才稳',
      hook: '出图老是「差不多」？把主体和风格写死',
      outcome: 'Midjourney / DALL·E / 国内生图工具各练通，能出可用图',
      category: 'AI生图',
      level: '作品',
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
      level: '作品',
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
      category: '安全与成本',
      level: '精通',
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
      category: '安全与成本',
      level: '精通',
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
  'tool-pick-compare',
  'install-trae',
  'install-lingma',
  'install-cc-switch',
  'cursor-install',
  'install-claude-code',
  'ai-download-guide',
  'prompt-basics',
  'ai-build-website',
  'cursor',
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
    title: '入门：从零下载与上手',
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
    title: '工具：装智能体 + 学用法',
    desc: '先装 Trae/灵码（不翻墙），海外工具可选；再学 Cursor 用法',
    count: 0,
    courseIds: [
      'tool-pick-compare',
      'install-trae',
      'install-lingma',
      'install-cc-switch',
      'cursor-install',
      'install-claude-code',
      'install-codex',
      'install-copilot',
      'install-windsurf',
      'cursor',
      'cursor-rules',
      'claude-code',
    ],
  },
  {
    id: 'path-advanced',
    title: '作品：用 AI 做出真实成品',
    desc: '网页、落地页、小程序、App 界面、生图与品牌视觉',
    count: 0,
    courseIds: [
      'ai-build-website',
      'ai-landing-page',
      'ai-build-miniprogram',
      'ai-build-app',
      'ai-image-gen',
      'ai-image-brand',
    ],
  },
  {
    id: 'path-master',
    title: '精通：接 API、玩 Agent、控成本',
    desc: 'OpenAI API、MCP、RAG、Agent 工具调用、成本与幻觉',
    count: 0,
    courseIds: [
      'api-openai',
      'domain-api-cheatsheet',
      'api-compatible',
      'mcp-intro',
      'mcp-install',
      'prompt-system',
      'rag-basics',
      'agent-tools',
      'cost-control',
      'hallucination-defense',
    ],
  },
].map((p) => ({ ...p, count: p.courseIds.length }))
