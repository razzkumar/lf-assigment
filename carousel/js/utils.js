function styleElement(elem, style) {
  let styleKey = Object.keys(style);
  if (styleKey && styleKey.length) {
    styleKey.forEach(key => {
      elem.style[key] = style[key]
    })
  }
}

function createAndAppendElement(parentElem, elementType, style) {
  let elem = document.createElement(elementType);

  // styling element
  styleElement(elem, style);

  parentElem.appendChild(elem);
  return elem;

}
