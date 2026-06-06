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

  // 3. Sub-page: Getting Started
  await page.click('.sidebar a:has-text("Getting Started")')
  await page.waitForSelector('.markdown-body h1', { timeout: 10000 })
  const gsTitle = await page.locator('.markdown-body h1').textContent()
  assert(gsTitle.includes('Getting Started') || gsTitle.includes('Welcome'),
    `Getting Started renders (got: ${gsTitle})`)

  // 4. Sub-page: Projects
  await page.click('.sidebar a:has-text("Projects")')
  await page.waitForSelector('.markdown-body h1', { timeout: 10000 })
  const projTitle = await page.locator('.markdown-body h1').textContent()
  assert(projTitle.includes('Project'), `Projects page renders (got: ${projTitle})`)

  // 5. Sub-page: n8n (direct navigation via sidebar)
  await page.goto(PAGES_URL + '/07-projects/n8n-docker-prod-stack', { waitUntil: 'networkidle', timeout: 20000 })
  await page.waitForSelector('.markdown-body h1', { timeout: 10000 })
  const n8nTitle = await page.locator('.markdown-body h1').textContent()
  assert(n8nTitle.includes('n8n'), `n8n project page renders (got: ${n8nTitle})`)

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
