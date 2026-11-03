export const isMobile = () => {
  return window.innerWidth <= 1024
}

export const isMobileDevice = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const ios = /iphone|ipod|ipad/.test(userAgent)
  const android = /android/.test(userAgent)
  return ios || android
}
