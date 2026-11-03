export interface FileDownloadReq {
  p_savefile: string
  p_realfile: string
  p_imagetype?: string
  p_attach_yn?: string
}

export interface FileBoxRes {
  file_new: string
  file_idx?: number
  file_isupload?: string
  file_real: string
  file_size?: number
}

export interface fileListRes {
  d_masterseq: string
  d_seq: string
  d_fileseq: string
  d_cnt: number
  d_realfilename: string
  d_savefilename: string
  d_luserid: string
  d_ldate: string
  d_filesize: number
  d_summary: string
  d_url: string
}
