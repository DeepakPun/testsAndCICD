import { test, expect } from './fixtures/index'

test('allows creating a new post', async ({ page, auth }) => {
  const testUser = await auth.signUpAndLogin()
  await page.getByLabel('Title:').click()
  await page.getByLabel('Title:').fill('test post')
  await page.getByLabel('Title:').press('Tab')
  await page.getByLabel('Contents').fill('hello world')
  await page.getByLabel('Contents').press('Tab')
  await page.getByRole('button', { name: 'Create' }).press('Enter')
  await expect(page.getByText(`Test PostWritten by ${testUser}`)).toBeVisible()
  await page.getByRole('button', { name: 'Create' }).press('Enter')
})
