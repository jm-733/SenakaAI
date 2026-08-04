const chat = document.getElementById("chat");
const input = document.getElementById("message");
const send = document.getElementById("send");

function addMessage(sender, text) {
    const message = document.createElement("div");
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    message.style.marginBottom = "15px";
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

send.onclick = () => {

    const text = input.value.trim();

    if (!text) return;

    addMessage("You", text);

    addMessage("Senaka", "Hello! I am still under development.");

    input.value = "";

};

input.addEventListener("keypress", e => {

if(e.key==="Enter") send.click();

});
