const se_door = new Audio("audios/ドアを閉める2.mp3")
const se_step = new Audio("audios/家の階段を駆け上る.mp3")
const se_road = new Audio("audios/砂利の上を走る.mp3")
const se_glass = new Audio("audios/ガラスが割れる2.mp3")
const se_elevator = new Audio("audios/elevator_here.wav")
se_elevator.volume = 0.2
const se_elevator_door = new Audio("audios/自動ドアが開く.mp3")
const se_fall = new Audio("audios/fall.wav")
se_fall.volume = 0.2
const se_metal = new Audio("audios/バケツを持ち上げる.mp3")
const se_battle = null

const se_punch = new Audio("audios/軽いパンチ2.mp3")

const se_select = new Audio("audios/select.wav")
se_select.volume = 0.2
const se_purine = new Audio("audios/ウミネコの鳴き声.mp3")
const se_damage = new Audio("audios/damage.wav")
se_damage.volume = 0.5

const se_slide_door = new Audio("audios/引き戸を開ける2.mp3")
se_slide_door.volume = 0.6


const Stage = class {
    constructor(name, width, backgrounds = { back: [], front: [] }, events = [], enemies = [], { _height = height, gender = null, lighting = null } = {}) {
        this.name = name
        this.width = width
        this.backgrounds = backgrounds
        this.events = events
        this.enemies = enemies

        this.height = _height
        this.gender = gender
        this.lighting = lighting
    }
}

const ef_ex = new Iimage("images/ef_ex.png", 0, 300, 120, 120)

const Event_Stage = class {
    constructor(p = new vec(0, 0), r = 40, app = null, sw = () => true) {
        this.p = p
        this.r = r
        this.app = app
        this.sw = sw

        this.chain = null

        this.is_done = false
    }

    start() {

    }

    end() {

    }

    event_loop() {

    }

    set(key, value) {
        this[key] = value
        return this
    }

    draw() {
        if (this.app != null) {
            this.app.x = this.p.x - this.app.width / 2
            this.app.y = this.p.y - this.app.height / 2
            this.app.draw()
        }

        if (this.is_touched()) {
            ef_ex.x = scene_main.player.p.x
            ef_ex.y = scene_main.player.p.y - 300
            ef_ex.draw()
        }

        IcircleC(this.p.x, this.p.y, this.r, "black", "stroke", 2)
    }

    then(event) {
        if (this.chain) {
            this.chain.then(event)
        } else {
            this.chain = event
        }

        return this
    }

    is_touched() {
        return scene_main.player.p.sub(this.p).length() < scene_main.player.r + this.r
    }

    reset() {
        this.is_done = false
    }
}

const Event_Move = class extends Event_Stage {
    constructor(p = new vec(0, 0), x = 0, to, direction = null, sound = null, sw = () => true) {
        super(p, 40, null, sw)

        this.x = x
        this.to = to
        this.direction = direction
        this.sound = sound

        this.frame = 0
    }

    reset() {
        this.frame = 0
        this.is_done = false
    }

    event_loop() {
        scene_main.draw_background()
        scene_main.draw_front()

        ctx.globalAlpha = Math.sin(Math.PI * this.frame / 24)
        Irect(0, 0, width, height, "black")
        ctx.globalAlpha = 1

        if (this.frame == 0) {
            this.sound?.play()
        } else if (this.frame == 12) {
            scene_main.player.p.x = this.x
            scene_main.stage = this.to()

            Icamera.range[1] = scene_main.stage.width

            Icamera.p.x = scene_main.player.p.x - width / 2
            Icamera.clamp()

            scene_main.characters_data.forEach(c => { c.p = scene_main.player.p })
        } else if (this.frame == 24) {
            scene_main.enemies = []

            scene_main.stage.enemies.forEach(e => {
                const enemy = e()
                enemy.reset()
                let x = Math.floor(scene_main.stage.width * Math.random())

                while (Math.abs(x - this.x) < 200) {
                    x = Math.floor(scene_main.stage.width * Math.random())
                }

                scene_main.enemies.push(new Event_Enemy(new vec(x, 580), 40, enemy.app, enemy))
            })

            this.is_done = true
        }

        this.frame++
    }

}

