const FROM_USER = "me";
const FROM_AI = "ai";
const FROM_ERROR = "error";
const socket = io();

function addmessage(from, message) {
  $(`#${ID.MESSAGES}`).append(messages[from](message));
}

function Scroll() {
  var objDiv = document.getElementById(ID.MESSAGES);
  objDiv.scrollTop = objDiv.scrollHeight;
}

$(document).ready(() => {
  let uuid = null;
  let model = "";
  socket.on('response', (data) => {
    addmessage(FROM_ERROR, data.message);
    Scroll();
  });
  socket.on('message', (data) => {
    addmessage(FROM_AI, data.message);
    Scroll();
  });
  socket.on('uuid', (data) => {
    uuid = data.id;
  });
  socket.on('modules', (data) => {
    model = data.default;
    $.each(data.module, function(i, item) {
      $(`#${ID.MODULES}`).append($('<option>', {
        value: item.id,
        text: item.id
      }));
    });
    $(`#${ID.MODULES} option[value=${model}]`).attr('selected', 'selected');
    $(`#${ID.MODULES}`).on('change', (e) => model = this.value);
  });
  $(`#${ID.FORM}`).submit((event) => {
    event.preventDefault();
    const message = $(`#${ID.MESSAGE}`).val();
    addmessage(FROM_USER, message);
    Scroll();
    socket.emit('request', { id: uuid, message: message, module: model });
    $(`#${ID.MESSAGE}`).val('');
  });
})
