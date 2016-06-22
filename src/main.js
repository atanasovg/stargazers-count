var https = require("https");

var resultAsString = "";
var jsonResult;

var options = {
    protocol: "https:",
    hostname: "api.github.com",
    path: "/orgs/NativeScript/repos",
    json: true,
    headers: {
        "User-Agent": "atanasovg"
    }
}

var request = https.request(options, (res) => {
    console.log("statusCode: ", res.statusCode);

    res.on('data', (chunk) => {
        resultAsString += chunk;
    });

    res.on('end', () => {
        jsonResult = JSON.parse(resultAsString);
        readResult();
    });
});

request.on("error", (e) => {
    console.error(e);
});

request.end();

function readResult() {
    var length = jsonResult.length;
    var totalStars = 0;
    for(var i = 0; i < length; i++) {
        var repo = jsonResult[i];
        var stars = repo.stargazers_count;
        totalStars += stars;
    }

    console.log("total stargazers: ", totalStars);
}