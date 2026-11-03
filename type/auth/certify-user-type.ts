/**
 * 본인인증 시 이름 / 휴대폰번호 일치 여부 검증 요청
 */
export interface CertifyUserReqType {
  p_handphone: string
  p_name: string
}

/**
 * 본인인증 시 이름 / 휴대폰번호 일치 여부 검증 응답
 */
export interface CertifyUserResType {
  result: number
  clientIP: string
}