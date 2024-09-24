import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "MY_KEY";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", sendMessage);

let lastMessage = ""; // keep track of conversation history with last message reply from the bot

async function sendMessage() {
  // get user input and display it
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  // call api for data based on the prompt & the user's input
  const prompt =
    "This is was what you last told the user: " +
    lastMessage +
    "As a friendly storyteller, poet, and tarot reader, concisely reply to: "; // to customize the interaction
  const result = await model.generateContent(prompt + userInput);

  // get bot's reply from the result fetched

  const botReply = result.response.text();
  lastMessage = botReply;
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
  chatBox.textContent = message;
}
