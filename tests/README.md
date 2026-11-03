## Playwright 테스트 작성 가이드

### 🎯 테스트 구조화 원칙

- 도메인별로 테스트 파일 구성
- 기능 단위로 테스트 그룹화
- 명확한 테스트 설명 작성

### 📁 테스트 파일 구조

```bash
├── tests/
│   ├── user/
│   │   ├── login.spec.ts
│   │   ├── profile.spec.ts
│   │   ├── common/
│   │   │   ├── navigation.spec.ts
│   │   ├── fixtures/
│   │   │   ├── test-data.ts
```

### 🚀 테스트 실행 방법

```bash
# 모든 테스트 실행
npx playwright test

# 특정 테스트 파일 실행
npx playwright test tests/user/login.spec.ts

# UI 모드로 테스트 실행
npx playwright test --ui

# 특정 브라우저에서만 테스트 실행
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# 디버그 모드로 테스트 실행
npx playwright test --debug

# 테스트 리포트 열기
npx playwright show-report
```

### 💡 테스트 코드 예시

```typescript
import { test, expect } from "@playwright/test"

test.describe("사용자 인증 테스트", () => {
  test("로그인 성공 케이스", async ({ page }) => {
    await test.step("로그인 페이지 접속", async () => {
      await page.goto("/login")
      await expect(page).toHaveTitle(/로그인/)
    })

    await test.step("로그인 수행", async () => {
      await page.fill("[data-testid=username]", "testuser")
      await page.fill("[data-testid=password]", "password123")
      await page.click("button[type=submit]")
    })

    await test.step("로그인 성공 확인", async () => {
      await expect(page).toHaveURL("/dashboard")
      await expect(page.locator(".user-status")).toHaveText("active")
    })
  })
})
```

### 📝 테스트 작성 가이드라인

- **테스트 설명**

  - 한글로 명확하게 작성
  - 테스트 목적과 시나리오를 명확히 표현

- **테스트 구조화**

  - `test.step`으로 테스트 단계 구분
  - 각 테스트는 독립적으로 실행 가능해야 함

- **검증(Assertion)**
  - 명확한 기대 결과 정의
  - 적절한 타임아웃 설정
  - 상태 변화 검증 포함

### 🚫 피해야 할 사항

- 불필요하게 복잡한 테스트 시나리오
- 테스트 간 의존성
- 불안정한 셀렉터 사용
- 하드코딩된 대기 시간
