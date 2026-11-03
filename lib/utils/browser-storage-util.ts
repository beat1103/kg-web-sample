/**
 * 로컬스토리지 접근
 */
export const useLocalStorage = () => {
  const getLocalStorageItem = (key: string) => {
    return localStorage.getItem(key)
  }

  const setLocalStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key)
  }

  return { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem }
}

/**
 * 세션스토리지 접근
 */
export const useSessionStorage = () => {
  const getItem = (key: string) => {
    return sessionStorage.getItem(key)
  }

  const setItem = (key: string, value: string) => {
    sessionStorage.setItem(key, value)
  }

  const removeItem = (key: string) => {
    sessionStorage.removeItem(key)
  }

  return [getItem, setItem, removeItem] as const
}
