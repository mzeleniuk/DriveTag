"use strict";
function resolvePageNavigation() {
    if (window.location.search) {
        window.location.href = `src/views/viewer.html${window.location.search}`;
    }
    else {
        window.location.href = "src/views/form.html";
    }
}
document.addEventListener("DOMContentLoaded", resolvePageNavigation);
