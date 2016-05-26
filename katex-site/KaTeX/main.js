String.prototype.addSlashes = function()
{
   return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
window.startup = function() {

    var sigma = document.getElementById('sigma');
    console.log(sigma.textContent);
    katex.render("\\displaystyle{" + sigma.textContent + "}", sigma);
    var tex = document.getElementsByClassName("tex");
    Array.prototype.forEach.call(tex, function(el) {
        katex.render(el.getAttribute("data-expr"), el);
    });

    var demoInput = document.getElementById("demo-input");
    var demoOutput = document.getElementById("demo-output");

    console.log("\\displaystyle{" + demoInput.value + "}");
    function doDemo() {
        katex.render("\\displaystyle{" + demoInput.value + "}", demoOutput);
    }

    demoInput.addEventListener("input", function() {
        doDemo();
    });

    doDemo();
};
