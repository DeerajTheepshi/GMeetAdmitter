let enableBtn = document.getElementById("enable-btn");
let disableBtn = document.getElementById("disable-btn");
let statusSpan = document.getElementById("status");
let rejectListInput = document.getElementById("reject-list");

chrome.storage.sync.get(["isGAdmitterEnabled"], data => {
  if(data.isGAdmitterEnabled) {
    enableBtn.disabled = true;
    disableBtn.disabled = false;
    statusSpan.innerText = "ENABLED"
  }
  else {
    enableBtn.disabled = false;
    disableBtn.disabled = true;
    status.innerText = "DISABLED"
  }
})

enableBtn.addEventListener("click", () => {
  chrome.storage.sync.set({isGAdmitterEnabled: true});
  enableBtn.disabled = true;
  disableBtn.disabled = false;
});

disableBtn.addEventListener("click", () => {
  chrome.storage.sync.set({isGAdmitterEnabled: false});
  enableBtn.disabled = false;
  disableBtn.disabled = true;
});

rejectListInput.addEventListener("change", (e) => {
  console.log("hey");
  chrome.storage.sync.set({rejectList: e.target.value.trim()});
});
