const Sound_Data = {};
Sound_Data.text = false;
Sound_Data.mute_bgm = false;
Sound_Data.mute_se = false;

const LocalStorage = class {
	constructor(name, dflt) {
		this.name = name;
		this.data = { ...dflt };
		this.dflt = { ...dflt }

		this.load()
	}
	reset() {
		this.data = { ...this.dflt }
	}
	delete() {
		localStorage.removeItem(this.name);
	}
	load() {
		let data = { ...this.dflt };

		let item = JSON.parse(localStorage.getItem(this.name))

		if (item != null) {
			for (let key in item) {
				data[key] = item[key]
			}
		}

		this.data = data;
	}
	save() {
		let data = JSON.stringify(this.data);
		localStorage.setItem(this.name, data);
	}
}

const Iimage = class {
	constructor(path, x = 0, y = 0, width, height, { ratio = 1, alpha = 1, rotate = 0, center_x = 0, center_y = 0, repeat_x = 1, repeat_y = 1, camera = true } = {}) {
		let p = path.split(".")
		if (p[p.length - 1] == "apng") {
			this.type = "anime"
			this.image = []
			APNG.parseURL(path).then((apngObject) => { apngObject.frames.forEach((e) => { this.image.push(e.img) }) })
			this.frame = 0

		} else {
			this.type = "not_anime"
			this.image = new Image()
			this.image.src = path

		}

		this.width = width
		this.height = height
		this.ratio = ratio
		this.alpha = alpha

		this.rotate = rotate
		this.center_x = center_x
		this.center_y = center_y

		this.repeat_x = repeat_x
		this.repeat_y = repeat_y

		this.x = x
		this.y = y

		this.camera = camera
	}

	draw() {
		// コンテキストを保存する
		ctx.save();

		ctx.globalAlpha = this.alpha

		const w = this.width * this.ratio / this.repeat_x
		const h = this.height * this.ratio / this.repeat_y

		ILoop([0, 0], [this.repeat_x - 1, this.repeat_y - 1], (a, b) => {
			if (this.type == "anime") {
				this.camera ?
					IimageC(this.image[this.frame], this.x - this.center_x + w * a, this.y - this.center_y + h * b, w, h) :
					ctx.drawImage(this.image[this.frame], this.x - this.center_x + w * a, this.y - this.center_y + h * b, w, h)
			} else {
				this.camera ?
					IimageC(this.image, this.x - this.center_x + w * a, this.y - this.center_y + h * b, w, h) :
					ctx.drawImage(this.image, this.x - this.center_x + w * a, this.y - this.center_y + h * b, w, h)
			}
		})

		if (this.type == "anime") {
			this.frame = (this.frame + 1) % (this.image.length - 1)
		}

		// // コンテキストを元に戻す
		ctx.restore();

	}

	move(x, y, loop_x, loop_y) {
		this.x += x
		this.y += y

		this.x %= (loop_x - this.ratio - 1)
		this.y %= (loop_y - this.ratio - 1)
	}
}


Sound_Data.ok = new Audio("audios/ok.wav")
Sound_Data.cancel = new Audio("audios/cancel.wav")
Sound_Data.select = new Audio("audios/select.wav")

const Image_Data = {};

const gcd = (x, y) => x % y ? gcd(y, x % y) : y
const lcm = (x, y) => x * y / gcd(x, y)

function Ilink(frame, x, y, link) {
	let a = ctx.measureText(link)

	ctx.save()

	if (x <= mouse.p.x && mouse.p.x <= x + a.width && y - font_size <= mouse.p.y && mouse.p.y <= y) {
		ctx.fillStyle = "#8080ff"
		Iline2("#8080ff", 1, [new vec(x, y + 2), new vec(x + a.width, y + 2)])
		if (mouse.clicked) {
			window.open(link);
		}
	}
	Itext(frame, x, y, link)

	ctx.restore()
}

//文字送り{frame, x, y, text}
function Itext(frame, x, y, text) {
	let t = "";

	if (typeof text != "string") {
		t = "文章が定義されていない";
	} else {
		if (text.length > frame && frame != null) {
			for (let i = 0; i < frame; i++) {
				t = t + text.charAt(i);
			}
			if (Sound_Data.text) { Sound_Data.text_sending.play(); }
		} else {
			t = text;
		}
	}

	ctx.beginPath();
	ctx.fillText(t, x, y);
}

//待機可能改行テキスト
function Itext4(frame, x, y, line_space, textArr) {
	let t = 0;
	let I = 0;

	for (let i = 0; i < textArr.length; i++) {
		let obj = textArr[i];

		if (typeof obj == "string") {
			if (frame == null) {
				Itext(null, x, y + line_space * I, obj);
			} else {
				Itext(frame - t, x, y + line_space * I, obj);
				t += obj.length;
			}
			I++;
		} else if (typeof obj == "number") {
			t += obj;
		}
	}
}

