import { User } from "./user-type"

/**
 * 로그인 요청
 */
export interface LoginReqType {
  p_login_id: string
  p_pwd: string
  p_lgn_gbn?: string
  p_admin_sso?: string
  p_userid?: string
}

/**
 * 로그인 응답
 */
export interface LoginResType {
  requestbox: User
}