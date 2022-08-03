// select drop down
const wrapper = document.querySelector(".wrapper"),
  selectBtn = wrapper.querySelector(".select-btn"),
  textArea = document.querySelector(".textArea"),
  options = wrapper.querySelector(".options");
let countries = [
  "I want to book a free demo",
  "I want a free trial ",
  "I’m interested in a personalized website",
  "I want to sign up today",
  "I want to book a call",
  "Other (let us know!)",
];
function addCountry(selectedCountry) {
  options.innerHTML = "";
  countries.forEach((country) => {
    let isSelected = country == selectedCountry ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}
addCountry();
function showTextArea() {
  // console.info(selectBtn.firstElementChild.innerText);
  if (selectBtn.firstElementChild.innerText === "Other (let us know!)") {
    textArea.classList.add("active");
  } else {
    textArea.classList.remove("active");
  }
}
showTextArea();
function updateName(selectedLi) {
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;
  showTextArea();
}
selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

// document.addEventListener("click",()=>wrapper.classList.remove("active"));
document.addEventListener("click", (event) => {
  const isClickInside = selectBtn.contains(event.target);

  if (!isClickInside) {
    wrapper.classList.remove("active");
  }
});

//onClick btn

const book = document.getElementById("book");
const free = document.getElementById("free");
const tryNow = document.getElementById("noOutline");
const recommended = document.getElementById("recommended");
const white = document.getElementById("white");

book.addEventListener("click", () => {
  selectBtn.firstElementChild.innerHTML = "I want to book a free demo";
  showTextArea();
  window.location.href = "/#form";
});

free.addEventListener("click", () => {
  selectBtn.firstElementChild.innerHTML = "I want to book a free demo";
  showTextArea();
  window.location.href = "/#form";
});

tryNow.addEventListener("click", () => {
  selectBtn.firstElementChild.innerHTML = "I want a free trial ";
  showTextArea();
  window.location.href = "/#form";
});

recommended.addEventListener("click", () => {
  selectBtn.firstElementChild.innerHTML = "I want to sign up today";
  showTextArea();
  window.location.href = "/#form";
});

white.addEventListener("click", () => {
  selectBtn.firstElementChild.innerHTML =
    "I’m interested in a personalized website";
  showTextArea();
  window.location.href = "/#form";
});

// form
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const fullName = document.getElementById("name");
const msg = document.getElementById("msg");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const nameError = document.getElementById("nameError");
const mainError = document.getElementById("mainError");
const submit = document.querySelector(".submitBtn");

const submitBtn = (e) => {
  e.preventDefault();
  nameValidation();
  emailValidation();
  phoneValidation();
  // console.log(email.value, fullName.value, phone.value);
  mainError.innerHTML = "";
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    selectBtn.firstElementChild.innerText !== "Other (let us know!)"
  ) {
    const data = {
      name: fullName.value,
      email: email.value,
      mobile: phone.value,
      description: selectBtn.firstElementChild.innerText,
    };
    fetchRequest(data);
  }
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    selectBtn.firstElementChild.innerText === "Other (let us know!)"
  ) {
    const data = {
      name: fullName.value,
      email: email.value,
      mobile: phone.value,
      description: `Other: ${msg.value}`,
    };
    fetchRequest(data);
  }
};

const fetchRequest = (data) => {
  // console.log(JSON.stringify(data));
  var requestOptions = {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("https://stagingapi.sugarlogger.com/contact_us", requestOptions).then(
    (res) => {
      if (res.status !== 200) {
        mainError.innerHTML = "Please provide valid information";
      } else {
        mainError.innerHTML =
          "Your details has been saved, We will contact you shortly";
        mainError.style.color = "green";
      }
    }
  );
};

submit.addEventListener("click", (e) => submitBtn(e));

const nameValidation = () => {
  var letters = /^[A-Za-z]+$/;
  if (fullName.value.match(letters) && fullName.value !== "") {
    nameError.innerHTML = "";
    return true;
  } else {
    fullName.focus();
    nameError.innerHTML = "Please Provide a valid name";
    return false;
  }
};

const emailValidation = () => {
  var letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(letters) && email.value !== "") {
    emailError.innerHTML = "";
    return true;
  } else {
    email.focus();
    emailError.innerHTML = "Please provide a valid email";
    return false;
  }
};

const phoneValidation = () => {
  var letters = /^([0-9]{10})+$/;
  // console.log(phone.value.match(letters));
  if (phone.value.match(letters) && phone.value !== "") {
    phoneError.innerText = "";
    return true;
  } else {
    phone.focus();
    phoneError.innerText = "Please provide a valid phone no.";
    return false;
  }
};

// report steps

const steps1 = document.querySelector(".steps1"),
  step1body = document.querySelector(".step1Body");
const steps2 = document.querySelector(".steps2"),
  step2body = document.querySelector(".step2Body");
const steps3 = document.querySelector(".steps3"),
  step3body = document.querySelector(".step3Body");

steps1.addEventListener("click", () => {
  step1body.classList.add("active");
  step2body.classList.remove("active");
  step3body.classList.remove("active");
  steps1.classList.add("active");
  steps2.classList.remove("active");
  steps3.classList.remove("active");
});

steps2.addEventListener("click", () => {
  step1body.classList.remove("active");
  step2body.classList.add("active");
  step3body.classList.remove("active");
  steps1.classList.remove("active");
  steps2.classList.add("active");
  steps3.classList.remove("active");
});

steps3.addEventListener("click", () => {
  step1body.classList.remove("active");
  step2body.classList.remove("active");
  step3body.classList.add("active");
  steps1.classList.remove("active");
  steps2.classList.remove("active");
  steps3.classList.add("active");
});
