const formElement: HTMLElement | null = document.getElementById("dataForm");

function base64EncodeUnicode(string: string): string {
    return btoa(
        encodeURIComponent(string).replace(
            /%([0-9A-F]{2})/g,
            function toSolidBytes(_, p1: number | string) {
                return String.fromCharCode("0x" + p1 as unknown as number);
            })
    );
}

if (formElement) {
    formElement.addEventListener("submit", function (event: SubmitEvent): void {
        event.preventDefault();

        const formData: FormData = new FormData(this as HTMLFormElement);
        const formDataObject: { [p: string]: FormDataEntryValue } = Object.fromEntries(formData.entries());
        const hasData: boolean = Object.values(formDataObject).some((item: File | number | string): boolean => !!item);

        if (hasData) {
            const options: object = {
                correctLevel: (<any>window).QRCode.CorrectLevel.L,
                height: 360,
                text: `${window.location.origin}/DriveTag/index.html?token=${base64EncodeUnicode(JSON.stringify(formDataObject))}`,
                title: "Contact Me",
                titleBackgroundColor: "transparent",
                titleFont: "normal normal bold 36px Arial",
                titleHeight: 40,
                width: 360,
                onRenderingEnd: function (qrCodeOptions: { _element: { style: { display: string; }; }; }): void {
                    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input, textarea");
                    const submitButton: HTMLButtonElement | null = document.querySelector("button[type='submit']");

                    inputs.forEach((input: HTMLInputElement): void => {
                        input.disabled = true;
                    });

                    qrCodeOptions._element.style.display = "flex";
                    if (submitButton) submitButton.style.display = "none";
                },
            };

            new (<any>window).QRCode(document.getElementById("qrcode"), options);

            setTimeout((): void => {
                window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
            }, 100);
        }
    });
}
