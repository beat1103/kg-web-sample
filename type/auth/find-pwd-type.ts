/**
 * 비밀번호 찾기 요청
 */
export interface FindPwdReqType {
  p_gubun: string
  p_id: string
  p_name: string
  p_handphone?: string
  p_email?: string
  p_certifyKey?: string
}

/**
 * 비밀번호 찾기 응답
 */
export interface FindPwdResType {
  msg: string
  login_id: string
  user_id: string
  resultCode: string
  returnUrl: string
  error: string
}
