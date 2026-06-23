const guests = [
  { name: "Angela Reyes", table: "2" },
  { name: "Angelica Ramos", table: "7" },
  { name: "Maria Santos", table: "5" },
  { name: "John Cruz", table: "8" }
];

function findSeat() {

    const name =
        document.getElementById("guestName").value;

    const guest =
        guests.find(
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
