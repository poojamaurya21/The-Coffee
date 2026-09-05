const order = {
    drink: "espresso",
    size: "Medium",
    milk: "Regular",
    extras: [],
};

const prices = {
   
        espresso: 2.5,
        latte: 3.8,
        cappuccino: 3.6,
        matcha: 4.0,
        chai: 3.5,
        small: 0.50,
        medium: 0.75,
        large: 1.0,
        extrashot: 1.0,
        vanilla: 0.5,
        caramel: 0.6,
        whipped: 0.5,
        none: 0.0,
        soy: 0.5,
        almond: 0.5,
        oat: 0.5,   
    };

const drinkColours = {
    espresso: "#1e0c04",
    latte: "#d3bfa3",
    cappuccino: "#c0a080",
    matcha: "#4a7c3f86",
    chai: "#d2691e",
};    

const sizeHeight = {
    small: "45%",
    medium: "65%",
    large: "95%",
};

const extraLabels = {
    extrashot: "Extra Shot",
    vanilla: "Vanilla Syrup",   
    caramel: "Caramel Syrup",
    whipped: "Whipped Cream",
};
 
const cup = document.getElementById("cup");
const summary = document.getElementById("summary");

function updateCup() {
    cup.style.setProperty("--fill-colour", drinkColours[order.drink]);
    cup.style.setProperty("--fill-height", sizeHeight[order.size]);

    ["extrashot", "vanilla", "caramel", "whipped"].forEach((extra) => {
        document.getElementById("badge-" + extra)
        .classList.toggle("visible", order.extras.includes(extra));
    });
}

// Update the summary section with the current order details

function updateSummary() {
    const cap = (s) => s[0].toUpperCase() + s.slice(1);
    const milkLabel = 
         order.milk === "none" ? "No Milk" : cap(order.milk) + " Milk";

    let total = prices[order.drink] + prices[order.size];
    order.extras.forEach((e) => {
        total += prices[e];
    });

    const extraRows = order.extras
    .map(
        (e) => `
        <div class="summary-row">
            <span>${extraLabels[e]}</span>
            <span>$${prices[e].toFixed(2)}</span>
        </div>`,
     )
     .join("");

    summary.innerHTML = `
        <h3>Your Order</h3>
        <div class="summary-row">
            <span>${cap(order.drink)}</span>
            <span>$${prices[order.drink].toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>${cap(order.size)}</span>
            <span>$${prices[order.size] > 0 ? "" + prices[order.size].toFixed(2) : ""}</span>
        </div>
        <div class="summary-row">
        <span>${milkLabel}</span>
        <span>$${prices[order.milk].toFixed(2)}</span>
        </div>
        ${extraRows}
        <hr class="summary-divider" />
        <div class="summary-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;

}

document.querySelectorAll('input[name="drink"]').forEach((input) => {
    input.addEventListener("change", function () {
        order.drink = this.value;
        console.log(order);
        updateCup();
        updateSummary();
    });
});
  document.querySelectorAll('input[name="size"]').forEach((input) => {
    input.addEventListener("change", function () {  
        order.size = this.value;
        console.log(order);
        updateCup();
        updateSummary();
    });
});

document.querySelectorAll('input[name="milk"]').forEach((input) => {
    input.addEventListener("change", function () {
        order.milk = this.value;
        updateCup();
        updateSummary();
    });
});
 
document.querySelectorAll('input[name="extras"]').forEach((input) => {
    input.addEventListener("change", function () {
        if (this.checked) {
            order.extras.push(this.value);
        } else {
            const index = order.extras.indexOf(this.value);
            order.extras.splice(index, 1);
        }
          console.log("order:", order.extras);
        updateCup();
        updateSummary();
    });
});

updateCup();
updateSummary();
