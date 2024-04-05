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



const Stage = class {
    constructor(name, width, backgrounds = { back: [], front: [] }, events = [], { _height = height, gender = null, shadow = [] } = {}) {
        this.name = name
        this.width = width
        this.backgrounds = backgrounds
        this.events = events

        this.height = _height
        this.gender = gender
        this.shadow = shadow
    }
}

const ef_ex = new Iimage("images/ef_ex.png", 0, 300, 120, 120)

const Event = class {
    constructor(p, r, app) {
        this.p = p ?? new vec(0, 0)
        this.r = r ?? 40
        this.app = app
    }

    start() {

    }

    end() {

    }

    loop() {

    }

    event_loop() {

    }

    set(key, value) {
        this[key] = value
        return this
    }

    draw() {
        if (this.app) {
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

    is_touched() {
        return scene_main.player.p.sub(this.p).length() < scene_main.player.r + this.r
    }

    reset() {
        this.is_done = false
    }
}

const Event_Chain = class extends Event {
    constructor(p, r, app, event_list) {
        super(p, r, app)
        this.event_list = event_list

        this.reset()
    }

    loop() {
        if (pushed.includes("ok") && this.is_touched()) {
            this.element()
        }
    }

    element() {
        this.phase = 0

        this.event_list[0].start()

        scene_event.event = this
        scene_manager.move_to(scene_event)
    }

    event_loop() {
        const e = this.event_list[this.phase]
        e?.event_loop()

        if (e.is_done) {
            e.end()


            if (this.phase == this.event_list.length - 1) {
                this.is_done = true
                return
            }

            this.phase++

            this.event_list[this.phase].start()
            this.event_list[this.phase].frame = 0
        }
    }

    reset() {
        this.is_done = false
        this.phase = 0
    }

}

const Event_Move = class extends Event {
    constructor(p, x, to, sound = null) {
        super(p, 40, null)

        this.x = x
        this.to = to
        this.sound = sound

        this.reset()
    }

    loop() {
        if (pushed.includes("ok") && this.is_touched()) {
            this.element()
        }
    }

    element() {
        this.frame = 0

        scene_event.event = this
        scene_manager.move_to(scene_event)
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
            this.is_done = true
        }

        this.frame++
    }

}

const Event_Conversation = class extends Event {
    constructor(p, r, app, text) {
        super(p, r, app)
        this.text = text

        this.reset()
    }

    loop() {
        if ((pushed.includes("ok")) && this.is_touched()) {
            this.element()
        }
    }

    element() {
        scene_main.player.p.y = height - scene_main.player.r
        scene_main.characters.forEach(c => { c.p.y = scene_main.stage.height - scene_main.player.r })

        scene_event.event = this
        scene_manager.move_to(scene_event)
    }

    event_loop() {
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
        this.is_done = false
        this.frame = 0
        this.text_num = 0
    }
}

const Event_Command = class extends Event {
    constructor(p, r, app, command) {
        super(p, r, app)
        this.command = command

        this.reset()
    }

    loop() {
        if ((pushed.includes("ok")) && this.is_touched()) {
            this.element()
        }
    }

    element() {
        scene_main.player.p.y = scene_main.stage.height - scene_main.player.r
        scene_main.characters.forEach(c => { c.p.y = scene_main.stage.height - scene_main.player.r })

        scene_event.event = this
        scene_manager.move_to(scene_event)
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
        this.is_done = false
        this.command.reset()
    }
}

const Event_Illustlation = class extends Event {
    constructor(p, r, illust) {
        super(p, r, null)
        this.illust = illust

        this.reset()
    }

    loop() {
        if ((pushed.includes("ok")) && this.is_touched()) {
            scene_event.event = this
            scene_manager.move_to(scene_event)
        }
    }

    event_loop() {
        this.illust.draw()

        if (pushed.includes("ok") || pushed.includes("cancel")) {
            this.is_done = true
        }

    }
}

const Event_Switch = class extends Event {
    constructor(p, r, events, terms) {
        super(p, r, null)
        this.events = events
        this.terms = terms

        this.reset()
    }

    loop() {
        const e = this.events[this.terms()]

        if (e) { e.p = this.p; e.loop() }


    }

    draw() {
        const e = this.events[this.terms()]

        if (e) { e.draw() }
    }

    reset() {
        this.is_done = false
        this.events.forEach(e => { e.reset() })
    }
}

const Event_Enemy = class extends Event {
    constructor(p, r, app) {
        super(p, r, app)
        this.reset()
    }

    loop() {
        if (this.is_touched() && this.cooldown == 0) {
            this.cooldown = 60

            scene_dark.run("fall", 24, scene_battle, (frame) => {
                if (frame > 12) {
                    ctx.globalAlpha = 0.4
                    Irect(0, 0, width, height, "#400040")
                    ctx.globalAlpha = 1
                }
            })

        }

        this.cooldown = Math.max(this.cooldown - 1, 0)

    }

    reset() {
        this.is_done = false
        this.frame = 0
        this.cooldown = 0
    }
}

let S = {}

const event_nothing = new Event(new vec(0, 0), 40, null).set("draw", function () { IcircleC(this.p.x, this.p.y, this.r, "black", "stroke", 2) })

const stage_temporary = new Stage("仮部屋", 1080, {}, [])

const data = {
    status: [
        {
            max_hp: 20,
            max_token: 0,

        }
    ],
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

/**maintenance_space */
