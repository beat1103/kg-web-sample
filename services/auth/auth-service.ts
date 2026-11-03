import { apiFrontClient } from "@/lib/manager/api-front-client-manager"
import { CertifyUserReqType } from "@/type/auth/certify-user-type"
import { FindIdReqType } from "@/type/auth/find-id-type"
import { FindPwdReqType } from "@/type/auth/find-pwd-type"
import { InsertCertLogReqType } from "@/type/auth/identity-verification-type"
import {
  CompListReq,
  DeptJobPosiDutyReq,
  EmailDomainListReq,
  InsertMemberInfoReq,
  RegisterLoginIdReq,
} from "@/type/auth/insert-member-type"
import {
  KmcCertResultReqType,
  KmcReqParamReqType,
} from "@/type/auth/kmc-cert-type"
import { LoginReqType } from "@/type/auth/login-type"
import { MotpCertResetReqType } from "@/type/auth/motp-cert-type"
import {
  ResetPwdInfoReqType,
  ResetPwdSaveReqType,
} from "@/type/auth/reset-pwd-type "
import {
  NaverLoginTokenReqType,
  SnsLoginReqType,
} from "@/type/auth/sns-login-type"

/**
 * 로그인 인증
 */
export const postLoginAuth = async (body: LoginReqType) => {
  return await apiFrontClient("POST", "/api/login-auth", body)
}

/**
 * 회원가입 아이디 중복확인
 */
export const getDuplicateLoginIdCheck = async (body: RegisterLoginIdReq) => {
  return await apiFrontClient("GET", "/api/duplicate-login-id-check", body)
}

/**
 * 회사 목록 조회
 */
export const getCompList = async (body: CompListReq) => {
  return await apiFrontClient("POST", "/api/comp-list", body)
}

/**
 * 이메일 도메인 조회
 */
export const getEmailDomainList = async (body: EmailDomainListReq) => {
  return await apiFrontClient("POST", "/api/email-domain-list", body)
}

/**
 * 부서, 직무, 직급, 직책 목록 조회
 */
export const getDeptJobPosiDutyList = async (body: DeptJobPosiDutyReq) => {
  return await apiFrontClient("GET", "/api/dept-job-posi-duty-list", body)
}

/**
 * 회원가입 처리
 */
export const postInsertMember = async (body: InsertMemberInfoReq) => {
  return await apiFrontClient("POST", "/api/insert-member", body)
}

/**
 * 로그인 > 비밀번호 재설정 페이지 정보 조회
 */
export const postLoginResetPwdInfo = async (body: ResetPwdInfoReqType) => {
  return await apiFrontClient("POST", "/api/login-reset-pwd-info", body)
}

/**
 * 로그인 > 비밀번호 재설정 저장
 */
export const postLoginResetPwd = async (body: ResetPwdSaveReqType) => {
  return await apiFrontClient("POST", "/api/login-reset-pwd", body)
}

/**
 * 로그인 > 아이디 찾기
 */
export const postFindId = async (body: FindIdReqType) => {
  return await apiFrontClient("POST", "/api/login-find-id", body)
}

/**
 * 로그인 > 비밀번호 찾기 인증번호 전송
 */
export const postFindPwdOtpKey = async (body: FindPwdReqType) => {
  return await apiFrontClient("POST", "/api/login-find-pwd-otp-key", body)
}

/**
 * 로그인 > 비밀번호 찾기
 */
export const postFindPwd = async (body: FindPwdReqType) => {
  return await apiFrontClient("POST", "/api/login-find-pwd", body)
}

/**
 * SNS 로그인
 */
export const getSnsLogin = async (body: SnsLoginReqType) => {
  return await apiFrontClient("GET", "/api/login-sns", body)
}

/**
 * SNS 로그인 > 네이버 토큰 조회
 */
export const getLoginNaverToken = async (body: NaverLoginTokenReqType) => {
  return await apiFrontClient("GET", "/api/login-sns-naver-token", body)
}

/**
 * 모든 쿠키 조회
 */
export const getAllCookies = async (body?: object) => {
  return await apiFrontClient("GET", "/api/cookies", body)
}

/**
 * 특정 쿠키 삭제
 */
export const deleteCookies = async (body?: { key: string[] }) => {
  return await apiFrontClient("DELETE", "/api/cookies", body)
}

/**
 * KMC 요청 파라미터 조회
 */
export const getKmcData = async (body: KmcReqParamReqType) => {
  return await apiFrontClient("GET", "/api/kmc-data", body)
}

/**
 * KMC 인증 결과 조회
 */
export const getKmcResult = async (body: KmcCertResultReqType) => {
  return await apiFrontClient("GET", "/api/kmc-result", body)
}

/**
 * 본인인증 시 이름 / 휴대폰번호 일치 여부 검증
 */
export const postCertifyUserInfo = async (body: CertifyUserReqType) => {
  return await apiFrontClient("POST", "/api/certify-user", body)
}

/**
 * 본인인증 로그 등록
 */
export const postInsertCertLogService = async (req: InsertCertLogReqType) => {
  return await apiFrontClient("POST", "/api/identity-verification", req)
}

/**
 * motp 초기화
 */
export const postMotpCertResetService = async (req: MotpCertResetReqType) => {
  return await apiFrontClient("POST", "/api/motp-cert-reset", req)
}
