
function hasClass(element, className) {
    return element.classList.contains(className);
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

function toggleDisplay(element, display) {
    if (getComputedStyle(element, null).display === "none") {
        element.style.display = display;
    } else {
        element.style.display = "none";
    }
}

function toggleClass(element, clsName){
    if (hasClass(element, clsName)){
        removeClass(element, clsName)
    } else {
        addClass(element, clsName)
    }
}

export {hasClass, removeClass, addClass, toggleDisplay, toggleClass};