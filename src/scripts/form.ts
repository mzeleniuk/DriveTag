const formElement: HTMLElement | null = document.getElementById("dataForm");

if (formElement) {
    formElement.addEventListener("submit", function (event: SubmitEvent): void {
        event.preventDefault();

        const formData: FormData = new FormData(this as HTMLFormElement);
        const formDataObject: { [p: string]: FormDataEntryValue } = Object.fromEntries(formData.entries());

        console.log(formDataObject);
    });
}
