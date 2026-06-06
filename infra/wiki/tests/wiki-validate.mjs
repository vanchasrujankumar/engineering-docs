import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'

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
  const errors = []
  page.on('pageerror', (err) => errors.push(err.message))

  // Capture raw response body for server-rendered content
  let rawHTML = ''
  page.on('response', async (res) => {
    if (res.url() === BASE + '/') {
      rawHTML = await res.text()
    }
  })

  // 1. Page loads
  const res = await page.goto(BASE, { waitUntil: 'networkidle', timeout: 15000 })
  assert(res.status() === 200, 'HTTP 200 on setup page')

  // 2. Title contains Wiki.js
  const title = await page.title()
  assert(title.includes('Wiki.js'), `Title contains Wiki.js (got: ${title})`)

  // 3. Server-rendered HTML contains setup web component
  assert(rawHTML.includes('<setup ') && rawHTML.includes('wiki-version'),
    'Setup web component in source HTML with version attribute')

  // 4. Root mount point renders
  const rootCount = await page.locator('#root').count()
  assert(rootCount > 0, 'Root mount point exists in DOM')

  // 5. Favicons loaded (static assets served correctly)
  const favicons = await page.locator('link[rel="icon"]').count()
  assert(favicons >= 3, `Multiple favicons present (count: ${favicons})`)

  // 6. CSS asset loads
  const cssLinks = await page.locator('link[rel=stylesheet]').count()
  assert(cssLinks > 0, `Stylesheets loaded (count: ${cssLinks})`)

  // 7. JS bundles load
  const jsBundles = await page.locator('script[src]').count()
  assert(jsBundles >= 2, `JS bundles loaded (count: ${jsBundles})`)

  // 8. No critical console errors
  if (errors.length > 0) {
    console.warn(`WARN: Page errors: ${errors.join(', ')}`)
    errors.forEach((e) => assert(false, `No page errors (got: ${e})`))
  }

  // 9. Screenshot for visual reference
  await page.screenshot({ path: './tests/wiki-setup.png', fullPage: true })
  console.log('PASS: Screenshot saved to tests/wiki-setup.png')

  await browser.close()
  console.log('\nAll Wiki.js validation checks passed.')
}

run().catch((err) => {
  console.error(`FAIL: ${err.message}`)
  process.exit(1)
})
