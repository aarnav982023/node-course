const socket = io();

//Elements
const $messageForm = document.querySelector("#messageForm");
const $messageFormInput = $messageForm.querySelector("input");
const $messageSubmitButton = $messageForm.querySelector("#messageSubmitButton");
const $sendLocationButton = document.querySelector("#sendLocationButton");
const $messages = document.querySelector("#messages");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const helpMessageTemplate = document.querySelector("#helpMessage-template")
  .innerHTML;

socket.on("helpMessage", (helpMessage) => {
  const html = Mustache.render(helpMessageTemplate, {
    helpMessage,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (location) => {
  //console.log(location);
  const html = Mustache.render(locationTemplate, {
    location,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  $messageSubmitButton.setAttribute("disabled", true);
  const message = $messageFormInput.value;
  socket.emit("sendMessage", message, (error) => {
    $messageSubmitButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("Message Delivered");
  });
});

$sendLocationButton.addEventListener("click", (event) => {
  if (!navigator.geolocation) {
    return alert("Geolcation is not supported by your browser");
  }
  $sendLocationButton.setAttribute("disabled", true);
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, (msg) => {
      $sendLocationButton.removeAttribute("disabled");
      console.log(msg);
    });
  });
});
