/** 教程正文：可跟做的完整步骤与示例（非大纲） */

export type TeachSection = {
  title: string
  paragraphs: string[]
  steps?: string[]
  tip?: string
  links?: Array<{ label: string; url: string }>
}

export type TutorialBody = {
  intro: string[]
  sections: TeachSection[]
  checklist: string[]
  refs?: Array<{ label: string; url: string }>
}

export const TUTORIAL_BODIES: Record<string, TutorialBody> = {
  'ai-what-is': {
    intro: [
      '大模型（LLM）不是「更聪明的百度」。它擅长根据你给的文字上下文，续写、改写、归纳、翻译、写代码草稿；不擅长保证事实永远正确，也不擅长替你执行真实世界里的操作（除非你额外接了工具）。',
      '本教程帮你在 10 分钟内建立正确预期：四种常见用法各适合什么场景，以及免费版/付费版、浏览器/客户端怎么选。',
    ],
    sections: [
      {
        title: 'AI 擅长什么、不擅长什么',
        paragraphs: [
          '擅长：把模糊想法变成结构化文字（邮件、大纲、表格描述）；把已有材料改写成另一种语气或格式；根据报错和代码片段给修改建议；按描述生成图片草稿。',
          '不擅长：保证最新新闻/股价/政策（训练数据有截止日期）；精确心算大数；访问你电脑里没告诉它的文件；代替你承担法律/医疗/财务决策责任。',
          '正确用法是「AI 起草 + 人工复核」。涉及数字、人名、日期、法规、代码上线，必须自己核对一遍。',
        ],
        tip: '把 AI 当实习生：写得快，但重要结论你要签字。',
      },
      {
        title: '四种常见用法对照',
        paragraphs: [
          '对话问答：解释概念、头脑风暴、学习辅导。工具：ChatGPT、Claude、Kimi、通义千问、豆包等聊天界面。',
          '写文办公：邮件、纪要、PPT 大纲、调研摘要。关键：说清收件人、语气、长度、格式。',
          '改代码：Cursor、VS Code + Copilot、Claude Code。关键：贴报错、说明技术栈版本、小步修改。',
          '生图：Midjourney、DALL·E、Stable Diffusion、国内即梦/通义万相等。关键：主体 + 风格 + 光线 + 构图写清楚。',
        ],
        steps: [
          '列出你本周 3 个真实任务（例如：写周报、改 landing 文案、做一张海报）。',
          '每个任务标注属于：对话 / 写文 / 改代码 / 生图 哪一类。',
          '若任务需要读本地项目文件或跑命令，不要只用浏览器聊天——应选 Cursor 等编程工具。',
          '若任务需要可分享链接的网页，光聊天不够，还要会部署（见进阶教程）。',
        ],
      },
      {
        title: '浏览器 vs 客户端 vs 编程 IDE',
        paragraphs: [
          '只用浏览器：打开 chatgpt.com、claude.ai 或国内产品网页即可，零安装，适合纯文字任务。',
          '官方客户端（Windows .exe / Mac .dmg）：从官网下载，体验更稳定，支持系统级快捷键、部分产品支持离线缓存或语音。',
          '编程 IDE（Cursor）：在写代码、改多文件、跑终端命令时必须用，Chat 面板只是其中一块。',
        ],
        links: [
          { label: 'ChatGPT 下载', url: 'https://chatgpt.com/download' },
          { label: 'Claude 下载', url: 'https://claude.com/download' },
          { label: 'Cursor 官网', url: 'https://cursor.com' },
        ],
      },
      {
        title: '免费版与付费版怎么判断',
        paragraphs: [
          '免费版通常：慢模型、有每日/每月额度、高峰期限流、部分功能不可用（如 GPT-4o 全量、Claude Sonnet 长上下文）。',
          '值得付费的信号：你每天 >30 分钟依赖 AI 办公；需要更强推理或更长上下文；编程 Agent 频繁改仓库。',
          '不必一上来买最贵档：先用免费版跑通工作流，确认「哪类任务必须升级」再付费。',
        ],
        steps: [
          '连续 3 天记录：哪些问题免费版答得好，哪些明显不够（太慢、太短、经常拒答）。',
          '对比官网 Pricing 页：看是否包含你需要的模型名（如 GPT-4o、Claude Sonnet）。',
          '企业/团队先问 IT：是否允许数据上公有云，再决定个人付费还是企业合约。',
        ],
      },
      {
        title: '国内可用 vs 海外工具选型',
        paragraphs: [
          '海外：ChatGPT、Claude、Gemini——能力前沿，需稳定网络与海外支付方式（部分支持）。',
          '国内：Kimi、通义、豆包、智谱等——中文与本土合规更友好，注册多为手机号。',
          '编程场景：Cursor 本身可配多种模型；国内也可评估 Trae、通义灵码等。',
          '没有「唯一正确答案」：按网络、预算、任务类型组合使用即可。',
        ],
        tip: '同一任务可以两个工具各问一遍，对比后再定主力工具。',
      },
    ],
    checklist: [
      '能说出 AI 擅长与不擅长的各 2 条',
      '给自己的 3 个任务标了用法类型',
      '知道浏览器、客户端、IDE 分别何时用',
      '看过至少一个产品的免费/付费差异',
    ],
    refs: [
      { label: 'OpenAI 产品说明', url: 'https://openai.com/chatgpt' },
      { label: 'Anthropic Claude', url: 'https://www.anthropic.com/claude' },
    ],
  },

  'ai-download-guide': {
    intro: [
      '这篇是给「电脑会开浏览器、但从没装过 AI」的人写的。每一步都写清：打开哪个网址、点哪个按钮、成功时屏幕上会出现什么。',
      '铁律：地址栏自己输入或从本页复制官方链接；不要搜「ChatGPT 破解版」「Cursor 绿色版」。假网站会骗账号和钱。',
      '建议顺序：① 先用浏览器打开一个国内 AI 能聊天 → ② 再决定要不要装客户端 → ③ 要写代码再装 Cursor。',
    ],
    sections: [
      {
        title: '第 0 步：确认电脑系统（1 分钟）',
        paragraphs: [
          'Windows：键盘按 Win 键（键盘左下角有窗户图标）+ R，弹出小框，输入 winver 后回车。应看到「Windows 10」或「Windows 11」。64 位即可，几乎所有家用电脑都是。',
          'Mac：屏幕左上角点苹果图标 →「关于本机」。记下是「芯片 Apple M…」还是「Intel」，后面下载不用你自己挑，官网一般会给对的包。',
          '手机也能用 AI，但本教程以电脑为主；手机装 App 见后面「国内常用」一节。',
        ],
        steps: [
          '打开记事本，写下：我的系统是 Windows __ / macOS __。',
          '浏览器建议用 Chrome、Edge 或 Safari 最新版；太旧的 IE 不要用。',
          '准备能收短信的手机（国内产品注册要用）。',
        ],
      },
      {
        title: '先选路线：浏览器就够 vs 还要装软件',
        paragraphs: [
          '路线 A（推荐新手第一天）：只开网页。不装任何东西也能用。国内：豆包 / Kimi / 通义；海外：ChatGPT / Claude（需能访问对应网站）。',
          '路线 B：装「官方桌面客户端」。有独立窗口、快捷键，适合每天用很久。必须从官网下载页进。',
          '路线 C：装 Cursor（编程用编辑器）。只有你要改代码、做网页/小程序时才需要；可以第二天再装。',
        ],
        tip: '今天目标只要做到：网页里能登录，并发出一条消息收到回复。客户端可以明天再装。',
        links: [
          { label: '豆包网页版（国内好上手）', url: 'https://www.doubao.com/chat/' },
          { label: 'Kimi 网页版', url: 'https://kimi.moonshot.cn/' },
          { label: '通义千问网页版', url: 'https://tongyi.aliyun.com/' },
          { label: 'ChatGPT 网页版', url: 'https://chatgpt.com/' },
          { label: 'Claude 网页版', url: 'https://claude.ai/' },
        ],
      },
      {
        title: '跟做 A：10 分钟用浏览器跑通（国内产品）',
        paragraphs: [
          '下面以豆包为例（字节出品，手机号即可）。Kimi、通义步骤几乎一样，只是网址不同。',
          '① 打开浏览器，在地址栏（最上方白条）粘贴：https://www.doubao.com/chat/ 然后回车。',
          '② 页面右上角或中间找到「登录」按钮，用鼠标点一下。',
          '③ 选「手机号登录」：输入你的手机号 → 点「获取验证码」→ 看手机短信 → 把 4～6 位数字填进去 → 点登录/同意协议。',
          '④ 登录成功后，页面中间会出现一个大输入框（像聊天软件底部那样）。点进去，输入：你好，请用一句话介绍你自己。然后按回车或点发送。',
          '⑤ 成功标准：几秒内下方出现一段 AI 回复文字。出现了，说明你已经「会用 AI」了。',
        ],
        steps: [
          '地址栏粘贴 https://www.doubao.com/chat/ 并回车（不要用百度结果页里乱七八糟的广告链）。',
          '完成手机号 + 短信验证码登录；勾选用户协议（必勾才能继续）。',
          '发出测试句「你好，请用一句话介绍你自己」，等到完整回复。',
          '浏览器左上角「☆ 收藏」或 Ctrl+D，把这一页存成书签，名字改成「豆包-官方」。',
          '再试一次 Kimi：地址栏打开 https://kimi.moonshot.cn/ ，同样登录并发一句「用三条 bullet 说明你能帮我做什么」。',
        ],
        tip: '验证码收不到：等 60 秒再点重发；看短信垃圾箱；确认手机号没写错；换 Wi‑Fi / 开流量再试。',
        links: [
          { label: '豆包对话页', url: 'https://www.doubao.com/chat/' },
          { label: 'Kimi 官网', url: 'https://kimi.moonshot.cn/' },
          { label: '通义千问', url: 'https://tongyi.aliyun.com/' },
          { label: '智谱清言', url: 'https://chatglm.cn/' },
        ],
      },
      {
        title: '跟做 B：Windows 装 ChatGPT 桌面版（可选）',
        paragraphs: [
          '前提：你已经能打开 https://chatgpt.com/ 并登录（不会登录见「账号注册」教程）。若打不开该网站，先跳过本节，继续用国内网页版。',
          '① 地址栏输入并打开：https://chatgpt.com/download （中文页也可用 https://chatgpt.com/zh/download/ ）。',
          '② 在「桌面版」区域找到 Windows，用鼠标点下载/获取。很多情况下会跳到「Microsoft Store（微软应用商店）」——这是官方路径，不是山寨。',
          '③ 若跳进微软商店：确认发布者是 OpenAI，再点「获取」或「安装」，等进度条走完。',
          '④ 安装结束：按键盘 Win 键，在开始菜单搜索「ChatGPT」，点开图标。',
          '⑤ 点 Log in / 登录，用和网页版同一个账号（Google / Microsoft / 邮箱要选同一种方式，换方式会变成另一个空账号）。',
          '⑥ 成功标准：出现聊天输入框，能发出「ping」并收到回复。',
        ],
        steps: [
          '打开 https://chatgpt.com/download ，只点页面上的 Windows 官方入口。',
          '若出现 SmartScreen「已保护你的电脑」：点「更多信息」→「仍要运行」（仅限你刚从 chatgpt.com 下的包）。',
          '开始菜单能搜到 ChatGPT；登录后发一句测试消息。',
          '失败时：关掉公司代理试一次；或改用网页版 https://chatgpt.com/ ，功能一样能聊天。',
        ],
        links: [
          { label: 'ChatGPT 官方下载页', url: 'https://chatgpt.com/download' },
          { label: 'ChatGPT 中文下载页', url: 'https://chatgpt.com/zh/download/' },
          { label: 'OpenAI 帮助：Windows 应用', url: 'https://help.openai.com/zh-hans-cn/articles/9982051-using-the-chatgpt-windows-app' },
        ],
      },
      {
        title: '跟做 C：Windows / Mac 装 Claude（可选）',
        paragraphs: [
          '① 打开 https://claude.com/download （或从 https://claude.ai 进站点找 Download）。',
          '② Windows：下载 .exe → 双击 → 一直「下一步/Install」→ 完成后从开始菜单打开 Claude。',
          '③ Mac：下载 .dmg → 双击打开小窗口 → 把 Claude 图标拖进右侧「Applications（应用程序）」文件夹 → 打开启动台点 Claude。',
          '④ 首次 Mac 若提示无法打开：系统设置 → 隐私与安全性 → 拉到下面点「仍要打开」。',
          '⑤ 登录用 https://claude.ai 同一套账号。成功标准同上：能发消息收到回复。',
        ],
        steps: [
          '确认下载域名是 claude.com，文件来自官方。',
          '装完登录，发送：用中文写一句今日待办示例。',
          '装不上就用网页 https://claude.ai/ ，先保证会聊天。',
        ],
        links: [
          { label: 'Claude 下载', url: 'https://claude.com/download' },
          { label: 'Claude 网页版', url: 'https://claude.ai/' },
        ],
      },
      {
        title: '跟做 D：Mac 装 ChatGPT（可选）',
        paragraphs: [
          '打开 https://chatgpt.com/download → 选 macOS。注意：部分新桌面能力要求 Apple 芯片（M1 及以上）与较新的 macOS，页面上会有说明；若你的是很老的 Intel Mac，优先用网页版即可。',
          '下载得到 .dmg → 双击 → 把 ChatGPT 拖进「应用程序」→ 启动台打开 → 登录。',
          '若提示「来自身份不明的开发者」：系统设置 → 隐私与安全性 → 仍要打开。',
        ],
        steps: [
          '苹果菜单 → 关于本机，确认系统版本。',
          '只从 chatgpt.com/download 下载，不用百度网盘分享包。',
          '登录后 Alt/Option 相关快捷键以 App 内说明为准；先保证能打字聊天。',
        ],
      },
      {
        title: '国内产品：手机 App 怎么装（认准开发者）',
        paragraphs: [
          '苹果：打开 App Store，搜索「豆包」「Kimi」「通义」「清言」，看开发者是否为字节跳动 / 月之暗面 / 阿里巴巴 / 智谱等，再点获取。',
          '安卓：用手机自带应用商店（华为、小米、应用宝等）搜索同名，不要点短信里的陌生下载链接。',
          '电脑网页和手机 App 用同一个手机号登录，历史通常能同步（以各产品说明为准）。',
        ],
        steps: [
          '手机只装 1 个你最常用的 App，避免一次装四个却都不用。',
          '打开 App → 允许通知（可稍后）→ 登录 → 发一句「帮我列明天早上三件待办」。',
          '把电脑浏览器书签和手机 App 都固定好，以后不要重新搜索。',
        ],
      },
      {
        title: '跟做 E：安装 Cursor（要写代码再装）',
        paragraphs: [
          'Cursor 不是聊天网页，是「带 AI 的代码编辑器」。不会写代码也可以装，但请先完成上面的网页聊天。',
          '① 先注册（可选但推荐）：打开 https://cursor.com 点 Sign up / 免费注册。',
          '② 打开官方下载页：https://cursor.com/download',
          '③ Windows：点 Download for Windows，得到安装包（通常在「下载」文件夹）。双击运行；个人电脑选默认/User 安装即可，一路 Next。',
          '④ 若弹出蓝色「Windows 已保护你的电脑」：点「更多信息」→「仍要运行」。前提：你确定是刚从 cursor.com 下的。',
          '⑤ Mac：下载 .dmg → 拖到应用程序 → 打开。',
          '⑥ 打开 Cursor → Sign in（可用 Google / GitHub / 邮箱）→ 不要点 Skip。',
          '⑦ 菜单 File → Open Folder（打开文件夹）→ 新建一个空文件夹例如「我的AI练习」再打开它。',
          '⑧ 成功标准：左边能看到文件夹名字，按 Ctrl+L（Mac 用 Cmd+L）能打开 AI 对话框。更细的跟做见「Cursor 安装」专篇。',
        ],
        steps: [
          '只从 https://cursor.com/download 下载。',
          '安装并登录，不要跳过登录。',
          'File → Open Folder 打开一个你自己新建的空文件夹。',
          '按 Ctrl+L（Mac：Cmd+L）确认 AI 面板能打开。',
        ],
        links: [
          { label: 'Cursor 下载（唯一推荐）', url: 'https://cursor.com/download' },
          { label: 'Cursor 官方安装说明', url: 'https://cursor.com/help/getting-started/install' },
        ],
      },
      {
        title: '装不上？对照这张排错表',
        paragraphs: [
          '网页一直转圈 / 打不开：换手机热点试；公司网可能拦截；海外站点需合规可用的网络环境。',
          '下载速度为 0：换浏览器；关下载工具劫持；不要用「迅雷广告页」里的假按钮。',
          '安装到一半失败：磁盘空间是否不足（至少留 2GB）；杀毒软件是否隔离了安装包——可临时允许后再装。',
          '能打开但登录失败：检查验证码；换「无痕窗口」；确认选对了登录方式（Google 和邮箱不是同一个号）。',
          '怀疑下到假软件：看浏览器地址栏是否真是 chatgpt.com / claude.com / cursor.com / doubao.com 等；有就删掉安装包重来。',
        ],
        steps: [
          '把报错原文（或截图里的英文句子）复制下来。',
          '先完成「国内网页版能聊天」再折腾客户端。',
          '仍不行：换一台电脑或手机浏览器验证是不是本机问题。',
        ],
        tip: '新手最稳路径：豆包或 Kimi 网页版跑通 → 再装 Cursor。ChatGPT/Claude 打不开就先跳过，不影响学提示词和国内工具。',
      },
      {
        title: '装完自检 + 桌面整理',
        paragraphs: [
          '自检三问：① 能登录吗？② 能发出消息并收到回复吗？③ 下次不用搜索，靠书签/开始菜单就能打开吗？',
          '整理：浏览器书签栏固定「豆包」「Kimi」「通义」；开始菜单把 ChatGPT/Cursor 固定到任务栏（右键图标 → 固定到任务栏）。',
          '把本页官方链接再收藏一次，避免以后被假「下载站」骗。',
        ],
        steps: [
          '在记事本写：我今天用的是【产品名】，登录方式是【手机号/邮箱/Google】。',
          '删除所有来路不明的安装包。',
          '打开下一篇：「账号注册与基础设置」或「第一次有效对话」。',
        ],
      },
    ],
    checklist: [
      '会看自己是 Windows 还是 Mac',
      '至少一个国内官网（豆包/Kimi/通义）能登录并发消息',
      '浏览器已收藏官方地址，不再靠搜索点广告',
      '（可选）ChatGPT/Claude 客户端或网页能用',
      '（可选）Cursor 从 cursor.com/download 安装并登录',
      '没下载任何「破解版」「绿色版」',
    ],
    refs: [
      { label: 'ChatGPT 下载', url: 'https://chatgpt.com/download' },
      { label: 'Claude 下载', url: 'https://claude.com/download' },
      { label: 'Cursor 下载', url: 'https://cursor.com/download' },
      { label: '豆包', url: 'https://www.doubao.com/chat/' },
      { label: 'Kimi', url: 'https://kimi.moonshot.cn/' },
      { label: '通义千问', url: 'https://tongyi.aliyun.com/' },
    ],
  },

  'ai-account-setup': {
    intro: [
      '没有账号，页面上所有按钮都点不动。这一篇按「小白第一次注册」写：点哪里、填什么、邮件在哪找、失败怎么办。',
      '你只要先搞定 1 个国内账号（手机号）就能学后面全部内容；ChatGPT/Claude 能注册再加，不能注册先跳过。',
    ],
    sections: [
      {
        title: '注册前准备（对照打勾）',
        paragraphs: [
          '国内产品：一部能收短信的手机（运营商正常即可）。',
          '海外产品：一个能登录的邮箱（QQ 邮箱 / 163 / Outlook / Gmail 均可；要能打开收件箱）。',
          '密码：准备一串你能记住、且别的网站没用过的密码；写在密码本或手机备忘录（别发到微信群）。',
          '今天先不付钱也能学：免费额度够练提示词。付费卡以后再说。',
        ],
        steps: [
          '拿出手机，确认能收到短信（可让家人发一条测试）。',
          '打开邮箱网页，确认能登录收件箱（不是只装了邮箱 App 却登不进去）。',
          '在备忘录新建笔记标题「我的 AI 账号」，后面每注册一个就记一行。',
        ],
      },
      {
        title: '国内：用手机号注册豆包（逐步点击）',
        paragraphs: [
          '① 电脑浏览器打开：https://www.doubao.com/chat/',
          '② 点「登录」。若已是登录态，右上角会有头像——可先点退出再走一遍注册，熟悉流程。',
          '③ 选择手机号方式：输入 11 位手机号 → 点「发送验证码」→ 手机短信一般 10～60 秒内到达。',
          '④ 把短信里的数字填进网页 → 勾选「已阅读用户协议/隐私政策」→ 点登录或进入。',
          '⑤ 成功：页面出现聊天输入框，左侧可能有「新对话」历史列表。',
          '⑥ 打开备忘录写：豆包 | 手机号尾号 XXXX | 日期。不要写验证码（验证码一次性）。',
        ],
        steps: [
          '完成豆包登录，并成功发出任意一句话。',
          '点开头像或「设置/个人中心」（位置因改版可能在右上角），找有没有「账号与安全」。',
          '同样方法再登录一次 Kimi：https://kimi.moonshot.cn/ （可同一个手机号）。',
        ],
        tip: '一个手机号通常可注册多个产品；不要把验证码告诉任何人，客服也不会先向你要验证码。',
        links: [
          { label: '豆包', url: 'https://www.doubao.com/chat/' },
          { label: 'Kimi', url: 'https://kimi.moonshot.cn/' },
          { label: '通义（可用淘宝/支付宝账号）', url: 'https://tongyi.aliyun.com/' },
          { label: '智谱清言', url: 'https://chatglm.cn/' },
        ],
      },
      {
        title: '通义千问：淘宝/支付宝号怎么登',
        paragraphs: [
          '打开 https://tongyi.aliyun.com/ → 点登录。',
          '常见选项：支付宝扫码、淘宝账号、手机号。有淘宝的人：选淘宝/阿里账号，按页面扫码最省事。',
          '第一次会要求同意协议；同意后进入对话页。',
          '成功标准：能新建对话并收到回复。手机 App 在应用商店搜「通义」，开发者认准阿里巴巴。',
        ],
        steps: [
          '完成通义网页登录一次。',
          '备忘录追加一行：通义 | 淘宝/支付宝/手机号 | 日期。',
        ],
      },
      {
        title: '海外：ChatGPT 注册（能打开网站再做）',
        paragraphs: [
          '① 打开 https://chatgpt.com/ ，点 Sign up / 免费注册（可选 Log in 若已有号）。',
          '② 推荐「Continue with Google」或「Continue with Microsoft」：点按钮 → 选你的 Google/微软账号 → 允许。这样不用另记一套密码。',
          '③ 若用邮箱：输入邮箱 → 去邮箱收件箱找 OpenAI / ChatGPT 验证信（也看「垃圾邮件」）→ 点信里的链接 → 设密码。',
          '④ 若要求手机验证：选国家区号 +86，填手机号收短信。收不到就换网络或过几分钟重试。',
          '⑤ 成功：进入聊天主界面，左侧有 New chat。',
          '⑥ 重要：以后登录必须用同一种方式。用 Google 注册的，就继续点 Google，不要改点「邮箱密码」否则会变成另一个空号，看起来像「会员丢了」。',
        ],
        steps: [
          '注册或登录成功，发出测试句 Hello。',
          '点左下角头像（或侧面菜单）→ Settings（设置）。',
          '找到 Data controls / 数据控制一类菜单，看「Improve the model」是否开启；含公司机密则按公司要求关闭。',
          '备忘录写：ChatGPT | 登录方式 Google/微软/邮箱 | 邮箱地址。',
        ],
        links: [
          { label: 'ChatGPT', url: 'https://chatgpt.com/' },
          { label: 'OpenAI 帮助中心', url: 'https://help.openai.com/' },
        ],
      },
      {
        title: '海外：Claude 注册',
        paragraphs: [
          '① 打开 https://claude.ai/ → Sign up。',
          '② 可用 Google 或邮箱。验证邮件发件域名与 Anthropic / Claude 相关，点链接激活。',
          '③ 登录后左下角进入 Settings，同样先看隐私与通知相关项。',
          '打不开网站：跳过，不影响你用国内工具学完整站教程。',
        ],
        steps: [
          '能打开则完成注册并发一句中文测试。',
          '备忘录写：Claude | 登录方式 | 日期。',
        ],
        links: [{ label: 'Claude', url: 'https://claude.ai/' }],
      },
      {
        title: '隐私：三分钟必做设置',
        paragraphs: [
          '你要会三件事：① 删掉一条聊坏的对话 ② 找到设置入口 ③ 知道别把密码、身份证号、银行卡号贴进对话框。',
          '删除对话：在左侧历史列表，点某条对话旁的 「…」或右键 → Delete / 删除；刷新后应消失。',
          '训练数据开关：名称可能是「用于改进模型」「Improve the model for everyone」等——公司代码、客户名单场景建议关。',
          '通知：营销邮件可在设置里退订；安全类邮件保留。',
        ],
        steps: [
          '故意新建一个对话，标题随便，再按上面方法删掉它。',
          '打开 Settings 截图（可打码邮箱）保存到自己电脑，方便以后找回入口。',
          '在备忘录加一条规矩：不向 AI 发送密码和验证码。',
        ],
        tip: '公共电脑用完：点退出登录，并关掉浏览器。不要点「记住密码」在网吧电脑上。',
      },
      {
        title: '登录失败常见原因（按顺序试）',
        paragraphs: [
          '1）验证码填错或过期 → 重新获取，注意大小写与空格。',
          '2）邮件在垃圾箱 → 搜索 OpenAI / Anthropic / ChatGPT。',
          '3）登录方式不一致 → 试另一个按钮（Google vs 邮箱）。',
          '4）页面一直转圈 → 无痕窗口 Ctrl+Shift+N（Mac：Cmd+Shift+N）；或换浏览器。',
          '5）提示地区/网络不可用 → 换网络环境；不要去买来路不明的「成品号」。',
          '6）怀疑账号被盗 → 改邮箱密码；在官网找 Support / 帮助提交工单。',
        ],
        steps: [
          '把完整报错英文/中文抄到备忘录。',
          '用无痕窗口重试一次。',
          '仍失败：先保证国内手机号产品可用，再回头处理海外账号。',
        ],
      },
    ],
    checklist: [
      '至少一个国内 AI 用手机号登录成功',
      '备忘录里记下了产品名 + 登录方式',
      '会删除一条对话',
      '知道不把密码/验证码发给 AI',
      '（可选）ChatGPT 或 Claude 注册成功且登录方式已记录',
    ],
  },

  'ai-first-chat': {
    intro: [
      '假设你已经能打开豆包/Kimi/ChatGPT 其中任意一个。这一篇带你完成「第一次真正有用的对话」：不是问天气，而是拿到能粘贴进邮件的一段文字。',
      '全程大约 15～20 分钟。请边看边在电脑上点，不要只读。',
    ],
    sections: [
      {
        title: '打开正确页面，点「新对话」',
        paragraphs: [
          '任选一个已登录的产品打开：豆包 https://www.doubao.com/chat/ ；Kimi https://kimi.moonshot.cn/ ；ChatGPT https://chatgpt.com/ 。',
          '看页面左边：通常有「新对话」「New chat」或「+」。点它。中间应变成空白，底部只有一个输入框。',
          '如果你点进的是昨天的旧对话，AI 会带着旧上下文胡乱联想——新手练习一定要新开。',
          '模型选择：若顶部/输入框上方有「模型」「Max」「标准」等，新手选默认或「标准/快速」即可，不必追最贵模型。',
        ],
        steps: [
          '打开产品 → 确认右上角已登录（有头像）。',
          '点「新对话」，确认中间是空的。',
          '用鼠标点一下底部输入框，看到光标闪烁，说明可以打字了。',
        ],
      },
      {
        title: '千万别只发三个字',
        paragraphs: [
          '反例（效果差）：「写周报」「帮我写邮件」「怎么样」。',
          '正例必须包含：你是谁、要干什么、给谁看、什么格式、多长。',
          '下面整段请直接全选复制，把【括号】改成你的真实情况，再粘贴到输入框发送：',
          '「我是【岗位，例如行政专员】。本周实际完成：1）【事1】2）【事2】3）【事3】。请写一封给直属领导的周报邮件正文。语气专业简洁。必须分成三个小标题：本周完成、下周计划、需要支持。每个小标题下 2～3 个短句。全文不超过 300 字。用中文。不要写主题行以外的客套长段落。」',
        ],
        steps: [
          '把上面模板粘贴进输入框，改掉所有【】。',
          '点发送或按回车（有的产品 Shift+回车才是换行，回车是发送——发错了再新开一句话说明即可）。',
          '等待左侧/下方出现完整回复；滚动看是否有三个小标题。',
          '若只有一行废话：说明你的【】没改具体，把三件实事写得更具体再发一次。',
        ],
        tip: '第一次就写清格式，比生成后再说「改短一点」省很多轮。',
      },
      {
        title: '第二轮、第三轮怎么追问（照抄）',
        paragraphs: [
          'AI 第一版往往偏长或偏空。不要重开话题，直接在同一对话继续打字。',
          '第二轮（只改结构）复制发送：「把『下周计划』改成 Markdown 表格，两列：事项、截止日期。其他部分保持不变。」',
          '第三轮（定稿）复制发送：「输出最终版，我要直接粘贴进邮件正文。不要解释你改了什么。标题第一行写：周报 - 【你的名字】 - 【今天日期】。」',
        ],
        steps: [
          '发送第二轮，确认出现表格。',
          '发送第三轮，确认开头有标题行。',
          '用眼睛检查：有没有编造你没提过的业绩数字？有就删掉或改成真实数字。',
          '在回复区域划选全文 → Ctrl+C 复制 → 打开电脑「记事本」→ Ctrl+V 粘贴。能粘贴成功就算通关。',
        ],
      },
      {
        title: '给对话起名字，下次才找得到',
        paragraphs: [
          '左侧历史里会自动出现一句摘要标题，可能很乱。',
          '点标题或 「…」菜单，选重命名 / Rename，改成：练习-周报-2026-07-18（改成你的日期）。',
          'ChatGPT 的 Share 会生成链接：练习可以，但不要把含公司数据的对话公开分享。',
        ],
        steps: [
          '把本次对话重命名。',
          '退出再重新打开网站，从左侧点进这条，确认还在。',
          '再新建一个对话，问完全无关的问题，体会「新对话」与「旧对话」的区别。',
        ],
      },
      {
        title: '试一次上传文件（有 📎 再做）',
        paragraphs: [
          '输入框旁若有回形针/「上传」：点它 → 选一个不涉密的 PDF 或图片（例如公开说明书一页）。',
          '上传后输入：「请根据附件用 5 条中文要点总结，每条不超过 30 字。附件没有的信息请写『未知』。」',
          '没有上传按钮：跳过本节，不影响你学会提问。',
        ],
        steps: [
          '完成一次附件总结，或确认当前产品暂无上传。',
          '记住：合同、身份证、未公开财报不要上传公共 AI。',
        ],
      },
      {
        title: '报错时按这张表处理',
        paragraphs: [
          '一直转圈：刷新页面（F5）；换网络；看右上角是否掉登录。',
          '提示额度用尽 / limit：换「更快/轻量」模型，或明天再试，或换另一个国内产品继续练。',
          '回复到一半断了：发送「请从断开的地方继续，不要重复已写部分」。',
          '答非所问：新开对话，把需求再写一遍，并加一句「只输出结果，不要前言」。',
        ],
        steps: [
          '遇到报错先截图，把原文保留。',
          '用「新对话 + 完整模板」再试一次，排除旧上下文干扰。',
        ],
      },
    ],
    checklist: [
      '新开对话（不是旧对话）',
      '用「背景+任务+格式」模板发出第一条',
      '追问至少两轮并得到可粘贴进记事本的终稿',
      '对话已重命名',
      '人工核对过数字与事实',
    ],
  },

  'prompt-basics': {
    intro: [
      '提示词四段式：角色 → 任务 → 约束 → 格式。四个部分齐全，同一任务输出质量通常立刻上一个台阶。',
      '下面每个部分都有可复制模板，建议先照抄改括号，再练 10 题改写。',
    ],
    sections: [
      {
        title: '坏提示 vs 好提示',
        paragraphs: [
          '坏：「写个产品介绍。」—— 无受众、无长度、无结构，模型只能瞎编通用废话。',
          '好：「你是 B2B SaaS 文案。任务：为『库存管理系统』写 150 字产品介绍，受众是中小电商老板。约束：不用夸张词、不提未证实数据。格式：标题一行 + 正文一段 + 3 个 bullet 卖点。」',
          '差别：好提示把验收标准写死了，你可以对照检查每一条是否满足。',
        ],
      },
      {
        title: '四段式拆解',
        paragraphs: [
          '① 角色：你是谁 / AI 扮演谁 — 「你是资深 HR，熟悉中国互联网劳动法规表述」',
          '② 任务：要做什么 — 「把下面会议记录整理成待办清单」',
          '③ 约束：边界与禁止 — 「不确定的人名标 [待确认]；不要编造截止日期；不超过 400 字」',
          '④ 格式：输出长什么样 — 「Markdown 表格，列：事项|负责人|截止日期|优先级」',
        ],
        steps: [
          '任选一个真实任务（邮件/摘要/翻译/提纲）。',
          '用四段式各写 1–2 句，拼成一条完整 prompt。',
          '发送后对照格式逐项打勾是否满足。',
          '缺哪项就补哪项，再发一次对比差异。',
        ],
      },
      {
        title: '可复制模板：办公邮件',
        paragraphs: ['把下面整段复制到 ChatGPT/Claude，只改【】内容：'],
        steps: [
          '「【角色】你是【公司/部门】的【职位】，写作风格【正式/友好/简洁】。',
          '【任务】写一封邮件给【收件人身份】，目的是【催进度/感谢/说明变更/拒绝请求】。',
          '【约束】事实依据：【粘贴关键事实】。不要承诺未确认的时间；敏感信息用【XXX】代替；字数【200-300】。',
          '【格式】主题行一行；正文分【2-3】段；结尾署名【你的名字】。直接输出可发送的正文，不要解释。」',
        ],
      },
      {
        title: '可复制模板：学习笔记与 JSON 输出',
        paragraphs: [
          '学习笔记四段式示例：',
          '「角色：你是【学科】助教。任务：解释【概念名】给有【基础】的初学者。约束：用生活类比 1 个；不超出【教材章节】范围；不知道就说不知道。格式：定义 1 句 + 类比 1 段 + 3 个 exam-style 自测题（含答案折叠提示）。」',
          '锁 JSON 格式示例：',
          '「……格式：只输出合法 JSON，不要 markdown 代码块。Schema：{"title":string,"items":[{"name":string,"done":boolean}]}」',
        ],
        tip: '要求 JSON 时加一句「若无法合规则输出 {"error":"reason"}」方便程序解析。',
      },
      {
        title: '减少胡编与上下文长度',
        paragraphs: [
          '加约束：「仅根据我提供的材料回答；材料未提及的内容回答『原文未说明』。」',
          '长文不要全文粘贴：先「请把下文总结为 500 字摘要，保留专有名词」，再在摘要上提问。',
          '稳定规则应写入 Cursor Rules 或 System Prompt，而不是每条消息重复。',
        ],
        steps: [
          '给一条含「不知道就说不知道」的约束，问一个材料里不存在的事实，看是否拒答。',
          '同一任务试「无格式」vs「四段式」，记录哪个更省追问轮数。',
          '把最顺手的 3 条 prompt 存到笔记软件「模板」分类。',
        ],
      },
      {
        title: '改写练习方向（自测 10 题）',
        paragraphs: [
          '把下列坏提示改写成四段式（各练 1 题）：订餐厅邮件、活动复盘、Python 报错解释、旅游 3 日行程、产品 FAQ、翻译技术文档一段、会议纪要、给老板的项目风险说明、小红书文案、SQL 查询描述。',
          '标准：每条包含角色/任务/约束/格式；格式里能明确验收（字数、列名、语气词禁用等）。',
        ],
      },
    ],
    checklist: [
      '能背诵四段式四个部分名称',
      '至少用过 2 个可复制模板并改过【】',
      '试过 JSON 或表格格式锁定',
      '加过「不知道就说不知道」并验证有效',
      '收藏了 3 条个人常用模板',
    ],
  },

  'api-keys-security': {
    intro: [
      'API Key 等同于密码。泄露后他人可代你调用模型，账单可在几小时内暴涨。自学阶段就要养成：Key 只进环境变量，永不进 Git。',
      '本教程覆盖 .env 用法、.gitignore、泄露应急 Revoke 流程，以及给 Cursor 等工具授权时的最小权限原则。',
    ],
    sections: [
      {
        title: '密钥是什么、泄露代价多大',
        paragraphs: [
          'OpenAI Key 常以 sk- 开头；Anthropic 以 sk-ant- 开头。谁拿到 Key，谁就能以你的名义调 API（在额度内）。',
          '公开 GitHub 仓库会被爬虫扫描；截图发群、录屏、直播写代码也是常见泄露途径。',
          '真实后果：异常账单、账号冻结、客户数据经你的 Key 外流的责任风险。',
        ],
        tip: 'Never commit keys — 写进团队 README 也比泄露强。',
      },
      {
        title: '禁止事项清单',
        paragraphs: [
          '禁止：把 Key 写死在 .js/.py 源码里；提交到 Git（含 private  repo 也不建议）；放在前端网页或小程序代码里；贴在 Notion/飞书公开页；截图含 Key 发微信群。',
          '禁止：开发 Key 与生产 Key 混用；把 Key 发给「帮你调试」的不明第三方。',
        ],
        steps: [
          '全局搜项目是否已有 sk- 字符串：git grep sk- 或 IDE 全局搜索。',
          '若发现硬编码，立刻去官网 Revoke 该 Key 并新建。',
          '团队群公告：API Key 只许说「已配置在服务器环境变量」。',
        ],
      },
      {
        title: '正确做法：.env 与环境变量',
        paragraphs: [
          '项目根目录建 .env（勿提交）：OPENAI_API_KEY=sk-你的密钥',
          '代码里读取：Node 用 process.env.OPENAI_API_KEY（配合 dotenv）；Python 用 os.environ["OPENAI_API_KEY"]（配合 python-dotenv）。',
          'Cursor 填 Key：Settings → Models → OpenAI API Key，存在本地配置，同样不要写进仓库里的 mcp.json 明文。',
        ],
        steps: [
          '复制 .env.example（只有变量名无值）进 Git；真实 .env 进 .gitignore。',
          '在 .gitignore 加入一行：.env',
          '终端验证：Node 运行 node -e "require(\'dotenv\').config(); console.log(process.env.OPENAI_API_KEY?.slice(0,7))" 应只打印 sk-pro 等前缀。',
          'Windows PowerShell 临时设置：$env:OPENAI_API_KEY="sk-..."（关闭窗口失效，长期仍用 .env）。',
        ],
      },
      {
        title: '.gitignore 与 pre-commit 扫描',
        paragraphs: [
          '最小 .gitignore 片段：.env、.env.local、*.pem、secrets/',
          '可选 pre-commit 钩子：用 gitleaks 或 detect-secrets 扫描 sk- 模式；提交前自动失败。',
          '若 Key 曾经进过 Git 历史：仅删文件不够，需 git filter-repo 或 BFG 清历史，并 Rotate Key。',
        ],
        steps: [
          '确认 .env 在 .gitignore 且 git status 看不到 .env。',
          '故意在 test 文件写 fake sk-test123，跑 gitleaks detect 看能否拦截（测完删除）。',
          'CI 里加 secret scanning（GitHub Advanced Security 或第三方）。',
        ],
      },
      {
        title: '泄露应急：Revoke → 清历史 → 查账单',
        paragraphs: [
          'OpenAI：platform.openai.com → API keys → 找到泄露 Key → Revoke → Create new secret key。',
          'Anthropic：console.anthropic.com → API Keys → Disable → 新建。',
          '查 Usage/Billing 是否有异常 spike；联系平台 Support 说明情况。',
          '清 Git 历史后仍必须 Revoke 旧 Key——历史里的 Key 可能已被爬取。',
        ],
        steps: [
          '演练一次：新建测试 Key → 立即 Revoke（熟悉按钮位置）。',
          '保存各平台 Billing 告警设置入口截图。',
          '写一页「泄露应急」便签：Revoke 链接 + 负责人电话。',
        ],
        links: [
          { label: 'OpenAI API Keys', url: 'https://platform.openai.com/api-keys' },
          { label: 'Anthropic Console', url: 'https://console.anthropic.com/' },
        ],
      },
      {
        title: '开发/生产隔离与工具授权',
        paragraphs: [
          '至少两把 Key：DEV（低配额）+ PROD（仅服务器、高配额、IP 限制若支持）。',
          '给 Cursor / MCP 授权：GitHub Token 选最小 scope（先 read）；MCP 里用 ${env:VAR} 引用环境变量，勿写明文。',
          '前端应用：浏览器永远不应持有真实 Key；请求走你自己的后端转发。',
        ],
      },
    ],
    checklist: [
      '.env 已创建且含 OPENAI_API_KEY（或同类）',
      '.env 已在 .gitignore，git status 无 .env',
      '代码无 sk- 硬编码',
      '知道 OpenAI/Anthropic Revoke 入口',
      'Dev/Prod Key 已分离或计划分离',
    ],
    refs: [
      { label: 'OpenAI API Best Practices', url: 'https://platform.openai.com/docs/guides/production-best-practices' },
    ],
  },

  'cursor-install': {
    intro: [
      'Cursor 擅长：日常写功能、多文件修改、可视化看 Diff——最适合新手当「主 AI 编程编辑器」。',
      '本篇：官网下载 → 账号登录 →（可选）API Key → 第一次改文件。终端里的 Claude Code/Codex 密钥请另用《CC Switch 安装》管理。',
    ],
    sections: [
      {
        title: '擅长什么',
        paragraphs: [
          '擅长：边看代码边改、Chat/Agent 改多文件、接受/拒绝 Diff。',
          '不擅长替代：纯终端长任务可搭配 Claude Code；行内补全也可另装 Copilot（不必同时开太多）。',
        ],
      },
      {
        title: '下载前：先有 Cursor 账号（推荐）',
        paragraphs: [
          '打开 https://cursor.com ，点 Sign up / 注册（免费档即可开始）。',
          '可用 Google、GitHub 或邮箱。有 GitHub 最好（以后交作业、放网页常用）；没有就用 Google/邮箱。',
          '注册完成后先不要关网页，接着去下载页。',
        ],
        steps: [
          '完成 cursor.com 注册或确认已能 Log in。',
          '备忘录记下：Cursor | 登录方式 | 邮箱。',
        ],
        links: [
          { label: 'Cursor 官网', url: 'https://cursor.com' },
          { label: '官方安装说明', url: 'https://cursor.com/help/getting-started/install' },
        ],
      },
      {
        title: 'Windows：从官网下载并安装（逐步）',
        paragraphs: [
          '① 地址栏打开：https://cursor.com/download （看清是 cursor.com，不是别的）。',
          '② 点 Download for Windows。浏览器下方或「下载」文件夹会出现安装包（名字里通常带 Cursor Setup）。',
          '③ 打开「文件资源管理器」→ 左侧「下载」→ 找到刚下的文件 → 双击。',
          '④ 若出现「是否允许此应用对设备更改」点「是」。若出现「Windows 已保护你的电脑」：点「更多信息」→「仍要运行」（仅限官网包）。',
          '⑤ 安装向导一路点 Next / Install；个人电脑用默认路径即可。装完可勾选 Launch Cursor。',
          '⑥ 开始菜单搜索 Cursor，应能看到图标。点开。',
        ],
        steps: [
          '确认下载文件夹里的安装包来源是刚才的官网下载。',
          '安装完成并能从开始菜单打开 Cursor 窗口。',
          '菜单栏 Help → About，能看到版本号即安装成功。',
        ],
        links: [{ label: 'Cursor 下载页', url: 'https://cursor.com/download' }],
      },
      {
        title: 'Mac：下载 .dmg 并拖进应用程序',
        paragraphs: [
          '① 打开 https://cursor.com/download → Download for macOS。',
          '② 下载完成后在「下载」里双击 .dmg。',
          '③ 出现小窗口：左边 Cursor 图标，右边 Applications 文件夹 → 用鼠标把左边拖到右边。',
          '④ 打开「启动台」找到 Cursor 打开。若提示无法验证开发者：系统设置 → 隐私与安全性 → 仍要打开。',
        ],
        steps: [
          '应用程序列表里能看到 Cursor。',
          '能成功打开主窗口。',
        ],
      },
      {
        title: '第一次打开：登录，不要 Skip',
        paragraphs: [
          '窗口会引导 Sign in。点 Sign in，用你在 cursor.com 注册的同一方式登录（浏览器可能弹出授权页，点允许）。',
          '若问是否从 VS Code 导入：没用过 VS Code 就选跳过/不导入；用过可以导入主题和快捷键。',
          '主题 Dark/Light 随便选，以后能改。',
          '成功标准：窗口角落能看到账号头像或邮箱，不再反复要求登录。',
        ],
        steps: [
          '完成登录，确认不是游客/Skip 状态。',
          '若登录循环：关 Cursor → 用浏览器先登录 cursor.com → 再开软件重试。',
        ],
      },
      {
        title: '关键：必须「打开文件夹」，不是打开单个文件',
        paragraphs: [
          'AI 改项目需要一个「工作文件夹」。只打开一个文件，很多功能会怪怪的。',
          'Windows：打开「此电脑」→ 本地磁盘 D:（或 C:）→ 右键空白 → 新建 → 文件夹 → 命名 ai-practice。',
          'Mac：在访达「文稿」里新建文件夹 ai-practice。',
          '回到 Cursor：顶部菜单 File → Open Folder…（打开文件夹）。在弹窗里选中 ai-practice → 点「选择文件夹」。',
          '成功标准：窗口最左侧出现资源管理器，顶部或侧边能看到 ai-practice 这个名字。',
        ],
        steps: [
          '在电脑里亲手新建 ai-practice 文件夹。',
          'Cursor 里 File → Open Folder 打开它。',
          '左侧应几乎是空的（还没有文件），这是正常的。',
        ],
        tip: '路径尽量不要全是中文超长路径；ai-practice 这种英文名最省事。',
      },
      {
        title: '创建 hello.txt（不会代码也能做）',
        paragraphs: [
          '在 Cursor 左侧资源管理器空白处右键 → New File（新建文件）→ 输入 hello.txt 回车。',
          '中间编辑区输入一行：这是我的第一行练习。',
          '保存：Ctrl+S（Mac：Cmd+S）。标题上的小圆点应消失，表示已保存。',
          '成功标准：左侧文件树里能看见 hello.txt。',
        ],
        steps: [
          '创建并保存 hello.txt。',
          '关掉 Cursor 再打开，File → Open Recent 还能回到这个文件夹。',
        ],
      },
      {
        title: '打开 AI 对话并用它改文件',
        paragraphs: [
          '键盘按 Ctrl+L（Mac：Cmd+L）。右侧或侧边应弹出 Chat/Agent 输入框。',
          '在 hello.txt 里用鼠标拖选「这是我的第一行练习」整句（反白）。',
          '在 Chat 输入框粘贴发送：「把选中内容改成两行：第一行中文『练习成功』，第二行英文 Practice OK。请直接修改文件。」',
          '等待 AI 给出修改方案：会出现绿色/红色差异（diff）。找到 Accept / Apply / 接受 按钮点一下。',
          '再按 Ctrl+S 保存。看 hello.txt 是否变成两行。',
          '若 AI 只在聊天里「说出」新内容却没改文件：在输入里加一句「请应用到文件，不要只给说明」；并确认模式不是纯 Ask（只问答）。',
        ],
        steps: [
          'Ctrl+L 打开 Chat。',
          '发送修改指令并 Accept。',
          '确认文件内容已变且已保存。',
          '记住三个快捷键：Ctrl+L 对话；Ctrl+K 行内改；Ctrl+I Agent（Mac 把 Ctrl 换成 Cmd）。',
        ],
        tip: '第一次成功改文件，比学会十个名词重要。改成功后再去看「Cursor 用法」进阶篇。',
      },
      {
        title: '登录之后：配置 API Key（可选）',
        paragraphs: [
          '打开 Cursor Settings：File → Preferences → Cursor Settings（或 Ctrl+Shift+J）。',
          'Models：先看默认模型；账号自带额度够用就先别填 Key。',
          '自备 Key：在 Models 找到 OpenAI API Key / Override OpenAI Base URL（文案随版本可能微调）。',
          '填入供应商文档中的 Base URL + 你的 API Key；模型名填该供应商要求的名字（不要混用）。',
          'Privacy Mode：公司代码建议按政策开启。',
          '说明：Cursor 的 Key 在 IDE 设置里管；Claude Code/Codex 的 Key 用《CC Switch 安装》统一切换，两套不要搅在一起。',
        ],
        steps: [
          '打开过 Cursor Settings → Models。',
          '记下默认模型名；若填了 Key，用 Chat 发「只回复 ok」验证。',
          '需要管终端 Agent 密钥时，去学 CC Switch。',
        ],
        links: [{ label: 'CC Switch 官网', url: 'https://ccswitch.io' }],
      },
      {
        title: '装不上 / AI 不说话 — 排错',
        paragraphs: [
          '下载页打不开：换网络；确认地址是 cursor.com/download。',
          '安装包双击没反应：右键「以管理员身份运行」试一次；检查磁盘空间。',
          '能打开但 Chat 一直转圈：查网络；退出重新登录；Help → Check for Updates。',
          'Accept 后文件没变：看是否点错了 Reject；或是否在只读目录。',
          '公司电脑禁止安装：用网页版 AI 继续学提示词；Cursor 换家里电脑装。',
        ],
        steps: [
          '对照上面逐条排除。',
          '仍失败：把 About 里的版本号 + 报错原文记下来再求助。',
        ],
      },
    ],
    checklist: [
      '从 https://cursor.com/download 下载安装',
      '已登录（未 Skip）',
      'Open Folder 打开自建 ai-practice',
      '有 hello.txt 且被 AI 成功改过并保存',
      '会按 Ctrl+L（Cmd+L）打开对话',
    ],
    refs: [
      { label: 'Cursor 安装文档', url: 'https://cursor.com/help/getting-started/install' },
      { label: 'Cursor 下载', url: 'https://cursor.com/download' },
    ],
  },

  'cursor': {
    intro: [
      'Cursor 核心能力分四块：Chat（问与改）、Inline Edit（行内改）、Composer/Agent（多文件与命令）、@ 引用（精确上下文）。',
      '本教程按真实快捷键与按钮名讲解，避免「只会聊天不会落盘」。',
    ],
    sections: [
      {
        title: 'Chat / Ask / Edit / Agent 四种模式',
        paragraphs: [
          'Chat（Ctrl+L）：侧边对话，可带选区；适合解释代码、小范围修改。',
          'Inline Edit（Ctrl+K）：光标处或选中代码直接改，适合改函数、改变量名。',
          'Composer / Agent（Ctrl+I）：多文件任务，可自动读仓库、改多文件、跑终端（需你批准命令）。',
          'Ask 模式：偏问答，不一定写文件；要做项目改动请切 Agent。',
        ],
        steps: [
          '同一小函数分别用 Ctrl+K 和 Ctrl+L 各改一次，感受差异。',
          'Ctrl+I 输入：「读取 package.json，列出所有 dependencies 名字到 deps.md」。',
          '观察 Agent 是否列出将修改的文件，再点 Run/Accept。',
        ],
      },
      {
        title: 'Inline Edit（Ctrl+K）实操',
        paragraphs: [
          '选中一段函数 → Ctrl+K → 输入「加 TypeScript 类型注解，不要改逻辑」→ 预览 diff → Accept。',
          '未选中时 Ctrl+K 会在光标处生成或修改当前行附近代码。',
          'Esc 取消；若改坏了 Ctrl+Z 撤销。',
        ],
        steps: [
          '找含 any 的 TS/JS 函数，Ctrl+K 去 any。',
          '对 CSS 选中块 Ctrl+K：「移动端 max-width 640px 时改单列布局」。',
          '每次 Accept 前扫一眼 diff 红色删除行。',
        ],
      },
      {
        title: '@file @folder @Codebase 上下文',
        paragraphs: [
          'Chat/Agent 输入框打 @ 弹出菜单：@Files 选单个文件；@Folders 选目录；@Codebase 让索引检索全仓库相关片段。',
          '示例：「@src/App.tsx @src/data/knowledge.ts 解释这两个文件如何关联，不要改代码。」',
          '大仓库 @Codebase 前先 .cursorignore 排除 node_modules、dist，否则慢且费 token。',
        ],
        steps: [
          '输入 @ 搜索并选中一个真实项目文件。',
          '问「这个文件导出什么？用 bullet 列出」。',
          '试 @Codebase：「哪里定义了 getItem 函数？」',
          '项目根建 .cursorignore，内容一行：node_modules/',
        ],
        tip: '精确 @ 单文件比整仓粘贴更省上下文、更少胡编。',
      },
      {
        title: 'Agent 跑终端与多文件修改',
        paragraphs: [
          'Agent 提议运行 npm test、git status 等命令时，终端面板会显示；首次需点 Approve/Run。',
          'Settings → Features → 可配置 Yolo mode（自动跑命令，生产库慎用）。',
          '复杂任务先让 Agent 输出计划清单，再逐条「执行第 1 项」。',
        ],
        steps: [
          'Agent：「运行 npm run build，若有报错贴出并修第一个 error。」',
          '批准一次终端命令，看输出是否回灌到对话。',
          '多文件重构：「把所有 .jsx 重命名为 .tsx，并更新 import（先列计划再执行）」。',
        ],
      },
      {
        title: '@Docs 与模型 Settings',
        paragraphs: [
          'Cursor Settings → Models：Default model、长上下文模型分开设；可填 OpenAI API Key 与 Override OpenAI Base URL。',
          '@Docs（若可用）：添加官方文档 URL 后，可在对话 @ 该文档查 API。',
          'Privacy Mode、Codebase Indexing 在 Cursor Settings → General / Indexing 调整。',
        ],
        steps: [
          '打开 Cursor Settings → Models，截图记录当前默认模型。',
          '若有自有 Key：填入 OpenAI API Key，选 gpt-4o 测试一条 Chat。',
          'Indexing 开启后等右下角索引完成再 @Codebase。',
        ],
        links: [{ label: 'Cursor 文档', url: 'https://docs.cursor.com' }],
      },
      {
        title: '常见坑与 Ask→Agent 切换',
        paragraphs: [
          '只聊天不改文件：模式是 Ask；或没 Open Folder；或没点 Accept。',
          '上下文爆炸：别粘贴整仓；用 @ 文件 + 摘要。',
          '计费直觉：Agent 多轮 + 长上下文更耗额度；小改用 Ctrl+K。',
        ],
        steps: [
          '遇到不改文件：检查左下角模式 → 切 Agent → 重新 @ 相关文件。',
          '任务完成后 git diff 人工过目再 commit。',
        ],
      },
    ],
    checklist: [
      '用过 Ctrl+L、Ctrl+K、Ctrl+I 各至少一次',
      '用过 @file 或 @Codebase',
      'Agent 批准过一次终端命令',
      '知道 Ask 与 Agent 区别',
      '大目录已配置 .cursorignore',
    ],
  },

  'cursor-rules': {
    intro: [
      'Cursor Rules 是写给 AI 的项目级规矩：技术栈、目录约定、禁止事项。放在 .cursor/rules/*.mdc，带 frontmatter 控制何时生效。',
      '写好 Rules 后，Agent 少乱建文件、少换框架、少 ignore 你的 ESLint。',
    ],
    sections: [
      {
        title: 'Rules 文件放哪、几种层级',
        paragraphs: [
          '项目级：仓库根 .cursor/rules/xxx.mdc — 跟项目走 Git，团队共享（勿含密钥）。',
          '用户级：Cursor Settings → Rules — 个人习惯，所有项目生效。',
          '优先级：项目 Rules 与用户 Rules 合并；冲突时以项目约束为准（实践上应写清楚避免矛盾）。',
        ],
      },
      {
        title: '.mdc frontmatter：alwaysApply 与 globs',
        paragraphs: [
          '每个 .mdc 文件顶部用 YAML frontmatter，例如 ---\\nalwaysApply: true\\n--- 表示每次对话都注入。',
          '按路径匹配用 globs：---\\nglobs: src/**/*.tsx\\n--- 仅编辑匹配文件时注入该规则。',
          'alwaysApply 适合全项目通用规范；globs 适合特定语言/目录（如只对 *.py 生效）。',
        ],
        steps: [
          'mkdir .cursor/rules（若不存在）。',
          '新建 general.mdc，frontmatter 设 alwaysApply: true。',
          '新建 react.mdc，frontmatter 设 globs: **/*.tsx。',
        ],
      },
      {
        title: '示例 Rule 内容（可直接复制）',
        paragraphs: [
          'general.mdc 正文示例：',
          '「本项目用 TypeScript strict、React 19、Vite。禁止引入新 UI 库。修改前先读相邻文件风格。不要 commit .env。回答用中文，代码注释英文。」',
          'react.mdc 正文示例：',
          '「组件用函数式 + named export。样式用 index.css 现有变量，勿 inline style 除非动态。新组件放 src/components/。」',
        ],
        steps: [
          '复制上述两段到对应 .mdc，frontmatter 按上一节配置。',
          '保存后重启 Cursor 或新开 Agent 对话。',
          '让 Agent「新建一个 Hello.tsx 按钮组件」，检查是否遵守目录与 export 约定。',
        ],
      },
      {
        title: '可执行约束怎么写',
        paragraphs: [
          '要具体：坏 —「写好代码」；好 —「API 调用只放 src/api/，组件不得直接 fetch」。',
          '写版本：「Node 20+」「Python 3.11」「Next.js 14 App Router」。',
          '写禁止：「禁止 any」「禁止 console.log 进 PR」「禁止删现有测试」。',
          'Rules 总长建议 <500 行；过长浪费上下文，按 globs 拆分。',
        ],
      },
      {
        title: 'Rules vs AGENTS.md vs README',
        paragraphs: [
          'README：给人看，项目介绍与启动命令。',
          'AGENTS.md（若使用）：给 Agent 的任务说明与常用命令。',
          'Rules：给模型的硬约束，每次（或匹配文件时）自动注入。',
          '分工：README 不管约束；别把密钥写进任何 Rules。',
        ],
        steps: [
          '在 README 加 ## Dev 段：npm install && npm run dev。',
          'Rules 只写 AI 必须遵守的约束，不写营销文案。',
          '团队改 Rules 走 PR Review，像改 lint 配置一样。',
        ],
        tip: 'Rules 改完用同一 prompt 回归测一次，避免新规则互相打架。',
      },
    ],
    checklist: [
      '已创建 .cursor/rules/*.mdc',
      '至少一个 alwaysApply、一个 globs 规则',
      'Rule 含技术栈版本与禁止项',
      'Rules 无 API Key 等秘密',
      'Agent 任务验证 Rules 生效',
    ],
    refs: [{ label: 'Cursor Rules 文档', url: 'https://docs.cursor.com/context/rules' }],
  },

  'domain-api-cheatsheet': {
    intro: [
      '配 Cursor 或写 SDK 时，「域名 + Key + 模型名」三件套错一个就 401/404。本表按公开文档整理 OpenAI、Anthropic、Azure、DeepSeek 等 Base URL 与鉴权头。',
      '建议收藏本页，填配置时复制粘贴，不要手打域名。',
    ],
    sections: [
      {
        title: '一张表看懂三要素',
        paragraphs: [
          'vendor：供应商。base_url：API 根地址（通常含 /v1）。auth：Authorization 头格式。model：模型字符串，各平台不同。',
          'OpenAI 官方：base_url https://api.openai.com/v1 ，头 Authorization: Bearer sk-... ，模型例 gpt-4o、gpt-4o-mini。',
          'DeepSeek（OpenAI 兼容）：base_url https://api.deepseek.com ，模型 deepseek-chat、deepseek-reasoner；SDK 里 baseURL 指向该地址即可。',
          'Anthropic：base_url https://api.anthropic.com ，路径 /v1/messages（非 OpenAI 格式），头 x-api-key: sk-ant-... 与 anthropic-version: 2023-06-01。',
          'Azure OpenAI：base_url https://{RESOURCE}.openai.azure.com/openai/v1/ ，Key 在 Azure 门户；模型名多为部署名 deployment name。',
        ],
        steps: [
          '把你用的 vendor 一行抄到团队 wiki。',
          'curl 测通前先不要填进 Cursor。',
        ],
      },
      {
        title: 'OpenAI 官方 curl 验证',
        paragraphs: [
          '列出模型（需 Key）：',
          'curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"',
          'Chat 最小请求：',
          'curl https://api.openai.com/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer $OPENAI_API_KEY" -d \'{"model":"gpt-4o-mini","messages":[{"role":"user","content":"ping"}]}\'',
        ],
        steps: [
          'PowerShell：$env:OPENAI_API_KEY="sk-..." 后运行上面 curl（Git Bash 用 export）。',
          '返回 JSON 含 choices[0].message.content 即成功。',
          '401：Key 错或过期；404：路径错，检查是否多/少 /v1。',
        ],
        links: [{ label: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference' }],
      },
      {
        title: 'DeepSeek 与兼容网关填 Cursor',
        paragraphs: [
          'DeepSeek：Cursor Settings → Models → Override OpenAI Base URL 填 https://api.deepseek.com（部分版本要带 /v1，以文档为准）；API Key 用 DeepSeek 控制台 Key；模型名填 deepseek-chat。',
          '国内硅基等网关：同样 Override Base URL + 对应 Key + 网关文档给的 model 字符串。',
          '原则：curl 在同一 base_url 上通，再抄到 Cursor。',
        ],
        steps: [
          'DeepSeek 控制台创建 Key：https://platform.deepseek.com',
          'curl DeepSeek chat/completions 测通（文档示例与 OpenAI 类似）。',
          'Cursor 填入三项后 Chat 发「hi」验证。',
        ],
        links: [{ label: 'DeepSeek API', url: 'https://platform.deepseek.com/api-docs' }],
      },
      {
        title: 'Azure OpenAI endpoint 拼接',
        paragraphs: [
          'Azure 门户创建 OpenAI 资源 → 记下 Resource name → endpoint 形如 https://myresource.openai.azure.com。',
          'OpenAI 新版统一路径：https://{resource}.openai.azure.com/openai/v1/chat/completions',
          '鉴权：api-key 头或 Azure AD；模型参数填 deployment 名非 OpenAI 公开名。',
        ],
        steps: [
          'Azure Portal → 你的 OpenAI 资源 → Keys and Endpoint 复制 Key 与 endpoint。',
          '用 Azure 文档里的 curl 示例测 chat completions。',
          '企业内网可能需要 VPN 或私有 DNS。',
        ],
        links: [{ label: 'Azure OpenAI', url: 'https://learn.microsoft.com/azure/ai-services/openai/' }],
      },
      {
        title: '常见填错与 NO_PROXY',
        paragraphs: [
          '少写 https:// 或把 http 写成 https → 连接失败。',
          'OpenAI 兼容网关漏 /v1 或多一段 path → 404。',
          '模型名复制错大小写 → 400 model not found。',
          '公司代理：系统/终端设 HTTPS_PROXY；内网 endpoint 加 NO_PROXY=localhost,127.0.0.1,.corp.local',
        ],
        tip: '把「最终生效的三行配置」存成 snippet：BASE_URL=… KEY=env MODEL=…',
      },
    ],
    checklist: [
      '手上有 vendor/base_url/model 对照表',
      'curl 测通过至少一个 chat/completions',
      '知道 Anthropic 用 x-api-key 非 Bearer（OpenAI 格式）',
      'Cursor Override Base URL 知道在哪填',
      '见过 401/404 各至少一次知道原因',
    ],
  },

  'mcp-intro': {
    intro: [
      'MCP（Model Context Protocol）让 IDE 里的 AI 通过统一协议调用外部工具：读文件、查文档、调 GitHub API 等，而不是只会「纸上谈兵」。',
      '5 分钟搞懂 Host / Client / Server 三角关系，以及 Cursor 里 MCP 绿灯代表什么。',
    ],
    sections: [
      {
        title: 'MCP 解决什么问题',
        paragraphs: [
          '没有 MCP 时：模型只能看你粘贴的文字；你说「读 package.json」它只能猜。',
          '有 MCP 时：Agent 通过协议调用 filesystem、context7 等 Server，真实读盘、查文档、返回结果再回答。',
          '对你：少复制粘贴，少幻觉 API；对团队：工具能力可插拔、可审计。',
        ],
      },
      {
        title: 'Host / Client / Server 关系',
        paragraphs: [
          'Host：宿主应用，例如 Cursor IDE — 展示对话、批准权限。',
          'Client：Host 内置的 MCP 客户端 — 按 mcp.json 启动 Server、转发 tool call。',
          'Server：独立进程，实现具体能力（读目录、搜文档、创建 GitHub Issue 等）。',
          '一次调用链：你在 Agent 提问 → Client 发现需要工具 → 调 Server → Server 返回 JSON → 模型继续生成答案。',
        ],
        steps: [
          '画三角：Cursor(Host) — MCP Client — filesystem(Server)。',
          '理解 Server 是子进程，不是「云端插件」这么简单。',
        ],
      },
      {
        title: '与 Plugin、Function Calling 对比',
        paragraphs: [
          'Function Calling：单模型 API 里定义 tools JSON，适合自建后端 Agent。',
          'Plugin（旧范式）：各产品私有格式，迁移难。',
          'MCP：开放协议，同一 filesystem Server 可被 Cursor、Claude Desktop 等多 Host 复用（视实现而定）。',
        ],
        tip: 'Cursor 用户优先 MCP；纯 API 开发者用 Function Calling；不必二选一，概念相通。',
      },
      {
        title: 'mcp.json 长什么样',
        paragraphs: [
          'Cursor 项目级配置：.cursor/mcp.json 或用户目录 ~/.cursor/mcp.json（Windows：%USERPROFILE%\\.cursor\\mcp.json）。',
          '最小示例（filesystem，仅读指定目录）：',
        ],
        steps: [
          '{ "mcpServers": { "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "D:\\\\ai-practice"] } } }',
          'command+args 等价于在终端启动 Server；Host 用 stdio 与 Server 通信。',
          '勿在 json 里写 sk- 密钥；用 "env": { "GITHUB_TOKEN": "${env:GITHUB_TOKEN}" } 引用环境变量。',
        ],
      },
      {
        title: 'Cursor 里 MCP 状态灯',
        paragraphs: [
          'Settings → Tools & MCP（或 Features → MCP）：每个 Server 有绿/红状态。',
          '绿灯：Server 进程启动成功，Agent 可调用其 tools。',
          '红灯：npx 失败、路径错、Node 未装 — 见 mcp-install 教程排查。',
          'Agent 对话里说「列出当前目录文件」若触发 list_directory 类 tool，说明 MCP 链路通。',
        ],
        steps: [
          '打开 Cursor Settings 找到 MCP 列表页面。',
          '记下一个 Server 名与对应 tool 名（如 filesystem 的 read_file）。',
        ],
        links: [{ label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' }],
      },
      {
        title: 'stdio vs SSE 与安全直觉',
        paragraphs: [
          'stdio：本地子进程，Cursor 默认最常见；Server 跑在你机器上。',
          'SSE/HTTP：远程 Server，需 URL 与鉴权；企业可能内网部署。',
          '安全：Server 能读什么路径、能调什么 API 由配置决定；只给最小目录、最小 Token 权限；工具调用前 Cursor 可弹批准。',
        ],
      },
    ],
    checklist: [
      '能解释 Host Client Server 各是什么',
      '见过 mcp.json 基本结构',
      '知道 MCP 列表在 Cursor Settings 哪',
      '理解绿灯 = Server 启动成功',
      '知道密钥用环境变量不写进 json',
    ],
    refs: [
      { label: 'MCP 官方文档', url: 'https://modelcontextprotocol.io/docs' },
      { label: 'Cursor MCP', url: 'https://docs.cursor.com/context/mcp' },
    ],
  },

  'mcp-install': {
    intro: [
      '跟做本教程：在 Cursor 里配置第一个 MCP Server（filesystem），重启后绿灯，并在 Agent 里完成一次真实 tool call。',
      '前置：Node.js 20+（node -v 检查）；npx 可用。',
    ],
    sections: [
      {
        title: '配置文件位置',
        paragraphs: [
          '推荐项目级：仓库根 .cursor/mcp.json — 团队可共享（不含密钥）。',
          '全局：Windows C:\\Users\\你的用户名\\.cursor\\mcp.json ；Mac/Linux ~/.cursor/mcp.json。',
          '改完配置通常需完全重启 Cursor（File → Exit 再开），或 Settings 里 Reload MCP。',
        ],
        steps: [
          'mkdir .cursor（若不存在）。',
          '新建 .cursor/mcp.json。',
          '确认 JSON 无注释、无尾逗号（标准 JSON）。',
        ],
      },
      {
        title: '复制 filesystem 配置',
        paragraphs: [
          '把 D:\\ai-practice 换成你要开放的绝对路径（Agent 只能在该目录内读写，选练习目录勿选整盘）。',
          'Windows 路径 JSON 里反斜杠要写成 \\\\ 或使用正斜杠 D:/ai-practice。',
        ],
        steps: [
          '写入：{ "mcpServers": { "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "D:/ai-practice"] } } }',
          '保存文件。',
          '终端手动测：npx -y @modelcontextprotocol/server-filesystem D:/ai-practice（应挂起无报错；Ctrl+C 退出）。',
        ],
      },
      {
        title: '可选：context7 文档 MCP',
        paragraphs: [
          'context7 帮助查库文档，减少 API 幻觉。配置示例（需按官方最新包名调整）：',
          '"context7": { "command": "npx", "args": ["-y", "@upstash/context7-mcp"] }',
          '可同时配置多个 Server，键名 filesystem、context7 不要重复。',
        ],
        steps: [
          '在 mcpServers 内并列添加第二个 server 块。',
          '确保 JSON 逗号正确。',
        ],
      },
      {
        title: '重启 Cursor 与检查状态灯',
        paragraphs: [
          '完全退出 Cursor 再打开；Open Folder 打开含 .cursor/mcp.json 的项目根。',
          'Cursor Settings → MCP：filesystem 应为绿色 Connected。',
          '若红色：点 View Logs 或终端手动跑 npx 看 stderr。',
        ],
        steps: [
          '重启后第一时间打开 MCP 设置页截图状态。',
          '红灯时复制 command+args 到 PowerShell 原样执行，记录报错。',
          '常见问题：Node 太旧 → 装 Node 20 LTS；网络 → 设 npm 镜像；路径不存在 →  mkdir 目录。',
        ],
      },
      {
        title: 'Agent 触发 tool call 验证',
        paragraphs: [
          'Ctrl+I 开 Agent，模式确认 Agent；@ 可不带文件。',
          '发送：「用 filesystem 工具列出 D:/ai-practice 根目录所有文件名，不要编造。」',
          '若成功：回复含真实文件名；MCP 日志可见 tool 调用。',
          '再试：「在 D:/ai-practice 创建 notes.txt，内容 hello mcp，用工具写入。」',
        ],
        steps: [
          '完成列目录验证。',
          '完成写文件验证；资源管理器确认 notes.txt 存在。',
          '若 Agent 说无此工具：检查 MCP 绿灯与是否 Agent 模式。',
        ],
        tip: '生产库写操作前 Settings 开启工具批准，防误删。',
      },
      {
        title: '失败排查清单',
        paragraphs: [
          'ENOENT npx：Node 未装或未进 PATH；Windows 重启终端/IDE。',
          'ETIMEDOUT：npm registry 被墙；npm config set registry https://registry.npmmirror.com',
          'Server 名冲突：mcp.json 里两个 key 相同。',
          '环境变量：GitHub 类 Server 需先在系统设 GITHUB_TOKEN，json 用 ${env:GITHUB_TOKEN}。',
        ],
      },
    ],
    checklist: [
      '.cursor/mcp.json 已创建',
      'npx 手动启动 Server 无报错',
      'Cursor MCP 页 filesystem 绿灯',
      'Agent 列目录成功',
      'Agent 写文件成功且磁盘可见',
    ],
    refs: [{ label: 'MCP Servers 列表', url: 'https://github.com/modelcontextprotocol/servers' }],
  },

  'api-openai': {
    intro: [
      '注意：这是「开发者 API」，和网页版 ChatGPT 聊天不是同一入口。网页聊天够用的人可以先跳过；要接 Cursor/自己写程序再回来。',
      '30 分钟目标：打开 platform.openai.com → 创建一把密钥 → 用一条命令发出请求 → 看懂 401/429。',
      '官方 Base URL：https://api.openai.com/v1 （地址栏自己输入，不要抄来路不明的「中转」除非你清楚风险）。',
    ],
    sections: [
      {
        title: '打开正确网站并登录（别走错）',
        paragraphs: [
          '聊天用：https://chatgpt.com ；开发者后台用：https://platform.openai.com 。两个都能用同一套 OpenAI 账号登录，但页面完全不同。',
          '① 浏览器打开 https://platform.openai.com/ ，点 Log in。',
          '② 用你的 ChatGPT/OpenAI 同一账号登录。',
          '③ 成功后应看到 Dashboard / API 相关菜单，而不是聊天输入框。若进到了聊天站，说明网址开错了。',
        ],
        steps: [
          '确认地址栏是 platform.openai.com。',
          '登录成功，左侧或顶部能找到 API keys / 密钥 一类入口。',
        ],
        links: [
          { label: 'OpenAI Platform（开发者）', url: 'https://platform.openai.com/' },
          { label: 'API Keys 页面', url: 'https://platform.openai.com/api-keys' },
        ],
      },
      {
        title: '创建 API Key（逐步点）',
        paragraphs: [
          '① 打开 https://platform.openai.com/api-keys',
          '② 点 Create new secret key / 创建密钥。',
          '③ Name 填：dev-local（自己认得就行）→ 创建。',
          '④ 弹窗里会出现一长串以 sk- 开头的字符——这是唯一一次完整显示。立刻点 Copy。',
          '⑤ 打开电脑记事本，临时粘贴保存；或更好：放进密码管理器。千万不要发到微信群、不要提交到 GitHub。',
          '⑥ 关闭弹窗后，列表里只能看到密钥后几位，完整串找不回来——丢了就 Revoke 再新建。',
          'Billing：若提示无额度，按官网 Billing 绑定支付方式（政策以页面为准）。没额度时请求会失败，先解决账单再测。',
        ],
        steps: [
          '成功创建一把 Key，并已复制到安全地方。',
          '在项目文件夹新建文件 .env（注意前面有点），内容一行：OPENAI_API_KEY=sk-你的密钥',
          '确认同目录有或将建 .gitignore，且其中包含 .env',
        ],
        tip: 'Key = 银行卡密码。泄露后立刻在 API keys 页 Revoke（作废）再新建。',
        links: [{ label: 'OpenAI Platform', url: 'https://platform.openai.com' }],
      },
      {
        title: '计费直觉：Token 怎么算',
        paragraphs: [
          '输入 tokens + 输出 tokens 分开计价；模型页有单价（如 gpt-4o-mini 便宜，gpt-4o 贵）。',
          '中文约 1–2 字 1 token；英文约 4 字符 1 token；长对话每次全量发送历史会更贵。',
          '开发用 gpt-4o-mini 或 gpt-3.5-turbo 档练手；复杂任务再换 gpt-4o。',
        ],
      },
      {
        title: 'curl 第一条请求',
        paragraphs: [
          'Mac/Linux/Git Bash：',
          'export OPENAI_API_KEY=sk-...',
          'curl https://api.openai.com/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer $OPENAI_API_KEY" -d \'{"model":"gpt-4o-mini","messages":[{"role":"user","content":"用一句中文介绍你自己"}]}\'',
          'PowerShell 可先 $env:OPENAI_API_KEY="sk-..." 再用 curl.exe（注意引号转义）或改用 Python。',
        ],
        steps: [
          '执行 curl，响应 status 200。',
          'JSON 里 choices[0].message.content 有中文回复。',
          '若 401：Key 错；429：限流，等 30s 重试。',
        ],
      },
      {
        title: 'Python 最小示例',
        paragraphs: [
          'pip install openai python-dotenv',
          '项目 .env：OPENAI_API_KEY=sk-...',
          '脚本：',
        ],
        steps: [
          'from dotenv import load_dotenv; load_dotenv()',
          'from openai import OpenAI; client = OpenAI()',
          'r = client.chat.completions.create(model="gpt-4o-mini", messages=[{"role":"user","content":"ping"}])',
          'print(r.choices[0].message.content)',
          'python main.py 打印 ping 回复即成功。',
        ],
      },
      {
        title: 'messages 角色与 system 提示',
        paragraphs: [
          'system：全局设定，如「你是简洁助手，用中文回答」。',
          'user：用户问题。',
          'assistant：历史助手回复，多轮对话时拼接。',
          '示例 messages：[{"role":"system","content":"回答不超过50字"},{"role":"user","content":"什么是API Key？"}]',
        ],
        steps: [
          '加 system 消息后对比输出长度变化。',
          '试多轮：把上一轮 assistant 回复 append 进 messages 再问追问。',
        ],
      },
      {
        title: '常见报错对照',
        paragraphs: [
          '401 Unauthorized：Key 无效、过期、或 Header 不是 Bearer sk-...',
          '429 Too Many Requests：RPM/TPM 用尽；降频、换 mini、或升 tier。',
          '400 model_not_found：model 字符串拼错或账号无权限。',
          '500/503：官方故障；指数退避重试。',
        ],
        links: [{ label: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference' }],
      },
    ],
    checklist: [
      'platform.openai.com 已创建 API Key',
      'Key 只在 .env 不在 Git',
      'curl 或 Python 收到 choices 回复',
      '理解 system/user/assistant',
      '见过 401/429 知道怎么处理',
    ],
  },

  'ai-build-website': {
    intro: [
      '目标：今晚在电脑浏览器里打开你自己的一页宣传站（有大标题、卖点、问答、页脚）。不会写代码也行——命令复制粘贴，页面交给 Cursor AI 改。',
      '你需要已经会：① 打开 Cursor ② Open Folder。不会的先做完「Cursor 安装」教程。',
      '还要装一个叫 Node.js 的运行环境（像「让网页项目能启动的引擎」）。下面从官网下载开始手把手写。',
    ],
    sections: [
      {
        title: '第 1 步：安装 Node.js（官网逐步）',
        paragraphs: [
          '① 浏览器打开：https://nodejs.org/ （认准 nodejs.org，不要下山寨「Node 绿化」）。',
          '② 首页通常有绿色大按钮 LTS（长期支持版）——点它下载。Windows 是 .msi，Mac 是 .pkg。',
          '③ 双击安装包 → 一路 Next / 继续 → 勾选同意协议 → 安装。装完点 Finish。',
          '④ 验证是否成功（很重要）：',
          'Windows：按 Win 键，搜索「PowerShell」或「命令提示符」打开 → 输入 node -v 回车 → 应出现 v20 或 v22 之类版本号。再输入 npm -v 回车，也应有数字。',
          'Mac：打开「终端」App，同样输入 node -v 与 npm -v。',
          '⑤ 若提示「不是内部或外部命令」：关掉终端窗口重新开一个再试；仍不行就重启电脑后再试；或重装 Node 并勾选「Add to PATH」。',
        ],
        steps: [
          '从 https://nodejs.org 下载并安装 LTS。',
          '新开终端，node -v 与 npm -v 都有版本号。',
          '把版本号记到备忘录。',
        ],
        tip: 'Node 不是病毒；它是官方开发工具。杀毒软件拦截时选「允许」。',
        links: [{ label: 'Node.js 官网（点 LTS）', url: 'https://nodejs.org/' }],
      },
      {
        title: '第 2 步：用命令创建网站项目（复制粘贴）',
        paragraphs: [
          '① 先有一个练习目录。Windows 可在 D: 盘新建文件夹 ai-practice；Mac 在「文稿」建 ai-practice。',
          '② 打开终端（PowerShell/命令提示符/Mac 终端）。',
          '③ 进入目录（按你的真实路径改）：',
          'Windows 示例：cd D:\\ai-practice',
          'Mac 示例：cd ~/Documents/ai-practice',
          '④ 一行命令创建项目（整行复制，回车）。若问号选模板，用方向键选 React + TypeScript，或直接用下面带模板的命令：',
          'npm create vite@latest my-landing -- --template react-ts',
          '⑤ 再执行：',
          'cd my-landing',
          'npm install',
          '（npm install 可能要几分钟，等出现光标再继续；红字报错把全文复制给 Cursor AI 问。）',
          '⑥ 启动：npm run dev',
          '⑦ 终端会出现 Local: http://localhost:5173/ —— 按住 Ctrl 点这个链接，或复制到浏览器打开。',
          '⑧ 成功标准：浏览器出现 Vite + React 默认欢迎页。先不要关这个终端窗口。',
        ],
        steps: [
          'cd 到 ai-practice。',
          '跑通 create vite + npm install + npm run dev。',
          '浏览器能打开 localhost:5173。',
        ],
      },
      {
        title: '第 3 步：用 Cursor 打开这个项目',
        paragraphs: [
          '① 打开 Cursor → 菜单 File → Open Folder。',
          '② 选中 my-landing 这一层（进去能看见 package.json 文件的那一层，不要只选到 ai-practice 上层）。',
          '③ 左侧应出现 src、package.json 等。',
          '④ 在 Cursor 里按 Ctrl+`（反引号，Esc 下面）打开下方终端；如需再次启动网站，输入 npm run dev。',
          '⑤ 按 Ctrl+I 打开 Agent，发送：「用中文列出这个项目主要文件夹和文件，各一行说明。」确认 AI 能读到你的项目。',
        ],
        steps: [
          'Open Folder 打开 my-landing 根目录。',
          '左侧能看到 src/App.tsx。',
          'Agent 能正确描述项目结构。',
        ],
      },
      {
        title: '第 4 步：整段复制给 AI，生成落地页',
        paragraphs: [
          '在 Cursor Agent（Ctrl+I）里粘贴下面整段（可把【知识付费课程平台】改成你的产品名），发送后等待它改文件，出现 Accept 就点接受：',
          '「为【知识付费课程平台】做一页落地页。技术栈：现有 Vite React TS，不要新增 UI 组件库。请修改 src/App.tsx，并在 src/components/ 创建组件：Hero（大标题+副标题+主按钮）、Features（3 个卖点）、Pricing（三档价格占位）、FAQ（4 个常见问题）、Footer（版权）。配色：背景 #0f172a，强调色 #e8891c。文案中文。手机宽度单列。改完用列表告诉我动了哪些文件。」',
        ],
        steps: [
          '粘贴 prompt → 发送 → Accept 所有相关文件。',
          '回到浏览器刷新 localhost:5173，应看到中文落地页而不是默认 Vite 页。',
          '不满意只改一处：「只改 Hero：标题更短，按钮文字改成『免费试读』，其他别动。」',
        ],
      },
      {
        title: '第 5 步：验收与打包',
        paragraphs: [
          '肉眼验收：首屏能看清标题；往下滚有卖点与 FAQ；手机宽度（浏览器 F12 → 点手机图标 → 375）不挤成一团。',
          '终端里 Ctrl+C 停掉 dev，再执行 npm run build。成功会生成 dist 文件夹。',
          '失败：把终端红字全文复制给 Agent：「请根据报错修好，使 npm run build 通过。」',
        ],
        steps: [
          'npm run build 成功。',
          '截一张 Hero 区图存档。',
          '下一篇「上线落地页」教你把网站挂到公网链接。',
        ],
      },
      {
        title: '常见坑（照着对）',
        paragraphs: [
          'node 不是内部命令：Node 没装好或没重开终端。',
          'npm create 很慢/失败：换网络；或用公司允许的镜像（需懂的人指导）。',
          '打开网页是空白/连不上：看终端是否还在跑 npm run dev；端口是否变成 5174。',
          'Cursor 打开错文件夹：看不到 package.json 就重新 Open Folder。',
          'AI 乱装新库：回复「不要新增依赖，只用现有 React」。',
        ],
      },
    ],
    checklist: [
      'nodejs.org 安装 LTS，node -v 有版本号',
      'my-landing 能 npm run dev 打开',
      'Cursor 打开的是含 package.json 的根目录',
      '页面已有 Hero/Features/FAQ/Footer',
      'npm run build 通过',
    ],
    refs: [
      { label: 'Node.js', url: 'https://nodejs.org/' },
      { label: 'Vite 文档', url: 'https://vite.dev/' },
    ],
  },

  'ai-landing-page': {
    intro: [
      '本地 localhost 只有你自己看得见。这一篇让你得到一个 https://xxx.vercel.app 链接，发给朋友手机也能打开。',
      '前提：上一篇「做网页」已能 npm run build；电脑已装 Cursor；需要一个免费 GitHub 账号。',
      '推荐路线：代码推到 GitHub → 用 Vercel 一键发布（点几下，不用买服务器）。',
    ],
    sections: [
      {
        title: '先注册 GitHub（没有账号就做）',
        paragraphs: [
          '① 打开 https://github.com/ → Sign up。',
          '② 用邮箱注册，按提示验证邮箱。',
          '③ 登录成功后右上角应有头像。把用户名记到备忘录（例如 yourname）。',
        ],
        steps: [
          '完成 GitHub 注册并验证邮箱。',
          '浏览器收藏 github.com。',
        ],
        links: [{ label: 'GitHub 注册', url: 'https://github.com/signup' }],
      },
      {
        title: '部署前：确认本地能 build',
        paragraphs: [
          '在 Cursor 打开 my-landing，下方终端进入项目根（能看到 package.json）。',
          '执行：npm run build',
          '成功：出现 dist 文件夹。再执行 npm run preview，浏览器打开提示的地址，页面应正常。',
          '失败：把红字交给 Agent 修好再建仓库。',
        ],
        steps: [
          'npm run build 成功且有 dist/',
          'npm run preview 肉眼检查一页',
        ],
      },
      {
        title: '把代码放到 GitHub（小白版）',
        paragraphs: [
          '① 打开 https://github.com/new → Repository name 填 my-landing → Public → 不要勾选 Add README → Create repository。',
          '② 页面会出现「…or push an existing repository」几行命令。回到 Cursor 终端（项目根）依次执行（把 YOURUSER 换成你的用户名）：',
          'git init',
          'git add .',
          'git commit -m "ready to deploy"',
          'git branch -M main',
          'git remote add origin https://github.com/YOURUSER/my-landing.git',
          'git push -u origin main',
          '③ 若要登录：按提示在浏览器授权 GitHub，或使用 Personal Access Token（GitHub 文档有说明）。',
          '④ 成功标准：刷新 GitHub 仓库页，能看见 src、package.json 等文件。',
        ],
        steps: [
          '新建空仓库 my-landing（无 README）。',
          '本地 commit 并 push 成功。',
          '网页上能浏览到代码。',
        ],
        tip: '若提示 git 不是命令：先安装 https://git-scm.com/download/win （Mac 通常已有或装 Xcode CLI）。装完重开终端。',
        links: [
          { label: '新建仓库', url: 'https://github.com/new' },
          { label: 'Git for Windows', url: 'https://git-scm.com/download/win' },
        ],
      },
      {
        title: 'Vercel 一键上线（推荐，逐步点）',
        paragraphs: [
          '① 打开 https://vercel.com/ → Sign up → 选 Continue with GitHub → 授权。',
          '② 点 Add New… → Project → 在列表里找到 my-landing → Import。',
          '③ Framework Preset 应识别为 Vite；Build Command 保持 npm run build；Output Directory 保持 dist。',
          '④ 点 Deploy，等 1～3 分钟出现 Congratulations。',
          '⑤ 点 Visit 打开 https://某个名字.vercel.app —— 这就是你的公网链接。复制发给手机浏览器试开。',
          '⑥ 以后在本地改代码 → git add . → git commit -m "update" → git push，Vercel 一般会自动重新发布。',
        ],
        steps: [
          '用 GitHub 登录 Vercel 并 Import 仓库。',
          'Deploy 成功并拿到 .vercel.app 链接。',
          '手机能打开该链接。',
        ],
        links: [{ label: 'Vercel', url: 'https://vercel.com' }],
      },
      {
        title: 'GitHub Pages 路线（静态托管）',
        paragraphs: [
          'Vite 需在 vite.config.ts 设 base: \'/my-landing/\'（仓库名），否则资源 404。',
          '安装 gh-pages：npm i -D gh-pages；package.json scripts 加 "deploy": "npm run build && gh-pages -d dist"',
          'GitHub 仓库 Settings → Pages → Source 选 gh-pages 分支 / root。',
        ],
        steps: [
          'vite.config.ts 增加 base 路径（与 repo 名一致）。',
          'npm run deploy，首次可能需 gh auth login。',
          'Pages 显示 https://用户名.github.io/my-landing/',
        ],
        links: [{ label: 'GitHub Pages 文档', url: 'https://docs.github.com/pages' }],
      },
      {
        title: '落地页文案与 CTA 检查',
        paragraphs: [
          '用 AI 改文案前定结构：首屏标题 10 字内、副标题 20 字、主 CTA 动词开头（「免费试读」「立即下载」）。',
          'Agent prompt：「只改文案不改布局：标题突出【今晚可上线】，CTA 按钮改为【获取演示链接】。」',
          '表单可先 mock：按钮点 alert 或 mailto，再接真实 API。',
        ],
        steps: [
          '检查线上首屏加载 <3s（Vercel 一般 OK）。',
          '手机打开链接测 CTA 可点区域够大。',
          '分享链接给同事做 5 秒看懂测试。',
        ],
      },
      {
        title: '上线自检清单',
        paragraphs: [
          'HTTPS 绿锁；无 mixed content 警告。',
          'favicon 不 404（public/favicon.ico）。',
          '404 页（Vercel 默认可配）。',
          '若用环境变量：Vercel Project Settings → Environment Variables，勿把 secret 写进前端 VITE_ 除非公开。',
        ],
        steps: [
          '桌面+移动各访问一次。',
          '检查页脚版权年份。',
          '记录生产 URL 到 README。',
        ],
      },
    ],
    checklist: [
      'npm run build 成功',
      '代码已 push GitHub',
      'Vercel 或 GitHub Pages 有可访问 URL',
      '移动端首屏正常',
      'CTA 按钮可点击',
    ],
  },

  'ai-build-miniprogram': {
    intro: [
      '目标：产出微信小程序「首页 + 列表 + 详情」三页骨架（wxml/wxss/js/json），可导入微信开发者工具预览。',
      '官方路径：注册小程序账号拿 AppID → 装开发者工具 → 新建/导入项目 → 编译预览。测试阶段可用测试号。',
    ],
    sections: [
      {
        title: '注册账号并拿到 AppID（官方必做）',
        paragraphs: [
          '打开微信公众平台 https://mp.weixin.qq.com/ → 立即注册 → 选「小程序」。',
          '邮箱需未被公众平台占用；激活后选主体（个人/企业），按指引完成主体信息。',
          '登录后台 → 开发 → 开发管理 → 开发设置 → 复制 AppID（形如 wx…）。这是小程序身份证，和公众号 AppID 不是同一个。',
        ],
        steps: [
          '完成注册并邮箱激活。',
          '在开发设置页复制 AppID 存到备忘录。',
          '若只想先练手：开发者工具新建时可选用测试号（能力有限，不能正式发布）。',
        ],
        links: [
          { label: '小程序快速开始', url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html' },
          { label: '公众平台注册', url: 'https://mp.weixin.qq.com/' },
        ],
      },
      {
        title: '安装微信开发者工具 + 目录结构',
        paragraphs: [
          '下载页：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html — 按 Windows / macOS 选稳定版安装包。',
          '安装路径尽量无中文、无空格。装完用管理员/开发者微信扫码登录。',
          '项目结构：app.json（全局页面路由）、app.wxss、app.js；每页 pages/xxx 含 .wxml .wxss .js .json。',
        ],
        steps: [
          '安装并扫码登录开发者工具。',
          '新建小程序项目 → 选空目录 → 填 AppID（或测试号）→ 不使用云服务 → 创建。',
          '记下项目路径；用 Cursor Open Folder 打开同一目录，方便 AI 改代码。',
        ],
        links: [{ label: '开发者工具下载', url: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html' }],
      },
      {
        title: '用 AI 写 PRD 与页面清单',
        paragraphs: [
          'Agent prompt（复制改业务）：',
          '「我要做【在线课程】小程序 MVP。先输出 PRD markdown：用户角色、三页（首页推荐课、课程列表、课程详情）、页面间跳转（首页→列表→详情）。不要写代码，只要 PRD。」',
          '确认 PRD 后再要代码，避免一次生成过乱。',
        ],
        steps: [
          '保存 PRD 为 docs/prd.md。',
          '人工确认三页名称与跳转箭头合理。',
        ],
      },
      {
        title: '生成 wxml/wxss 草稿',
        paragraphs: [
          'Agent prompt：',
          '「按 docs/prd.md，在本微信小程序项目生成 pages/index、pages/list、pages/detail。每页 wxml 含占位文案与按钮；wxss 简洁；js 只含 data 与 navigateTo 跳转；更新 app.json pages 数组与 window 标题。不要引入未声明 npm 包。」',
        ],
        steps: [
          'Apply 后打开 app.json 检查 pages 顺序第一项为首页。',
          'index 按钮 bindtap 跳 list，list 项跳 detail 带 id 参数。',
          'detail 接收 options.id 显示在页面。',
        ],
      },
      {
        title: '导入微信开发者工具预览',
        paragraphs: [
          '开发者工具 → 导入项目 → 目录选小程序根 → AppID 选测试号或自有。',
          '编译后左侧模拟器应显示首页；点按钮能跳转。',
          'Console 红错：把报错贴回 Cursor Agent 修（常见：路径 pages 拼写、json 尾逗号）。',
        ],
        steps: [
          '导入并编译通过无红错。',
          '模拟器走通 index → list → detail。',
          '真机预览：工具栏预览 → 微信扫码（需登录开发者微信）。',
        ],
      },
      {
        title: '列表空态与常见权限',
        paragraphs: [
          '让 AI 加：列表无数据时 wxml 显示「暂无课程」；loading 用 wx.showLoading。',
          'request 合法域名：未配置时开发阶段可勾选「不校验合法域名」；上线前必须在公众平台配置服务器域名。',
          '用户头像昵称：新版需 button open-type 授权，勿用已废弃 API。',
        ],
        steps: [
          '列表页 data.courses 设 [] 看空态 UI。',
          '设假数据数组看列表渲染。',
          '记录上线前需替换 mock 为真实 API 的位置。',
        ],
      },
      {
        title: '从 AI 草稿到可审核的差距',
        paragraphs: [
          'AI 草稿不含：支付、登录、内容安全、隐私政策弹窗、ICP 备案关联。',
          '提交审核前需真实 AppID、类目、用户协议页面。',
          '图片资源放项目 images/ 目录，控制单包体积 <2MB 主包建议。',
        ],
        tip: '骨架阶段用占位图；上线前换正版素材与法务文案。',
      },
    ],
    checklist: [
      'app.json 注册三页',
      'index/list/detail 可跳转',
      '开发者工具编译无报错',
      '模拟器或真机预览通过',
      '知道合法域名与测试号区别',
    ],
  },

  'ai-build-app': {
    intro: [
      '在写 React Native / Flutter 代码之前，先用 AI 产出「信息架构 + 关键屏说明 + 组件清单」Markdown，交给开发或低代码工具实现。',
      '本教程产出 4 屏：登录、首页、详情、设置 — 含字段、按钮、导航关系。',
    ],
    sections: [
      {
        title: '用户故事与导航模型',
        paragraphs: [
          '先写 3 条用户故事：「作为学员，我想浏览课程列表，以便选课」「作为学员，我想看详情并收藏」「作为用户，我想手机号登录」。',
          '导航：Tab 底栏（首页、我的）+ Stack  push 详情；登录屏独立 Stack。',
        ],
        steps: [
          'Agent：「根据以下用户故事，输出 IA markdown：Tab 结构、Stack 页面栈、每屏入口出口。」',
          '粘贴你的用户故事与 App 名【知略】。',
          '保存为 docs/ia.md。',
        ],
      },
      {
        title: '关键屏 wireframe 描述',
        paragraphs: [
          '每屏用固定模板：Screen 名、目的、布局区块（上中下）、组件列表、交互、空态/错误态。',
          'Agent prompt：',
          '「按 docs/ia.md，写 4 屏规格：Login、Home、CourseDetail、Settings。每屏 markdown 含：组件树 bullet、主要文案占位、按钮动作、需要的路由参数。不要写代码。」',
        ],
        steps: [
          '检查 Home 是否含：搜索框、课程卡片列表、下拉刷新说明。',
          'CourseDetail 是否含：封面图、标题、价格、购买按钮、收藏 icon。',
          'Login 是否含：手机号、验证码、获取验证码倒计时。',
        ],
      },
      {
        title: 'React Native / Flutter 选型 prompt',
        paragraphs: [
          '若团队用 RN：「将 Settings 屏规格转为 React Native 组件清单：用 FlatList / SafeAreaView，样式 StyleSheet，导航 React Navigation 6。」',
          '若 Flutter：「同上屏用 Widget 树：Scaffold、AppBar、ListTile。」',
          '只生成一个屏的代码作试点，不要一次生成全 App。',
        ],
        steps: [
          '选 RN 或 Flutter 一句定栈。',
          'Agent 只生成 Login.tsx 或 login_page.dart 单文件。',
          '人工审：导航库版本、目录 lib/screens/ 是否与团队一致。',
        ],
      },
      {
        title: '导出给开发者的交付包',
        paragraphs: [
          'docs/ 下应有：ia.md、screens/*.md、api-contract.md（接口占位）。',
          'api-contract 示例：GET /courses、GET /courses/:id、POST /auth/login-code。',
          '组件清单表：组件名 | 类型 | 复用屏 | 状态（mock/待开发）。',
        ],
        steps: [
          'Agent：「汇总 docs/screens 为表格 CSV markdown：屏|组件|交互|API」。',
          'zip docs/ 或 push Git 发给开发。',
          '开 issue 列表：每屏一个 ticket。',
        ],
      },
      {
        title: '原型工具补充（可选）',
        paragraphs: [
          'v0.dev / Figma AI：把 screens.md 一节粘贴生成视觉稿，对齐后再编码。',
          '注意：AI 视觉稿与 RN 组件不是 1:1，需开发换算 spacing。',
          '关键业务流程（登录→购课）画 1 条 sequence 文字描述即可。',
        ],
        tip: '说明稿阶段不写具体色值也可，但写清信息优先级：标题 > 价格 > 辅助说明。',
      },
    ],
    checklist: [
      'docs/ia.md 含 Tab 与 Stack',
      '4 屏规格 markdown 完成',
      '每屏有组件树与按钮动作',
      '有 api-contract 占位',
      '可选：单屏 RN/Flutter 试点代码',
    ],
  },

  'ai-image-gen': {
    intro: [
      '生图稳定公式：主体 + 风格 + 光线 + 构图 + 用途比例。写越具体，「差不多」越少。',
      '本教程覆盖 Midjourney 参数、DALL·E 对话式生图、国内工具注意点，各给可复制 prompt。',
    ],
    sections: [
      {
        title: '工具地图与选型',
        paragraphs: [
          'Midjourney：Discord 或 Web；擅长美学、插画；参数 --ar --v --s 等。',
          'DALL·E：ChatGPT 内或 API；对话式改图方便；适合快速草图。',
          'Stable Diffusion：本地或云端；可控性高；需显卡或租 GPU。',
          '国内：通义万相、即梦、文心一格等；中文 prompt 友好，注册即用网页/App。',
        ],
        links: [
          { label: 'Midjourney', url: 'https://www.midjourney.com' },
          { label: 'OpenAI DALL·E', url: 'https://openai.com/dall-e-3' },
        ],
      },
      {
        title: '提示词结构：主体 + 风格 + 光线 + 构图',
        paragraphs: [
          '主体：谁/什么、在做什么、关键道具 — 「一位亚洲女性讲师站在白板前讲解 AI 课程」。',
          '风格：扁平插画 / 3D 粘土 / 摄影写实 / 赛博朋克 — 写 1 个主风格 + 参考「像 Apple 发布会 KV」。',
          '光线：柔和侧光、工作室三点布光、黄金时刻户外。',
          '构图：居中特写、三分法、俯拍、留白给标题区。',
        ],
        steps: [
          '用四要素各写一句，拼成一段英文或中文 prompt（Midjourney 英文常见）。',
          '例：「Asian female instructor presenting at whiteboard, flat illustration, soft studio lighting, rule of thirds, large copy space on right, teal and orange palette」',
        ],
      },
      {
        title: 'Midjourney 比例与参数',
        paragraphs: [
          '比例：封面横图 --ar 16:9；公众号头图 --ar 2.35:1；海报竖版 --ar 2:3；头像 --ar 1:1。',
          '常用：--v 6（版本以当前为准） --stylize 100 --quality 1。',
          '完整示例：/imagine prompt: online course hero banner, laptop and coffee, minimal 3D, morning light, copy space top --ar 16:9 --v 6',
        ],
        steps: [
          '在 MJ 输入上述 imagine 一行。',
          'Upscale 选中一张；Vary 微调。',
          '记笔记：哪组词导致文字乱码（MJ 常乱写文字，少要求精确文字）。',
        ],
      },
      {
        title: 'DALL·E 对话式生图',
        paragraphs: [
          'ChatGPT 选带 DALL·E 的模型 → 直接中文：',
          '「生成一张知识付费 App 封面，扁平插画，蓝绿渐变，中央一本打开的书发出光，无文字，16:9。」',
          '追问：「把光线改暖色，右侧留 30% 空白给标题。」',
          '下载：点图片保存；API 用户用 images.generate 端点。',
        ],
        steps: [
          '同一主题连改 3 轮，只改一个变量（光线/色/构图）。',
          '对比哪轮最接近商用。',
        ],
      },
      {
        title: '负面提示与后期',
        paragraphs: [
          'Midjourney 可用 --no text, blurry, extra fingers, watermark',
          '国内工具常有「负向提示词」框：低质量、糊、畸形手、多余 limbs。',
          '出图后：Canva/Figma 加真实标题与 Logo；AI 不擅精确排版文字。',
        ],
        steps: [
          '每张图检查：手指、文字、Logo 假字。',
          'Export PNG 2x；网页用 WebP 压缩。',
          '批量 4 张选 1，建立「可用 prompt 库」。',
        ],
      },
      {
        title: '国内工具简要流程',
        paragraphs: [
          '通义万相 wanxiang.aliyun.com：登录 → 文本生图 → 填 prompt → 选比例 → 生成 → 下载。',
          '即梦、豆包生图：App 或网页，支持中文风格词「国潮」「水墨」等。',
          '注意：商用授权以各平台用户协议为准；重要项目保留生成记录与协议截图。',
        ],
        tip: '海报要稳定系列感：固定「风格一句 + 色板 hex + 构图模板」，只换主体与文案区。',
      },
    ],
    checklist: [
      '写过主体/风格/光线/构图四要素',
      'Midjourney 或 DALL·E 各出至少 1 张',
      '用过 --ar 或等价比例设置',
      '用过负面词减瑕疵',
      '图后期加真实文字（非 AI 乱码）',
    ],
  },

  'newbie-first-week': {
    intro: [
      '这不是「看完就算学完」的目录，而是 7 天可打勾清单：每天约 30 分钟，做完一项打一项。',
      '顺序刻意设计：先建立正确预期 → 装好工具 → 会提问 → 能办公 → 懂密钥底线 → 再决定往工具还是作品线走。',
    ],
    sections: [
      {
        title: 'Day1：搞懂 AI 能做什么 + 第一次对话',
        paragraphs: [
          '打开任意聊天产品（Kimi / 通义 / ChatGPT / Claude 网页均可）。',
          '连续问三件事：解释一个你不懂的概念；把一段乱笔记整理成条目；根据你的工作写一封短邮件草稿。',
        ],
        steps: [
          '读完本站「大模型是什么」教程前两节（或不读直接做）。',
          '把三次对话截图或复制到笔记，标：有用 / 胡扯 / 要改。',
          '写下一条原则：重要数字和人名我自己核对。',
        ],
      },
      {
        title: 'Day2：下载安装与账号登录',
        paragraphs: ['按「下载与安装指南」完成至少一种：浏览器账号登录 +（可选）官方客户端。若打算写代码，今天只装 Cursor，不必配 API。'],
        steps: [
          '从官网完成登录，能稳定发消息。',
          '若装 Cursor：完成 Open Folder + Ctrl+L 改一个 txt。',
          '把下载页书签存进浏览器「AI 工具」文件夹。',
        ],
      },
      {
        title: 'Day3：四段式提示词练 3 个真实任务',
        paragraphs: [
          '模板：你是【角色】。任务：【目标】。约束：【长度/语气/禁止】。输出：【格式】。',
          '三个任务建议：改一段工作周报；解释报错一句中文；把会议口述转待办表。',
        ],
        steps: [
          '每个任务先写「坏提示」再写「四段式」，对比输出。',
          '把最好的一条存成个人模板。',
        ],
      },
      {
        title: 'Day4：办公四场景各练一次',
        paragraphs: ['邮件、纪要待办、PPT 大纲、调研摘要——各用一条完整 prompt 跑通，再人工改数字与责任人。'],
        steps: [
          '邮件：写清收件人关系与是否需要行动号召。',
          '纪要：强制表格列「事项 | 负责人 | 截止日期」。',
          'PPT：要求「一页一观点 + 演讲备注」。',
          '调研：要求「不确定处标注待核实」。',
        ],
      },
      {
        title: 'Day5：API Key 安全自查',
        paragraphs: ['即使你还没调 API，也要懂：密钥=密码；不能贴进公开仓库、群聊截图、前端代码。'],
        steps: [
          '读「API Key 安全」教程并完成 checklist。',
          '检查自己电脑：有没有把 Key 写在桌面记事本？有则立刻作废并轮换。',
          'Git 仓库确认 .gitignore 含 .env。',
        ],
      },
      {
        title: 'Day6：选方向预习',
        paragraphs: [
          '工具线：Cursor 日常改代码、配模型、看 MCP。',
          '作品线：做网页 / 小程序 / 生图。',
          '今天只预习一篇完整正文的前两节，并列出明天要跟做的 3 个步骤。',
        ],
        steps: [
          '在「学习路径」里点开对应等级。',
          '收藏 1 篇教程，写「卡住时回看哪一节」。',
        ],
      },
      {
        title: 'Day7：复盘',
        paragraphs: ['列出本周：AI 代劳节省的时间；翻车 1 次及原因；下周只练一个深度技能（例如 Cursor Agent 或落地页）。'],
        steps: [
          '写 5 条「会交给 AI / 必须自己做」清单。',
          '在「我的进度」勾选本周已完成步骤。',
          '把未完成项挪到下周 Day1。',
        ],
        tip: '进度不在于学完多少课名，而在于你本周是否真实用 AI 交付过一件事。',
      },
    ],
    checklist: [
      'Day1～7 至少完成 5 天打勾',
      '有一条可复用四段式模板',
      '密钥自查通过',
      '选定工具线或作品线之一继续',
    ],
  },

  'ai-daily-office': {
    intro: [
      '办公提效的正确姿势不是「一次让 AI 写完整 PPT」，而是：你定结构与事实，AI 填草稿，你改关键处。',
      '下面四套 prompt 可直接复制；每套练通一遍，通常能省下写初稿的大半时间。',
    ],
    sections: [
      {
        title: '邮件与公文',
        paragraphs: [
          '复制改括号：',
          '「你是职场写作助手。收件人：【同事/上级/客户】。目的：【告知/请求/道歉】。语气：【简洁专业】。正文不超过 200 字。已知事实：【粘贴要点】。先给主题行 3 选 1，再给正文。不要编造未提供的日期与金额。」',
        ],
        steps: [
          '用真实场景发一封（或存草稿）。',
          '人工核对：称呼、日期、数字、承诺句。',
        ],
      },
      {
        title: '会议纪要 → 待办',
        paragraphs: [
          '把录音转写或凌乱笔记贴进去，要求：',
          '「整理为：1）决议 2）待办表（事项|负责人|截止日期|依赖）3）未决问题。信息不足标【待确认】，禁止编造负责人。」',
        ],
        steps: [
          '输出后把待办贴进飞书/Notion/Excel。',
          '给每位负责人发确认（AI 不能替人承诺）。',
        ],
      },
      {
        title: 'PPT 大纲',
        paragraphs: [
          '「主题：【】。听众：【】。时长：【10 分钟】。输出 8 页大纲：每页标题 + 3 个要点 + 演讲备注 2 句。风格咨询汇报，禁止空洞形容词堆砌。」',
          '确认大纲后再让 AI「把第 3 页扩成演讲稿」，逐页生成比一次写满更好控。',
        ],
        steps: ['大纲过目删减到 ≤10 页', '关键页自己写数据来源脚注'],
      },
      {
        title: '快速调研',
        paragraphs: [
          '「研究问题：【】。请拆成 5 个子问题；对每个子问题给出：可能答案、需要的证据类型、我应去哪类官网/文档核对。不要假装已上网检索。」',
          '拿到清单后你自己打开官网核对；再让 AI 根据你粘贴的摘录写摘要。',
        ],
        tip: '调研类任务：先要「检索计划」，再要「基于摘录的摘要」，幻觉会少很多。',
      },
      {
        title: '表格与复核清单',
        paragraphs: [
          '描述表格：「列：姓名,部门,入职日期。任务：找出入职超 3 年的人，输出 Markdown 表。」',
          '复核清单：数字、人名、日期、对外承诺、法律用语 — 五项必人工看一眼。',
        ],
        steps: ['打印或置顶这份复核清单', '本周每份 AI 草稿打勾复核'],
      },
    ],
    checklist: ['邮件/纪要/PPT/调研各练 1 次', '每份输出做过数字与人名核对', '有固定复核习惯'],
  },

  'tool-pick-compare': {
    intro: [
      '【AI编程工具与智能体安装】里，每个软件一篇独立教程：先讲它擅长什么，再讲下载、登录、API Key。',
      'Claude Code / Codex 等多 CLI 的密钥，推荐再用《CC Switch 安装》统一管理，避免手改一堆配置文件。',
    ],
    sections: [
      {
        title: '每个工具主要擅长什么',
        paragraphs: [
          'Cursor：日常写功能、多文件改动、可视化看 Diff；新手最容易上手的 AI IDE。',
          'Claude Code：终端里长任务、仓库级重构、边跑命令边改；适合「丢给 Agent 干完再验收」。',
          'Codex CLI：OpenAI 生态下的终端编程智能体；和 ChatGPT/OpenAI 账号体系更近。',
          'GitHub Copilot：行内补全最快、GitHub 集成深；适合已有 VS Code、主要想加速敲代码。',
          'Windsurf：Cascade 代理式改多文件，偏「让 AI 多走几步」。',
          'Trae：中文场景友好的 AI IDE，国内用户常作 Cursor 替代选项之一。',
          'CC Switch：不写代码，专管 Claude Code / Codex / Gemini CLI 等工具的供应商与 API Key 一键切换。',
        ],
        tip: '登录（订阅账号）和 API Key（按量密钥）是两条路：可以只走登录；额度不够或要用中转时再配 Key。',
      },
      {
        title: '登录 vs API Key（别混）',
        paragraphs: [
          '登录：用 Google/GitHub/手机号进官方账号，适合个人订阅用户。',
          'API Key：在平台控制台创建 sk-… 密钥，填进工具或 CC Switch；适合开发者、多供应商、中转站。',
          '密钥=密码：不发微信群、不提交 Git、不截图完整 Key。',
        ],
        steps: [
          '先选定主工具并完成「能改一个文件」。',
          '若要用自备 Key：先读《CC Switch 安装》（CLI）或工具内 Settings（IDE）。',
        ],
      },
      {
        title: '建议安装顺序',
        paragraphs: [
          '1）装主编程工具（如 Cursor 或 Claude Code）并验证能干活。',
          '2）若主工具是 Claude Code / Codex：再装 CC Switch，把 API Key 收进去。',
          '3）IDE（Cursor/Windsurf/Trae）优先用软件内登录；自备 OpenAI 兼容 Key 时在 Settings 填 Base URL + Key。',
        ],
        steps: [
          '写下：主工具 = ____；是否需要 CC Switch = 是/否。',
          '打开对应安装教程跟做。',
        ],
      },
    ],
    checklist: ['能说出主工具擅长什么', '分清登录与 API Key', '需要时打开了 CC Switch 教程'],
    refs: [
      { label: 'CC Switch 官网', url: 'https://ccswitch.io' },
      { label: 'CC Switch GitHub', url: 'https://github.com/farion1231/cc-switch' },
      { label: 'Cursor 下载', url: 'https://cursor.com/download' },
      { label: 'Claude Code', url: 'https://code.claude.com/docs/en/overview' },
    ],
  },

  'install-cc-switch': {
    intro: [
      'CC Switch（官方站 https://ccswitch.io ，源码 https://github.com/farion1231/cc-switch）是桌面应用：集中管理 Claude Code、Codex、Gemini CLI 等工具的供应商与 API Key，一键切换，少改配置文件。',
      '它不替代 Cursor/Claude Code 本身——先装好对应 CLI/工具，再用 CC Switch 管密钥。',
    ],
    sections: [
      {
        title: 'CC Switch 擅长什么',
        paragraphs: [
          '擅长：多供应商预设、一键启用、系统托盘切换、统一看用量（功能以当前版本为准）。',
          '不擅长：替你写业务代码；也不能代替「先把 claude / codex 命令装好」。',
          '官方支持工具包括：Claude Code、Claude Desktop、Codex、Gemini CLI、Grok Build、OpenCode、OpenClaw、Hermes 等（以 README 最新列表为准）。',
        ],
      },
      {
        title: '只从官方下载',
        paragraphs: [
          '官网：https://ccswitch.io',
          '下载页：打开 https://github.com/farion1231/cc-switch/releases ，选最新 Release。',
          'Windows：CC-Switch-v…-Windows.msi（安装版）或 Windows-Portable.zip（绿色版）。',
          'macOS：推荐 brew install --cask cc-switch；或下载 macOS.dmg。',
          'Linux：.deb / .rpm / AppImage 按发行版选。',
          '不要从百度网盘「破解版」或陌生站点下。',
        ],
        steps: [
          '浏览器打开 GitHub Releases 官方页。',
          '按自己的系统下载对应安装包。',
          '把 Releases 页加入书签。',
        ],
        links: [
          { label: 'ccswitch.io', url: 'https://ccswitch.io' },
          { label: 'GitHub Releases', url: 'https://github.com/farion1231/cc-switch/releases' },
          { label: '中文 README', url: 'https://github.com/farion1231/cc-switch/blob/main/README_ZH.md' },
        ],
      },
      {
        title: 'Windows / Mac 安装',
        paragraphs: [
          'Windows：双击 .msi 按向导安装 → 开始菜单打开 CC Switch；或解压 Portable 运行 exe。',
          'Mac Homebrew：终端执行 brew install --cask cc-switch；更新用 brew upgrade --cask cc-switch。',
          'Mac dmg：拖进应用程序后打开（官方称已签名公证，一般可直接开）。',
        ],
        steps: [
          '安装完成并能打开主界面。',
          '若已装 Claude Code/Codex：首次可按提示导入现有配置作为默认供应商。',
        ],
      },
      {
        title: '登录与添加供应商（填 API Key）',
        paragraphs: [
          'CC Switch 本身主要是本地配置管理；「登录」通常指：让 Claude Code/Codex 走官方 OAuth，或在供应商里填 API Key。',
          '添加供应商（主界面）：点「添加供应商」→ 选预设或自定义。',
          '必填直觉：名称（自己认得）+ Base URL（供应商文档里的地址）+ API Key（sk-…，只显示一次要立刻保存到密码器）。',
          '勾选要作用的工具（如 Claude Code、Codex）→ 保存。',
          '在主界面选中该供应商 → 点「启用」；或从系统托盘点名称切换。',
        ],
        steps: [
          '准备好一把有效 API Key（来自官方控制台或你信任的合规供应商）。',
          '在 CC Switch 新增供应商并粘贴 Key（勿发给别人）。',
          '点启用。',
          '大多数工具需重启终端后再运行 claude 或 codex；Claude Code 当前支持热切换（以官方说明为准）。',
        ],
        tip: '想切回官方订阅登录：添加「官方登录」类预设并启用，再在 CLI 里走一遍 Log out / Log in。',
      },
      {
        title: '验证是否生效',
        paragraphs: [
          '新开一个终端窗口（重要）。',
          '进入练习目录，运行 claude 或 codex，发一句「只回复 ok」。',
          '若仍走旧账号/报 Key 错误：确认启用的是目标供应商、Base URL 有无多余空格、Key 未过期。',
        ],
        steps: [
          '重启终端后 CLI 能正常对话。',
          '备忘录记下：当前启用的供应商名称（不要写完整 Key）。',
        ],
      },
      {
        title: '安全清单',
        paragraphs: [
          '只从 ccswitch.io / 官方 GitHub Releases 下载。',
          'API Key 不进截图、不进公开仓库。',
          '数据默认在本机 ~/.cc-switch/（见官方 README）；卸载软件一般不抹掉你对 CLI 的最小可用配置（官方强调最小侵入）。',
        ],
      },
    ],
    checklist: [
      '从官方 Releases 安装成功',
      '添加过至少一个含 API Key 的供应商',
      '启用后新开终端验证 claude 或 codex',
      '知道如何切回官方登录预设',
    ],
    refs: [
      { label: '官网', url: 'https://ccswitch.io' },
      { label: 'Releases', url: 'https://github.com/farion1231/cc-switch/releases' },
      { label: '用户手册入口（仓库 docs）', url: 'https://github.com/farion1231/cc-switch' },
    ],
  },

  'install-claude-code': {
    intro: [
      'Claude Code 擅长：终端里做仓库级任务——重构、修 Bug、跑测试、提交流程。可视化点选改文件更适合 Cursor。',
      '本篇：安装 → 官方登录 →（可选）API Key / CC Switch。用法细节见「Claude Code 用法」。',
    ],
    sections: [
      {
        title: '擅长什么 / 不擅长什么',
        paragraphs: [
          '擅长：长程 Agent、跨文件改动、结合 git/命令行一次做完。',
          '不擅长：当你只想「看界面点一下」——那时用 Cursor 更爽。',
          '可与 Cursor 并存：日常 IDE 用 Cursor，重活丢给 Claude Code。',
        ],
      },
      {
        title: '官方安装（Windows / Mac）',
        paragraphs: [
          'Windows PowerShell：irm https://claude.ai/install.ps1 | iex',
          'Mac/Linux：curl -fsSL https://claude.ai/install.sh | bash',
          '备选：winget install Anthropic.ClaudeCode 或 brew install --cask claude-code',
          '验证：新开终端 → claude --version',
        ],
        steps: [
          '跑完安装命令。',
          'claude --version 有版本号。',
        ],
        links: [
          { label: 'Claude Code 概览', url: 'https://code.claude.com/docs/en/overview' },
          { label: 'Setup', url: 'https://code.claude.com/docs/en/setup' },
        ],
        tip: 'Windows 建议同时装 Git for Windows，便于 Bash 工具。',
      },
      {
        title: '登录：官方账号（OAuth）',
        paragraphs: [
          'cd 到练习目录 → 输入 claude',
          '按提示用浏览器登录 Claude / Anthropic 账号（订阅或 Console，以官网政策为准）。',
          '成功标准：能回答「用中文列出当前目录文件」。',
        ],
        steps: [
          '完成浏览器登录。',
          '完成一条只读验证。',
        ],
      },
      {
        title: '配置 API Key（两条路）',
        paragraphs: [
          '路 A — 继续只用官方登录：不必填 Key。',
          '路 B — 使用 API Key / 中转：在 Anthropic Console 或你的供应商处创建密钥，再用 CC Switch「添加供应商」填入 Base URL + API Key，勾选 Claude Code 并启用。',
          '不要把 Key 写进项目源代码。',
        ],
        steps: [
          '若走 Key：先打开本站《CC Switch 安装》完成启用。',
          '新开终端再运行 claude，确认走的是新供应商。',
        ],
        links: [{ label: 'CC Switch Releases', url: 'https://github.com/farion1231/cc-switch/releases' }],
      },
      {
        title: '排错',
        paragraphs: [
          'PowerShell/CMD 命令搞混；claude 找不到 → 重开终端。',
          '鉴权失败 → 重新登录或检查 CC Switch 当前启用的供应商与 Key。',
          '切换供应商后无变化 → 重启终端（Claude Code 热切换以官方说明为准）。',
        ],
      },
    ],
    checklist: [
      'claude --version 成功',
      '官方登录或 CC Switch Key 至少一条通路可用',
      '只读验证通过',
    ],
    refs: [
      { label: 'Overview', url: 'https://code.claude.com/docs/en/overview' },
      { label: 'CC Switch', url: 'https://ccswitch.io' },
    ],
  },

  'install-codex': {
    intro: [
      'Codex CLI 擅长：在 OpenAI / ChatGPT 生态里用终端 Agent 改仓库、跑任务。和「网页 Codex」不是同一安装入口。',
      '包名必须是 @openai/codex。装好后可官方登录，或用 CC Switch 管理 API Key。',
    ],
    sections: [
      {
        title: '擅长什么',
        paragraphs: [
          '擅长：熟悉 GPT/OpenAI 工作流的开发者；CLI 自动化与仓库任务。',
          '若你主要用 Claude 订阅：优先 Claude Code；两者可都装，按账号选。',
        ],
      },
      {
        title: '下载安装',
        paragraphs: [
          'Windows：powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"',
          'Mac/Linux：curl -fsSL https://chatgpt.com/codex/install.sh | sh',
          '或：brew install --cask codex；或 npm install -g @openai/codex（勿装错包名 codex）',
        ],
        steps: [
          '安装后新开终端能运行 codex。',
        ],
        links: [{ label: 'openai/codex', url: 'https://github.com/openai/codex' }],
      },
      {
        title: '登录',
        paragraphs: [
          'cd 练习目录 → 运行 codex → 按 CLI 提示完成 ChatGPT/OpenAI 登录或授权。',
          '先发只读任务验证。',
        ],
        steps: ['登录成功并完成只读验证'],
      },
      {
        title: 'API Key 与 CC Switch',
        paragraphs: [
          '需要 Key 时：打开 https://platform.openai.com/api-keys 创建密钥，立刻复制保存。',
          '推荐：打开 CC Switch → 添加供应商 → 填 OpenAI 或兼容 Base URL + API Key → 勾选 Codex → 启用。',
          '启用后新开终端再运行 codex（多数情况需重启终端）。',
        ],
        steps: [
          '创建并安全保存 API Key。',
          '用 CC Switch 启用到 Codex 并验证。',
        ],
        links: [
          { label: 'OpenAI API Keys', url: 'https://platform.openai.com/api-keys' },
          { label: 'CC Switch', url: 'https://ccswitch.io' },
        ],
      },
      {
        title: '排错',
        paragraphs: [
          '装错 npm 包名；命令不在 PATH；Key/账号无效；切换后未重启终端。',
        ],
      },
    ],
    checklist: [
      '能启动 codex',
      '登录或 API Key 通路可用',
      '只读验证通过',
    ],
    refs: [
      { label: 'Codex GitHub', url: 'https://github.com/openai/codex' },
      { label: 'CC Switch Releases', url: 'https://github.com/farion1231/cc-switch/releases' },
    ],
  },

  'install-copilot': {
    intro: [
      'GitHub Copilot 擅长：敲代码时的灰色行内补全、与 GitHub 仓库/PR 生态集成；Agent 能力因版本而异，整体偏「加速输入」而非「终端长任务」。',
      '主路径是 GitHub 账号登录订阅，一般不经过 CC Switch（CC Switch 主要管 Claude Code/Codex 等 CLI 配置）。',
    ],
    sections: [
      {
        title: '擅长什么',
        paragraphs: [
          '擅长：补全函数、写样板代码、在 VS Code 里低摩擦用 AI。',
          '若你要强 Agent 改整仓：同时装 Cursor 或 Claude Code。',
        ],
      },
      {
        title: '安装 VS Code + Copilot 扩展',
        paragraphs: [
          'VS Code：https://code.visualstudio.com/',
          '扩展市场搜 GitHub Copilot（发行者 GitHub）→ Install。',
        ],
        steps: ['VS Code 与 Copilot 扩展均显示已安装'],
        links: [{ label: 'VS Code', url: 'https://code.visualstudio.com/' }],
      },
      {
        title: '登录 GitHub',
        paragraphs: [
          '按弹窗 Sign in to GitHub → 浏览器授权。',
          '订阅说明见 https://github.com/features/copilot',
        ],
        steps: ['状态栏显示已登录且无错误'],
        links: [{ label: 'Copilot', url: 'https://github.com/features/copilot' }],
      },
      {
        title: 'API Key？',
        paragraphs: [
          '个人用户通常不需要手填 API Key，登录即用。',
          '企业/自备模型若产品提供「自带密钥」入口，按 VS Code 设置页说明填写；与 CC Switch 无必须关系。',
          '终端里的 Claude Code/Codex 密钥仍用《CC Switch 安装》管理。',
        ],
      },
      {
        title: '验证与排错',
        paragraphs: [
          '新建文件看灰色补全，Tab 接受；打开 Copilot Chat 问一句。',
          '无补全：查订阅、网络、是否被其他 AI 扩展抢焦点。',
        ],
        steps: ['补全或 Chat 至少一种验证通过'],
      },
    ],
    checklist: ['扩展已装', 'GitHub 已登录', '补全或 Chat 可用'],
  },

  'install-windsurf': {
    intro: [
      'Windsurf 擅长：Cascade 代理式、多步骤改项目，偏「让 AI 多自主走几步」的 AI IDE。',
      '安装后先账号登录验证；模型/API Key 在软件 Settings 里配（界面文案以当前版本为准）。CLI 密钥仍用 CC Switch。',
    ],
    sections: [
      {
        title: '擅长什么',
        paragraphs: [
          '擅长：Cascade 工作流、快速原型、Agent 风格编辑。',
          '和 Cursor 同属 AI IDE，二选一作主力即可，避免同时开两套抢快捷键。',
        ],
      },
      {
        title: '下载、安装、登录',
        paragraphs: [
          '打开 https://windsurf.com/download 下载对应系统包并安装。',
          '首次启动用 GitHub/Google/邮箱登录（以产品选项为准）。',
        ],
        steps: ['能打开主界面且已登录'],
        links: [{ label: 'Windsurf 下载', url: 'https://windsurf.com/download' }],
      },
      {
        title: '配置模型 / API Key',
        paragraphs: [
          '打开 Settings / 模型相关页：优先用账号自带额度。',
          '若提供「自备 API Key / OpenAI 兼容」：填 Base URL + Key，保存后新开 Cascade 再试。',
          '不要把 Key 写进项目仓库。',
        ],
        steps: [
          '找到设置里的模型或 API 入口并保存一次（哪怕暂用官方额度）。',
          'Cascade 完成一次改文件验证。',
        ],
      },
      {
        title: '和 CC Switch',
        paragraphs: [
          'Windsurf 是 IDE，密钥在 IDE 设置；CC Switch 主要服务 Claude Code/Codex 等 CLI。',
          '两套可同时存在，各管各的。',
        ],
      },
    ],
    checklist: ['已登录', '知道 Key/模型在哪配', 'Cascade 验证通过'],
  },

  'install-trae': {
    intro: [
      'Trae 擅长：中文界面与国内网络环境下的 AI 编程 IDE 体验，适合把 Cursor 当备选对比的用户。',
      '本篇：下载 → 登录 → 在设置里配模型/API Key → 改文件验证。',
    ],
    sections: [
      {
        title: '擅长什么',
        paragraphs: [
          '擅长：中文提示、本土化上手；完成「打开文件夹 + AI 改文件」闭环。',
          '深度 Agent/CLI：仍可另装 Claude Code + CC Switch。',
        ],
      },
      {
        title: '下载安装与登录',
        paragraphs: [
          '官网 https://www.trae.ai → Download → 安装 → 按引导登录（手机号/第三方以产品为准）。',
        ],
        steps: ['Trae 打开且登录稳定'],
        links: [{ label: 'Trae', url: 'https://www.trae.ai' }],
      },
      {
        title: '配置 API Key / 模型',
        paragraphs: [
          '打开设置（齿轮）：找到模型提供商、API Key 或「自定义服务商」一类入口。',
          '填写供应商提供的 Base URL（若需要）与 API Key → 保存。',
          '先用官方默认模型能聊天，再换成自备 Key，方便排查。',
        ],
        steps: [
          '设置页保存成功。',
          'AI 面板能回复「只回答 ok」。',
        ],
      },
      {
        title: '验证改文件 + 与 CC Switch',
        paragraphs: [
          'Open Folder → 让 AI 改 trae-ok.txt 一行内容并接受。',
          'CC Switch 不管 Trae IDE 内部设置；只在你同时用 Claude Code/Codex 时再装。',
        ],
        steps: ['完成一次改文件验证'],
      },
    ],
    checklist: ['已登录', '会找设置填 Key', '改文件成功'],
    refs: [{ label: 'Trae', url: 'https://www.trae.ai' }],
  },

  'claude-code': {
    intro: [
      '假设你已完成《Claude Code 安装》。本篇讲怎么下指令、怎么控权限，不再重复安装命令。',
    ],
    sections: [
      {
        title: '和 Cursor 怎么分工',
        paragraphs: [
          'Cursor：可视化编辑器里点选、看 diff、改多文件。',
          'Claude Code：终端里长任务、仓库级重构、边跑命令边改。',
          '可以两套都装：日常用 Cursor，重活丢给 Claude Code。',
        ],
      },
      {
        title: '仓库级指令写法',
        paragraphs: [
          '好指令：范围清晰 + 验收标准。「修复 src/auth.ts 登录失败无提示的问题；加测试；不要改无关文件。」',
          '坏指令：「把项目变好」——无法验收。',
        ],
        steps: [
          '选一个真实小问题试一次。',
          '要求它先 plan，你确认后再改。',
        ],
      },
      {
        title: '权限与危险操作',
        paragraphs: [
          '删除、强制推送、改生产配置：默认你自己做，或严格确认提示后再批。',
          '敏感仓库先在副本目录练习。',
        ],
        tip: '任何 rm / force push，默认拒绝，改由人工执行。',
      },
    ],
    checklist: [
      '会写带验收标准的指令',
      '做过一次 plan 后确认',
      '知道何时拒绝危险命令',
    ],
    refs: [{ label: 'Quickstart', url: 'https://code.claude.com/docs/en/quickstart' }],
  },

  'api-compatible': {
    intro: [
      '「OpenAI 兼容」= 你仍用 OpenAI SDK / Cursor 的 OpenAI 配置位，但把 Base URL 指到另一家网关（如 DeepSeek）。',
      '关键三件套：Base URL、API Key、模型名——三者必须属于同一供应商文档。',
    ],
    sections: [
      {
        title: '兼容接口在干什么',
        paragraphs: [
          '请求路径通常仍是 `/v1/chat/completions` 或供应商说明的等价路径。',
          'Header 仍是 `Authorization: Bearer <KEY>`（以该厂商文档为准）。',
          '模型名不能照抄 gpt-4o：DeepSeek 常用 `deepseek-chat` 等，以控制台模型列表为准。',
        ],
      },
      {
        title: '常见 Base URL（跟做前先核对官网）',
        paragraphs: [
          'OpenAI 官方：`https://api.openai.com/v1`',
          'DeepSeek：`https://api.deepseek.com`（OpenAI 兼容；是否带 /v1 以当前文档为准）',
          '其他国内网关：复制厂商「OpenAI Compatible」一节，不要凭记忆拼域名。',
        ],
        steps: [
          '打开供应商文档，复制官方 Base URL 到记事本。',
          '创建该厂商 API Key，勿与 OpenAI Key 混用。',
        ],
      },
      {
        title: '在 Cursor 里覆盖 Base URL',
        paragraphs: [
          'Cursor Settings → Models → 找到 OpenAI API Key / Override OpenAI Base URL（文案可能随版本微调）。',
          '填入网关 Base URL 与对应 Key；模型下拉或自定义填该厂商模型名。',
          '保存后新开 Chat，问一句「回复 ok」验证。',
        ],
        steps: [
          '配置保存成功。',
          '用 curl 或 Cursor 实测一轮对话。',
          '失败时对照：401=Key/鉴权；404=路径少 /v1；连接失败=网络或域名。',
        ],
      },
      {
        title: 'curl 验证模板',
        paragraphs: [
          '把 URL、KEY、MODEL 换成你的：',
          '`curl https://API_HOST/v1/chat/completions -H "Authorization: Bearer KEY" -H "Content-Type: application/json" -d "{\"model\":\"MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"ping\"}]}"`',
        ],
        tip: '先 curl 通再填 IDE，能少排一半「是不是 Cursor 坏了」的锅。',
      },
    ],
    checklist: ['三件套记录在私密处', 'curl 或 IDE 实测成功', '知道 401/404 分别查什么'],
  },

  'prompt-system': {
    intro: [
      'System Prompt 是「长期人格与边界」；User 消息是「本次任务」。工具（Function/MCP）的 description 则是模型决定何时调用的说明书。',
      '写好系统提示，比把规则重复贴进每一轮 User 更稳。',
    ],
    sections: [
      {
        title: 'System vs User',
        paragraphs: [
          'System：身份、允许/禁止、默认输出格式、不知道时怎么说。',
          'User：具体输入材料与当次目标。',
          '冲突时：多数产品以更具体的 User 指令为准，但安全拒答应优先 System。',
        ],
      },
      {
        title: '系统提示结构模板',
        paragraphs: [
          '1）身份：你是… 2）目标：帮助用户… 3）边界：不提供… 4）格式：默认 Markdown 5）工具：仅在…时调用 6）拒答：信息不足时列出缺失项。',
        ],
        steps: [
          '用模板写 10 行以内客服 Agent 设定。',
          '用同一 User 问题对比：无 System vs 有 System。',
        ],
      },
      {
        title: '工具描述怎么写',
        paragraphs: [
          'name 短且唯一；description 写清「何时用 / 何时不用」；parameters 用 JSON Schema 思维写清必填字段。',
          '含糊描述会导致乱调用或从不调用。',
        ],
        tip: 'description 里写反例：「不要用此工具查询天气」比只写正例更有效。',
      },
    ],
    checklist: ['写过完整 System 模板', '做过有/无 System 对比', '能解释工具 description 的作用'],
  },

  'rag-basics': {
    intro: [
      'RAG（Retrieval-Augmented Generation）：先检索你的文档片段，再让模型基于片段回答，用来压过期知识与胡编。',
      '最小闭环：切分文档 → 向量化入库 → 问句检索 Top-K → 把片段塞进提示词生成答案。',
    ],
    sections: [
      {
        title: '为什么需要 RAG',
        paragraphs: [
          '模型训练截止日后不知道你们公司新制度；纯聊天会编。',
          '把 PDF/Notion 全文塞进超长上下文：贵、且噪声大；RAG 只塞相关段。',
        ],
      },
      {
        title: 'Indexing：切片与 Embedding',
        paragraphs: [
          '按标题/段落切 200～800 token 一块，块之间可重叠几句。',
          '用 Embedding 模型把每块变成向量，存进向量库（或本地简易方案）。',
        ],
        steps: [
          '准备 10 页以内说明文档。',
          '按标题手动切 5～10 块，编号 D1…Dn（先理解再上框架）。',
        ],
      },
      {
        title: 'Retrieval + Generation',
        paragraphs: [
          '用户问题 → 同样 Embedding → 取最相似 Top-K 块。',
          '提示词：「仅根据以下资料回答；资料不足就说不知道。资料：… 问题：…」',
        ],
        steps: [
          '手工选 2 块相关资料，喂给聊天模型，看是否还会编造资料外事实。',
          '对比：不给资料时的回答差异。',
        ],
        tip: '上线前先做「无检索时必须拒答」测试，比盲目调参重要。',
      },
      {
        title: 'RAG vs 纯长上下文',
        paragraphs: [
          '文档少且总是同一份：有时长上下文更简单。',
          '文档多、常更新、要引用出处：RAG（或搜索工具）更合适。',
        ],
      },
    ],
    checklist: ['能口述 Indexing/Retrieval/Generation', '完成一次「带资料回答」实验', '知道何时不必上 RAG'],
  },

  'agent-tools': {
    intro: [
      'Agent = 模型 + 规划 + 工具调用 + 观察结果再决策。Function Calling 与 MCP 都是「把工具交给模型」的协议层。',
      '跟做目标：跑通 plan → tool → observe 一次，而不是背名词。',
    ],
    sections: [
      {
        title: '闭环长什么样',
        paragraphs: [
          '1）模型产出计划 2）选择工具并填参数 3）运行时执行工具 4）把结果塞回对话 5）继续或结束。',
          'Cursor Agent / Claude Code 都在 IDE/终端里替你完成 3）4）。',
        ],
      },
      {
        title: '跟做：触发一次真实 tool call',
        paragraphs: [
          '在 Cursor 配置好一个简单 MCP（见 mcp-install），或让 Agent「读取本仓库 README 并总结」。',
          '观察：是否出现工具调用记录 / 权限弹窗 / 文件读取痕迹。',
        ],
        steps: [
          '下达范围明确的任务。',
          '批准一次只读工具调用。',
          '核对结果是否来自真实文件而非臆测。',
        ],
      },
      {
        title: '失败时怎么拆',
        paragraphs: [
          '工具没触发：描述不清或未启用。',
          '触发但参数错：Schema/说明含糊。',
          '执行失败：环境、路径、权限。',
          '执行成功但结论错：要加「先引用工具输出再回答」。',
        ],
      },
    ],
    checklist: ['亲眼见过一次工具调用', '能区分计划失败与工具失败', '知道只读与写操作权限差异'],
  },

  'ai-image-brand': {
    intro: [
      '单张好看不难，难的是系列物料风格一致。方法：固定「风格句 + 色板 + 构图模板」，只替换主体与文案留白区。',
    ],
    sections: [
      {
        title: '品牌三件套',
        paragraphs: [
          '主色 1～2 个（写 hex，如 #0F3D3E / #E8A838）。',
          '字体感：衬线杂志 / 无衬线科技 / 手写温度——生图里用文字描述，最终 Logo 文字后期加。',
          '图形语言：圆角卡片 / 几何色块 / 插画人物比例。',
        ],
        steps: ['写成 5 行 Brand Brief 固定不动'],
      },
      {
        title: 'Reference 与系列封面',
        paragraphs: [
          '把 1 张已认可的图当风格参考（图生图 / style reference，视工具而定）。',
          '封面模板句：「同一构图：左侧插画主体，右侧 35% 留白；风格与参考图一致；色板…；无文字。」',
        ],
        steps: [
          '同一模板生成 3 张不同主题封面。',
          '并排对比，删掉漂移最大的一张，微调 Brief。',
        ],
      },
      {
        title: '尺寸与后期',
        paragraphs: [
          '常用：公众号头图约 2.35:1；海报 3:4；头像 1:1；网页 Hero 16:9。',
          'AI 出图后在 Canva/Figma 加真实标题与 Logo，避免模型乱字。',
        ],
        tip: '系列感来自重复约束，不是来自每次全新灵感词。',
      },
    ],
    checklist: ['有书面 Brand Brief', '同模板出过 ≥3 张', '文字与 Logo 为后期实字'],
  },

  'hallucination-defense': {
    intro: [
      '幻觉不是偶发 Bug，而是生成模型的默认风险：它会「补全看起来合理的句子」，不保证真。',
      '防御组合：要求引用、允许拒答、降低瞎编温度、关键处人工复核、代码必须跑通。',
    ],
    sections: [
      {
        title: '幻觉常见类型',
        paragraphs: [
          '事实：捏造论文、政策、历史事件。',
          '数字：金额、百分比、版本号编造。',
          '引用：伪造链接与书名。',
          '代码：不存在的 API、过时包名。',
        ],
      },
      {
        title: '提示词层：引用与拒答',
        paragraphs: [
          '加句：「仅使用我提供的资料；资料没有的说『未知』；回答末尾列出引用条目。」',
          '无资料任务：要求「列出你不确定的点」，比强行给答案安全。',
        ],
        steps: [
          '用一段真实摘录问事实题，检查是否引用摘录。',
          '故意问摘录外细节，看是否拒答。',
        ],
      },
      {
        title: '代码与上线',
        paragraphs: [
          '锁定语言/框架版本；让 AI 改完你跑测试与类型检查。',
          '不相信「应该可以」——以本地命令输出为准。',
        ],
        tip: '对外发布的数字、法律、医疗建议：必须有人类负责人签字。',
      },
    ],
    checklist: ['会写引用+拒答约束', '完成一次「未知」诱导测试', '代码改动以测试结果验收'],
  },

  'cost-control': {
    intro: [
      'Agent 会循环调用模型，账单可比「聊两句」高一个数量级。先设预算与告警，再追求自动化。',
    ],
    sections: [
      {
        title: '看懂账单维度',
        paragraphs: [
          '按模型拆：贵模型只用于难推理；日常补全用小模型。',
          '按功能拆：Chat / Embeddings / Images 分开看。',
          '输入 Token 常比输出多：少贴无关大文件。',
        ],
      },
      {
        title: '控制台预算与 Hard Limit',
        paragraphs: [
          '在 OpenAI/各云控制台设置月度预算与邮件告警（名称因厂商而异）。',
          '能设硬限额就设：到额停服，好过睡一觉账单爆炸。',
        ],
        steps: [
          '打开你在用的厂商 Billing/Usage 页。',
          '设置告警阈值（如月预算 80%）。',
          '记录当前主要模型单价（官网 Pricing）。',
        ],
      },
      {
        title: '路由与 429',
        paragraphs: [
          '默认小模型；复杂任务再升级大模型。',
          '429 限流：指数退避重试；降并发；换时段；检查是否误循环 Agent。',
          '上下文：设合理 max_tokens；长历史要摘要，别无限追加。',
        ],
        tip: '本地开发用便宜模型；发布流水线再允许贵模型。',
      },
    ],
    checklist: ['Usage 页会看', '已设预算或告警', '有小模型默认策略'],
  },
}

export function getTutorialBody(id: string): TutorialBody | undefined {
  return TUTORIAL_BODIES[id]
}
