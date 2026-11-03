import { FileDownloadReq } from "@/type/common/file-type"

const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ) // validate fragment locator
  return !!urlPattern.test(urlString)
}

export const getFileUrl = (urlParam: FileDownloadReq): string => {
  const saveFile = urlParam.p_savefile as string
  if (isValidUrl(saveFile)) {
    return saveFile
  }
  const queryParam = new URLSearchParams(
    urlParam as unknown as Record<string, string>,
  ).toString()
  return `${process.env.NEXT_PUBLIC_FILE_DOWNLOAD_BASE_URL}/fo/api/v1/public/edu/fileUpDownload/download?${queryParam}`
}
