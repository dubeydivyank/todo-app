const theme = document.querySelector("#theme");

theme.addEventListener("click", () => {
  document.querySelector("body").classList = theme.checked
    ? "light-mode"
    : "dark-mode";
});