function Itext5(frame, x, y, line_space, text) {
	let textArr = text.split("<br>");
	Itext4(frame, x, y, line_space, textArr);
}

//linkの埋め込みができます
function Itext6(frame, x, y, line_space, text) {

	Itext5(frame, x, y, line_space, text.replaceAll("<link>", ""))

	let H = 0

	let text_list = text.split("<br>")
	for (let h = 0; h < text_list.length; h++) {
		let I = ""
		let t = text_list[h]
		let link = t.split("<link>")
		for (let i = 0; i < link.length; i++) {
			let loop = link[i]
			if (i % 2 == 1) {
				Ilink(frame - H - I.length, x + ctx.measureText(I).width, y + h * line_space, loop)
			}
			I += loop
		}

		H += t.replaceAll("<link>", "").length
	}
}

//文字の表示をいい感じに
function Iadjust(max_width, text) {
	const lines = text.split("<br>");

	for (let h = 0; h < lines.length; h++) {
		let line = lines[h];
		for (let i = 0; i < line.length; i++) {
			let substring = line.slice(0, i);
			if (ctx.measureText(substring).width > max_width) {
				lines[h] = substring + "<br>" + line.slice(i);
				break;
			}
		}
	}

	const adjusted_text = lines.join("<br>");

	return adjusted_text
}

function Icircle(x, y, r, c, id = "fill", width = 2) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);

	switch (id) {
		case "fill":
			ctx.fillStyle = c;
			ctx.fill();
			break;
		case "stroke":
			ctx.strokeStyle = c;
			ctx.lineWidth = width;
			ctx.stroke();
			break;
	}
}

function Iarc(x, y, r, start, end, c, id = "fill", width = 2) {
	ctx.beginPath();
	ctx.arc(x, y, r, start, end);

	switch (id) {
		case "fill":
			ctx.fillStyle = c;
			ctx.fill();
			break;
		case "stroke":
			ctx.strokeStyle = c;
			ctx.lineWidth = width;
			ctx.stroke();
			break;
	}
}

//座標、幅、高さ、色、ID,太さ
function Irect(x, y, width, height, c, id = "fill", size = 2) {
	ctx.beginPath();

	switch (id) {
		case "fill":
			ctx.fillStyle = c;
			ctx.fillRect(x, y, width, height);
			break;
		case "stroke":
			ctx.strokeStyle = c;
			ctx.lineWidth = size;
			ctx.strokeRect(x, y, width, height);
			break;
	}
}


//通る座標[[x,y],[x,y]]、色、太さ
function Iline(colour, size, arr) {
	ctx.strokeStyle = colour;
	ctx.lineWidth = size;

	ctx.beginPath();
	ctx.moveTo(arr[0][0], arr[0][1]);
	for (let i = 1; i < arr.length; i++) {
		ctx.lineTo(arr[i][0], arr[i][1]);
	}
	ctx.stroke();
}

//座標をベクトルで指定する
function Iline2(colour, size, points) {
	ctx.strokeStyle = colour;
	ctx.lineWidth = size;

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.stroke();
}

function Ifont({ size, colour, font, text_align, spacing } = {}) {
	ctx.fillStyle = colour ?? ctx.fillStyle;
	font_size = size ?? font_size;
	ctx.textAlign = text_align ?? ctx.textAlign
	ctx.font = font_size + "px " + (font ?? ctx.font.slice(6));
	ctx.letterSpacing = spacing ?? ctx.letterSpacing
}

const vec = class {
	constructor(_x, _y) {
		this.x = _x;
		this.y = _y;
	}
	length() { return Math.sqrt(this.x ** 2 + this.y ** 2); }

	add(v) { return new vec(this.x + v.x, this.y + v.y); }
	sub(v) { return new vec(this.x - v.x, this.y - v.y); }
	mlt(m) { return new vec(this.x * m, this.y * m); }
	nor() { if (this.length() == 0) { return this; } else { return new vec(this.x / this.length(), this.y / this.length()); } }
	rot(rad) { return new vec(this.x * Math.cos(rad) - this.y * Math.sin(rad), this.x * Math.sin(rad) + this.y * Math.cos(rad)); }
	new() { return new vec(this.x, this.y); }
	dot(v) { return this.x * v.x + this.y * v.y; }
	arg() { return Math.atan2(this.y, this.x) }
	to_descartes() { let r = this.x; return new vec(r * Math.cos(this.y), r * Math.sin(this.y)) }
}

//多重for文(f:関数, a:初期値, b:終了値)
function ILoop(a = null, b, f) {
	a ??= Igenerator(function* () { for (let i = 0; i < b.length; i++) { yield 0 } })

	//aをコピー
	let arr = [...a];

	while (arr.join() != b.join()) {
		f(...arr);
		arr[arr.length - 1]++;
		for (let i = arr.length - 1; i != 0; i--) {
			if (arr[i] > b[i]) {
				arr[i] = a[i];
				arr[i - 1]++;
			}
		}
	}

	f(...arr);
}

