const messages = {
  icons: {
    ai: "images/ai.png",
    me: "images/user.png",
    error: "images/error.png"
  },
  ai: (message) => {
    return '<div class="d-flex flex-row justify-content-start">' +
      '<img src="' + messages.icons.ai + '" alt="avatar 1" style="width: 45px; height: 100%;">' +
      '<div>' +
      '<p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;font-style: italic;font-family: monospace;">' + message + '</p>' +
      '</div>' +
      '</div>';
  },
  me: (message) => {
    return '<div class="d-flex flex-row justify-content-end mb-4 pt-1">' +
      '<div>' +
      '<p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning" style="font-style: italic;font-family: monospace;">' + message + '</p>' +
      '</div>' +
      '<img src="' + messages.icons.me + '" alt="avatar 1" style="width: 45px; height: 100%;">' +
      '</div>';
  },
  error: (message) => {
    return '<div class="d-flex flex-row justify-content-start">' +
      '<img src="' + messages.icons.error + '" alt="avatar 1" style="width: 45px; height: 100%;">' +
      '<div>' +
      '<p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7; font-style: italic;font-family: monospace;"><label style="color: reg;" >Error: </label>' + message + '</p>' +
      '</div>' +
      '</div>';
  }
};
const ID = {
  MESSAGES: "messages_wall",
  MESSAGE: "message-input",
  FORM: "form",
  MODULES: "model-select"
}
