// Retrieve + Initialize Vars
const TESTING = 1;

var frame_src = document.getElementById("frames");
var art_src = document.getElementById("art_src");

var h_padding = document.getElementById("h_padding");
var v_padding = document.getElementById("v_padding");

var img_scale = document.getElementById("img_scale");
var h_offset = document.getElementById("h_offset");
var v_offset = document.getElementById("v_offset");
var rendering = document.getElementById("rendering");

var overlay_on = document.getElementById("overlay_on");

var top_start = document.getElementById("top_start");
var top_end = document.getElementById("top_end");
var top_height = document.getElementById("top_height");

var left_start = document.getElementById("left_start");
var left_end = document.getElementById("left_end");
var left_height = document.getElementById("left_height");

var bottom_start = document.getElementById("bottom_start");
var bottom_end = document.getElementById("bottom_end");
var bottom_height = document.getElementById("bottom_height");

var right_start = document.getElementById("right_start");
var right_end = document.getElementById("right_end");
var right_height = document.getElementById("right_height");

var preview_div = document.getElementById("preview_div");
var div_padding = 50;

// Declare Middle Layer
var middle = document.getElementById("middle");
var middle_ctx = middle.getContext("2d");
const frame = new Image();
frame.src = "WidgetMachine/Frames/Empty.png";

// Declare Bottom Layer
const mask = new Image();
mask.src = "WidgetMachine/Frames/Empty_clip.png";

var bottom = document.getElementById("bottom");
var bottom_ctx = bottom.getContext("2d");
const artwork = new Image();

// Declare Top Layer
var upper = document.getElementById("upper");
var upper_ctx = upper.getContext("2d");

// Declare Overlap mask Layer
var overlap = document.getElementById("overlap");
var overlap_ctx = overlap.getContext("2d");

// Functions
function drawMask(ctx) {
    ctx.fillRect(parseInt(top_start.value), 0, parseInt(top_end.value) - parseInt(top_start.value), parseInt(top_height.value));
    ctx.fillRect(parseInt(bottom_start.value), ctx.canvas.height - parseInt(bottom_height.value), parseInt(bottom_end.value) - parseInt(bottom_start.value), parseInt(bottom_height.value));

    ctx.fillRect(0, parseInt(left_start.value), parseInt(left_height.value), parseInt(left_end.value) - parseInt(left_start.value));
    ctx.fillRect(ctx.canvas.width - parseInt(right_height.value), parseInt(right_start.value), parseInt(right_height.value), parseInt(right_end.value) - parseInt(right_start.value));

}

function updateDiv() {
    var div_width = frame.width + (h_padding.value * 2) + div_padding;
    var div_height = frame.height + (v_padding.value * 2) + div_padding;
    
    preview_div.setAttribute("style","min-width:" + div_width + "px;min-height:" + div_height + "px;");
    preview_div.style["min-width"] = div_width + "px";
    preview_div.style["min-height"] = div_height + "px";
}

function updateOverlap() {
    overlap.width = frame.width + (h_padding.value * 2);
    overlap.height = frame.height + (v_padding.value * 2);

    if(overlay_on.checked) {
        overlap_ctx.fillStyle = "rgba(43, 255, 0, 0.25)";
        drawMask(overlap_ctx);
    }
}

function updateBottom() {
    bottom.width = frame.width + (h_padding.value * 2);
    bottom.height = frame.height + (v_padding.value * 2);

    if(art_src.value != "") {
        bottom_ctx.globalCompositeOperation = "source-over";
        bottom_ctx.drawImage(mask, h_padding.value, v_padding.value);

        bottom_ctx.globalCompositeOperation = "destination-out";
        drawMask(bottom_ctx);
        
        bottom_ctx.globalCompositeOperation = "source-in";
        bottom.style["image-rendering"] = rendering.value;
        try {
            bottom_ctx.drawImage(artwork, parseInt(h_offset.value), parseInt(v_offset.value), artwork.width * img_scale.value, artwork.height * img_scale.value);
        } catch {
            img_scale.value = ((Math.floor(frame.width, frame.height) * 1.0) / 430.0).toFixed(3);
            artwork.src = "WidgetMachine/Frames/Art_Error.png";
        }
    }
}

function updateMiddle() {
    middle.width = frame.width + (h_padding.value * 2);
    middle.height = frame.height + (v_padding.value * 2);

    middle.style["image-rendering"] = rendering.value;
    middle_ctx.drawImage(frame, h_padding.value, v_padding.value);
}