const Icamera = new class ICamera {
	constructor() {
		this.p = new vec(0, 0)
		this.v = new vec(0, 0)
		this.range = [0, 1080]

		this.target = new vec(0, 0)
	}

	run() {
		this.v.x = (this.target.x - this.p.x - width / 2) / 3
		this.p.x += this.v.x

		this.clamp()
	}

	clamp() {

		if (this.p.x < this.range[0]) { this.p.x = this.range[0] }
		if (this.p.x > this.range[1] - width) { this.p.x = this.range[1] - width }

		if (this.range[1] < width) {
			this.p.x = (this.range[1] - width) / 2
		}
	}

}

function IcircleC(x, y, r, c, id, size) {
	Icircle(x - Icamera.p.x, y - Icamera.p.y, r, c, id, size);
}

function IarcC(x, y, r, start, end, c, id, size) {
	Iarc(x - Icamera.p.x, y - Icamera.p.y, r, start, end, c, id, size);
}

function IrectC(x, y, width, height, c, id, size) {
	Irect(x - Icamera.p.x, y - Icamera.p.y, width, height, c, id, size);
}

function IlineC(c, size, arr) {
	let a = [];
	arr.forEach((p) => { a.push([p[0] - Icamera.p.x, p[1] - Icamera.p.y]); });
	Iline(c, size, a);
}

function Iline2C(c, size, arr) {
	let a = [];
	arr.forEach((p) => { a.push(p.sub(Icamera.p)); });
	Iline2(c, size, a);
}

function IimageC(image, x, y, width, height) {
	ctx.drawImage(image, x - Icamera.p.x, y - Icamera.p.y, width, height);
}

const Icommand = class {
	constructor(contents, loop) {
		this.contents = contents
		this.loop = loop

		this.reset()
	}

	static option = class {
		constructor(x, y, options) {
			this.x = x
			this.y = y
			this.options = options

			this.selectable = Igenerator(function* () { for (let i of options) { yield true } })

			this.current_value = 0

			this.frame = 0
		}

		reset() {
			this.frame = 0
			this.current_value = 0
		}

		run(command) {
			Itext4(this.frame * 2, this.x + font_size, this.y, font_size, this.options)
			Itext(this.frame, this.x, this.y + font_size * this.current_value, "→")

			if (pushed.includes("ArrowDown")) { this.current_value++; /*Sound_Data.select.play()*/ }
			if (pushed.includes("ArrowUp")) { this.current_value--; /*Sound_Data.select.play()*/ }
			this.current_value = (this.current_value + this.options.length) % this.options.length

			this.frame++

			if (pushed.includes("ok") && this.selectable[this.current_value]) {
				this.frame = 0
				// Sound_Data.ok.play()

				return this.current_value
			}
		}
	}

	static text = class {
		constructor(x, y, text) {
			this.x = x
			this.y = y
			this.text = text

			this.frame = 0
		}

		reset() {
			this.frame = 0
		}

		run(command) {
			Itext5(this.frame * 2, this.x + font_size, this.y, font_size, this.text)
			this.frame++
		}
	}

	static do = class {
		constructor(fun) {
			this.fun = fun
		}

		reset() {
			this.frame = 0
		}

		run(command) {
			this.fun(command)
			this.frame++
		}
	}

	reset() {
		this.current_branch = ""
		this.cancel = false
		this.frame = 0

		for (let key in this.contents) {
			this.contents[key].reset()
		}

	}

	run() {
		const content = Iget(this.contents, this.current_branch)

		this.cancel = false
		if (pushed.includes("cancel")) {
			this.cancel = true
			// Sound_Data.cancel.play()
		}

		// console.log(content)
		const result = content?.run(this)

		if (result != null) {
			this.current_branch += result
		}

		//ずっとなんかなります
		Iget(this.loop, this.current_branch)?.(this)

		if (this.cancel && this.current_branch != "") {
			this.back(1)
		}

	}

	back(layer) {
		this.current_value = Number(this.current_branch.charAt(this.current_branch.length - layer))
		this.current_branch = this.current_branch.slice(0, -layer)
		this.frame = 0
	}
}

//.は後に処理される感じがする
function Iget(obj, key) {
	for (let dictKey in obj) {
		// 正規表現を使用して部分一致を判定
		let regex = new RegExp("^" + dictKey + "$");
		if (key.match(regex)) {
			return obj[dictKey]; // 部分一致するキーが見つかった場合、その値を返す
		}
	}
	return undefined; // 部分一致するキーが見つからない場合は undefined を返す

}

//generatorを展開する
function Igenerator(generator) {
	let list = []

	for (let i of generator()) {
		list.push(i)
	}

	return list
}

const Irandom = (array) => {
	return array[Math.floor(Math.random() * array.length)]
}

console.log("Ifunctions.js is loaded");
