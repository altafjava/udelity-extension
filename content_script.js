chrome.storage.sync.get(['uauth'], (result) => {
  localStorage.setItem('uauth', result.uauth)
})
