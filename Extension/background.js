chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.storage.local.set({
  filteredURLs: [],
});
let goThrough;
let filteredSites = [];
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["goThrough"], (res) => {
    goThrough = res.goThrough;
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (goThrough === "On/Active") {
      const decodedUrl = decodeURIComponent(details.url);
      let results = [];
      let min;
      let suspiciousUrlSubstring;
      let flag = true;
      if (decodedUrl.includes('"')) {
        results.push(decodedUrl.indexOf('"'));
      }
      if (decodedUrl.includes("<")) {
        results.push(decodedUrl.indexOf("<"));
      }
      if (decodedUrl.includes(">")) {
        results.push(decodedUrl.indexOf(">"));
      }
      if (decodedUrl.includes("'")) {
        results.push(decodedUrl.indexOf("'"));
      }
      if (results.length > 0) {
        min = Math.min(...results);
        suspiciousUrlSubstring = decodedUrl.substring(min, min + 100);
      } else {
        suspiciousUrlSubstring = null;
      }
      flag = loopThroughList(details.url, filteredSites);

      if (suspiciousUrlSubstring && flag) {
        var today = new Date();
        var date = `
        ${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + " at " + time;

        chrome.storage.local.set({
          dateTime: dateTime,
          url: details.url,
          decodedURL: decodedUrl,
          maliciousContent: suspiciousUrlSubstring,
        });
        return { cancel: true };
      }
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame"],
  },
  ["blocking"]
);

function loopThroughList(url, allowedSite) {
  for (const filter of allowedSite) {
    if (url === filter) {
      return false;
    }
  }
  return true;
}

chrome.storage.onChanged.addListener(function (changes) {
  chrome.storage.local.get(["filteredURLs"], (res) => {
    filteredSites = res.filteredURLs;
    console.log(filteredSites);
  });

  if (changes.dateTime.oldValue !== changes.dateTime.newValue) {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#F00" }, () => {
      chrome.browserAction.setBadgeText({ text: "!!!" });
    });
    this.registration.showNotification("XSS Protector", {
      body: `Please click on the extension icon at the top right of the screen for blocking detail!`,
      icon: "iconz5.png",
    });
  }
  if (changes.url.oldValue !== changes.url.newValue) {
    const fetchPromise = fetch(
      "http://localhost:5000/predict?url=" + changes.url.newValue
    );
    fetchPromise
      .then((response) => {
        response.json().then((data) => {
          if (data.prediction === "Malicious") {
            chrome.storage.local.set({
              MLResult: "Malicious",
            });
          } else {
            chrome.storage.local.set({
              MLResult: "Benign",
            });
          }
        });
      })
      .catch(() => {
        chrome.storage.local.set({
          MLResult: "Cannot Access ML model",
        });
      });
  }
});

chrome.runtime.onMessage.addListener(function (response, sender, SendResponse) {
  console.log("message got to background");
  if (!filteredSites.includes(response)) {
    addToFilteredURLList(response).then(SendResponse);
    console.log("added");
    setFilteredURLS(filteredSites).then(SendResponse);
  }
});
async function addToFilteredURLList(response) {
  filteredSites.push(response);
}

async function setFilteredURLS(filteredSites) {
  chrome.storage.local.set({
    filteredURLs: filteredSites,
  });
}
