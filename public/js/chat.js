// Current User
let userName;
// The message text box
const messageInput = document.getElementById("message-input");
// The whole form (the submit handler is on the send message button)
const form = document.getElementById("form");

// Create a socket pointed at where we want to host it.
// This is the connection between the two Socket.io packages (serverside and client)
const socket = io();

// When somebody connects to the socket, print a connection message to chatspace with their socket id.
socket.on("connect", async () => {
    await fetch("/api/users/check")
        .then((response) => response.json())
        .then((data) => {
            if (data !== null) {
                userName = data.name
                return;
            } else {
                userName = "???"
                return;
            }
        });
    displayMessage(`Welcome to the chatroom (ID: ${socket.id})`)
})

socket.on("recieve-message", (message, user) => {
    displayMessage(message, user);
})

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

// When the form is submitted (send button is clicked)
form.addEventListener("submit", async event => {
    // Prevent default
    event.preventDefault()
    // Store the value of user input
    const message = messageInput.value;
    // If the user is not logged in.
    if (userName === "???") {
        // Dont let them chat.
        alert("You must be logged in to chat!")
        messageInput.value = "";
        return;
    }
    
    // If no content, end the function
    if (message === "") {
        return;
    }
    // Display the message to the chatspace
    displayMessage(message, userName)
    // After we display the message, send the message to the backend. Add a room if we want the message to only go to a specific room.
    socket.emit("send-message", message, userName)
    // Show the message on the browser console.
    console.log(message);
    // Reset the input field
    messageInput.value = ""
})

function displayMessage(message, user) {
    // Create new div
    const div = document.createElement("div");
    const hr = document.createElement("hr")
    // Add an id for styling
    div.setAttribute("id", "chat-message")
    // Fill it with the message from the input field
    div.textContent = `${user}: ${message}`;
    // Append it to the chatspace.
    document.getElementById("chatspace").append(div)
    document.getElementById("chatspace").append(hr)
}