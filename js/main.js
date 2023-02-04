//logo
let logo = document.querySelector("header .container a img");
logo.onclick = function () {
  window.location.reload();
};

//preload animation
let loader = document.getElementById("loader");
let timeStart = new Date();
window.addEventListener("load", () => {
  loader.style.display = "none";
});

//toglle menu
let navBar = document.querySelector("header .container ul.nav");
let toggleLinks = document.querySelectorAll("header .container ul.nav a");
let toggleMenu = document.querySelector("i.fa-bars");
toggleMenu.onclick = function () {
  navBar.classList.toggle("mobile-nav");
};
toggleLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleLinks.forEach((lnk) => {
      lnk.classList.remove("active");
    });
    link.classList.add("active");
  });
});

// image slider
let prevBtn = document.querySelector("span.previous");
let nextBtn = document.querySelector("span.next");
let indicators = document.querySelectorAll(".indicators span");
let landing = document.getElementsByClassName("landing")[0];

let images = [];
images[0] = "./images/owl1.jpg";
images[1] = "./images/owl2.jpg";
images[2] = "./images/owl3.jpg";
let currentSlide = Math.ceil(Math.random() * 3); //1 2 3
prevBtn.onclick = function () {
  currentSlide--;
  cheker();
};
nextBtn.onclick = function () {
  currentSlide++;
  cheker();
};
indicators.forEach((el) => {
  el.addEventListener("click", function () {
    currentSlide = el.dataset.index;
    cheker();
  });
});
cheker();
// window.setInterval(autoSlider, 5000);
function activeIndicator() {
  indicators.forEach((el) => {
    el.classList.remove("active");
  });
  indicators[currentSlide - 1].classList.add("active");
}
function cheker() {
  if (currentSlide > images.length) {
    if (currentSlide % 3 != 0) {
      currentSlide = currentSlide % 3;
    } else {
      currentSlide = 1;
    }
  }
  if (currentSlide < 1) {
    currentSlide += 3;
  }
  changeOpacity();
  landing.style.backgroundImage = `url(${images[currentSlide - 1]})`;
  activeIndicator();
}
// function autoSlider() {
//   currentSlide += 1;
//   cheker();
// }
function changeOpacity() {
  landing.style.animationName = "fade";
  setTimeout(() => {
    landing.style.animationName = "";
  }, 1000);
}

//search bar
let searchIcon = document.getElementsByClassName("fa-search")[0];
let searchField = document.querySelector("input[type = 'search']");
let searchUl = document.querySelector("header .container form ul");
let searchItems = document.querySelectorAll("header .container form ul li");
let form = document.forms[0];

searchIcon.onclick = function () {
  searchField.value = "";
  if (searchField.style.display != "inline-block") {
    searchField.style.display = "inline-block";
    searchField.focus();
    searchUl.style.display = "flex";
    navBar.style.display = "none";
    form.style.borderLeft = "none";
  } else {
    searchField.style.display = "none";
    searchUl.style.display = "none";
    navBar.style.display = "flex";
    form.style.borderLeft = "1px solid white";
    document.getElementById("no-result").style.display = "none";
  }
};
searchField.addEventListener("input", function () {
  let found = false;
  for (let i = 0; i < searchItems.length; i++) {
    if (
      searchField.value != "" &&
      searchItems[i].textContent
        .toLowerCase()
        .indexOf(`${searchField.value.toLowerCase()}`) >= 0
    ) {
      searchItems[i].style.display = "inline-block";
      found = true;
    } else {
      searchItems[i].style.display = "none";
    }
  }
  if (!found) {
    document.getElementById("no-result").style.display = "block";
  } else {
    document.getElementById("no-result").style.display = "none";
  }
});

// scroll to top button
let scrollBtn = document.querySelector("i.scroll");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 500) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});
scrollBtn.onclick = function () {
  window.scrollTo(0, 0);
  window.location.hash = "";
  activeHome();
};

//filter our work
let workBtns = document.querySelectorAll(".portfolio .container ul li");
let ourWorks = document.querySelectorAll(
  ".portfolio .images-container .image-box"
);

workBtns.forEach((el) => {
  el.addEventListener("click", function () {
    workBtns.forEach((ele) => {
      ele.classList.remove("active");
    });
    el.classList.add("active");
  });
  el.addEventListener("click", function () {
    ourWorks.forEach((img) => {
      img.style.opacity = "0";
      window.setTimeout(() => {
        img.style.display = "none";
      }, 300);
    });
    window.setTimeout(() => {
      document.querySelectorAll(this.dataset.cont).forEach((img) => {
        img.style.display = "inline-block";
        window.setTimeout(() => {
          img.style.opacity = "1";
        }, 100);
        moreOrLess(); //when click all
        if (this.dataset.cont != ".all") {
          moreBtn.style.display = "none";
        } else {
          moreBtn.style.display = "block";
        }
      });
    }, 300);
  });
});

