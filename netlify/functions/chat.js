async function sendPremiumMessage() {
  const input = document.getElementById("premium-user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBody = document.getElementById("premium-chat-body");
  chatBody.innerHTML += `<div style="text-align:right;margin-bottom:8px;"><b>You:</b> ${message}</div>`;
  input.value = "";

  // Typing... status
  const loadingId = "loading-" + Date.now();
  chatBody.innerHTML += `<div id="${loadingId}" style="margin-bottom:8px;"><b>AI:</b> Typing...</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    document.getElementById(loadingId).remove(); // Remove loader
    
    chatBody.innerHTML += `<div style="margin-bottom:8px;"><b>AI:</b> ${data.reply}</div>`;
  } catch (error) {
    document.getElementById(loadingId).innerHTML = `<b style="color:red;">AI Error:</b> Connection failed.`;
  }
  chatBody.scrollTop = chatBody.scrollHeight;
}
