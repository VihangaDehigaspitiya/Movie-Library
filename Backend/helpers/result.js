/**
 * Define methods for success and failed scenarios
 */
class OperationResult {

    constructor() {
    }

    /**
     * Define the results for failed scenario
     * @param message
     * @param additionalInfo
     * @returns {{status: boolean, additionalInformation: *, message: *, value: null}|{status: boolean, additionalInformation: null, message: *, value: null}}
     */
    static failed(message, additionalInfo) {
        if (typeof additionalInfo !== 'undefined') {
            return {
                status: false,
                value: null,
                message: message,
                additionalInformation: additionalInfo
            };
        }

        return {
            status: false,
            value: null,
            message: message,
            additionalInformation: null
        };
    }

    /**
     * Define the results for success scenario
     * @param data
     * @param message
     * @returns {{status: boolean, additionalInformation: null, message: *, value: *}}
     */
    static success(data, message = null) {

        return {
            status: true,
            value: data,
            message: message,
            additionalInformation: null
        };
    }
}

module.exports = OperationResult;