//more button
let moreBtn = document.querySelector(".portfolio p.more");
let clicked = false;
let another1 = document.querySelector(
  ".portfolio .images-container .image-box:nth-child(5)"
);
let another2 = document.querySelector(
  ".portfolio .images-container .image-box:nth-child(6)"
);
let another3 = document.querySelector(
  ".portfolio .images-container .image-box:nth-child(7)"
);
let another4 = document.querySelector(
  ".portfolio .images-container .image-box:nth-child(8)"
);
moreBtn.addEventListener("click", addAnother);
function addAnother() {
  if (another1.style.display != "inline-block") {
    another1.style.display = "inline-block";
    another2.style.display = "inline-block";
    another3.style.display = "inline-block";
    another4.style.display = "inline-block";
    clicked = true;
  } else {
    another1.style.display = "none";
    another2.style.display = "none";
    another3.style.display = "none";
    another4.style.display = "none";
    clicked = false;
  }
  innerMBtn();
}
function innerMBtn() {
  if (clicked == true) {
    moreBtn.innerHTML = "less";
  } else {
    moreBtn.innerHTML = "more";
  }
}
function moreOrLess() {
  if (
    another1.style.display == "inline-block" ||
    another1.style.display == "inline"
  ) {
    clicked = true;
    innerMBtn();
  }
}

//count stats
let statsSection = document.getElementsByClassName("stats")[0];
let nums = document.querySelectorAll(".stats .container .box .num ");
let startCN = false;

function increaseNum(el) {
  let goal = el.dataset.num;
  let count = window.setInterval(() => {
    el.textContent++;
    if (parseInt(el.textContent) >= goal) {
      window.clearInterval(count);
    }
  }, 2000 / goal);
}

window.addEventListener("scroll", () => {
  if (window.scrollY >= statsSection.offsetTop - 600) {
    if (!startCN) {
      nums.forEach((num) => {
        increaseNum(num);
      });
      startCN = true;
    }
  }
});

//skills
let skills = document.getElementsByClassName("our-skills")[0];
let skillsDraw = document.querySelectorAll(
  ".skills .our-skills .prog-holder .prog span"
);
let startCW = false;
window.onscroll = function () {
  if (window.scrollY >= skills.offsetTop - 600) {
    if (!startCW) {
      skillsDraw.forEach((ele) => {
        increaseWidth(ele);
      });
      startCW = true;
    }
  }
};
function increaseWidth(el) {
  let w = parseInt(el.dataset.width);
  let pseudo = window.setInterval(() => {
    el.dataset.pseudo++;
    el.style.width = el.dataset.pseudo + "%";
    if (el.dataset.pseudo >= w) {
      window.clearInterval(pseudo);
    }
  }, 1000 / w);
}

//prevent submit form

let mySubmit = document.querySelectorAll(" form input[type='submit']");
mySubmit.forEach((sub) => {
  sub.onclick = function (e) {
    e.preventDefault();
  };
});

//remove placeholder
let allInput = document.querySelectorAll(
  "input[type='text'] , input[type='email'] , textarea"
);
allInput.forEach((input) => {
  input.onfocus = () => {
    input.setAttribute("place", input.getAttribute("placeholder"));
    input.setAttribute("placeholder", "");
  };
  input.onblur = () => {
    input.setAttribute("placeholder", input.getAttribute("place"));
  };
});

//this year
let rightYear = document.querySelector("footer span.year ");
rightYear.textContent = `${new Date().getFullYear()}`;

//animations to website
let header = document.querySelector("header");
let services = document.getElementsByClassName("services")[0];
let landingText = document.querySelector(".landing .text");
let servBoxes = document.querySelectorAll(".services .container-services .box");
let design = document.getElementsByClassName("design")[0];
let designChild = document.querySelectorAll(".design .img , .design .text");
let portSection = document.querySelector(".portfolio .container ul");
let plans = document.querySelectorAll(".pricing .container .plans .plan ");
window.addEventListener("scroll", () => {
  if (window.scrollY >= landing.offsetHeight / 2) {
    header.classList.add("head-animation");
  } else {
    header.classList.remove("head-animation");
  }
  if (window.scrollY >= landingText.offsetTop - 500) {
    landingText.classList.add("rtl");
  }
  if (window.scrollY >= portSection.offsetTop - 600) {
    portSection.classList.add("show");
  }
  plans.forEach((plan) => {
    if (window.scrollY >= plan.offsetTop - 600) {
      plan.classList.add("show");
    }
  });
});
window.addEventListener("load", () => {
  let timeEnd = new Date();
  let loadTime = timeEnd - timeStart + 1000; //time of page load + time of preload animation
  window.setTimeout(() => {
    landingText.classList.add("rtl");
  }, loadTime);
});

window.addEventListener("scroll", () => {
  servBoxes.forEach((box) => {
    if (window.scrollY > box.offsetTop - 600) {
      box.classList.add("show");
    }
  });
  if (window.scrollY > design.offsetTop - 600) {
    designChild[0].classList.add("show");
    designChild[1].classList.add("show");
  }
});

//active nav link
let navSections = document.querySelectorAll(
  ".landing , .services , .portfolio , .about , .pricing , section.contact"
);
window.addEventListener("scroll", () => {
  let scrollPosition = document.documentElement.scrollTop;

  navSections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight
    ) {
      removeActive();
      addActive(section.id);
    }
  });
});

function removeActive() {
  toggleLinks.forEach((link) => {
    link.classList.remove("active");
  });
}
function addActive(id) {
  document
    .querySelector(`header .container ul li a[href = "#${id}"]`)
    .classList.add("active");
}
function activeHome() {
  removeActive();
  toggleLinks[0].classList.add("active");
}
