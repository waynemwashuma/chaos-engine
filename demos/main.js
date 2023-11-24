import { demos } from "./index.js"


demos.init("#can")

demos.setup("animation")

let optionTab = document.querySelector("#options-checkbox")
let demoOption = document.querySelector("#demos")
for (var n in demos.examples) {
  let option = document.createElement("option")
  option.value = n
  option.innerHTML = n
  demoOption.append(option)
}
demoOption.onchange = () => {
  demos.play(demoOption.value)
}
let pause = createCheckbox("pause", "Pause",optionTab, function() {
  pause.firstChild.checked?demos.manager.pause():demos.manager.play()
  console.log(pause.firstChild.checked);
})











function createCheckbox(id, text, parent, func) {
  let p = document.createElement("p")
  p.id = id;
  p.classList.add("checkbox")
  let box = p.appendChild(document.createElement("input"))
  let label = p.appendChild(document.createElement("label"))
  box.type = "checkbox"
  box.addEventListener("change", () => {
    func.call(p)
  })
  label.appendChild(document.createTextNode(text))
  if (parent) parent.append(p)
  return p
}