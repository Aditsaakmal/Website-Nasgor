const orderBtns = document.querySelectorAll(".order-btn");

orderBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const price = this.getAttribute("data-price");

    // Menambahkan item ke dalam daftar pesanan
    const orderList = document.getElementById("orderList");
    const listItem = document.createElement("li");
    listItem.textContent = `${name} - Rp. ${price}`;
    orderList.appendChild(listItem);

    // Update total harga
    updateTotalPrice();

    // Membuka modal
    const orderModal = new bootstrap.Modal(
      document.getElementById("orderModal")
    );
    orderModal.show();

    // Update tautan WhatsApp
    updateWhatsAppLink();
  });
});

function updateTotalPrice() {
  const orderItems = document.querySelectorAll("#orderList li");
  let total = 0;
  orderItems.forEach((item) => {
    const price = parseInt(item.textContent.split("Rp. ")[1]);
    total += price;
  });
  document.getElementById("totalPrice").textContent = `Rp. ${total}`;
}

function updateWhatsAppLink() {
  const orderItems = document.querySelectorAll("#orderList li");
  let message = "Halo, saya ingin memesan:\n";

  orderItems.forEach((item) => {
    message += `- ${item.textContent}\n`;
  });

  const total = document.getElementById("totalPrice").textContent;
  message += `Total: ${total}`;

  // Encode pesan ke dalam format URL
  const encodedMessage = encodeURIComponent(message);

  // Update tautan WhatsApp
  const whatsappLink = document.getElementById("whatsappLink");
  whatsappLink.href = `https://wa.me/6282261429041?text=${encodedMessage}`;
}
