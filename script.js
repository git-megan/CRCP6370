const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", sendMessage);

async function sendMessage() {
  // get user input and display it
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;
  appendMessage("user", userInput);

  // call api for data based on the user's input
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer my-api-key",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput },
      ],
      max_tokens: 150,
    }),
  });

  // get bot's reply from the data that was fetched, and display it
  if (response.ok) {
    const data = await response.json();
    const botReply = data.choices[0].text.trim();
    appendMessage("bot", botReply);
  } else {
    appendMessage("bot", "Error: Unable to fetch response from the server");
  }

  // clear the input form so user can write something else
  document.getElementById("user-input").value = "";
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) {
    console.error("Chat box element not found!");
    return;
  }

  // create a new message div to put the new message into
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender); // message div has a .message class and a .bot or .user class
  messageDiv.textContent = message;

  // add the message div to the chat box area
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
