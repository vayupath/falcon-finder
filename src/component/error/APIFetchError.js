class APIFetchError extends Error {
    constructor(message, url, status, statusText) {

        super(message);


        this.name = "APIFetchError";
        this.url = url;
        this.status = status;
        this.statusText = statusText;
    }
}

export default APIFetchError