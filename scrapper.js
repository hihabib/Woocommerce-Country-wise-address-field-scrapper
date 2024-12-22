// Function to get the fields from the shipping section
const getFields = () => {
    const shipping = document.querySelector("#shipping");
    const labels = shipping.querySelectorAll('input+label, label:has(+select)');
    const fields = [];
    labels.forEach(labelEl => {
        fields.push(labelEl.innerText);
    });
    return fields;
};

// Function to process each country
const processCountry = (country, fieldObject, index, length) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const currentCountryName = country.options[country.selectedIndex]?.innerText;
                const fields = getFields();
                fieldObject[currentCountryName] = fields;
                console.log(index + 1, currentCountryName);

                const nextCountryIndex = country.selectedIndex + 1 < length ? country.selectedIndex + 1 : null;
                const nextCountryCode = country.options[nextCountryIndex]?.value;

                // Change the value of the select element
                country.value = nextCountryCode;

                // Simulate the 'change' event
                const changeEvent = new Event('change', { bubbles: true, cancelable: true });
                country.dispatchEvent(changeEvent);
                resolve();
            } catch (err) {
                reject();
            }
        }, 300);
    });
};

// Main function to scrape the address fields for all countries
const scrapeAddressFields = async () => {
    const fieldObject = {};
    const country = document.querySelector("#shipping-country");
    const length = country.options.length;

    const dataPromises = Array.from({ length }, (_, i) => processCountry(country, fieldObject, i, length));

    await Promise.all(dataPromises);
    console.log(fieldObject);
};

// Start the scraping process
await scrapeAddressFields();