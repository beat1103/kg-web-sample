/**
 * 아이디 찾기 응답
 */
export interface IdArray {
  d_compnm: string
  d_login_id: string
}

/**
 * 아이디 찾기 요청
 */
export interface FindIdReqType {
  p_gubun: string
  p_name: string
  p_email?: string
  p_handphone?: string
}

/**
 * 아이디 찾기 응답
 */
export interface FindIdResType {
  loginId: FindIdResLoginIdType[]
}

/**
 * 아이디 찾기 응답
 */
export interface FindIdResLoginIdType {
  d_userid: string
  d_domain: string
  d_handphone: string
  d_login_id: string
  d_email: string
  d_compnm: string
}
