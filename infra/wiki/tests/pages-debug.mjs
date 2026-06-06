import { chromium } from 'playwright'
const PAGES_URL = 'https://vanchasrujankumar.github.io/engineering-docs'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()))
page.on('pageerror', err => console.log('PAGE_ERROR:', err.message))
await page.goto(PAGES_URL + '/01-getting-started/README', { waitUntil: 'networkidle', timeout: 20000 })
console.log('URL after nav:', page.url())
const content = await page.content()
const bodyMatch = content.match(/<div id="content"[^>]*>(.*?)<\/div>/s)
console.log('Content div:', bodyMatch ? bodyMatch[1].substring(0, 300) : 'not found')
await browser.close()
