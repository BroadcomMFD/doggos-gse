// Definition of the Test4z matchers for the custom assertions.
// Global declaration of the custom matchers
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSuccessfulResult(): R;
        }
        interface Matchers<R> {
            toBeSuccessful(): R;
        }
        interface Matchers<R> {
            toBeHaveTestData(): R;
        }
    }
}
/**
 * Custom matcher for Test4z API Requests. Checks the data field from the Test4z response.
 * If the data field is not available, it returns an error message
 * @param received - API result
 */
export function toBeSuccessfulResult(received:any): jest.CustomMatcherResult {
    let pass = 0;
    if(received && received.data)
        pass = 1;

    if (pass) {
        return {
            message: () =>
                "Request was successful" ,
            pass: true,
        };
    } else {
        const errorMessage = received && received.messages ? JSON.stringify(received.messages[0], null, '\t') : JSON.stringify(received);
        return {
            message: () =>
                errorMessage,
            pass: false,
        };
    }
}

/**
 * Custom matcher for Test4z API Search Request. Checks the Record key.
 * If it is there, that means Search result has data to be tested.
 * @param received - API result's data field.
 */
export function toBeHaveTestData(received:any): jest.CustomMatcherResult {
    let pass = 0;
    if(received && received.Record)
        pass = 1;

    if (pass) {
        return {
            message: () =>
                `Result have test data`,
            pass: true,
        };
    } else {
        return {
            message: () =>
                `Expected ${received} has no test data.`,
            pass: false,
        };
    }
}
/**
 * Custom matcher for job submission. Checks the return code from the ZOWE result.
 * Allowed successful return codes are CC 0004 and CC 0000 for our particular use case.
 * @param received - Return code
 */
 export function toBeSuccessful(received:any): jest.CustomMatcherResult {
    let pass = 0;
    if(received == "CC 0004" || received == "CC 0000")
        pass = 1;

    if (pass) {
        return {
            message: () =>
                `Received: ${received}, job was successful`,
            pass: true,
        };
    } else {
        return {
            message: () =>
                `Expected return code CC 0000 or CC 0004 but received: ${received}`,
            pass: false,
        };
    }
}