const guests = [
  { name: "Angela Reyes", table: "2" },
  { name: "Angelica Ramos", table: "7" },
  { name: "Maria Santos", table: "5" },
  { name: "John Cruz", table: "8" },
  { name: "Mark Santos", table: "3" },
  { name: "Maya Johnson", table: "6" }
];

// Populate autocomplete list
const datalist = document.getElementById("guestSuggestions");

guests.forEach(guest => {
    const option = document.createElement("option");
    option.value = guest.name;
    datalist.appendChild(option);
});

function findSeat() {

    const name = document.getElementById("guestName").value;

    const guest = guests.find(
        g => g.name.toLowerCase() === name.toLowerCase()
    );

    if (guest) {
        document.getElementById("result").innerHTML =
            "You are seated at Table " + guest.table;
    } else {
        document.getElementById("result").innerHTML =
            "Guest not found";
    }
}
