/**
 * KMC 인증 요청 파라미터 정보 조회 요청
 */
export interface KmcReqParamReqType {
  tr_add: string
}

/**
 * KMC 인증 요청 파라미터 정보 조회 응답
 */
export interface KmcReqParamResType {
  result: KmcReqParamResResultType
}

/**
 * KMC 인증 요청 파라미터 정보 조회 응답 결과
 */
export interface KmcReqParamResResultType {
  popurl: string
  tr_cert: string
  tr_add: string
  tr_url: string
  targetUrl: string
}


/**
 * KMC 인증 결과 조회 요청
 */
export interface KmcCertResultReqType {
  rec_cert: string
  certNum: string
}

/**
 * KMC 인증 결과 조회 응답
 */
export interface KmcCertResultResType {
  result: KmcCertResultResResultType
}

/**
 * KMC 인증 결과 조회 응답 결과
 */
export interface KmcCertResultResResultType {
  birthDay: string
  certMet: string
  certNum: string
  ci: string
  date: string
  di: string
  encMsg: string
  sncMsg2: string
  encPara: string
  gender: string
  ip: string
  msgChk: string
  name: string
  nation: string
  phoneCorp: string
  phoneNo: string
  plusInfo: string
  result: string
  msg?: string
}
