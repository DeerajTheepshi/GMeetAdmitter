function getButton(){
  Array.from(document.querySelectorAll("span")).find((node) => {
    return node.innerHTML === "Admit" || node.innerHTML === "Admit All"
  });
}

function admit() {
  let targetBtn = getButton();
  if(!targetBtn) {
    return;
  }
  targetBtn.click();
}

function poll(timeInMs) {
  setInterval(admit, timeInMs);
}

var pollTime;
chrome.storage.sync.get(["GMpollTime"], (data) => {
  pollTime = data.GMpollTime;
})

poll(pollTime);