function updateUpper() {
    upper.width = frame.width + (h_padding.value * 2);
    upper.height = frame.height + (v_padding.value * 2);

    if(art_src.value != "") {
        upper_ctx.globalCompositeOperation = "source-over";
        drawMask(upper_ctx);

        upper_ctx.globalCompositeOperation = "source-in";
        upper.style["image-rendering"] = rendering.value;
        upper_ctx.drawImage(artwork, parseInt(h_offset.value), parseInt(v_offset.value), artwork.width * img_scale.value, artwork.height * img_scale.value);
    }
    updateOverlap();
}

frame.addEventListener("load", () => {
    if (TESTING) {console.log("Frame Loaded");}

    updateDiv();
    updateMiddle();
});

mask.addEventListener("load", () => {
    if (TESTING) {console.log("Mask Loaded");}

    updateBottom();
    updateUpper();
});

artwork.addEventListener("load", () => {
    if (TESTING) {console.log("Artwork Loaded");}

    updateBottom();
    updateUpper();
});

h_padding.addEventListener("change", () => {
    if (TESTING) {console.log("Horizontal Padding Changed");}

    updateDiv();
    updateMiddle();
    updateBottom();
    updateUpper();
});

v_padding.addEventListener("change", () => {
    if (TESTING) {console.log("Vertical Padding Changed");}

    updateDiv();
    updateMiddle();
    updateBottom();
    updateUpper();
});

h_offset.addEventListener("change", () => {
    if (TESTING) {console.log("Horizontal Position Changed");}

    updateBottom();
    updateUpper();
});

v_offset.addEventListener("change", () => {
    if (TESTING) {console.log("Vertical Position Changed");}

    updateBottom();
    updateUpper();
});

img_scale.addEventListener("change", () => {
    if (TESTING) {console.log("Image Scale Changed");}

    updateBottom();
    updateUpper();
});

rendering.addEventListener("change", () => {
    if (TESTING) {console.log("Rendering Style Changed");}

    updateBottom();
    updateMiddle();
    updateUpper();
});

overlay_on.addEventListener("change", () => {
    if (TESTING) {console.log("Overlay Toggled");}

    updateOverlap();
});

top_start.addEventListener("change", () => {
    if (TESTING) {console.log("Top Edge Start Position Changed");}

    updateBottom();
    updateUpper();
});

top_end.addEventListener("change", () => {
    if (TESTING) {console.log("Top Edge End Position Changed");}

    updateBottom();
    updateUpper();
});

top_height.addEventListener("change", () => {
    if (TESTING) {console.log("Top Edge Height Changed");}

    updateBottom();
    updateUpper();
});

left_start.addEventListener("change", () => {
    if (TESTING) {console.log("Left Edge Start Position Changed");}

    updateBottom();
    updateUpper();
});

left_end.addEventListener("change", () => {
    if (TESTING) {console.log("Left Edge End Position Changed");}

    updateBottom();
    updateUpper();
});

left_height.addEventListener("change", () => {
    if (TESTING) {console.log("Left Edge Height Changed");}

    updateBottom();
    updateUpper();
});

bottom_start.addEventListener("change", () => {
    if (TESTING) {console.log("Bottom Edge Start Position Changed");}

    updateBottom();
    updateUpper();
});

bottom_end.addEventListener("change", () => {
    if (TESTING) {console.log("Bottom Edge End Position Changed");}

    updateBottom();
    updateUpper();
});

bottom_height.addEventListener("change", () => {
    if (TESTING) {console.log("Bottom Edge Height Changed");}

    updateBottom();
    updateUpper();
});

right_start.addEventListener("change", () => {
    if (TESTING) {console.log("Right Edge Start Position Changed");}

    updateBottom();
    updateUpper();
});

right_end.addEventListener("change", () => {
    if (TESTING) {console.log("Right Edge End Position Changed");}

    updateBottom();
    updateUpper();
});

right_height.addEventListener("change", () => {
    if (TESTING) {console.log("Right Edge Height Changed");}

    updateBottom();
    updateUpper();
});

frame_src.addEventListener("change", () => {
    if (TESTING) {console.log("Frame Source Changed");}

    frame.src = frame_src.value + ".png";
    mask.src = frame_src.value + "_clip.png";
});

art_src.addEventListener("change", () => {
    if (TESTING) {console.log("Art Source Changed");}

    console.log(art_src.value);
    artwork.src = art_src.value;
});