const Event_Conversation = class extends Event_Stage {
    constructor(p = new vec(0, 0), r = 40, app = null, text = [], voice = null, sw = () => true) {
        super(p, r, app, sw)
        this.text = text
        this.voice = voice

        this.frame = 0
    }

    event_loop() {
        if (this.frame == 0) { Sound_Data.text = this.voice }

        scene_main.draw_background()
        scene_main.draw_characters()
        scene_main.draw_front()

        Irect(20, 20, width - 40, 320, "#121212")
        Irect(20, 20, width - 40, 320, "#c0c0c0", "stroke", 12)

        Ifont({ size: 48, colour: "#c0c0c0", font: "Pixel" })
        Itext5(this.frame / 1.4, 35, 80, font_size, Iadjust(width - 120, this.text[this.text_num]))

        if (pushed.includes("ok") || pushed.includes("cancel")) {
            if (this.text[this.text_num].length > this.frame / 1.4) {
                this.frame = this.text[this.text_num].length * 1.4
            } else {
                this.text_num++
                this.frame = 0
                if (this.text_num == this.text.length) {
                    this.is_done = true
                }
            }
        }

        this.frame++
    }

    reset() {
        scene_main.player.p.y = height - scene_main.player.r
        scene_main.characters.forEach(c => { c.p.y = scene_main.stage.height - scene_main.player.r })

        this.is_done = false
        this.frame = 0
        this.text_num = 0
    }
}

const Event_Command = class extends Event_Stage {
    constructor(p, r, app, command, sw = () => true) {
        super(p, r, app, sw)
        this.command = command

        this.frame = 0
    }

    event_loop() {
        scene_main.draw_background()
        scene_main.draw_characters()
        scene_main.draw_front()

        Irect(20, 20, width - 40, 320, "#121212")
        Irect(20, 20, width - 40, 320, "#c0c0c0", "stroke", 12)
        Ifont({ size: 48, colour: "#c0c0c0", font: "Pixel" })
        this.command.run()
    }

    reset() {
        Sound_Data.text = null
        scene_main.player.p.y = scene_main.stage.height - scene_main.player.r
        scene_main.characters.forEach(c => { c.p.y = scene_main.stage.height - scene_main.player.r })

        this.is_done = false
        this.command.reset()
    }
}

const Event_Illustlation = class extends Event_Stage {
    constructor(p, r, illust, sw = () => true) {
        super(p, r, null, sw)
        this.illust = illust

        // this.reset()
    }

    event_loop() {
        this.illust.draw()

        if (pushed.includes("ok") || pushed.includes("cancel")) {
            this.is_done = true
        }

    }
}

const Event_Enemy = class extends Event_Stage {
    constructor(p, r, app, enemy) {
        super(p, r, app)
        this.enemy = enemy

        this.direction = 0
        // this.reset()
        this.frame = 0
        this.cooldown = 0
    }

    loop() {
        if (this.is_touched() && this.cooldown == 0) {
            this.cooldown = 60

            se_battle?.play()

            scene_battle.enemy = this.enemy

            scene_dark.run("fall", 24, scene_battle, (frame) => {
                scene_main.draw_background()
                scene_main.draw_front()

                Icamera.run()

                if (frame > 12) {
                    ctx.globalAlpha = 0.4
                    Irect(0, 0, width, height, "#400040")
                    ctx.globalAlpha = 1
                }
            })

        }

        if (this.cooldown == 0 && this.p.sub(scene_main.player.p).length() < 1080) {
            const d = Math.sign(scene_main.player.p.x - this.p.x)
            this.p.x += d * 4

            this.direction = d > 0 ? 0 : 1
        }

        this.cooldown = Math.max(this.cooldown - 1, 0)

    }

    draw() {
        if (this.app) {
            const app = this.app[this.direction]

            app.x = this.p.x - app.width / 2
            app.y = this.p.y - app.height / 2
            app.draw()

        }

        IcircleC(this.p.x, this.p.y, this.r, "black", "stroke", 2)
    }

    reset() {
        this.is_done = false
        this.frame = 0
        this.cooldown = 0
    }
}

