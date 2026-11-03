import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await page.getByRole("link", { name: "로그인" }).click()
  await page.locator("#loginId").fill("firbbo01")
  await page.locator("#password").fill("123")
  await page.getByRole("button", { name: "로그인" }).click()

  // getByRole('img', { name: 'Firzzle logo' }) 있는지 확인
  await expect(page.getByRole("img", { name: "Firzzle logo" })).toBeVisible()
})

// 실행 방법
// npx playwright test tests/auth/login.spec.ts
