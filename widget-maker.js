// try to abstract simple ajax function
function get(url, success, fail) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            success(request.response);
        }
    };
    request.open("GET", url);
    request.send();
}

window.onload = function () {
    // try to get some information for making widget
    var arcaptcha = document.getElementById("arcaptcha");
    var site_key = arcaptcha.attributes.getNamedItem("data-site-key").value;
    window.ARCAPTCHA_SITE_KEY = site_key;
    window.ARCAPTCHA_DOMAIN = window.location.hostname;
    // get html code of our widget component
    get("https://widget.arcaptcha.ir/widget", function (res) {
        // inject widget html into arcaptcha element
        window.arcaptcha.innerHTML = res;
        var script = document.createElement("script");
        // get js code to build widget functionalities
        script.src = "https://widget.arcaptcha.ir/dist/build.js";
        document.body.append(script);
        // Enjoy!
    });
};