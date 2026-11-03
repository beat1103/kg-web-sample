export interface ResetPwdInfoReqType {
  p_login_id: string
  u_userid: string
  u_tmp_pwdfyn: string
}

export interface ResetPwdSaveReqType {
  p_login_id: string
  u_userid: string
  p_securedPassword: string
  p_handphone: string
}
