const Scene = class {
  constructor() {

  }

  start() {

  }

  loop() {

  }

  end() {

  }
}

const scene_pretitle = new class extends Scene {
  constructor() {
    super()
  }

  start() {
    this.frame = 0
  }

  end() {

  }

  loop() {
    Irect(0, 0, width, height, "#121212")
    Ifont({ size: 36, colour: "white", font: "Pixel", text_align: "center" })
    Itext5(this.frame * 2, width / 2, height / 2, font_size, "ゲームを遊ぶときは気分を明るくして現実から離れてみてね！<br>Press KeyZ")

    if (pushed.includes("ok")) {
      scene_manager.move_to(scene_title)
    }

    this.frame++
  }
}()

const scene_title = new class extends Scene {
  constructor() {
    super()
    this.command = new Icommand(48, 200, 48, { "": ["New Game", "Credit"] }, {}, {
      "0": (me) => {
        scene_manager.move_to(scene_main)
      },
      "1": (me) => {
        Itext5(me.frame, 48, 200, font_size, "制作: お躁式ラケッツ!")
      }
    })
  }

  start() {
    this.frame = 0
    this.command.reset()
  }

  end() {

  }

  loop() {
    Irect(0, 0, width, height, "#121212")
    Ifont({ size: 60, colour: "white", font: "Pixel", text_align: "left" })
    Itext(this.frame, 48, 100, "Test Title")

    Ifont({ size: 48, font: "Pixel" })
    this.command.run()

    this.frame++
  }

}()

const data = {
  aqua: {
    weapon: "モップ",
    armor: "作業服",
    accessory: "None",
  },
  pH: 7,
  task: "保健室のプリンに話しかける",
  flag: {
    member_num: 4,
  },
  item_flag: {
    aqua: {

    },
    others: {
      battle_manual: true
    },
  },
  items: {
    health: ["---"],
  }

}

const scene_main = new class extends Scene {
  constructor() {
    super()

    this.player = {
      p: new vec(width / 2, height - 100),
      v: new vec(0, 0),
      is_on_floor: true,
      speed: 24,
      r: 100,
    }

    this.characters = {
      aqua: {
        app: [new Iimage("images/ch_aqua_right.png", 0, 0, 380, 380), new Iimage("images/ch_aqua_left.png", 0, 0, 380, 380)],
        p: new vec(0, 0),
        v: new vec(0, 0),
        direction: 0,
      },
      purine: {
        app: [new Iimage("images/ch_purine_right.png", 0, 0, 380, 380), new Iimage("images/ch_purine_left.png", 0, 0, 380, 380)],
        p: new vec(0, 0),
        v: new vec(0, 0),
        direction: 0,
      },
    }

    this.stage = stage_classroom_0
  }

  start() {
    this.player.v.y = 0
    this.player.p.y = height - this.player.r
    this.player.is_on_floor = true
  }

  end() {

  }

  loop() {
    this.player_move()

    if (pushed.includes("cancel")) {
      scene_manager.move_to(scene_menu)
    }

    this.stage.events.forEach((e) => {
      e.loop(e)
    })

    this.draw_background()
    this.draw_characters()
    this.draw_front()
    this.draw_meta()
  }

  player_move() {
    //player move
    this.player.v.x = 0
    if (pressed.includes("ArrowRight")) { this.player.v.x++; this.characters.aqua.direction = 0 }
    if (pressed.includes("ArrowLeft")) { this.player.v.x--; this.characters.aqua.direction = 1 }
    if (mouse.clicked && !mouse.right_clicked) {
      if (mouse.p.x > this.player.p.x - Icamera.p.x) { this.player.v.x++; this.characters.aqua.direction = 0 }
      if (mouse.p.x < this.player.p.x - Icamera.p.x) { this.player.v.x--; this.characters.aqua.direction = 1 }
    }

    //jump
    if (this.player.is_on_floor) {
      this.player.v.y = 0
      this.player.p.y = this.stage.height - this.player.r
      if (pushed.includes("ArrowUp")) {
        this.player.v.y = -60
        this.player.is_on_floor = false
      }
    }

    this.player.speed = (pressed.includes("ShiftLeft") || pressed.includes("ShiftRight")) ? 72 : 24
    this.player.v.x = Math.sign(this.player.v.x) * this.player.speed
    this.player.p = this.player.p.add(this.player.v)

    //gravity
    this.player.v.y += 6

    //clamp
    if (this.player.p.x < this.player.r) { this.player.p.x = this.player.r }
    if (this.player.p.x > this.stage.width - this.player.r) { this.player.p.x = this.stage.width - this.player.r }
    if (this.player.p.y > this.stage.height - this.player.r) { this.player.p.y = this.stage.height - this.player.r; this.player.is_on_floor = true }

    //character
    this.characters.aqua.p = this.player.p

    if (Math.abs(this.characters.purine.p.x - this.characters.aqua.p.x) > 200) {
      this.characters.purine.v.x = Math.max(Math.min((this.player.p.x - this.characters.purine.p.x) / 6, this.player.speed), -this.player.speed)
      this.characters.purine.direction = this.characters.purine.v.x > 0 ? 0 : 1
      this.characters.purine.p = this.characters.purine.p.add(this.characters.purine.v)
    }
    this.characters.purine.p.y = this.characters.aqua.p.y

    Icamera.range[1] = this.stage.width

    Icamera.target = this.player.p
    //camera
    Icamera.run()
  }

  draw_background() {
    ctx.clearRect(0, 0, width, height)

    ctx.globalAlpha = 1
    ctx.globalCompositOption = "source-over"

    Irect(0, 0, width, height, "#c0c0c0")

    this.stage.backgrounds.back?.forEach(i => { i.draw() })

  }

  draw_front() {
    this.stage.backgrounds.front?.forEach(i => { i.draw() })
  }

  draw_characters() {
    ctx.save();

    ctx.shadowColor = "#555";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 5;

    //chracters
    // IcircleC(this.player.p.x, this.player.p.y, this.player.r, "#c0c0c0")
    IcircleC(this.player.p.x, this.player.p.y, this.player.r, "black", "stroke", 2)

    if (data.flag.member_num >= 2) {
      const purine = this.characters.purine.app[this.characters.purine.direction]
      purine.x = this.characters.purine.p.x - 2 * this.player.r
      purine.y = this.characters.purine.p.y - 2 * this.player.r - 30
      purine.draw()
    }

    const aqua = this.characters.aqua.app[this.characters.aqua.direction]
    aqua.x = this.characters.aqua.p.x - 2 * this.player.r
    aqua.y = this.characters.aqua.p.y - 2 * this.player.r - 30
    aqua.draw()

    this.stage.events.forEach((e) => {
      e.draw()
      if (e.is_touched()) {

      }
    })

    ctx.restore();

  }

  draw_meta() {
    Irect(0, 10, 600, 120, "#c0c0c0c0")
    Ifont({ size: 32, colour: "black", font: "Pixel" })
    Itext4(null, 0, 50, font_size, [this.stage.name, "タスク: " + data.task, "x: " + this.player.p.x])
  }
}()

