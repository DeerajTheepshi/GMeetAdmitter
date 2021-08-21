let enableBtn = document.getElementById("enable-btn");
let disableBtn = document.getElementById("disable-btn");

chrome.storage.sync.get(["isGAdmitterEnabled"], data => {
  if(data.isGAdmitterEnabled) enableBtn.disabled = true;
  else enableBtn.disabled = false;
})

enableBtn.addEventListener("click", () => {
  chrome.storage.sync.set({isGAdmitterEnabled: true});
});

disableBtn.addEventListener("click", () => {
  chrome.storage.sync.set({isGAdmitterEnabled: false});
})