import type { ReactNode } from 'react'

/** 软件品牌标识（官方/公开品牌图形简化还原，viewBox 统一便于缩放） */

export type BrandKey =
  | 'cursor'
  | 'openai'
  | 'claude'
  | 'gemini'
  | 'copilot'
  | 'vscode'
  | 'windsurf'
  | 'trae'
  | 'lingma'
  | 'kimi'
  | 'mcp'
  | 'ccswitch'

export const BRAND_LABEL: Record<BrandKey, string> = {
  cursor: 'Cursor',
  openai: 'OpenAI',
  claude: 'Claude',
  gemini: 'Gemini',
  copilot: 'Copilot',
  vscode: 'VS Code',
  windsurf: 'Windsurf',
  trae: 'Trae',
  lingma: '通义灵码',
  kimi: 'Kimi',
  mcp: 'MCP',
  ccswitch: 'CC Switch',
}

/** 封面/图标底色（贴近官网品牌色） */
export const BRAND_BG: Record<BrandKey, string> = {
  cursor: '#000000',
  openai: '#10a37f',
  claude: '#d97757',
  gemini: '#1a73e8',
  copilot: '#000000',
  vscode: '#007acc',
  windsurf: '#0ea5e9',
  trae: '#1a1a2e',
  lingma: '#ff6a00',
  kimi: '#1a1a1a',
  mcp: '#0f766e',
  ccswitch: '#0f172a',
}

/** Logo 在深色底上用白，浅色底用品牌色 */
export const BRAND_ON_DARK: Record<BrandKey, boolean> = {
  cursor: true,
  openai: true,
  claude: true,
  gemini: true,
  copilot: true,
  vscode: true,
  windsurf: true,
  trae: true,
  lingma: true,
  kimi: true,
  mcp: true,
  ccswitch: true,
}

type MarkProps = { fill?: string; className?: string }

/** Cursor 官方立方体标识（源自 Cursor 公开品牌资产路径） */
function CursorMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 49 56" fill={fill} aria-hidden="true">
      <path d="M48.0226 13.2547L25.6601 0.311786C24.942 -0.103929 24.0559 -0.103929 23.3378 0.311786L0.976347 13.2547C0.372691 13.6041 0 14.2503 0 14.9502V41.0498C0 41.7496 0.372691 42.3958 0.976347 42.7453L23.3389 55.6882C24.057 56.1039 24.943 56.1039 25.6611 55.6882L48.0237 42.7453C48.6273 42.3958 49 41.7496 49 41.0498V14.9502C49 14.2503 48.6273 13.6041 48.0237 13.2547H48.0226ZM46.6179 15.9964L25.0302 53.4802C24.8842 53.7328 24.4989 53.6296 24.4989 53.337V28.793C24.4989 28.3026 24.2375 27.849 23.8134 27.6027L2.61094 15.3312C2.35898 15.1849 2.46186 14.7987 2.75372 14.7987H45.9292C46.5423 14.7987 46.9255 15.4649 46.619 15.9974L46.6179 15.9964Z" />
    </svg>
  )
}

/** OpenAI 六瓣结（Simple Icons / 公开品牌形） */
function OpenAIMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.783-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  )
}

/** Anthropic / Claude 星芒 */
function ClaudeMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M12 2.2c.35 2.9 1.85 5.35 4.2 6.9-2.35 1.55-3.85 4-4.2 6.9-.35-2.9-1.85-5.35-4.2-6.9 2.35-1.55 3.85-4 4.2-6.9zm0 4.1c-.55 1.7-1.55 3.15-2.9 4.15 1.35 1 2.35 2.45 2.9 4.15.55-1.7 1.55-3.15 2.9-4.15-1.35-1-2.35-2.45-2.9-4.15z" />
      <path d="M4.5 11.2c1.55.55 2.85 1.65 3.65 3.15-.9 1.35-1.35 2.95-1.25 4.55-1.85-1.35-3.1-3.45-3.35-5.85.3-.6.6-1.2.95-1.85zm15 0c.35.65.65 1.25.95 1.85-.25 2.4-1.5 4.5-3.35 5.85.1-1.6-.35-3.2-1.25-4.55.8-1.5 2.1-2.6 3.65-3.15z" />
    </svg>
  )
}

