chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({isGAdmitterEnabled: true, rejectList: ""});
});