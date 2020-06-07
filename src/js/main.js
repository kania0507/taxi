function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "main-nav-list") {
    x.className += " main-nav-list-responsive";
  } else {
    x.className = "main-nav-list";
  }
}