/** Google Gemini 四角星 */
function GeminiMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M12 2c.45 4.2 3.35 7.1 7.55 7.55C15.35 10.05 12.45 12.95 12 17.15 11.55 12.95 8.65 10.05 4.45 9.55 8.65 9.1 11.55 6.2 12 2z" />
    </svg>
  )
}

/** GitHub Copilot 头像形 */
function CopilotMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M12 2.2c-2.1 0-3.9 1.3-4.7 3.2-.9-.4-1.9-.4-2.8.1C3.2 6.3 2.4 7.7 2.4 9.2v.4c0 .9.3 1.7.8 2.4-.5.8-.8 1.8-.8 2.8 0 2.9 2.1 5.3 4.9 5.9.4 1.3 1.6 2.3 3.1 2.3h3.2c1.5 0 2.7-1 3.1-2.3 2.8-.6 4.9-3 4.9-5.9 0-1-.3-1.9-.8-2.7.5-.7.8-1.5.8-2.5v-.4c0-1.5-.8-2.9-2.1-3.7-.9-.5-1.9-.5-2.8-.1C15.9 3.5 14.1 2.2 12 2.2zm-3.2 8.3c.7 0 1.3.6 1.3 1.3S9.5 13.1 8.8 13.1 7.5 12.5 7.5 11.8s.6-1.3 1.3-1.3zm6.4 0c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3.6-1.3 1.3-1.3zM8.2 15.6c.5.8 1.4 1.3 2.4 1.3h2.8c1 0 1.9-.5 2.4-1.3-.6.3-1.3.5-2.1.5H10.3c-.8 0-1.5-.2-2.1-.5z" />
    </svg>
  )
}

/** VS Code 官方色块形 */
function VscodeMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#0065A9" d="M17.7 2.3 8.1 11.1 3.8 7.9a1 1 0 0 0-1.3.1L1.3 9.3a1 1 0 0 0 .1 1.4L6.4 15l-5 4.3a1 1 0 0 0-.1 1.4l1.2 1.3a1 1 0 0 0 1.3.1l4.3-3.2 9.6 8.8a1.2 1.2 0 0 0 2-.9V3.2a1.2 1.2 0 0 0-2-.9z" />
      <path fill="#007ACC" d="M17.7 2.3a1.2 1.2 0 0 1 2 .9v17.6a1.2 1.2 0 0 1-2 .9l-9.6-8.8 9.6-10.6z" opacity="0.85" />
      <path fill="#1F9CF0" d="m8.1 11.1 9.6-8.8a1.2 1.2 0 0 0-1.5-.1L3.8 7.9a1 1 0 0 0-.1 1.5l4.4 1.7z" />
    </svg>
  )
}

/** Windsurf 浪形 */
function WindsurfMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M3 15.5c2.8-1.2 5.2-3.4 6.8-6.5 1.6 3.1 4 5.3 6.8 6.5-2.6.5-4.8 1.7-6.4 3.4-1.6-1.7-3.8-2.9-6.4-3.4 0 0-.5-.1-.8 0z" />
      <path d="M5.2 10.2c1.8-.7 3.4-2 4.5-3.8 1.1 1.8 2.7 3.1 4.5 3.8-1.7.3-3.2 1.1-4.3 2.2-1.1-1.1-2.6-1.9-4.7-2.2z" opacity="0.55" />
    </svg>
  )
}

/** Trae 国内版：字标 + 几何块（官网黑底白字风格） */
function TraeMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3.2" fill="none" stroke={fill} strokeWidth="1.6" />
      <path d="M7.2 14.2V9.1h2.1c1.35 0 2.15.7 2.15 1.75 0 .95-.7 1.55-1.55 1.7l1.85 1.65h-1.55l-1.6-1.5H8.55v1.5H7.2zm1.35-2.55h.7c.55 0 .9-.3.9-.75s-.35-.7-.9-.7h-.7v1.45zM13.4 14.2l1.15-5.1h1.45l1.15 5.1h-1.35l-.2-1.05h-1.65l-.2 1.05H13.4zm1.75-2.15h1.05l-.5-2.35-.55 2.35z" />
    </svg>
  )
}

