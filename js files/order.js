// Wait for DOM loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const flavour1 = document.getElementById("flavour1");
  const flavour2 = document.getElementById("flavour2");
  const flavour3 = document.getElementById("flavour3");
  const icing = document.getElementById("icing");
  const icingColor = document.getElementById("icingColor");
  const pickupDate = document.getElementById("pickupDate");
  const moreDetails = document.getElementById("moreDetails");
  const previewBox = document.getElementById("preview");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const size = document.getElementById("size");

  // Update preview when any input changes
  [nameInput, flavour1, flavour2, flavour3, icing, icingColor, pickupDate, moreDetails, size].forEach(el => {
    el.addEventListener("input", updatePreview);
    el.addEventListener("change", updatePreview); // for select elements
  });

  // WhatsApp button click
  whatsappBtn.addEventListener("click", sendWhatsAppMessage);

  // Initial preview
  updatePreview();
});

// Build the WhatsApp message from input values
function buildMessage() {
  const name = document.getElementById("nameInput").value.trim();
  const size = document.getElementById("size").value.trim();
  const flavour1 = document.getElementById("flavour1").value.trim();
  const flavour2 = document.getElementById("flavour2").value.trim();
  const flavour3 = document.getElementById("flavour3").value.trim();
  const icing = document.getElementById("icing").value.trim();
  const icingColor = document.getElementById("icingColor").value.trim();
  const pickupDate = document.getElementById("pickupDate").value.trim();
  const moreDetails = document.getElementById("moreDetails").value.trim();

  const flavourList = [flavour1, flavour2, flavour3].filter(f => f);
  const flavoursLine = flavourList.length
    ? `-I would like ${flavourList.join(", ")} as my flavour${flavourList.length > 1 ? "s" : ""}.`
    : "";

  if (!name || !icing || !icingColor || !pickupDate || !size) return "";

  return `Hello 👋, my name is ${name}.\n` +
    `I'm interested in ordering a cake of${size} :\n\n` +
    (flavoursLine ? `${flavoursLine}\n` : "") +
    `-My chosen icing is ${icing}.\n` +
    `-I’d like the icing in the colour(s): ${icingColor}.\n` +
    `-I will pick up the cake on ${pickupDate}.\n\n` +
    `-More details about my cake:\n${moreDetails || "N/A"}`;
}

// Update the preview box content
function updatePreview() {
  const previewBox = document.getElementById("preview");
  const message = buildMessage();
  previewBox.textContent = message || "Preview will appear here...";
}

// Send message on WhatsApp
function sendWhatsAppMessage() {
  const name = document.getElementById("nameInput").value.trim();
  const icing = document.getElementById("icing").value.trim();
  const icingColor = document.getElementById("icingColor").value.trim();
  const pickupDate = document.getElementById("pickupDate").value.trim();
  const size = document.getElementById("size").value.trim();

  if (!name || !icing || !pickupDate || !icingColor || !size) {
    alert("Please fill in all required fields (name, size, icing, colour, date).");
    return;
  }

  const message = buildMessage();
  const encodedMessage = encodeURIComponent(message);
  const phone = "+256772591033";
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(url, "_blank");
}

// Toggle logic for first extra section
let extraVisible = false;
document.getElementById("toggleBtn").addEventListener("click", () => {
  const section = document.getElementById("extraSection");
  const btn = document.getElementById("toggleBtn");

  if (!extraVisible) {
    section.style.maxHeight = "500px";
    btn.textContent = "Hide Section";
  } else {
    section.style.maxHeight = "0";
    btn.textContent = "What do I say?";
  }

  extraVisible = !extraVisible;
});

// Toggle logic for second extra section
let extraVisible2 = false;
document.getElementById("toggleBtn2").addEventListener("click", () => {
  const section = document.getElementById("extraSection2");
  const btn = document.getElementById("toggleBtn2");

  if (!extraVisible2) {
    section.style.maxHeight = "500px";
    btn.textContent = "Hide section";
  } else {
    section.style.maxHeight = "0";
    btn.textContent = "learn what happens when you order";
  }

  extraVisible2 = !extraVisible2;
});

// Handle ?flavour= query in URL
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const flavourFromURL = params.get("flavour");

  if (flavourFromURL) {
    const flavour1Input = document.getElementById("flavour1");
    if (flavour1Input && !flavour1Input.value) {
      flavour1Input.value = flavourFromURL;
    }
  }

  updatePreview();
});
