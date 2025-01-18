// Combine into Widget
var widget = document.getElementById("widget");
var widget_ctx = widget.getContext("2d");

var generate_button = document.getElementById("generate");

generate_button.addEventListener("click", () => {
    widget.width = frame.width + (h_padding.value * 2);
    widget.height = frame.height + (v_padding.value * 2);

    widget_ctx.drawImage(bottom, 0, 0);
    widget_ctx.drawImage(middle, 0, 0);
    widget_ctx.drawImage(upper, 0, 0);
});