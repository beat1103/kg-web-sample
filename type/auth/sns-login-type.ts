import { RequestBox } from "../response-wrapper/standard-res-type"

export enum SnsLoginCode {
  KAKAO = "10",
  NAVER = "20",
}

export interface NaverLoginTokenReqType {
  grant_type: string
  client_id: string
  client_secret: string
  code: string
  state: string
}

export interface KaKaoLoginTokenReqType {
  grant_type: string
  client_id: string
  redirect_uri: string
  code: string
}

export interface SnsToken {
  grant_type: string
  client_id: string
  client_secret?: string
  redirect_uri: string
  code: string
}

// SNS 로그인 요청
export interface SnsLoginReqType {
  p_lgn_gbn: string
  access_token: string
}

// SNS 로그인 응답
export interface SnsLoginResType {
  requestbox: RequestBox<Record<string, unknown>>
  auth: SnsLoginResAuthType
}

// SNS 로그인 응답 > 인증 정보
export interface SnsLoginResAuthType {
  d_login_id: string
  d_pwd: string
}
