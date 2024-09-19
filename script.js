import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("my-api-key");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", sendMessage);

async function sendMessage() {
  // get user input and display it
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;
  appendMessage("user", userInput);

  // call api for data based on the user's input
  const result = await model.generateContent(userInput);

  // get bot's reply from the result fetched

  const botReply = result.response.text();
  appendMessage("bot", botReply);

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
