/**
 * 用 gpt-image-2 为每门教程生成封面海报。
 * 用法（PowerShell）:
 *   $env:OPENAI_API_KEY="sk-xxx"
 *   $env:OPENAI_BASE_URL="https://api.apiyi.com/v1"   # 按你的中转改
 *   node scripts/generate-covers.mjs
 *   node scripts/generate-covers.mjs --only ai-build-miniprogram
 * 密钥切勿写入仓库。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'covers')

const API_KEY = process.env.OPENAI_API_KEY || process.env.IMAGE2_API_KEY || ''
const BASE_URL = (process.env.OPENAI_BASE_URL || process.env.IMAGE2_BASE_URL || 'https://an520.xin/v1').replace(
  /\/$/,
  '',
)
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2'
const SIZE = process.env.COVER_SIZE || '1536x1024'
const CONCURRENCY = Math.max(1, Number(process.env.COVER_JOBS || 2))

/** @type {{ id: string, title: string, hook: string, theme: string }[]} */
const COURSES = [
  { id: 'ai-what-is', title: 'AI 是什么', hook: '模型与应用边界', theme: '抽象神经网络与书本光晕' },
  { id: 'ai-first-chat', title: '第一次对话', hook: '发出第一条有效消息', theme: '对话框与晨光桌面' },
  { id: 'ai-download-guide', title: '下载安装指南', hook: '官方入口一次找齐', theme: '下载箭头与电脑屏幕' },
  { id: 'ai-account-setup', title: '账号注册', hook: '手机号登录与隐私设置', theme: '手机验证码与钥匙' },
  { id: 'newbie-first-week', title: '第一周入门', hook: '七天学会提问与安装', theme: '日历与学习路径' },
  { id: 'prompt-basics', title: '提示词基础', hook: '角色目标约束格式', theme: '结构化文字卡片与铅笔' },
  { id: 'ai-daily-office', title: 'AI 办公', hook: '邮件纪要与表格', theme: '办公桌与文档飞页' },
  { id: 'api-keys-security', title: '密钥安全', hook: 'Key 不进仓库', theme: '盾牌与模糊密钥字符串' },
  { id: 'tool-pick-compare', title: '工具选型', hook: '国内直连优先', theme: '地图分岔路与工具箱' },
  { id: 'install-trae', title: 'Trae 安装', hook: '不翻墙 AI IDE', theme: '深色编辑器与中文界面' },
  { id: 'install-lingma', title: '通义灵码', hook: 'VS Code 国内插件', theme: '橙色阿里云风格与代码补全' },
  { id: 'install-cc-switch', title: 'CC Switch', hook: 'API Key 一键切换', theme: '开关旋钮与终端窗口' },
  { id: 'cursor-install', title: 'Cursor 安装', hook: '可选海外网络', theme: 'Cursor 立方体标志氛围' },
  { id: 'install-claude-code', title: 'Claude Code', hook: '终端强 Agent', theme: '橙色星芒与命令行' },
  { id: 'install-codex', title: 'Codex 安装', hook: 'OpenAI 系 CLI', theme: '绿色结形与终端' },
  { id: 'install-copilot', title: 'Copilot', hook: 'GitHub 补全', theme: 'GitHub 风格头像剪影与代码' },
  { id: 'install-windsurf', title: 'Windsurf', hook: 'Cascade 编程', theme: '蓝色浪尖与编辑器' },
  { id: 'cursor', title: 'Cursor 用法', hook: 'Chat Agent Rules', theme: '分屏改代码工作台' },
  { id: 'cursor-rules', title: 'Cursor Rules', hook: '项目规则写稳', theme: '规则书卷与齿轮' },
  { id: 'claude-code', title: 'Claude Code 用法', hook: '终端 Agent 工作流', theme: '终端光标与任务清单' },
  { id: 'api-openai', title: 'OpenAI API', hook: '密钥与请求示例', theme: '绿色结与 JSON 代码块' },
  { id: 'api-compatible', title: '兼容网关', hook: 'Base URL 对照', theme: '网关桥梁与 API 路径' },
  { id: 'domain-api-cheatsheet', title: '域名速查', hook: 'Base URL 复制即用', theme: '地球域名与清单卡片' },
  { id: 'mcp-intro', title: 'MCP 入门', hook: '模型接工具', theme: '节点连线协议图' },
  { id: 'mcp-install', title: 'MCP 安装', hook: 'npx 装 Server', theme: '插件积木与终端' },
  { id: 'prompt-system', title: '系统提示词', hook: '稳定角色与约束', theme: '系统齿轮与对话气泡' },
  { id: 'rag-basics', title: 'RAG 检索', hook: '知识库问答', theme: '书库与向量光点' },
  { id: 'agent-tools', title: 'Agent 工具', hook: '多步调用工具', theme: '机器人手臂与工具盘' },
  { id: 'ai-build-website', title: '做网页', hook: '落地页布局', theme: '浏览器窗口与网页区块' },
  { id: 'ai-landing-page', title: '落地页', hook: '今晚能发出去', theme: '营销落地页线框' },
  { id: 'ai-build-miniprogram', title: '小程序', hook: '三页骨架生成', theme: '微信绿小程序手机界面' },
  { id: 'ai-build-app', title: '做 App', hook: '移动端四屏规格', theme: '手机 App 多屏展示' },
  { id: 'ai-image-gen', title: 'AI 生图', hook: '海报封面提示词', theme: '画布笔刷与生成图像' },
  { id: 'ai-image-brand', title: '品牌视觉', hook: '统一风格出图', theme: '品牌色板与系列海报' },
  { id: 'hallucination-defense', title: '防幻觉', hook: '核查与引用', theme: '放大镜与警示标记' },
  { id: 'cost-control', title: '控成本', hook: '账单与限流', theme: '计算器与用量仪表' },
]

