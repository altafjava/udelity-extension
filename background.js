;(function () {
  // const myWebsite = 'http://example.com/'
  // const myWebsite = 'http://localhost:3000'
  // const myWebsite = 'http://localhost:8080'
  // const myWebsite = 'https://udelity.netlify.app'
  const myWebsite = 'https://udelity-live.herokuapp.com'
  let isMyWebsiteOpen = false
  let isRedirecting = false
  const tabStorage = {}
  let allTabs = new Map()
  const networkFilters = {
    urls: ['*://*.udemy.com/*'],
  }
  let isLoginWithUdemyClicked = false
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (details.url.startsWith('https://www.udemy.com/join/login-popup')) {
        const requestBody = details.requestBody
        if (requestBody) {
          const formData = requestBody.formData
          if (formData) {
            const email = formData.email
            const password = formData.password
            // console.log(email, password)
          }
        }
      }
    },
    networkFilters,
    ['requestBody']
  )
  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      console.log('isLoginWithUdemyClicked=', isLoginWithUdemyClicked)
      console.log(details.url, details)
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
      // const accessToken = localStorage.getItem(authKeyName)
      // if (!accessToken) {
      //   const headers = details.requestHeaders
      //   const authorizationHeader = headers.find((header) => header.name === 'Authorization')
      //   if (authorizationHeader) {
      //     // console.log(authorizationHeader)
      //     localStorage.setItem(authKeyName, authorizationHeader.value)
      //     // chrome.tabs.create({ url: `${myWebsite}/redirect/${authorizationHeader.value.substring(7)}` })
      //     chrome.tabs.create({ url: `${myWebsite}/auth/${authorizationHeader.value.substring(7)}` })
      //   }
      // }
      return
    },
    networkFilters,
    ['requestHeaders']
  )

  // chrome.tabs.query({}, (tabs) => {
  //   for (let i = 0; i < tabs.length; i++) {
  //     const tab = tabs[i]
  //     allTabs.set(tab.id, tab.url)
  //   }
  //   console.log(allTabs)
  // })

  // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {})

  // chrome.tabs.onActivated.addListener((tab) => {
  //   const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE
  //   if (!tabStorage.hasOwnProperty(tabId)) {
  //     tabStorage[tabId] = {
  //       id: tabId,
  //       requests: {},
  //       registerTime: new Date().getTime(),
  //     }
  //   }
  // })

  // chrome.tabs.onRemoved.addListener((tabId) => {
  //   allTabs.delete(tabId)
  //   if (!tabStorage.hasOwnProperty(tabId)) {
  //     return
  //   }
  //   tabStorage[tabId] = null
  // })
})()
