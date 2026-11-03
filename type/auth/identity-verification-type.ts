// 본인인증 로그 등록 요청
export interface InsertCertLogReqType {
  p_userid: string
  p_result_cd: string
  p_result_desc: string
  p_gubun: string
  p_subj: string
  p_subjseq: string
  p_paper_seq: string
  p_report: string
  p_ip: string
  p_userAgent: string
  p_cert_type: string
}
