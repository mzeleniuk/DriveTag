"use strict";
function setupViewerData() {
    const base64Token = window.location.search.replace("?token=", "");
    const payload = JSON.parse(atob(base64Token));
    for (const key in payload) {
        const value = payload[key];
        if (value) {
            const resource = document.getElementById(key);
            if (resource) {
                const input = document.querySelector(`input[name=${key}], textarea[name=${key}]`);
                if (input) {
                    input.value = value;
                    resource.style.display = "flex";
                }
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", setupViewerData);