const scene_event = new class extends Scene {
  constructor() {
    super()
    this.event = null
  }

  start() {
    this.event.reset()
    this.event.start(this.event)
  }

  end() {
    this.event.end()
  }

  loop() {
    if (!this.event.is_done) {
      this.event.event_loop(this.event)
    }
    if (this.event.is_done) {
      scene_manager.move_to(scene_main)
    }
  }
}()

const scene_menu = new class extends Scene {
  constructor() {
    super()

    this.command = new Icommand(40, 60, 24, { "": ["アイテム", "そうび", "つよさ", "アルゴリズム"], "0": ["しょうもうひん", "ちょうきほぞんりょういき"], "[1-3]": ["アクア", "プリン", "アモン", "シトリ"] },
      {
        ".0": (me) => {
          console.log(me.current_branch + me.current_value)
        },
      },
      {
        "": (me) => {
          if (pushed.includes("cancel")) {
            scene_manager.move_to(scene_main)
          }
        },
        "01.": (me) => {
          switch (me.current_branch[2]) {
            case "0":
              Itext(me.frame, 40, 60, "たたかいのマニュアル")
              break
          }
        },
        "1..": (me) => {
          Itext(me.frame, 40, 60, "をそうびした")
        },
      })
  }

  start() {
    this.command.option["00"] = data.items.health
    this.command.option["01"] = Igenerator(function* () {
      for (let key in data.item_flag.others) {
        if (data.item_flag.others[key]) {
          yield key
        } else {
          yield "---"
        }
      }
    })

  }

  loop() {


    this.draw()

    Ifont({ size: 24, colour: "#c0c0c0", font: "Pixel", text_align: "left" })
    this.command.run()

  }

  draw() {
    scene_main.draw_background()
    scene_main.draw_front()
    Irect(0, 0, width, height, "#00000080")

    //blackboard
    Irect(20, 20, width - 40, 160, "#121212")
    Irect(20, 20, 520, 160, "#c0c0c0", "stroke", 12)
    Irect(540, 20, 520, 160, "#c0c0c0", "stroke", 12)
  }
}()

