async function sendPremiumMessage() {
  const input = document.getElementById("premium-user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBody = document.getElementById("premium-chat-body");
  chatBody.innerHTML += `<div style="text-align:right;margin-bottom:8px;"><b>You:</b> ${message}</div>`;
  input.value = "";

  // Loader show karein
  chatBody.innerHTML += `<div id="ai-loading" style="margin-bottom:8px;"><b>AI:</b> Typing...</div>`;

  try {
    // Yahan hum Netlify ki bajaye direct logic likh rahe hain ya kisi sahi URL ko call kar rahe hain
    // Agar aapke paas koi backend nahi hai, to aapko ek service use karni paregi
    
    const response = await fetch("APKI_BACKEND_URL_YAHAN_AAYEGI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    document.getElementById("ai-loading").remove(); // Loader hatayein
    chatBody.innerHTML += `<div style="margin-bottom:8px;"><b>AI:</b> ${data.reply || data.choices[0].message.content}</div>`;

  } catch (error) {
    if(document.getElementById("ai-loading")) document.getElementById("ai-loading").remove();
    chatBody.innerHTML += `<div style="color:red;margin-bottom:8px;">AI connection error. Please check backend setup.</div>`;
    console.error("Error details:", error);
  }
  chatBody.scrollTop = chatBody.scrollHeight;
}
