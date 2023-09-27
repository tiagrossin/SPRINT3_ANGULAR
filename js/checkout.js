// Exercise 6
function validate(event) {
  event.preventDefault();
  //Regular expresions filter
  var lettersOnly = /^[A-Za-z]+$/;
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
  var numberFormat = /^\d{9}$/;
  var passwordFormat = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  var fields = [
    { id: "fName", regex: lettersOnly },
    { id: "fLastN", regex: lettersOnly },
    { id: "fEmail", regex: emailFormat },
    { id: "fPassword", regex: passwordFormat },
    { id: "fAddress", regex: /.+/ },
    { id: "fPhone", regex: numberFormat },
  ];

  fields.forEach((field) => {
    var inputField = document.getElementById(field.id);
    var errorElement = document.getElementById("error" + field.id.substring(1));
    if (inputField.value.length < 3 || !field.regex.test(inputField.value)) {
      errorElement.style.display = "block";
      inputField.classList.add("is-invalid");
    } else {
      errorElement.style.display = "none";
      inputField.classList.remove("is-invalid");
      inputField.classList.add("is-valid");
    }
  });
}
