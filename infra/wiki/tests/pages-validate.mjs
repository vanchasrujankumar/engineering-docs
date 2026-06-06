import { chromium } from 'playwright'

const PAGES_URL = 'https://vanchasrujankumar.github.io/engineering-docs'

const assert = (condition, label) => {
  if (!condition) {
    console.error(`FAIL: ${label}`)
    process.exit(1)
  }
  console.log(`PASS: ${label}`)
}

const run = async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  // 1. Homepage loads
  let res = await page.goto(PAGES_URL, { waitUntil: 'networkidle', timeout: 20000 })
  assert(res.status() === 200, 'Homepage HTTP 200')
  await page.waitForSelector('.markdown-body h1', { timeout: 10000 })
  const title = await page.locator('.markdown-body h1').textContent()
  assert(title.includes('Engineering Docs'), `Homepage renders title (got: ${title})`)

  // 2. Sidebar nav renders
  const navLinks = await page.locator('.sidebar a').count()
  assert(navLinks >= 20, `Nav links present (count: ${navLinks})`)

  // 3. Sub-page: Getting Started (Quick Start)
  await page.click('.sidebar a:has-text("Quick Start")')
  await page.waitForSelector('.markdown-body h1', { timeout: 10000 })
  const gsTitle = await page.locator('.markdown-body h1').textContent()
  assert(gsTitle.includes('Quick Start') || gsTitle.includes('Setup'),
    `Quick Start renders (got: ${gsTitle})`)

  // 4. Sub-page: n8n (via sidebar)
  await page.click('.sidebar a:has-text("n8n Production Stack")')
  await page.waitForSelector('.markdown-body h1', { timeout: 10000 })
  const n8nTitle = await page.locator('.markdown-body h1').textContent()
  assert(n8nTitle.includes('n8n'), `n8n page renders (got: ${n8nTitle})`)

  // 5. Dark mode toggle works
  const toggleBtn = page.locator('#themeToggle')
  await toggleBtn.click()
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  assert(theme === 'dark', `Dark mode toggles (got: ${theme})`)

  // 6. Screenshot
  await page.goto(PAGES_URL, { waitUntil: 'networkidle' })
  await page.screenshot({ path: 'tests/pages-home.png', fullPage: true })
  console.log('PASS: Screenshot saved to tests/pages-home.png')

  await browser.close()
  console.log('\nAll GitHub Pages validation checks passed.')
}

run().catch((err) => {
  console.error(`FAIL: ${err.message}`)
  process.exit(1)
})
