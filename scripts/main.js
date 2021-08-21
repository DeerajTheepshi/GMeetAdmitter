var enabled, processing = false, waitForRejectList = true, rejectList = [];

chrome.storage.sync.get(["isGAdmitterEnabled", "rejectList"], (data) => {
  enabled = data.isGAdmitterEnabled;
  console.log(data);
  if(data.rejectList !== "")
    rejectList = data.rejectList.split(",");
  waitForRejectList = false;
});

function getButton(){
  let btns = Array.from(document.querySelectorAll("span"));
  return btns.find((node) => 
    (node.innerText === "Admit" || node.innerText === "View all")
  );
}

function getDenyButton(){
  let btns = Array.from(document.querySelectorAll("span"));
  return btns.find((node) => 
    (node.innerText === "Deny entry")
  );
}

function admit() {
  console.log("Entering...")
  processing = true;
  if(enabled && !waitForRejectList) {
    let targetBtn = getButton();

    if(!targetBtn) {
      processing = false;
      return;
    }
    
    //This Handling of Reject List is a bit messy
    //Can also get affected by the time of entry of participant
    //Revise in later versions

    //If the selected node was view all, click it
    //Shows a list of seperate Admit/Deny with aria-label="Admit for <UserName>"
    //Deny those in rejectList and then continue polling for Admit buttons.
    //This takes care of reject participant coming in with allowed participant
    if(targetBtn.innerText === "View all") {
      targetBtn.click();
      for(let user in rejectList) {
        let node = document.querySelector('[aria-label="Deny for ' + user + '"]');
        if(node) node.click();
      }
    }
    //If reject participant comes alone
    //Go through reject array and check if the name in reject list
    //If yes, reject. Else, Admit.
    else {
      console.log("Solo")
      for(let i=0;i<rejectList.length; i++) {
        let user = rejectList[i];
        console.log(user);
        let node = document.querySelector('[title="'+user+'"]');
        if(node) {
          console.log("title iruku");
          let btn = getDenyButton();
          if(btn) btn.click();
        }
      }
    }


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