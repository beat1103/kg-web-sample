export interface CompListReq {
  c_handphone: string
}

export interface CompListRes {
  d_comp: string
  d_compnm: string
}

export interface RegisterLoginIdReq {
  p_comp: string
  p_login_id: string
}

export interface EmailDomainListReq {
  p_gubun: string
}

export interface EmailDomainListRes {
  d_code: string
  d_codenm: string
}

export interface DeptJobPosiDutyReq {
  p_comp: string
}

export interface DeptJobPosiDutyRes {
  d_code: string
  d_code_type: string
  d_codenm_kr: string
}

export interface InsertMemberInfoReq {
  p_comp: string
  p_login_id: string
  p_dept: string
  p_dut: string
  p_dutnm: string
  p_pos: string
  p_posnm: string
  p_jik: string
  p_jiknm: string
  p_loc: string
  p_locnm: string
  p_terms_service: string
  p_terms_privacy: string
  p_terms_encourage: string
  p_name: string
  p_rrn: string
  p_birthday: string
  p_email: string
  p_phone: string
  p_handphone: string
  p_post: string
  p_addr1: string
  p_addr2: string
  p_ci: string
  p_di: string
  p_pwd: string
}