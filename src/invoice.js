var socket = new WebSocket(
  "wss://www.blockonomics.co/payment/" +
    "bc1qvu4888tpjsrmpsa4ersm3099m52zfjnajnwkwf"
);
let response = null;
socket.onmessage = function (event) {
  response = JSON.parse(event.data);
  console.log(response);
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 1000);
  //This condition ensures that we reload only when we get a
  //new payment status and don't go into a loop
  //   if (parseInt(response.status) > parseInt(status))
  //     setTimeout(function () {
  //       window.location.reload();
  //     }, 1000);
};
