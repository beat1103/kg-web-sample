/**
 * 비밀번호 유효성 검사
 * @param pwd 비밀번호
 * @param phone 핸드폰번호
 * @param loginId 로그인아이디
 */
export const validatePwd = (
  pwd: string = "",
  phone: string = "",
  loginId: string = "",
) => {
  /**
   * 0. required
   * 1. 8~12자리의 영문+숫자+특수문자(~,!,@,#,$,%,^,&,*) 조합
   * 2. 4자리 이상 동일 문자 반복 불가
   * 3. 키보드상 나란히 있는 문자열 4자리 이상 연속 불가
   * 4. 일련된 숫자, 문자 3자리 이상 연속 불가
   * 5. 입력된 아이디가 포함된 경우
   * --6. 이전 비밀번호와 동일한 비밀번호를 사용할 경우
   */

  let msg = ""

  console.log(phone)

  // 0. required
  if (!pwd) {
    msg = "비밀번호를 입력해 주세요"
    return msg
  }

  // 1. 8~12자리의 영문+숫자+특수문자(~,!,@,#,$,%,^,&,*,-,_,.) 조합
  if (!/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^*()_~])[A-Za-z0-9-!@#$%^*()_~]{8,12}$/.test(pwd)) {
    msg = "8~12자리의 영문+숫자+특수문자(!, @, #, $, %, ^, *, (, ), _, ~)를 조합하여 입력해주세요."
  }

  // 2. 4자리 이상 동일 문자 반복 불가
  if (/([\w\d])\1\1\1/.test(pwd)) {
    msg = "4자리 이상 반복되는 문자나 숫자는 사용할 수 없습니다."
  }

  // 3. 키보드상 나란히 있는 문자열 4자리 이상 연속 불가
  if (
    /(qwer|wert|erty|rtyu|tyui|yuio|uiop|asdf|sdfg|dfgh|fghj|ghjk|hjkl|zxcv|xcvb|cvbn|vbnm)/.test(
      pwd,
    ) ||
    /(QWER|WERT|ERTY|RTYU|TYUI|YUIO|UIOP|ASDF|SDFG|DFGH|FGHJ|GHJK|HJKL|ZXCV|XCVB|CVBN|VBNM)/.test(
      pwd,
    )
  ) {
    msg = "키보드상 4자리 연속한 위치의 문자배열은 사용이 불가합니다."
  }

  // 4. 일련된 숫자, 문자 3자리 이상 연속 불가
  if (
    /(123|234|345|456|567|678|789|890|012)/.test(pwd) ||
    /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/.test(
      pwd,
    ) ||
    /(ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ)/.test(
      pwd,
    )
  ) {
    msg = "3자리 이상 연속된 문자 또는 숫자는 사용이 불가합니다."
  }

  // 5.입력된 아이디가 포함된 경우
  if (loginId.length > 0) {
    if (pwd.toLowerCase().indexOf(loginId.toLowerCase()) >= 0) {
      msg = "아이디와 유사한 비밀번호는 설정할 수 없습니다."
    }
  }

  return msg
}

/**
 * 휴대폰번호 형식 검사 ('-' 제외)
 */
export const validatePhoneNumber = (phoneNumber: string | number) => {
  return RegExp(/(01[0|1|6|7|8|9])([1-9]{1}[0-9]{2,3})([0-9]{4})$/).test(phoneNumber.toString())
}

/**
 * 이메일 형식 검사
 */
export const validateEmail = (email: string) => {
  return RegExp(/^[a-zA-Z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/).test(email)
}

/**
 * 주민등록번호 형식 검사 (하이픈 포함, 미포함 상관없음)
 * @param rrn 주민등록번호
 */
export const validateRegistrationNumber = (rrn: string) => {
  // 하이픈 제거
  const clean = rrn.replace(/-/g, "")

  // 13자리 숫자인지 확인
  if (!/^\d{13}$/.test(clean)) return false

  const yy = clean.slice(0, 2)
  const mm = clean.slice(2, 4)
  const dd = clean.slice(4, 6)
  const genderCode = clean.charAt(6)

  // 생년월일 생성
  const yearPrefix =
    genderCode === "1" || genderCode === "2"
      ? "19"
      : genderCode === "3" || genderCode === "4"
        ? "20"
        : null
  if (!yearPrefix) return false

  const fullYear = parseInt(yearPrefix + yy)
  const month = parseInt(mm)
  const day = parseInt(dd)

  // 날짜 유효성 검사
  const date = new Date(fullYear, month - 1, day)
  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false
  }

  // 체크디지트 계산
  const multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
  const sum = multipliers.reduce(
    (acc, mul, i) => acc + mul * parseInt(clean[i]),
    0,
  )
  const checkDigit = (11 - (sum % 11)) % 10

  return checkDigit === parseInt(clean[12])
}
