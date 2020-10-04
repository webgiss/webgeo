module.exports = {
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report",
            "outputPath": "./dist/test/index.html",
            "includeFailureMsg": true,
            "includeSuiteFailure": true,
        }]
    ],
  }