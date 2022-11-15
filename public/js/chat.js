// The message text box
const messageInput = document.getElementById("message-input");
// The whole form (the submit handler is on the send message button)
const form = document.getElementById("form");

// Create a socket pointed at where we want to host it.
// This is the connection between the two Socket.io packages (serverside and client)
const socket = io();

// When somebody connects to the socket, print a connection message to chatspace with their socket id.
socket.on("connect", () => {
    displayMessage(`Welcome to the chatroom! (ID: ${socket.id})`)
})

socket.on("recieve-message", message => {
    displayMessage(message);
})

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

// When the form is submitted (send button is clicked)
form.addEventListener("submit", event => {  
    // Prevent default
    event.preventDefault()
    // Store the value of user input
    const message = messageInput.value;
    // If no content, end the function
    if (message === "") {
        return
    }
    // Display the message to the chatspace
    displayMessage(message)
    // After we display the message, send the message to the backend. Add a room if we want the message to only go to a specific room.
    socket.emit("send-message", message)
    // Show the message on the browser console.
    console.log(message);
    // Reset the input field
    messageInput.value = ""
})

function displayMessage(message) {
    // Create new div
    const div = document.createElement("div");
    const hr = document.createElement("hr")
    // Add an id for styling
    div.setAttribute("id", "chat-message")
    // Fill it with the message from the input field
    div.textContent = message;
    // Append it to the chatspace.
    document.getElementById("chatspace").append(div)
    document.getElementById("chatspace").append(hr)
}   