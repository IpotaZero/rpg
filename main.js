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
    this.command = new Icommand({
      "": new Icommand.option(48, 200, ["New Game", "Manual", "Credit"]),
      "0": new Icommand.do((me) => { scene_manager.move_to(scene_main) }),
      "1": new Icommand.text(48, 200, "左右キーで移動 上キーでジャンプ<br>Shiftキーでダッシュ<br>Zで決定 Xでキャンセル・メニュー"),
      "2": new Icommand.text(48, 200, "制作: お躁式ラケッツ!"),
    })
  }

  start() {
    this.frame = 0
    this.command.reset()
  }

  end() {
    // play_bgm("audios/bells.wav")
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

    this.characters_data = [
      {
        name: "aqua",
        app: [new Iimage("images/ch_aqua_right.png", 0, 0, 380, 380), new Iimage("images/ch_aqua_left.png", 0, 0, 380, 380)],
        p: new vec(0, 0),
        v: new vec(0, 0),
        direction: 0,
      },
      {
        name: "purine",
        app: [new Iimage("images/ch_purine_right.png", 0, 0, 380, 380), new Iimage("images/ch_purine_left.png", 0, 0, 380, 380)],
        p: new vec(0, 0),
        v: new vec(0, 0),
        direction: 0,
      },
      {
        name: "ammon",
        app: [new Iimage("images/ch_ammon_right.png", 0, 0, 380, 380), new Iimage("images/ch_ammon_left.png", 0, 0, 380, 380)],
        p: new vec(0, 0),
        v: new vec(0, 0),
        direction: 0,
      },
      {
        name: "citri",
        app: [new Iimage("images/ch_citri_right.png", 0, 0, 380, 380), new Iimage("images/ch_citri_left.png", 0, 0, 380, 380)],
        p: new vec(0, 0),
        v: new vec(0, 0),
        direction: 0,
      },
    ]


    this.stage = S.classroom_0
  }

  start() {
    this.player.v.y = 0
    this.player.p.y = height - this.player.r
    this.player.is_on_floor = true

    this.characters = this.characters_data.slice(0, data.flag.member_num)

    // this.characters.forEach(c => { c.p = this.player.p })

    if (this.stage.gender == "f") { this.characters = this.characters.filter(c => ["aqua", "purine", "citri"].includes(c.name)) }
    else if (this.stage.gender == "m") { this.characters = this.characters.filter(c => ["aqua", "ammon"].includes(c.name)) }

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
    if (pressed.includes("ArrowRight")) { this.player.v.x++; this.characters[0].direction = 0 }
    if (pressed.includes("ArrowLeft")) { this.player.v.x--; this.characters[0].direction = 1 }
    if (mouse.clicked && !mouse.right_clicked) {
      if (mouse.p.x > this.player.p.x - Icamera.p.x) { this.player.v.x++; this.characters[0].direction = 0 }
      if (mouse.p.x < this.player.p.x - Icamera.p.x) { this.player.v.x--; this.characters[0].direction = 1 }
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
    this.characters.forEach((c, i) => {
      if (i == 0) {
        c.p = this.player.p
      } else {
        if (Math.abs(c.p.x - this.player.p.x) > 180 * i) {
          c.v.x = Math.sign(this.player.p.x - c.p.x) * this.player.speed
          c.direction = c.v.x > 0 ? 0 : 1
          c.p = c.p.add(c.v)
        }
        c.p.y = this.player.p.y
      }
    })

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

    if (this.stage.shadow.length > 0) {
      ctx.fillStyle = "#000000c0"

      for (let shadow of this.stage.shadow) {
        ctx.beginPath()

        for (let p of shadow) {
          ctx.lineTo(p.x - Icamera.p.x, p.y - Icamera.p.y)
          // console.log(p)}
        }
        ctx.closePath()
        ctx.fill()

      }
    }
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

    this.characters.forEach(c => {
      const app = c.app[c.direction]
      app.x = c.p.x - 2 * this.player.r
      app.y = c.p.y - 2 * this.player.r - 30
      app.draw()
    })

    this.stage.events.forEach((e) => {
      e.draw()
    })

    ctx.restore();

  }

  draw_meta() {
    Irect(0, 10, 600, 150, "#c0c0c0c0")
    Ifont({ size: 32, colour: "black", font: "Pixel" })
    Itext4(null, 0, 50, font_size, [this.stage.name, "タスク: " + data.task, "x: " + this.player.p.x/*, "memory: " + performance.memory.usedJSHeapSize*/])
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

    this.command = new Icommand(
      {
        "": new Icommand.option(40, 60, ["アイテム", "そうび", "つよさ", "アルゴリズム"]),
        "0": new Icommand.option(40, 60, ["しょうもうひん", "ちょうきほぞんりょういき"]),
        "[1-3]": new Icommand.option(40, 60, ["アクア", "プリン", "アモン", "シトリ"]),
        ".0": new Icommand.do((me) => {
          console.log(me.current_branch)
        })
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
    // this.command.contents["00"] = new Icommand.option(data.items.health)
    // this.command.contents["01"] = new Icommand.option(Igenerator(function* () {
    //   for (let key in data.item_flag.others) {
    //     if (data.item_flag.others[key]) {
    //       yield key
    //     } else {
    //       yield "---"
    //     }
    //   }
    // }))

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

    //house dust
    this.circle = Igenerator(function* () { for (let i = 0; i < 12; i++) { yield { life: 120 * Math.random(), p: new vec(Math.random() * width, Math.random() * height) } } })

    this.command = new Icommand(
      {
        "": new Icommand.option(30, 64, ["たたかう", "にげる"]),
        "0": new Icommand.option(30, 64, ["アクア", "プリン", "アモン", "シトリ"]),
        "0.": new Icommand.option(30, 64, ["こうげき", "アルゴリズム", "アイテム"]),
        "0.0": new Icommand.do((command) => {
          const character = this.characters[command.current_branch[1]]
          const damage = Math.ceil(character.attack / 2 - this.enemy.deffence / 4)

          this.enemy.hp = Math.max(this.enemy.hp - damage, 0)
          character.meter = 0

          this.log.push(character.name + "のこうげき", this.enemy.name + "に" + damage + "のダメージ")

          command.back(2)
        }),


        "1": new Icommand.do((me) => {
          BGM.stop()
          scene_manager.move_to(scene_main)
        }),

      },
      {
        "0.*": (me) => {
          this.characters.forEach((c, i) => {
            Irect(240, 40 + (font_size + 6) * i, 120, 24, "black")
            if (c.meter < this.max_meter) { Irect(240, 40 + (font_size + 6) * i, 120 * (c.meter / this.max_meter), 24, "#c0c0c0") }
            else { Irect(240, 40 + (font_size + 6) * i, 120, 24, "#80ff80") }

            Irect(380, 40 + (font_size + 6) * i, 120, 24, "black")
            Irect(380, 40 + (font_size + 6) * i, 120 * (c.draw_hp / c.max_hp), 24, "#804080")
            Irect(380, 40 + (font_size + 6) * i, 120 * (c.hp / c.max_hp), 24, "#ff4040")
            Ifont({ size: 24, colour: "#c0c0c0", font: "Pixel", text_align: "center" })
            Itext(null, 440, 40 + (font_size + 6) * i + font_size - 4, c.draw_hp + "/" + c.max_hp)

            Irect(520, 40 + (font_size + 6) * i, 120, 24, "black")
            Irect(520, 40 + (font_size + 6) * i, 120 * (c.token / c.max_token), 24, "#4040ff")
            Ifont({ size: 24, colour: "#c0c0c0", font: "Pixel", text_align: "center" })
            Itext(null, 580, 40 + (font_size + 6) * i + font_size - 4, c.token + "/" + c.max_token)
          })
        },
      }
    )
  }

  start() {
    this.characters = [
      {
        name: "アクア",
        app: new Iimage("images/ch_aqua_right.png", 330, 390, 380, 380, { camera: false }),

        max_hp: 20,
        max_token: 20,
        speed: 2,
        attack: 8,
        deffence: 4,

        draw_hp: 20,
        hp: 20,
        token: 20,
        meter: 0,

        is_dead: false,
      },
      {
        name: "プリン",
        app: new Iimage("images/ch_purine_right.png", 190, 390, 380, 380, { camera: false }),

        max_hp: 20,
        max_token: 20,
        speed: 1,
        attack: 4,
        deffence: 4,

        draw_hp: 20,
        hp: 20,
        token: 20,
        meter: 0,

        is_dead: false,
      },
      {
        name: "アモン",
        app: new Iimage("images/ch_ammon_right.png", 70, 390, 380, 380, { camera: false }),

        max_hp: 20,
        max_token: 20,
        speed: 3,
        attack: 4,
        deffence: 4,

        draw_hp: 20,
        hp: 20,
        token: 20,
        meter: 0,

        is_dead: false,
      },
      {
        name: "シトリ",
        app: new Iimage("images/ch_citri_right.png", -60, 390, 380, 380, { camera: false }),

        max_hp: 20,
        max_token: 20,
        speed: 2,
        attack: 4,
        deffence: 4,

        draw_hp: 20,
        hp: 20,
        token: 20,
        meter: 0,

        is_dead: false,
      },
    ].slice(0, data.flag.member_num)

    this.command.contents["0"].options = ["アクア", "プリン", "アモン", "シトリ"].slice(0, data.flag.member_num)

    this.enemy = after_school_polyturner
    this.enemy.reset()

    //speed check
    let num = 1
    let sum = this.enemy.speed
    this.characters.forEach(c => { sum += c.speed; num++ })
    this.max_meter = Math.floor(sum * 50)

    this.frame = 0

    this.enemy.max_meter = this.max_meter

    this.log = [this.enemy.name + "があらわれた"]

    this.command.reset()

    BGM?.stop()
    play_bgm("audios/Liar.wav")
  }

  end() {
    BGM.stop()
    // play_bgm("audios/bells.wav")
  }

  player_action() {
    this.characters.forEach((c, i) => {
      if (c.is_dead) { return }

      c.meter = Math.min(c.meter + c.speed, this.max_meter)

      this.command.contents["0"].selectable[i] = c.meter == this.max_meter ? true : false

      if (this.frame % 4 == 0) {
        c.draw_hp += Math.sign(c.hp - c.draw_hp)

        if (c.draw_hp <= 0) {
          c.is_dead = true
          c.meter = 0
          this.command.contents["0"].selectable[i] = false
          this.log.push(c.name + "はスリープモードにおちい", "った")
        }
      }

    })

    Ifont({ size: 28, colour: "#c0c0c0", font: "Pixel" })
    this.command.run()
  }

  enemy_action() {
    this.enemy.meter = Math.min(this.enemy.meter + this.enemy.speed, this.max_meter)

    if (this.enemy.meter == this.max_meter) {
      const log = this.enemy.action(Irandom(this.characters.filter(c => !c.is_dead)))

      this.log.push(...log)
    }

  }

  loop() {
    this.draw()

    this.player_action()

    if (this.enemy.hp <= 0) { scene_manager.move_to(scene_win) }

    this.enemy_action()

    // if (this.aqua.draw_hp <= 0) { this.log.push("まーけたー") }

    while (this.log.length > 5) { this.log.shift() }

    this.frame++
  }

  draw() {
    scene_main.draw_background()
    this.characters.forEach(c => { c.app.draw() })
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

    this.enemy.draw()

    //blackboard
    Irect(20, 20, width - 40, 160, "#121212")
    Irect(20, 20, 640, 160, "#c0c0c0", "stroke", 12)
    Irect(660, 20, 400, 160, "#c0c0c0", "stroke", 12)

    Ifont({ size: 24, colour: "#c0c0c0", font: "Pixel", text_align: "left" })
    Itext4(null, 680, 60, font_size, this.log)

  }
}

const scene_dark = new class extends Scene {
  constructor() {
    super()
  }
  run(type, time, to, add) {
    this.type = type
    this.time = time
    this.to = to
    this.add = add
    scene_manager.move_to(this)
  }

  start() {
    this.frame = 0
  }

  loop() {
    scene_main.draw_background()
    scene_main.draw_front()

    this.add?.(this.frame)

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
      case "fall":
        Irect(0, height * 2 * (-Math.cos(Math.PI * this.frame / this.time) / 2), width, height, "black")
        break
    }

    this.frame++

  }
}()

const scene_win = new class extends Scene {
  constructor() {
    super()
  }

  start() {
    this.frame = 0

    this.phase = 0

    scene_battle.log.push("敵を浄化した")
    scene_battle.log.shift()
  }

  loop() {
    // BGM.fadeout(this.frame, 24)

    scene_battle.draw()

    if (pushed.includes("ok")) {
      switch (this.phase) {
        case 0:
          scene_battle.log.push("---クレジットを得た")
          break
        case 1:
          scene_dark.run("curtain", 24, scene_main, (frame) => {
            if (frame < 12) {
              ctx.globalAlpha = 0.4
              Irect(0, 0, width, height, "#400040")
              ctx.globalAlpha = 1
            }
          })
          break
      }

      this.phase++

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



