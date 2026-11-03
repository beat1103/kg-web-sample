import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/auth-constants"
import { deleteCookies, postLoginAuth } from "@/services/auth/auth-service"
import { LoginReqType, LoginResType } from "@/type/auth/login-type"
import { User } from "@/type/auth/user-type"
import { StandardRes } from "@/type/response-wrapper/standard-res-type"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface UserStore {
  access_token: string
  refresh_token: string
  userInfo: User | null

  login: (param: LoginReqType) => Promise<any>
  logout: () => Promise<any>
  setUserInfo: (param: User | null) => void
}

export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      access_token: "",
      refresh_token: "",
      userInfo: null,

      login: async (loginReq: LoginReqType) => {
        const loginRes: StandardRes<LoginResType> =
          await postLoginAuth(loginReq)

        if (loginRes.state === "201") {
          set({
            userInfo: loginRes.result.requestbox,
            access_token: loginRes.result.requestbox?.access_token,
            refresh_token: loginRes.result.requestbox?.refresh_token,
          })
        }

        return loginRes
      },
      logout: async () => {
        const response = await deleteCookies({
          key: [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY],
        }) // 토큰 쿠키 삭제

        // 유저정보 초기화
        set({
          access_token: "",
          refresh_token: "",
          userInfo: null,
        })

        return response
      },
      setUserInfo: (user: User | null) => {
        set({
          userInfo: user,
        })
      },
    }),

    {
      name: "user-store", // 스토어 이름(고유해야 함)
      storage: createJSONStorage(() => localStorage), // 스토어 저장소 위치
      // partialize: (state) => ({ userInfo: state.userInfo }),  // 특정 상태값만 저장
    },
  ),
)
