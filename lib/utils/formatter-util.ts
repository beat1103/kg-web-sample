/**
 * 숫자 형태 포매팅
 * @param target 비밀번호
 * @param delimiter 구분자
 * @param fractionDigit 자리수
 * @returns 변환된 숫자 문자열
 */
export const formatNumber = (
  target: number | string | undefined = "",
  delimiter: string = ",",
  fractionDigit: number = 3,
): string => {
  const num = Number(target)  // 숫자로 변환
  if (isNaN(num)) return "0" // 숫자가 아니면 기본값 반환

  // 정수 부분과 소수 부분 분리
  const [integerPart, decimalPart] = num.toString().split(".")

  // fractionDigit 간격으로 구분자 추가
  const regex = new RegExp(`\\B(?=(\\d{${fractionDigit}})+(?!\\d))`, "g")
  const formattedInteger = integerPart.replace(regex, delimiter)

  // 소수점 부분이 있다면 함께 반환
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
}

/**
 * 날짜 형태 포매팅
 * @param dateString 포맷할 날짜 문자열 (예: "2025031310" 또는 "2025031310180402")
 * @param format 출력할 형식 (예: "yyyy.MM.dd", "yyyy-MM-dd HH:mm:ss")
 * @returns 변환된 날짜 문자열
 */
export const formatDate = (dateString: string, format: string = "yyyy.MM.dd"): string => {
  if (!dateString || dateString.length < 8) return ""

  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)
  const hour = dateString.slice(8, 10) || "00"
  const minute = dateString.slice(10, 12) || "00"
  const second = dateString.slice(12, 14) || "00"

  return format
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hour)
    .replace("mm", minute)
    .replace("ss", second)
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 * @param size 변환할 파일 크기(바이트)
 * @returns 변환된 파일 크기 문자열 (예: "(1.5 KB)", "(2.4 MB)")
 */
export const formatFileSize = (size: number | null | undefined): string => {
  if (size === null || size === undefined || isNaN(size)) return "(0 B)"
  
  const unit = 1024
  
  if (size < unit) return `(${size} B)`
  
  const exp = Math.floor(Math.log(size) / Math.log(unit))
  const formattedSize = +(size / Math.pow(unit, exp)).toFixed(1)
  const units = "KMGTPE"
  
  return `(${formattedSize} ${units.charAt(exp-1)}B)`
}