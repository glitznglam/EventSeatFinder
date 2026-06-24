let guests = [];

const input = document.getElementById("guestName");
const suggestionsBox = document.getElementById("suggestions");

const sheetID = "18vHPjaoOreO1j6DnmZ9VYWS4q0p387HmrpqvmYUkTbU";

const url =
`https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

fetch(url)
.then(response => response.text())
.then(data => {

    const json = JSON.parse(
        data.substring(47).slice(0, -2)
    );

    const rows = json.table.rows;

    guests = rows.map(row => ({
        name: row.c[0]?.v || "",
        table: row.c[1]?.v || ""
    }));

})
.catch(error => {
    console.error("Sheet loading error:", error);
});

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

    const name = input.value;

    const guest = guests.find(
        g => g.name.toLowerCase() === name.toLowerCase()
    );

    if (guest) {
            
        document.getElementById("guestDisplay").innerHTML =
        guest.name;

    document.getElementById("tableDisplay").innerHTML =
        "You are seated at Table " + guest.table;

    document.querySelector(".container").style.display =
        "none";

    document.getElementById("resultCard").style.display =
        "block";

    } else {

        alert("Guest not found");

    }
}

function closeResult() {

    document.getElementById("resultCard").style.display = "none";

    document.querySelector(".container").style.display = "block";

    alert("Close button clicked");

}
