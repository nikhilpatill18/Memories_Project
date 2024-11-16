class apierror extends Error {
    constructor(statuscode, message = "something went wrong", error = [], stack = "") {
        super(message)
        this.statuscode = statuscode;
        this.message = message;
        this.success = false;
        this.data = null;
        this.error = error;
        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }


    }
}
export { apierror }