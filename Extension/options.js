let trustedURLs = [];

chrome.storage.local.get(["filteredURLs"], (res) => {
  trustedURLs = res.filteredURLs;
});
setTimeout(() => {
  for (let i = 0; i < trustedURLs.length; i++) {
    tbodyEl.innerHTML += `
    <tr>
        <td><h4 class="hello">${trustedURLs[i]}</h4></td>
        <td><button class="deleteBtn">Delete</button></td>
    </tr>
`;
  }
}, 1000);

const formEl = document.querySelector("form");
const tbodyEl = document.querySelector("tbody");
const tableEl = document.querySelector("table");
function onAddWebsite(e) {
  e.preventDefault();

  const url = document.getElementById("url").value;
  if (!trustedURLs.includes(url)) {
    tbodyEl.innerHTML += `
            <tr>
                <td><h4 class="hello">${url}</h4></td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `;

    trustedURLs.push(url);
    chrome.storage.local.set({
      filteredURLs: trustedURLs,
    });
  }
  formEl.reset();
}

function onDeleteRow(e) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }

  const btn = e.target;
  const text = btn.closest("tr");
  const name = text.querySelector(".hello").innerHTML;

  const index = trustedURLs.indexOf(name);
  if (index > -1) {
    trustedURLs.splice(index, 1);
  }
  chrome.storage.local.set({
    filteredURLs: trustedURLs,
  });
  btn.closest("tr").remove();
}

formEl.addEventListener("submit", onAddWebsite);
tableEl.addEventListener("click", onDeleteRow);
