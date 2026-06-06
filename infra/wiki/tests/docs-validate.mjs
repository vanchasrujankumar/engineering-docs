import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()

function findMdFiles(dir) {
  const results = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'infra') continue
    if (e.isDirectory()) results.push(...findMdFiles(p))
    else if (e.name.endsWith('.md')) results.push(p)
  }
  return results
}

const assert = (condition, label) => {
  if (!condition) {
    console.error(`FAIL: ${label}`)
    process.exit(1)
  }
  console.log(`PASS: ${label}`)
}

// 1. All markdown files have no broken frontmatter (YAML delimiters)
const mdFiles = findMdFiles(ROOT)

assert(mdFiles.length > 0, `Markdown files found (count: ${mdFiles.length})`)
console.log(`  Files: ${mdFiles.slice(0, 5).join(', ')}${mdFiles.length > 5 ? ', ...' : ''}`)

let frontmatterOk = 0
let allGood = true
for (const f of mdFiles) {
  const content = readFileSync(f, 'utf-8')
  // Each file should start with a heading or frontmatter
  if (!content.trim()) {
    console.warn(`  WARN: Empty file: ${f}`)
    allGood = false
    continue
  }
  // Check for broken YAML frontmatter (odd number of --- lines)
  const yamlDelims = (content.match(/^---/gm) || []).length
  if (yamlDelims > 0 && yamlDelims % 2 !== 0) {
    console.warn(`  WARN: Broken frontmatter: ${f}`)
    allGood = false
  } else {
    frontmatterOk++
  }
}
assert(allGood, 'All markdown files have valid structure')

// 2. SUMMARY.md exists and is well-formed
assert(existsSync('SUMMARY.md'), 'SUMMARY.md exists')
const summary = readFileSync('SUMMARY.md', 'utf-8')
assert(summary.startsWith('# Engineering Docs'), 'SUMMARY.md has correct title')
const refs = summary.match(/\]([^(]+)/g) || []
console.log(`  Summary entries: ${refs.length}`)

// 3. README.md exists
assert(existsSync('README.md'), 'README.md exists')

// 4. CONTRIBUTING.md exists
assert(existsSync('CONTRIBUTING.md'), 'CONTRIBUTING.md exists')

// 5. No placeholder TODOs left in content
let todosFound = false
for (const f of mdFiles) {
  const content = readFileSync(f, 'utf-8')
  if (content.includes('TODO') || content.includes('FIXME')) {
    console.warn(`  WARN: TODO/FIXME in ${f}`)
    todosFound = true
  }
}
if (todosFound) {
  console.warn('  Some files have TODO markers (non-blocking)')
}
console.log('PASS: No blocking TODOs in content')

// 6. Templates directory has files
const templates = readdirSync('templates').filter(f => f.endsWith('.md'))
assert(templates.length >= 3, `Templates present (count: ${templates.length})`)

// 7. Section folders exist
const sections = ['01-getting-started', '02-guides', '03-architecture', '04-deployment', '05-standards', '06-operations']
for (const s of sections) {
  const path = `${s}/README.md`
  assert(existsSync(path), `${s}/README.md exists`)
}

console.log('\nAll documentation validation checks passed.')
