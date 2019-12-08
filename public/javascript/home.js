let storage = sessionStorage;
let count = storage.getItem('Total_items') ? `(${storage.getItem('Total_items')})` : "";
document.getElementById("layout__cart-items-counter").innerHTML = count;