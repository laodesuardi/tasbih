const date = new Date();
const options = { weekday: "long" };
const formattedDate = date.toLocaleDateString("id-ID", options) + " " + date.toLocaleTimeString();
const counter = document.querySelector("#counter");
const historyList = document.querySelector("#history");
const addBtn = document.querySelector("#add");
let count = 0;
let history = [];

if (localStorage.getItem("history")) {
  history = JSON.parse(localStorage.getItem("history"));
  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = item + `<br> <button type="button" class="delete-button" data-index="${index}">Delete</button>`;
    historyList.appendChild(li);
  });
}

addBtn.addEventListener("click", function () {
  count++;
  counter.innerHTML = count;
  addBtn.innerHTML = count;
  if (count % 100 === 0) {
    navigator.vibrate([200, 100, 200]);
    var sound = new Audio("sound.mp3");
    sound.play();
  }
});

document.querySelector("#reset").addEventListener("click", function () {
  count = 0;
  counter.innerHTML = count;
  addBtn.innerHTML = count;
});

document.querySelector("#save").addEventListener("click", function () {
  const radioButton = document.querySelector('input[name="doa"]:checked');
  const text = radioButton.value;
  const date = new Date();
  const options = { weekday: "long" };
  const formattedDate = date.toLocaleDateString("id-ID", options) + " " + date.toLocaleTimeString();
  history.push(formattedDate + " - " + text + " - " + count + " kali");
  localStorage.setItem("history", JSON.stringify(history));
  const li = document.createElement("li");
  li.innerHTML = formattedDate + " - " + text + " - " + count + " kali " + `<br> <button type="button" class="delete-button" data-index="${history.length - 1}">Delete</button>`;
  historyList.appendChild(li);
  count = 0;
  counter.innerHTML = count;
  addBtn.innerHTML = count;
});

historyList.addEventListener("click", function (event) {
  if (event.target.className === "delete-button") {
    const index = parseInt(event.target.dataset.index, 10);
    history.splice(index, 1);
    localStorage.setItem("history", JSON.stringify(history));
    historyList.innerHTML = "";
    history.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = item + `<br> <button type="button" class="delete-button" data-index="${index}">Delete</button>`;
      historyList.appendChild(li);
    });
  }
});

// dropdown
function toggleDropdown() {
  const radioButton = document.querySelector('input[name="doa"]:checked');
  const text = radioButton.value;
  var dropdown = document.getElementById("dropdownContent");
  var btnText = document.getElementById("toggleBtn");
  if (dropdown.style.display === "block") {
    dropdown.style.transform = "translateY(0)";
    dropdown.style.opacity = "1";
    // dropdown.classList.add("scale-100");
    // dropdown.classList.remove("scale-0");
    btnText.innerHTML = text;
  } else {
    dropdown.style.display = "block";
    btnText.innerHTML = "Close";
  }
}
function hideDropdown() {
  const radioButton = document.querySelector('input[name="doa"]:checked');
  const text = radioButton.value;
  var dropdown = document.getElementById("dropdownContent");
  var btnText = document.getElementById("toggleBtn");
  dropdown.style.transform = "translateY(-350px)";
  dropdown.style.opacity = "0";
  // dropdown.classList.remove("scale-100");
  // dropdown.classList.add("scale-0");
  btnText.innerHTML = text;
}
