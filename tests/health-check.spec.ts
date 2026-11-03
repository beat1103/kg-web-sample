import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("https://dev-st-fo-se.firzzle.co.kr:8443/health-check")

  // Get Fetch 요청 및 검증
  await page.getByRole("button", { name: "Get Fetch" }).click()
  await page.waitForTimeout(200)
  const getFetchResponse = await page.locator(".relative").first().textContent()
  expect(getFetchResponse).toContain("I'm Okay")

  // Post Fetch 요청 및 검증
  await page.getByRole("button", { name: "Post Fetch" }).click()
  await page.waitForTimeout(200)
  const postFetchResponse = await page
    .locator(".relative")
    .first()
    .textContent()
  expect(postFetchResponse).toContain("I'm Okay")

  // Get Axios (첫 번째) 요청 및 검증
  await page.getByRole("button", { name: "Get Axios" }).first().click()
  await page.waitForTimeout(200)
  const getAxios1Response = await page
    .locator(".relative")
    .first()
    .textContent()
  expect(getAxios1Response).toContain("I'm Okay")

  // Post Axios (첫 번째) 요청 및 검증
  await page.getByRole("button", { name: "Post Axios" }).first().click()
  await page.waitForTimeout(200)
  const postAxios1Response = await page
    .locator(".relative")
    .first()
    .textContent()
  expect(postAxios1Response).toContain("I'm Okay")

  // Get Axios (두 번째) 요청 및 검증
  await page.getByRole("button", { name: "Get Axios" }).nth(1).click()
  await page.waitForTimeout(200)
  const getAxios2Response = await page
    .locator(".relative")
    .first()
    .textContent()
  expect(getAxios2Response).toContain("I'm Okay")

  // Post Axios (두 번째) 요청 및 검증
  await page.getByRole("button", { name: "Post Axios" }).nth(1).click()
  await page.waitForTimeout(200)
  const postAxios2Response = await page
    .locator(".relative")
    .first()
    .textContent()
  expect(postAxios2Response).toContain("I'm Okay")
})

// 실행 방법
// npx playwright test tests/health-check.spec.ts --project=chromium --headed