const scene_battle = new class extends Scene {
  constructor() {
    super()
    this.frame = 0

    this.log = ["ウイルスがあらわれた！"]

    this.aqua = {
      max_hp: 20,
      max_token: 20,
      speed: 2,
      attack: 10,

      draw_hp: 20,
      hp: 20,
      token: 20,
      meter: 0,
      app: new Iimage("images/ch_aqua_right.png", 30, 400, 380, 380, { camera: false })
    }

    this.enemy = {
      max_hp: 20,
      max_hp: 20,
      speed: 1,
      attack: 10,

      hp: 20,
      token: 20,
      meter: 0,
    }

    //house dust
    this.circle = Igenerator(function* () { for (let i = 0; i < 12; i++) { yield { life: 120 * Math.random(), p: new vec(Math.random() * width, Math.random() * height) } } })

    this.frame = 0

    this.command = new Icommand(30, 64, 28, { "": ["たたかう", "にげる"], "0": ["アクア", "プリン", "アモン", "シトリ"], "0.": ["こうげき", "アルゴリズム", "アイテム"] },
      {
        "": (me) => {
          if (me.current_value == 1) {
            scene_manager.move_to(scene_main)
          }
        },
        "0": (me) => {
          if (this.aqua.meter < 100) {
            me.cancel = true
          }
        }
      },
      {
        "0.0": (me) => {
          this.enemy.hp -= this.aqua.attack
          this.aqua.meter = 0

          this.log.push("アクアはウイルスにこうげきした！")

          me.current_branch = "0"
          me.current_value = 0
        },
        "0.*": (me) => {
          Irect(240, 40, 120, 24, "black")
          Irect(240, 40, 120 * (this.aqua.meter / 100), 24, "#c0c0c0")

          Irect(380, 40, 120, 24, "black")
          Irect(380, 40, 120 * (this.aqua.draw_hp / this.aqua.max_hp), 24, "#804080")
          Irect(380, 40, 120 * (this.aqua.hp / this.aqua.max_hp), 24, "#ff4040")
          Ifont({ size: 24, colour: "#c0c0c0", font: "Pixel", text_align: "center" })
          Itext(null, 440, 40 + font_size - 4, this.aqua.draw_hp + "/" + this.aqua.max_hp)

          Irect(520, 40, 120, 24, "black")
          Irect(520, 40, 120 * (this.aqua.token / this.aqua.max_token), 24, "#4040ff")
          Ifont({ size: 24, colour: "#c0c0c0", font: "Pixel", text_align: "center" })
          Itext(null, 580, 40 + font_size - 4, this.aqua.token + "/" + this.aqua.max_token)
        },

      }
    )
  }

  start() {
    this.command.reset()
    BGM = new Iaudio("audios/Liar.wav", "bgm")
    BGM.volume = 1 / 3
    BGM.play()
  }

  end() {
    BGM.pause()
  }

  loop() {
    this.aqua.meter = Math.min(this.aqua.meter + this.aqua.speed, 100)
    this.enemy.meter = Math.min(this.enemy.meter + this.enemy.speed, 100)

    if (this.frame % 4 == 0) { this.aqua.draw_hp += Math.sign(this.aqua.hp - this.aqua.draw_hp) }

    if (this.aqua.draw_hp <= 0) {
      this.log.push("まーけたー")
    }

    if (this.enemy.meter == 100) {
      this.aqua.hp = Math.max(this.aqua.hp - this.enemy.attack, 0)


      this.enemy.meter = 0
      this.log.push("ウイルスのこうげき！")
    }

    while (this.log.length > 5) { this.log.shift() }

    this.draw()

    Ifont({ size: 28, colour: "#c0c0c0", font: "Pixel" })
    this.command.run()

    if (this.enemy.hp <= 0) {
      scene_manager.move_to(scene_main)
    }

    this.frame++
    this.frame %= 96
  }

  draw() {
    scene_main.draw_background()
    this.aqua.app.draw()
    scene_main.draw_front()

    ctx.globalAlpha = 0.4
    Irect(0, 0, width, height, "#400040")

    this.circle.forEach(c => {
      ctx.globalAlpha = Math.sin(Math.PI * c.life / 120) * 0.1

      Icircle(c.p.x, c.p.y, 96, "white")
      c.life--
      if (c.life <= 0) {
        c.p = new vec(Math.random() * width, Math.random() * height)
        c.life = 120
      }
    })

    ctx.globalAlpha = 1

    //enemy
    Irect(800, 400, 120, 24, "black")
    Irect(800, 400, 120 * (this.enemy.meter / 100), 24, "#c0c0c0")
    Irect(800, 440, 120, 24, "black")
    Irect(800, 440, 120 * (this.enemy.hp / this.enemy.max_hp), 24, "#ff4040")

    //blackboard
    Irect(20, 20, width - 40, 160, "#121212")
    Irect(20, 20, 640, 160, "#c0c0c0", "stroke", 12)
    Irect(660, 20, 400, 160, "#c0c0c0", "stroke", 12)

    Ifont({ size: 24, colour: "#c0c0c0", font: "Pixel", text_align: "left" })
    Itext4(null, 670, 60, font_size, this.log)


  }
}

