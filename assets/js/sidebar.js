document.querySelector(".open-sidebar").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("active");
});

document.querySelectorAll(".list-item").forEach(function (item) {
  item.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      document.querySelector(".sidebar").classList.remove("active");
    }
    var tabId = this.getAttribute("data-tab");
    showTab(tabId);
  });
});

function showTab(tabId) {
  var tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(function (tab) {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  showTab("bagian1");
});
