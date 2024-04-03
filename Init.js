const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d", { willReadFrequently: true });

const width = cvs.width;
const height = cvs.height;

//キー入力
let pressed = [];
let pushed = [];
let mouse = { clicked: false, right_clicked: false, double_clicked: false, p: new vec(0, 0) }

const okKey = ["KeyZ", "Space", "Enter"];
const cancelKey = ["KeyX", "Backspace", "Escape"];

const key_down = (e) => {
	if (!pressed.includes(e.code)) {
		pressed.push(e.code);
		pushed.push(e.code);
		if (okKey.includes(e.code)) { pushed.push("ok"); }
		if (cancelKey.includes(e.code)) { pushed.push("cancel"); }
	}
	console.log(pressed);
}

const key_up = (e) => {
	pressed = pressed.filter((f) => { return e.code != f; });
}

document.addEventListener("keydown", (e) => {
	key_down(e)
});

document.addEventListener("keyup", (e) => {
	key_up(e)
});

cvs.addEventListener("mousemove", (e) => {
	let rect = e.target.getBoundingClientRect();
	mouse.p = new vec(e.clientX - rect.left, e.clientY - rect.top)
}, false)

cvs.addEventListener("mousedown", (e) => {
	mouse.clicked = true
	console.log(mouse.p)
}, false)

cvs.addEventListener("dblclick", (e) => { mouse.double_clicked = true })

cvs.addEventListener("wheel", (e) => { mouse.wheel = e.deltaY })


const mouse_up = (e) => { mouse.clicked = false }

cvs.addEventListener("mouseup", mouse_up, false)
cvs.addEventListener("mouseleave", mouse_up, false)

cvs.oncontextmenu = (e) => {
	mouse.right_clicked = true
	return false
}

window.addEventListener("gamepadconnected", (e) => {
	gamepad_connected = true
	console.log(e)
})


window.addEventListener("gamepaddisconnected", (e) => {
	gamepad_connected = false
	console.log(e)
})

let font_size = 24;

let gamepad_connected = false

console.log("Init.js is loaded");

Ifont({ size: 48, colour: "white", font: "serif", text_align: "right" })
Itext(null, width, height - 20, "なうろーでぃんぐ......")