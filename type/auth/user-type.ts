interface User {
  d_userid: string
  d_login_id: string
  d_name: string
  d_handphone: string
  d_email?: string
  d_grcode?: string
  d_comp?: string
  d_compnm?: string
  d_dept?: string
  d_deptnm?: string
  d_emptyyn?: string
  d_smeyn?: string
  access_token?: string
  refresh_token?: string
  d_use_lilys_ai_yn?: string
  d_last_login_dt?: string
  d_login_ip?: string
  d_img_realfile?: string
  d_img_savefile?: string
  d_global_cdn_use_yn?: "Y" | "N"
}

export type { User }
