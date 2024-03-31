class HubspotApi {
    get baseApiUrl() {
        return 'https://api.hubapi.com';
    };

    get formApiUrl() {
        return 'https://api.hsforms.com';
    }

    runGet(url) {
        if (!process.env.HUBSPOT_PRIVATE_KEY) {
            throw new Error('Invalid Hubspot API Key');
        }

        return fetch(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUBSPOT_PRIVATE_KEY}`
                }
            }
        );
    }

    runPost(url, data) {
        if (!process.env.HUBSPOT_PRIVATE_KEY) {
            throw new Error('Invalid Hubspot API Key');
        }

        console.log('run post', url, JSON.stringify(data))

        return fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUBSPOT_PRIVATE_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        );
    }

    async getFormData(formId) {
        try {
            const response = await this.runGet(`${this.baseApiUrl}/marketing/v3/forms/${formId}`);

            if (!response.ok) {
                return {
                    data: null,
                    error: `Invalid response (${response.status}): ${response.statusText}`
                };
            }

            const data = await response.json();

            return {
                data
            };
        } catch(error) {
            console.log(error);

            return {
                data: null,
                error
            }
        }
    }

    async postFormData(formId, submitData) {
        try {
            const formUrl = `${this.formApiUrl}/submissions/v3/integration/secure/submit/${process.env.HUBSPOT_PORTAL_ID}/${formId}`;
            
            const response = await this.runPost(
                formUrl,
                submitData
            );

            if (!response.ok) {
                const details = await response.json();

                return {
                    data: null,
                    error: `Invalid response (${response.status}): ${response.statusText}`,
                    errorDetails: details
                };
            }

            const data = await response.json();

            return {
                data
            };
        } catch(error) {
            console.log(error);

            return {
                data: null,
                error
            }
        }
    }
}

export default new HubspotApi();