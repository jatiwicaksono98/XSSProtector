chrome.browserAction.setBadgeText({ text: "" });

const currentBlockingStatus = document.getElementById("currentBlockingStatus");

const chck = document.getElementById("chck");

const MLResult = document.getElementById("MLResult");

const onUrl = document.getElementById("onUrl");

const malben = document.getElementById("malben");

const dateTimeEl = document.getElementById("dateTime");

const showStatus = document.getElementById("show");

const maltent = document.getElementById("maltent");

const decodedURLEl = document.getElementById("decodedURL");

const showAnalysisButton = document.getElementById("showAnalysis");

const goThroughProtect = document.getElementById("goThroughProtect");

let decodedURL;
let maliciousContent;
let url;
let date;
let dateComparison = new Date();
let dateComparisonString = `${
  dateComparison.getMonth() + 1
}-${dateComparison.getDate()}-${dateComparison.getFullYear()}`;
chrome.storage.local.get(
  [
    "goThrough",
    "dateTime",
    "MLResult",
    "url",
    "decodedURL",
    "maliciousContent",
  ],
  async (res) => {
    url = res.url;
    decodedURL = res.decodedURL;
    maliciousContent = res.maliciousContent;
    date = res.dateTime.split(" ");
    if (res.goThrough === "Off/Inactive") {
      chck.checked = false;
    } else {
      chck.checked = true;
    }
    maltent.textContent = maliciousContent;
    dateTimeEl.textContent = `Last Block Occurs on${res.dateTime}`;
    if (res.MLResult === "Malicious") {
      malben.textContent = "MALICIOUS";
      malben.style.color = "#ff4d4d";
    } else if (res.MLResult === "Benign") {
      malben.textContent = "BENIGN";
      malben.style.color = "#00FF00";
    } else {
      malben.textContent = "Can not access ML server";
      malben.style.color = "whitesmoke";
    }
    onUrl.textContent = `On URL : ${url}`;
    if (date[8] !== dateComparisonString) {
      dateTimeEl.textContent = `Last Block Occurs on : ${res.dateTime}`;
    } else {
      dateTimeEl.textContent = `Last Block Occurs on : Today, ${res.dateTime}`;
    }
  }
);

chck.addEventListener("click", () => {
  if (chck.checked) {
    chrome.storage.local.set({
      goThrough: "On/Active",
    });
  } else {
    chrome.storage.local.set({
      goThrough: "Off/Inactive",
    });
  }
});

var delayInMilliseconds = 1000;

goThroughProtect.addEventListener("click", () => {
  chrome.storage.local.get(["goThrough"], async (res) => {
    if (res.goThrough === "Off/Inactive") {
      setTimeout(function () {
        //your code to be executed after 1 second
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: url });
          }
        );
      }, delayInMilliseconds);
    } else {
      setTimeout(function () {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: url });
          }
        );
      }, delayInMilliseconds);
    }
  });
});

showAnalysisButton.addEventListener("click", () => {
  if (showStatus.style.display === "none") {
    maltent.style.color = "#ff4d4d";
    decodedURLEl.textContent = "Decoded URL : " + decodedURL;
    showStatus.style.display = "block";
  } else {
    showStatus.style.display = "none";
  }
});

const getToOption = document.querySelectorAll("#navigateToOption");
for (let i = 0; i < getToOption.length; i++) {
  getToOption[i].addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, {
        url: "chrome-extension://fkndgonnjjkjoankmhpjnpabbladbdda/options.html",
      });
    });
  });
}
const markTrusted = document.getElementById("markTrusted");

markTrusted.addEventListener("click", () => {
  chrome.runtime.sendMessage(url);

  if (url.substring(0, 5) === "http:") {
    console.log("https" + url.substring(4));
    chrome.runtime.sendMessage("https" + url.substring(4));
  }
});
