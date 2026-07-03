let guests = [];

const input = document.getElementById("guestName");
const suggestionsBox = document.getElementById("suggestions");

const sheetID = "18vHPjaoOreO1j6DnmZ9VYWS4q0p387HmrpqvmYUkTbU";

/* ---------------------------
   LOAD GUESTS
---------------------------- */

const guestsUrl =
`https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

fetch(guestsUrl)
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

    console.log("Guests loaded:", guests);

})
.catch(error => {
    console.error("Guest loading error:", error);
});

/* ---------------------------
   LOAD SETTINGS
---------------------------- */

function loadSettings() {

    const settingsUrl =
`https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=Settings&headers=1&tqx=out:json`;

    fetch(settingsUrl)
    .then(response => response.text())
    .then(data => {

        const json = JSON.parse(
            data.substring(47).slice(0, -2)
        );

        const rows = json.table.rows;

        console.log("Settings rows:", rows);

        let settings = {};

        rows.forEach(row => {

            const key = row.c[0]?.v;
            const value = row.c[1]?.f || row.c[1]?.v;

            if (key && value) {
                settings[key] = value;
            }

        });

        console.log("Settings:", settings);

        document.getElementById("eventName").innerText =
             settings["Event Name"] || "Find Your Seat";

      document.getElementById("venueName").innerText =
             settings["Venue"] || "";

      document.getElementById("eventDate").innerText =
             settings["Event Date"] || "";

    })
    .catch(error => {
        console.error("Settings loading error:", error);
    });

}

/* ---------------------------
   AUTOCOMPLETE
---------------------------- */

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

/* ---------------------------
   FIND SEAT
---------------------------- */

function findSeat() {

    const name = input.value.trim();

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

/* ---------------------------
   CLOSE RESULT
---------------------------- */

function closeResult() {

    document.getElementById("resultCard").style.display =
        "none";

    document.querySelector(".container").style.display =
        "block";

    input.value = "";

    suggestionsBox.innerHTML = "";

    suggestionsBox.style.display = "none";

}

/* ---------------------------
   FLOOR PLAN POPUP
---------------------------- */

function openFloorPlan() {

    document.getElementById("imageModal").style.display =
        "flex";

}

function closeFloorPlan() {

    document.getElementById("imageModal").style.display =
        "none";

}

/* ---------------------------
   START
---------------------------- */

loadSettings();
