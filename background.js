;(function () {
  const myWebsite = 'https://www.udelity.in'
  const networkFilters = {
    urls: ['*://*.udemy.com/*'],
  }
  let isLoginWithUdemyClicked = false

  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      const authKeyName = 'uauth'
      if (details.url === 'https://www.udemy.com/join/login-popup/') {
        isLoginWithUdemyClicked = true
      }
      if (isLoginWithUdemyClicked) {
        const headers = details.requestHeaders
        const authorizationHeader = headers.find((header) => header.name === 'Authorization')
        if (authorizationHeader) {
          isLoginWithUdemyClicked = false
          localStorage.setItem(authKeyName, authorizationHeader.value)
          chrome.tabs.create({ url: `${myWebsite}/auth/${authorizationHeader.value.substring(7)}` })
        }
      }
      return
    },
    networkFilters,
    ['requestHeaders']
  )
})()
