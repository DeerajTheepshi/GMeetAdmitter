var enabled, processing = false;

chrome.storage.sync.get(["isGAdmitterEnabled"], (data) => {
  console.log(data);
  enabled = data.isGAdmitterEnabled;
});

function getButton(){
  let spans = Array.from(document.querySelectorAll("span"));
  return spans.find((node) => 
    (node.innerText === "Admit" || node.innerText === "View all" || node.innerText === "Admit all")
  );
}

function admit() {
  processing = true;
  if(enabled) {
    let targetBtn = getButton();
    if(!targetBtn) {
      processing = false;
      return;
    }
    targetBtn.click();
  }
  processing = false;
}

function poll(timeInMs) {
  setInterval(() => {
    if(!processing) admit();
  }, timeInMs);
}

// var pollTime;
// chrome.storage.sync.get(["GMpollTime"], (data) => {
//   pollTime = data.GMpollTime;
// })
poll(1000);