class Recaptcha {
    _lastResponse: null | { [key: string]: any } | {
        success: false,
        'error-codes': ['call-failed']
    };

    constructor() {
        this._lastResponse = null;
    }

    async validateToken(token: string) {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
            {
                method: 'POST'
            }
        );

        if (response.ok) {
            return response.json();
        }

        return {
            success: false,
            'error-codes': ['call-failed']
        };
    }

    async isValid(token: string) {
        const validateReponse = await this.validateToken(token);

        this._lastResponse = validateReponse;

        return validateReponse.success;
    }

    getLastErrorCodes() {
        return this._lastResponse?.['error-codes'];
    }
}

export default new Recaptcha();