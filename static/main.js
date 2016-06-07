String.prototype.addSlashes = function()
{
    return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
window.startup = function() {

    var sigma = document.getElementById('sigma');
    var embedLink = document.getElementById('embedLink')
    var tex = document.getElementsByClassName("tex");

    katex.render("\\displaystyle{\\sum}", sigma)
    Array.prototype.forEach.call(tex, function(el) {
        katex.render(el.getAttribute("data-expr"), el);
    });

    var demoInput = document.getElementById("demo-input");
    var demoOutput = document.getElementById("demo-output");

    console.log("\\displaystyle{" + demoInput.value + "}");
    function doDemo() {
        katex.render("\\displaystyle{" + demoInput.value + "}", demoOutput);
        console.log("\\displaystyle{" + demoInput.value + "}");
        embedLink.textContent = "https://mathembed.com/latex?inputText=" + encodeURIComponent(demoInput.value)
        embedLink.href = "https://mathembed.com/latex?inputText=" + encodeURIComponent(demoInput.value)
    }

    demoInput.addEventListener("input", function() {
        doDemo();
    });

    doDemo();
};
