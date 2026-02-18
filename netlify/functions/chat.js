export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a premium AI assistant for MR Prestige Bikes Repair Shop in Abu Dhabi.

Services:
- Denting & Painting
- Engine Maintenance (Polaris, Can-Am, RZR)
- Suspension Repair
- Spare Parts
- Bike Pickup Service

Rules:
- Always suggest relevant service.
- Keep replies short & professional.
- Encourage WhatsApp booking at 971501229934.
- Support English and Arabic.`
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI Error" })
    };
  }
}
