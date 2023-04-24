class PuppeteerNetworkMonitor {

    constructor(page) {
        this.promisees = [];
        this.page = page;
        this.resourceType = ['xhr', 'gif', 'script'];
        this.pendingRequests = new Set();
        this.finishedRequestsWithSuccess = new Set();
        this.finishedRequestsWithErrors = new Set();
        page.on('request', (request) => {

            if(request.resourceType() === 'image'){
                request.abort();
            } else {
                request.continue();
                if (this.resourceType.includes(request.resourceType())) {
                    console.log(`Wating for requests: ${request.resourceType()} type`);
                    this.pendingRequests.add(request);
                    this.promisees.push(
                        new Promise(resolve => {
                            request.resolver = resolve;
                        }),
                    );
                }
            }
            // console.log(`Wating for requests: ${this.pendingRequestCount()} s`);
        });
        page.on('requestfailed', (request) => {

            if (this.resourceType.includes(request.resourceType())) {
                this.pendingRequests.delete(request);
                this.finishedRequestsWithErrors.add(request);
                if (request.resolver) {
                    request.resolver();
                    delete request.resolver;
                }
            }
            // console.log(`failed requests: ${this.pendingRequestCount()} s`);
        });
        page.on('requestfinished', (request) => {

            if (this.resourceType.includes(request.resourceType())) {
                this.pendingRequests.delete(request);
                this.finishedRequestsWithSuccess.add(request);
                if (request.resolver) {
                    request.resolver();
                    delete request.resolver;
                }
            }

            // console.log(`Finished for requests: ${this.pendingRequestCount()} s`);
        });
        console.log(`Wating for requests: ${this.pendingRequestCount()} s`);

    }



    async waitForAllRequests() {
        console.log(`Wating for requests: ${this.pendingRequestCount()} s`);
        if (this.pendingRequestCount() === 0) {
            return;
        }
        await Promise.all(this.promisees);
    }

    pendingRequestCount() {
        return this.pendingRequests.size;
    }
}

module.exports = PuppeteerNetworkMonitor;
