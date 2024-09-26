import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = ;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// using model.startChat will persist the chat history
// see docs: https://ai.google.dev/gemini-api/docs/text-generation?lang=node
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hi" }],
    },
  ],
});

const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", sendMessage);

async function sendMessage() {
  // get user input and display it
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  // call api for data based on the prompt & the user's input
  const prompt =
    "As a friendly storyteller, poet, and tarot reader, concisely reply to: ";
  const result = await chat.sendMessage(prompt + userInput);

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
  chatBox.textContent = message;
}
