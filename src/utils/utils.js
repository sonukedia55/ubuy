export function getStar(size, color) {
  let star = document.createElement("div");
  star.classList = ["star"];
  star.style.setProperty("--color", color);
  star.style.setProperty("--size", size);
  star.style.marginLeft = "7px";
  return star;
}
