function sendMail() {
  var params = {
    sendername: document.querySelector("sendername").value,
    to: document.querySelector("to").value,
    subject: document.querySelector("subject").value,
    message: document.querySelector("message").value,
  };

  var serviceID = "service_azrhczj";
  var templateID = "template_p6esnlq";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      alert("Email Sent Successfully!");
    })
    .catch();
}
