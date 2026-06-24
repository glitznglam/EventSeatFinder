const guests = [
  { name: "Angela Reyes", table: "2" },
  { name: "Angelica Ramos", table: "7" },
  { name: "Maria Santos", table: "5" },
  { name: "John Cruz", table: "8" },
  { name: "Mark Santos", table: "3" },
  { name: "Maya Johnson", table: "6" }
];

const input = document.getElementById("guestName");
const suggestionsBox = document.getElementById("suggestions");

input.addEventListener("input", function () {

    const searchText = input.value.toLowerCase();

    suggestionsBox.innerHTML = "";

    if (searchText.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    const matches = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchText)
    );

    if (matches.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    matches.forEach(guest => {

        const item = document.createElement("div");

        item.textContent = guest.name;

        item.addEventListener("click", function () {
            input.value = guest.name;
            suggestionsBox.style.display = "none";
        });

        suggestionsBox.appendChild(item);

    });

    suggestionsBox.style.display = "block";
});

document.addEventListener("click", function (e) {

    if (!e.target.closest(".search-container")) {
        suggestionsBox.style.display = "none";
    }

});

function findSeat() {

    const name = input.value.trim();

    const guest = guests.find(
        g => g.name.toLowerCase() === name.toLowerCase()
    );

    if (guest) {

        document.querySelector(".container").style.display = "none";

        document.getElementById("resultCard").style.display = "block";

        document.getElementById("guestDisplay").innerHTML =
            guest.name;

        document.getElementById("tableDisplay").innerHTML =
            "You are seated at Table " + guest.table;

    } else {

        alert("Guest not found");

    }
}

function closeResult() {

    document.getElementById("resultCard").style.display = "none";

    document.querySelector(".container").style.display = "block";

    document.getElementById("guestName").value = "";

}