function promptFor(course) {
  return [
    '知略 AI 学堂课程封面，严格横版 3:2，四周留白不少于 8%。',
    `主标题只写：「${course.title}」（完整汉字，禁止截断、禁止竖排挤叠）。`,
    `副标题一行：「${course.hook}」。`,
    `右侧一个简洁主视觉：${course.theme}；左侧大标题。`,
    '排版铁律：元素不超过 4 个；不要三列图标、不要多屏手机堆叠、不要密密麻麻 UI 线框、不要底部功能条。',
    '字体清晰可读，对比度高；禁止乱码、禁止假网页截图、禁止水印、禁止英文碎片。',
    '风格：深色背景 + 琥珀暖光，杂志封面，干净留白，高级克制。',
  ].join('')
}

function parseArgs() {
  const onlyIdx = process.argv.indexOf('--only')
  const only = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : null
  const force = process.argv.includes('--force')
  return { only, force }
}

async function generateOne(course) {
  const outPath = path.join(OUT_DIR, `${course.id}.jpg`)
  const body = {
    model: MODEL,
    prompt: promptFor(course),
    size: SIZE,
    n: 1,
    output_format: 'jpeg',
  }

  const res = await fetch(`${BASE_URL}/images/generations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 400)}`)
  }

  let json
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`非 JSON 响应: ${text.slice(0, 200)}`)
  }

  const item = json.data?.[0]
  if (!item) throw new Error(`无 data: ${text.slice(0, 300)}`)

  if (item.b64_json) {
    fs.writeFileSync(outPath, Buffer.from(item.b64_json, 'base64'))
  } else if (item.url) {
    const img = await fetch(item.url)
    if (!img.ok) throw new Error(`下载失败 ${img.status}`)
    fs.writeFileSync(outPath, Buffer.from(await img.arrayBuffer()))
  } else {
    throw new Error(`未知返回结构: ${Object.keys(item).join(',')}`)
  }

  return outPath
}

async function pool(items, limit, worker) {
  const ret = []
  let i = 0
  async function run() {
    while (i < items.length) {
      const cur = items[i++]
      ret.push(await worker(cur))
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()))
  return ret
}

async function main() {
  if (!API_KEY) {
    console.error('缺少 OPENAI_API_KEY 或 IMAGE2_API_KEY')
    process.exit(1)
  }
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const { only, force } = parseArgs()
  let list = COURSES
  if (only) list = COURSES.filter((c) => c.id === only)
  if (!list.length) {
    console.error(`未找到课程: ${only}`)
    process.exit(1)
  }

  console.log(`Base: ${BASE_URL}`)
  console.log(`Model: ${MODEL}  Size: ${SIZE}  Jobs: ${CONCURRENCY}`)
  console.log(`待生成: ${list.length}`)

  await pool(list, CONCURRENCY, async (course) => {
    const outPath = path.join(OUT_DIR, `${course.id}.jpg`)
    if (!force && fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
      console.log(`skip ${course.id}`)
      return
    }
    process.stdout.write(`gen  ${course.id} ... `)
    try {
      await generateOne(course)
      console.log('ok')
    } catch (e) {
      console.log('FAIL')
      console.error(`  ${course.id}: ${e.message}`)
    }
  })
}

main()
