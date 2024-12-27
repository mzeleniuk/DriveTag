function setupViewerData(): void {
    const base64Token: string = window.location.search.replace("?token=", "");
    const payload: object = JSON.parse(atob(base64Token));

    for (const key in payload) {
        const value: number | string = payload[key as keyof object];

        if (value) {
            const resource: HTMLElement | null = document.getElementById(key);

            if (resource) {
                const input: HTMLInputElement | null = document.querySelector(`input[name=${key}], textarea[name=${key}]`);

                if (input) {
                    input.value = value;
                    resource.style.display = "flex";
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", setupViewerData);
