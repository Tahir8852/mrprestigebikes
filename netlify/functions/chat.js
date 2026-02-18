const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant for MR Prestige Bikes Repair Shop in Abu Dhabi." },
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();

    // Agar OpenAI koi error bhejta hai (like quota exceeded)
    if (data.error) {
      console.error("OpenAI Error:", data.error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "AI Error: " + data.error.message })
      };
    }

    // Response nikalne ka sahi tariqa
    const aiReply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "No response from AI";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiReply }),
    };
  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Server connection failed." }),
    };
  }
};