const scene_dark = new class extends Scene {
  constructor() {
    super()
  }
  run(type, time, to, what, add) {
    this.type = type
    this.time = time
    this.to = to
    this.what = what
    this.add = add
    scene_manager.move_to(this)
  }

  start() {
    this.frame = 0
  }

  loop() {
    scene_main.draw_background()
    scene_main.draw_front()

    if (this.frame == this.time / 2) {
      this.what?.()
    } else if (this.frame > this.time / 2) {
      this.add?.()
    }

    if (this.frame == this.time) {
      scene_manager.move_to(this.to)
    }

    switch (this.type) {
      case "blink":
        ctx.globalAlpha = Math.sin(Math.PI * this.frame / this.time)
        Irect(0, 0, width, height, "black")
        ctx.globalAlpha = 1
        break

      case "curtain":
        Irect(0, height * (Math.sin(Math.PI * this.frame / this.time) - 1), width, height, "black")
        break
    }

    this.frame++

  }
}()

const scene_manager = new class {
  constructor(scene) {
    this.current_scene = scene
    this.current_scene.start()
  }

  move_to(scene) {
    this.current_scene.end()
    this.current_scene = scene
    this.current_scene.start()
  }
}(scene_pretitle)

let BGM = null

let fpsInterval = 1000 / 24
let then = Date.now();
let start_time = then;

const back_paper_0 = new Iimage("images/4959763_s.jpg", 0, 0, width, height, { alpha: 0.2, camera: false })
const back_paper_1 = new Iimage("images/Paper01.jpg", 0, 0, width, height, { alpha: 0.2, camera: false })
let back_paper = back_paper_1

const main = () => {
  requestAnimationFrame(main)

  let now = Date.now();
  let elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    if (mouse.double_clicked) { pushed.push("ok") }
    if (mouse.wheel > 0) { pushed.push("ArrowDown") }
    if (mouse.wheel < 0) { pushed.push("ArrowUp") }

    scene_manager.current_scene.loop();
    ctx.globalCompositOption = "overlay"
    back_paper.draw()

    // if (back_paper == back_paper_1) {
    //   Irect(0, 0, width, height, "#ff80ff20");
    // }

    Irect(0, 0, width, height, "white", "stroke", 2);

    pushed = [];

    mouse.right_clicked = false
    mouse.double_clicked = false
    mouse.wheel = 0

    gamepad_translate()
  }
}

const gamepad_translate = () => {
  if (gamepad_connected) {
    let gp = navigator.getGamepads()[0]

    // console.log(gp)

    let axes = gp.axes

    if (axes[0] >= 0.1) { key_down({ code: "ArrowRight" }) } else { key_up({ code: "ArrowRight" }) }
    if (axes[0] <= -0.1) { key_down({ code: "ArrowLeft" }) } else { key_up({ code: "ArrowLeft" }) }
    if (axes[1] >= 0.1) { key_down({ code: "ArrowDown" }) } else { key_up({ code: "ArrowDown" }) }
    if (axes[1] <= -0.1) { key_down({ code: "ArrowUp" }) } else { key_up({ code: "ArrowUp" }) }

    let buttons = gp.buttons

    buttons.forEach((b, i) => { if (b.pressed) { key_down({ code: "Button" + i }) } else { key_up({ code: "Button" + i }) } })

    if (buttons[2].pressed) { key_down({ code: "cancel" }) } else { key_up({ code: "cancel" }) }
    if (buttons[3].pressed) { key_down({ code: "ok" }) } else { key_up({ code: "ok" }) }
    if (buttons[11].pressed) { key_down({ code: "Escape" }) } else { key_up({ code: "Escape" }) }

  }
}