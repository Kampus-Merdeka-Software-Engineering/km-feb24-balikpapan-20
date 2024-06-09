(function () {
  emailjs.init({
    publicKey: "vuiJegTjAmp-ItsmN",
  });
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    sendMail();
  });

function sendMail() {
  var params = {
    sendername: document.getElementById("sendername").value,
    senderemail: document.getElementById("senderemail").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  var serviceID = "service_azrhczj";
  var templateID = "template_p6esnlq";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      alert("Email Sent Successfully!");
      console.log(res);
    })
    .catch((Error) => {
      console.log(Error);
    });
}
