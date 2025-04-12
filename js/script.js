const proceedBtn = document.getElementById("proceedBtn");
const addOnExtrasBtn = document.getElementById("addOnExtrasBtn");
const addOnInsuranceBtn = document.getElementById("addOnInsuranceBtn");

const initialSection = document.getElementById("initial-section");
const extrasSection = document.getElementById("extras-section");
const insuranceSection = document.getElementById("insurance-section");
const confirmSection = document.getElementById("confirm-section");

// кнопка яка ховає картку та показує  наступний крок "add on extras"
proceedBtn.addEventListener("click", () => {
  initialSection.classList.add("hidden");
  extrasSection.classList.remove("hidden");
});
// кнопка переходу з "extras" до "insurance"
addOnExtrasBtn.addEventListener("click", () => {
  extrasSection.classList.add("hidden");
  insuranceSection.classList.remove("hidden");
});

// кнопка переходу на confirm
addOnInsuranceBtn.addEventListener("click", () => {
  insuranceSection.classList.add("hidden");
  confirmSection.classList.remove("hidden");
});

// кнопка зміни стану в "add on extras"
document.querySelectorAll(".extra-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Тогл на самій кнопці
    btn.classList.toggle("active");

    // Знаходимо вкладений svg-контейнер
    const svgContainer = btn.querySelector(".extra-btn-svg-container");
    if (svgContainer) {
      svgContainer.classList.toggle("active");
    }
  });
});

// кнопка вибору страховки (зміна тарифу страхування)

const cards = document.querySelectorAll(".insurance-card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// момент вибору тарифу страхування відображаеться в   total

const insuranceMap = {
  none: { name: "No Insurance", price: 0 },
  basic: { name: "Basic Insurance", price: 15 },
  full: { name: "Comprehensive Insurance", price: 25 },
};

const carPrice = 32.98;

const updateTotal = (type) => {
  const insurance = insuranceMap[type];
  const total = carPrice + insurance.price;
  const totalFormatted = total.toFixed(2).replace(".", ",");

  document.getElementById("insuranceType").textContent = insurance.name;
  document.getElementById("insurancePrice").textContent = insurance.price
    ? `${insurance.price} EUR`
    : "Free";
  document.getElementById("totalPrice").textContent = `${totalFormatted} EUR`;
  document.getElementById("laterPrice").textContent = `${totalFormatted} EUR`;
  document.getElementById("nowPrice").textContent = `${(total + 5)
    .toFixed(2)
    .replace(".", ",")} EUR`;
};

// Спочатку активне basic
let selectedType = "basic";
updateTotal(selectedType);

// Прив'язуємось до попередніх карток страхування
const insuranceCards = document.querySelectorAll(".insurance-card");
insuranceCards.forEach((card) => {
  card.addEventListener("click", () => {
    selectedType = card.dataset.type;
    updateTotal(selectedType);
  });
});
