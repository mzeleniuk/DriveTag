"use strict";
const formElement = document.getElementById("dataForm");
function base64EncodeUnicode(string) {
    return btoa(encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_, p1) {
        return String.fromCharCode("0x" + p1);
    }));
}
if (formElement) {
    formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const formDataObject = Object.fromEntries(formData.entries());
        const hasData = Object.values(formDataObject).some((item) => !!item);
        if (hasData) {
            const options = {
                correctLevel: window.QRCode.CorrectLevel.L,
                height: 360,
                text: `${window.location.origin}/DriveTag/index.html?token=${base64EncodeUnicode(JSON.stringify(formDataObject))}`,
                title: "Contact Me",
                titleBackgroundColor: "transparent",
                titleFont: "normal normal bold 36px Arial",
                titleHeight: 40,
                width: 360,
                onRenderingEnd: function (qrCodeOptions) {
                    const inputs = document.querySelectorAll("input, textarea");
                    const submitButton = document.querySelector("button[type='submit']");
                    inputs.forEach((input) => {
                        input.disabled = true;
                    });
                    qrCodeOptions._element.style.display = "flex";
                    if (submitButton)
                        submitButton.style.display = "none";
                },
            };
            new window.QRCode(document.getElementById("qrcode"), options);
            setTimeout(() => {
                window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
            }, 100);
        }
    });
}
