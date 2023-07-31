import { test, expect } from '@playwright/test'

test('基本用法', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('http://localhost:7130/pc/tabs/basic-usage')

  const tabs = page.locator('.tiny-tabs')
  const tabItems = tabs.getByRole('tab')
  const item1 = tabItems.nth(0)
  const content = tabs.getByRole('tabpanel')

  await expect(tabItems).toHaveCount(4)
  await expect(tabItems).toHaveClass([/is-top/, /is-top is-active/, /is-top/, /is-top/])
  await expect(content).toHaveText(/数据组件/)
  await item1.click()
  await expect(item1).toHaveClass(/is-active/)
  await expect(item1).toHaveCSS('border-bottom', '3px solid rgb(94, 124, 224)')
  await expect(item1).toHaveCSS('color', 'rgb(94, 124, 224)')
  await expect(content).toHaveText(/表单组件/)
})