/** 通义灵码：阿里云橙 + 代码括号；传入 fill 时用单色（适配色块底） */
function LingmaMark({ fill, className }: MarkProps) {
  if (fill) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
        <path d="M8.2 8.4 5.6 12l2.6 3.6h1.7L7.4 12l2.5-3.6H8.2zm7.6 0h-1.7l2.5 3.6-2.5 3.6h1.7L18.4 12l-2.6-3.6zM13.1 7.5h-1.5l-1.4 9h1.5l1.4-9z" />
      </svg>
    )
  }
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#FF6A00" />
      <path
        fill="#fff"
        d="M8.2 8.4 5.6 12l2.6 3.6h1.7L7.4 12l2.5-3.6H8.2zm7.6 0h-1.7l2.5 3.6-2.5 3.6h1.7L18.4 12l-2.6-3.6zM13.1 7.5h-1.5l-1.4 9h1.5l1.4-9z"
      />
    </svg>
  )
}

/** Kimi / 月之暗面 */
function KimiMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" fill="none" stroke={fill} strokeWidth="1.7" />
      <path d="M8.2 7.5v9h1.6v-3.6L14.6 16.5h2L12.2 12l4.2-4.5h-1.95L9.8 11.2V7.5H8.2z" />
    </svg>
  )
}

/** MCP 连接节点 */
function McpMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <circle cx="6.5" cy="7" r="2.2" />
      <circle cx="17.5" cy="7" r="2.2" />
      <circle cx="12" cy="17" r="2.2" />
      <path d="M8.3 8.2 10.8 15.2M15.7 8.2 13.2 15.2M8.7 7h6.6" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** CC Switch 切换旋钮 */
function CcSwitchMark({ fill = 'currentColor', className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <rect x="3" y="7" width="18" height="10" rx="5" fill="none" stroke={fill} strokeWidth="1.7" />
      <circle cx="15.5" cy="12" r="3.2" />
      <path d="M7 10.2h3.2M7 13.8h2.2" stroke={fill} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

const MARKS: Record<BrandKey, (p: MarkProps) => ReactNode> = {
  cursor: CursorMark,
  openai: OpenAIMark,
  claude: ClaudeMark,
  gemini: GeminiMark,
  copilot: CopilotMark,
  vscode: VscodeMark,
  windsurf: WindsurfMark,
  trae: TraeMark,
  lingma: LingmaMark,
  kimi: KimiMark,
  mcp: McpMark,
  ccswitch: CcSwitchMark,
}

export function BrandMark({
  brand,
  fill,
  className,
}: {
  brand: BrandKey
  fill?: string
  className?: string
}) {
  const Comp = MARKS[brand]
  return <Comp fill={fill} className={className} />
}

/** 从课程 id 解析品牌；非软件课返回 null */
export function resolveBrand(id: string): BrandKey | null {
  const s = id.toLowerCase()
  if (s.includes('cc-switch') || s.includes('ccswitch')) return 'ccswitch'
  if (s.includes('cursor')) return 'cursor'
  if (s.includes('claude') || s.includes('anthropic')) return 'claude'
  if (s.includes('lingma') || s.includes('tongyi')) return 'lingma'
  if (s.includes('trae')) return 'trae'
  if (s.includes('windsurf')) return 'windsurf'
  if (s.includes('copilot')) return 'copilot'
  if (s.includes('codex') || s.includes('openai') || s.startsWith('api-openai') || s.includes('domain-api') || s === 'api-compatible')
    return 'openai'
  if (s.includes('gemini')) return 'gemini'
  if (s.includes('vscode') || s.includes('continue')) return 'vscode'
  if (s.includes('kimi') || s.includes('moonshot')) return 'kimi'
  if (s.includes('mcp')) return 'mcp'
  return null
}
