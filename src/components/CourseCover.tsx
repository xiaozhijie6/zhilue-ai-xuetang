import { ICON_BG, resolveIconKey } from './AiIcon'
import {
  BrandMark,
  BRAND_BG,
  BRAND_LABEL,
  resolveBrand,
  type BrandKey,
} from './BrandMark'

/** 封面艺术字：写全称，不截断 */
const COVER_GLYPHS: Record<string, string> = {
  'ai-what-is': 'AI 认知',
  'ai-first-chat': '第一次对话',
  'ai-download-guide': '下载安装',
  'ai-account-setup': '账号注册',
  'newbie-first-week': '第一周入门',
  'prompt-basics': '提示词基础',
  'ai-daily-office': 'AI 办公',
  'api-keys-security': '密钥安全',
  'tool-pick-compare': '工具选型',
  'install-trae': 'Trae 安装',
  'install-lingma': '通义灵码',
  'install-cc-switch': 'CC Switch',
  'cursor-install': 'Cursor 安装',
  'install-claude-code': 'Claude Code',
  'install-codex': 'Codex 安装',
  'install-copilot': 'Copilot 安装',
  'install-windsurf': 'Windsurf 安装',
  cursor: 'Cursor 用法',
  'cursor-rules': 'Cursor Rules',
  'claude-code': 'Claude Code 用法',
  'api-openai': 'OpenAI API',
  'api-compatible': '兼容网关',
  'domain-api-cheatsheet': '域名速查',
  'mcp-intro': 'MCP 入门',
  'mcp-install': 'MCP 安装',
  'prompt-system': '系统提示词',
  'rag-basics': 'RAG 检索',
  'agent-tools': 'Agent 工具',
  'ai-build-website': '做网页',
  'ai-landing-page': '落地页',
  'ai-build-miniprogram': '小程序',
  'ai-build-app': '做 App',
  'ai-image-gen': 'AI 生图',
  'ai-image-brand': '品牌视觉',
  'hallucination-defense': '防幻觉',
  'cost-control': '控成本',
}

const CATEGORY_GLYPHS: Record<string, string> = {
  入门起步: '入门起步',
  '前端 / JS': '前端 JS',
  '小程序与 App': '小程序',
  工具安装: '工具安装',
  工具用法: '工具用法',
  AI生图: 'AI 生图',
  提示词工程: '提示词',
  办公提效: '办公提效',
  API与配置: 'API 配置',
  'MCP与Agent': 'MCP',
  安全与成本: '安全成本',
}

/** Vite 打包后可引用的封面海报（由 scripts/generate-covers 生成） */
const COVER_POSTERS: Record<string, string> = import.meta.glob('../assets/covers/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function coverPosterUrl(id: string): string | null {
  const hit = Object.entries(COVER_POSTERS).find(([path]) => {
    const base = path.split('/').pop() ?? ''
    return (
      base === `${id}.webp` ||
      base === `${id}.jpg` ||
      base === `${id}.jpeg` ||
      base === `${id}.png` ||
      base === `${id}.jpg.webp`
    )
  })
  return hit?.[1] ?? null
}

function coverGlyph(id: string, category: string, title?: string): string {
  if (COVER_GLYPHS[id]) return COVER_GLYPHS[id]
  if (CATEGORY_GLYPHS[category]) return CATEGORY_GLYPHS[category]
  if (title) {
    const cleaned = title.replace(/[（(].*$/, '').trim()
    if (cleaned.length >= 2) return cleaned.length > 8 ? cleaned.slice(0, 8) : cleaned
  }
  return '知略学堂'
}

function variantIndex(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % 4
}

function brandCaption(brand: BrandKey, title?: string, category?: string) {
  return {
    name: BRAND_LABEL[brand],
    sub: title || category || BRAND_LABEL[brand],
  }
}

/** 教程封面：优先海报图 → 软件品牌标 → 内容艺术字 */
export function CourseCover({
  id,
  category,
  level,
  hot,
  compact,
  title,
}: {
  id: string
  category: string
  teacher?: string
  level?: string
  hot?: boolean
  compact?: boolean
  title?: string
}) {
  const poster = coverPosterUrl(id)
  const brand = resolveBrand(id)
  const icon = resolveIconKey(id, category)
  const bg = brand ? BRAND_BG[brand] : ICON_BG[icon]
  const glyph = coverGlyph(id, category, title)
  const variant = variantIndex(id)
  const caption = brand ? brandCaption(brand, title, category) : { name: glyph, sub: title || category }

  // 海报图自带标题排版，不再叠 tags/caption，避免遮挡与裁切
  const showChrome = !poster && !compact

  return (
    <div
      className={[
        'course-cover',
        poster ? 'course-cover--poster' : brand ? 'course-cover--brand' : `course-cover--v${variant}`,
        compact ? 'course-cover--compact' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={poster ? undefined : { ['--cover' as string]: bg }}
      aria-hidden={compact ? true : undefined}
    >
      {poster ? (
        <img
          className="course-cover__poster"
          src={poster}
          alt={title || glyph}
          loading="lazy"
          decoding="async"
        />
      ) : brand ? (
        <div className="course-cover__brand">
          <span className="course-cover__logo-plate">
            <BrandMark
              brand={brand}
              fill={brand === 'vscode' ? undefined : BRAND_BG[brand]}
              className="course-cover__logo"
            />
          </span>
        </div>
      ) : (
        <div className="course-cover__art">
          <span className="course-cover__watermark">{glyph}</span>
          <span className="course-cover__glyph">{glyph}</span>
          {!compact && <span className="course-cover__en">{category}</span>}
        </div>
      )}
      {showChrome && (
        <>
          <div className="course-cover__tags">
            {hot && <em className="course-cover__hot">热门</em>}
            {level && <em>{level}</em>}
          </div>
          <div className="course-cover__caption">
            <strong>{caption.name}</strong>
            <span>{caption.sub}</span>
          </div>
        </>
      )}
    </div>
  )
}
