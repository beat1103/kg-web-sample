// motp 초기화 요청
export interface MotpCertResetReqType {
  name: string
  phoneNo: string
}


// motp 초기화 응답
export interface MotpCertResetResType {
  code: string
  msg: string
}