let S = {}

const event_nothing = new Event_Stage(new vec(0, 0), 40, null).set("draw", function () { IcircleC(this.p.x, this.p.y, this.r, "black", "stroke", 2) })

const stage_temporary = new Stage("仮部屋", 1080, {}, [])

const data = {
    status: [
        {
            max_hp: 20,
            max_token: 0,
            attack: 4,
            deffence: 4,
            speed: 4,

            hp: 20,
            token: 0,

            exp: 0,
            lv: 0,
        }
    ],
    health_room: 0,
    front: 0,
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


const health_room = new Stage("保健室", 2160, {
    back: [
        new Iimage("images/bg_health_room_0.png", 0, 0, 1080, 720),
        new Iimage("images/bg_health_room_1_back.png", 1080, 0, 1080, 720)
    ],
    front: [new Iimage("images/bg_health_room_1_front.png", 1080, 0, 1080, 720)]
}, [
    // new Event_Move(new vec(270, 550), 270, () => S.m_health_room).set("end", () => { back_paper = back_paper_1 }),
    new Event_Move(new vec(1980, 550), 2360, () => S.corridor_east_0, "Up", se_door),

    new Event_Conversation(new vec(1430, 580), 100, new Iimage("images/ch_purine_right.png", 0, 0, 380, 380),
        [
            "プリン: あら、アクア どうしたの?",
            "プリン: なんでお仕事してるか分からなくなったって?",
            "プリン: ......そういえばわたしも何でお仕事してるんだっけ?",
            "プリン: 今日はもう上がっていろんな人と話してみたら?",
            "プリン: わたしもついていくわ!",
            "プリンが仲間になった",
            "プリン: そうそう、休みたいときは奥のベッドで目をつむってね"
        ],
        se_purine
        , () => data.flag.member_num < 2
    ).set("end", () => { data.task = "いろんな人とはなす"; data.flag.member_num = 2; scene_main.characters_data[1].p.x = 1430 }),
    new Event_Conversation(new vec(1430, 580), 100, null, ["やさしさ"], se_select, () => data.flag.member_num >= 2),

    new Event_Command(new vec(270, 550), 40, null, new Icommand({
        "": new Icommand.option(40, 80, ["目をつむる", "つむらない"]),
        "0": new Icommand.do((command) => {
            console.log("おやすみ")
            scene_dark.run("blink", 24, scene_title)
            data.health_room = 0
        }),
        "1": new Icommand.do((command) => { scene_manager.move_to(scene_main) }),
    }
    ))
], [])

const old_health_room = new Stage("保険室", 2160, {
    back: [
        new Iimage("images/bg_health_room_0.png", 0, 0, 1080, 720),
        new Iimage("images/bg_old_health_room.png", 1080, 0, 1080, 720),
    ],
}, [
    new Event_Command(new vec(270, 550), 40, null, new Icommand({
        "": new Icommand.option(40, 80, ["目をつむる", "つむらない"]),
        "0": new Icommand.do((command) => {
            console.log("おやすみ")
            scene_dark.run("blink", 24, scene_title)
            data.health_room = 1
        }),
        "1": new Icommand.do((command) => { scene_manager.move_to(scene_main) }),
    }
    )),
    new Event_Move(new vec(1960, 550), 810, () => S.corridor_old_school_south_0, "Up", se_slide_door),
], [], { lighting: "#000000c0" })

/**maintenance_space */
