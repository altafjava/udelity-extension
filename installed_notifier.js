;(function () {
  let currentVersion = chrome.runtime.getManifest().version
  window.postMessage(
    {
      sender: 'udelity',
      messageName: 'messageName',
      version: currentVersion,
    },
    '*'
  )
})()
