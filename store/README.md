## Store 작성 가이드

### 🚀 Store가 필요한 상황

- 여러 컴포넌트에서 공유되는 데이터 (유저 정보, 테마 등)
- 전역 UI 상태 (모달, 토스트 등)
- API 응답 데이터 캐싱

### 🚫 사용을 피해야 할 경우

- 단일 컴포넌트 전용 상태
- 부모-자식 간 1depth 데이터 전달
- 자주 변경되는 UI 상태 (input 값 등)

### Store 추가 프로세스

1. Store 필요성 검토 (개발PL/아키텍처 담당자와 논의)
2. 구현 및 팀 리뷰

   👀 체크리스트

   - [ ] Store 이름의 명확성
   - [ ] 타입 정의 여부
   - [ ] 불필요한 상태 제거
   - [ ] 에러 처리 구현

3. 배포 후 모니터링

### 파일 명명 및 디렉토리 규칙

- 하위 디렉토리 생성 금지, 해당 디렉토리에만 파일 생성
- 네이밍 컨벤션 통일: -store.ts 형식 유지 권장

```bash
├── store/
│   ├── user-store.ts
│   ├── user-store.ts
│   ├── product-store.ts
```

### 참고 문서

- [zustand 공식 문서](https://zustand-demo.pmnd.rs/)
- [zustand API 문서](https://zustand.docs.pmnd.rs/)

### 💡 샘플 코드

```typescript
// sample-store.ts
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

// Store의 상태와 액션을 정의하는 타입
type Store = {
  // 상태
  count: number
  // 액션
  inc: () => void // count를 증가시키는 액션
  dec: () => void // count를 감소시키는 액션
  reset: () => void // count를 초기화하는 액션
}

// Store 생성
export const sampleStore = create<Store>()(
  // persist 미들웨어를 사용하여 상태 영속성 관리
  persist(
    // Store의 초기 상태와 액션 정의
    (set) => ({
      // 초기 상태
      count: 0,

      // 액션 정의
      inc: () => set((state) => ({ count: state.count + 1 })),
      dec: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "sample-store", // localStorage에 저장될 키 이름 (고유해야 함)
      storage: createJSONStorage(() => localStorage), // 상태가 저장될 스토리지 지정
    },
  ),
)
```
