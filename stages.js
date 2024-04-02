const se_door = new Iaudio("audios/ドアを閉める2.mp3", "se")
const se_step = new Iaudio("audios/家の階段を駆け上る.mp3", "se")
const se_road = new Iaudio("audios/砂利の上を走る.mp3", "se")
const se_glass = new Iaudio("audios/ガラスが割れる2.mp3", "se")

const Stage = class {
    constructor(name, width, backgrounds = { back: [], front: [] }, events = [], _height = height) {
        this.name = name
        this.width = width
        this.backgrounds = backgrounds
        this.events = events

        this.height = _height
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
            this.start()

            scene_dark.run("blink", 24, scene_main, () => {
                scene_main.player.p.x = this.x
                scene_main.stage = this.to()

                Icamera.range[1] = this.to().width

                Icamera.p.x = scene_main.player.p.x - width / 2
                Icamera.clamp()

                scene_main.characters.forEach(c => {
                    c.p = scene_main.player.p
                })

                this.end()
            })

            this.sound?.play()
        }
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
            scene_event.event = this
            scene_manager.move_to(scene_event)
            scene_main.player.p.y = height - scene_main.player.r

            scene_main.characters.forEach(c => { c.p.y = scene_main.stage.height - scene_main.player.r })

        }

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

            scene_dark.run("curtain", 24, scene_battle, null, () => {
                ctx.globalAlpha = 0.4
                Irect(0, 0, width, height, "#400040")
                ctx.globalAlpha = 1
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

const event_nothing = new Event(new vec(0, 0), 40, null).set("draw", function () { IcircleC(this.p.x, this.p.y, this.r, "black", "stroke", 2) })

const stage_temporary = new Stage("仮部屋", 1080, {}, [])

//east

const stage_corridor_east_0 = new Stage("東棟0階廊下", 4320, {
    back: [
        new Iimage("images/bg_corridor_classroom.png", 0, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
        new Iimage("images/bg_corridor_health_room.png", 1620, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_0.png", 2700, 0, 1080, 720),
        new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720)
    ]
}, [
    new Event_Move(new vec(200, 550), 900, () => stage_classroom_0, se_door),
    new Event_Enemy(new vec(500, 550), 40, null),
    new Event_Move(new vec(900, 550), 200, () => stage_classroom_0, se_door),

    new Event_Move(new vec(1820, 550), 1980, () => stage_health_room, se_door),

    new Event_Switch(new vec(1370, 550), 40, [
        new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"]),
        new Event_Move(null, 1890, () => stage_corridor_west_0, se_step)
    ], () => data.flag.member_num >= 2 ? 1 : 0),

    new Event_Move(new vec(2960, 550), 900, () => stage_warehouse_under_stairs_east, se_door),

    new Event_Switch(new vec(3500, 550), 40, [
        new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"]),
        new Event_Move(null, 2960, () => stage_corridor_east_1, se_step),
    ], () => data.flag.member_num >= 2 ? 1 : 0),

    new Event_Move(new vec(4200, 550), 100, () => stage_passage_0, se_door)
])

const stage_corridor_east_1 = new Stage("東棟1階廊下", 4320, {
    back: [
        new Iimage("images/bg_corridor_classroom.png", 0, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
        new Iimage("images/bg_corridor_health_room.png", 1620, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_1.png", 2700, 0, 1080, 720),
        new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720)
    ]
}, [
    new Event_Move(new vec(200, 550), 900, () => stage_classroom_0, se_door),

    new Event_Move(new vec(900, 550), 200, () => stage_classroom_0, se_door),
    new Event_Move(new vec(1820, 550), 1980, () => stage_health_room, se_door),

    new Event_Move(new vec(1370, 550), 1890, () => stage_corridor_west_1, se_step),

    new Event_Move(new vec(2960, 550), 3500, () => stage_corridor_east_0, se_step),
    new Event_Move(new vec(3500, 550), 2960, () => stage_corridor_east_2, se_step),

    new Event_Move(new vec(4200, 550), 100, () => stage_passage_1, se_door)
])

const stage_corridor_east_2 = new Stage("東棟2階廊下", 4320, {
    back: [
        new Iimage("images/bg_corridor_classroom.png", 0, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
        new Iimage("images/bg_corridor_health_room.png", 1620, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_1.png", 2700, 0, 1080, 720),
        new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720)
    ]
}, [
    new Event_Move(new vec(200, 550), 900, () => stage_classroom_0, se_door),

    new Event_Move(new vec(900, 550), 200, () => stage_classroom_0, se_door),
    new Event_Move(new vec(1820, 550), 1980, () => stage_health_room, se_door),

    new Event_Move(new vec(1370, 550), 1890, () => stage_corridor_west_2, se_step),

    new Event_Move(new vec(2960, 550), 3500, () => stage_corridor_east_1, se_step),
    new Event_Move(new vec(3500, 550), 2960, () => stage_corridor_east_3, se_step),

    new Event_Move(new vec(4200, 550), 100, () => stage_passage_2, se_door)
])

const stage_corridor_east_3 = new Stage("東棟3階廊下", 4320, {
    back: [
        new Iimage("images/bg_corridor_classroom.png", 0, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
        new Iimage("images/bg_corridor_health_room.png", 1620, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_1.png", 2700, 0, 1080, 720),
        new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720)
    ]
}, [
    new Event_Move(new vec(200, 550), 900, () => stage_classroom_0, se_door),

    new Event_Move(new vec(900, 550), 200, () => stage_classroom_0, se_door),
    new Event_Move(new vec(1820, 550), 1980, () => stage_health_room, se_door),

    new Event_Move(new vec(1370, 550), 1890, () => stage_corridor_west_3, se_step),

    new Event_Move(new vec(2960, 550), 3500, () => stage_corridor_east_2, se_step),
    new Event_Move(new vec(3500, 550), 3780, () => stage_rooftop_east, se_step),

    new Event_Move(new vec(4200, 550), 100, () => stage_passage_3, se_door)
])

const stage_rooftop_east = new Stage("東棟屋上", 4320, {
    back: [
        new Iimage("images/bg_rooftop.png", 0, 0, 1080, 720),
        new Iimage("images/bg_rooftop.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_rooftop.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_rooftop_door.png", 3240, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(3780, 550), 3500, () => stage_corridor_east_3, se_door),
])

const stage_classroom_0 = new Stage("0年生教室", 1080,
    {
        back: [new Iimage("images/bg_classroom_0_back.png", 0, 0, 1080, 720)],
        front: [new Iimage("images/bg_classroom_0_front.png", 0, 0, 1080, 720)]
    },
    [
        new Event_Move(new vec(200, 550), 900, () => stage_corridor_east_0, se_door),
        new Event_Move(new vec(900, 550), 200, () => stage_corridor_east_0, se_door),
    ]
)

const stage_health_room = new Stage("保健室", 2160, {
    back: [
        new Iimage("images/bg_health_room_0.png", 0, 0, 1080, 720),
        new Iimage("images/bg_health_room_1_back.png", 1080, 0, 1080, 720)
    ],
    front: [new Iimage("images/bg_health_room_1_front.png", 1080, 0, 1080, 720)]
}, [
    // new Event_Move(new vec(270, 550), 270, () => stage_m_health_room).set("end", () => { back_paper = back_paper_1 }),
    new Event_Move(new vec(1980, 550), 1820, () => stage_corridor_east_0, se_door),

    new Event_Switch(new vec(1430, 580), 100, [
        new Event_Conversation(null, null, new Iimage("images/ch_purine_right.png", 0, 0, 380, 380),
            ["プリン: あら、アクア どうしたの？", "プリン: なんでお仕事してるか分からなくなったって？", "プリン: ......そういえばあたしも何でお仕事してるんだっけ？", "プリン: 今日はもう上がっていろんな人と話してみたら？", "プリン: あたしもついていくわ！", "プリンが仲間になった"]
        ).set("end", () => { data.task = "いろんな人とはなす"; data.flag.member_num = 2 }),
        new Event_Conversation(null, null, null, ["やさしさ"]),
    ], () => data.flag.member_num >= 2 ? 1 : 0),


])

const stage_warehouse_under_stairs_east = new Stage("東棟階段下倉庫", 1080, {
    back: [new Iimage("images/bg_warehouse.png", 0, 0, 1080, 720)],
}, [
    new Event_Move(new vec(900, 550), 2960, () => stage_corridor_east_0, se_door),
])

//west

const stage_corridor_west_0 = new Stage("西棟0階廊下", 5940, {
    back: [
        new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
        new Iimage("images/bg_corridor_stairs_0.png", 540, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
        new Iimage("images/bg_corridor_kitchen.png", 4860, 0, 1080, 720)
    ]
}, [
    new Event_Move(new vec(100, 550), 100, () => stage_main_entrance, se_door),

    new Event_Move(new vec(1350, 550), 810, () => stage_corridor_west_1, se_step),

    new Event_Move(new vec(1890, 550), 1370, () => stage_corridor_east_0, se_step),

    new Event_Move(new vec(2340, 550), 1000, () => stage_toilet_west_0_0, se_step),
    new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
    new Event_Move(new vec(3040, 550), 1000, () => stage_toilet_west_0_1, se_step),

    new Event_Move(new vec(3460, 550), 900, () => stage_office, se_door),
    new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
    new Event_Move(new vec(4160, 550), 200, () => stage_office, se_door),

    new Event_Move(new vec(4580, 550), 1000, () => stage_principal, se_door),

    new Event_Move(new vec(5060, 550), 2060, () => stage_kitchen, se_door),
    new Event_Conversation(new vec(5410, 550), 40, null, ["給食の献立が書いてある", "明日の料理は......グラタンだ！"]),
    new Event_Move(new vec(5760, 550), 200, () => stage_kitchen, se_door),
])

const stage_corridor_west_1 = new Stage("西棟1階廊下", 5940, {
    back: [
        new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
        new Iimage("images/bg_corridor_classroom.png", 4860, 0, 1080, 720)
    ]
}, [
    new Event_Move(new vec(810, 550), 1350, () => stage_corridor_west_0, se_step),
    new Event_Move(new vec(1350, 550), 810, () => stage_corridor_west_2, se_step),

    new Event_Move(new vec(1890, 550), 1370, () => stage_corridor_east_1, se_step),

    new Event_Move(new vec(2340, 550), 1000, () => stage_toilet_west_1_0, se_step),
    new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
    new Event_Move(new vec(3040, 550), 1000, () => stage_toilet_west_1_1, se_step),

    new Event_Move(new vec(3460, 550), 900, () => stage_office, se_door),
    new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
    new Event_Move(new vec(4160, 550), 200, () => stage_office, se_door),

    new Event_Move(new vec(4580, 550), 1000, () => stage_principal, se_door),

])

const stage_corridor_west_2 = new Stage("西棟2階廊下", 5940, {
    back: [
        new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
        new Iimage("images/bg_corridor_classroom.png", 4860, 0, 1080, 720)
    ]
}, [
    new Event_Move(new vec(810, 550), 1350, () => stage_corridor_west_1, se_step),
    new Event_Move(new vec(1350, 550), 810, () => stage_corridor_west_3, se_step),

    new Event_Move(new vec(1890, 550), 1370, () => stage_corridor_east_2, se_step),

    new Event_Move(new vec(2340, 550), 1000, () => stage_toilet_west_2_0, se_step),
    new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
    new Event_Move(new vec(3040, 550), 1000, () => stage_toilet_west_2_1, se_step),

    new Event_Move(new vec(3460, 550), 900, () => stage_office, se_door),
    new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
    new Event_Move(new vec(4160, 550), 200, () => stage_office, se_door),

    new Event_Move(new vec(4580, 550), 1000, () => stage_principal, se_door),

])

const stage_corridor_west_3 = new Stage("西棟3階廊下", 5940, {
    back: [
        new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
        new Iimage("images/bg_corridor_classroom.png", 4860, 0, 1080, 720)
    ]
}, [
    new Event_Move(new vec(810, 550), 1350, () => stage_corridor_west_2, se_step),
    new Event_Move(new vec(1350, 550), 810, () => stage_rooftop_west, se_step),

    new Event_Move(new vec(1890, 550), 1370, () => stage_corridor_east_3, se_step),

    new Event_Move(new vec(2340, 550), 1000, () => stage_toilet_west_3_0, se_step),
    new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
    new Event_Move(new vec(3040, 550), 1000, () => stage_toilet_west_3_1, se_step),

    new Event_Move(new vec(3460, 550), 900, () => stage_office, se_door),
    new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
    new Event_Move(new vec(4160, 550), 200, () => stage_office, se_door),

    new Event_Move(new vec(4580, 550), 1000, () => stage_principal, se_door),

])

const stage_rooftop_west = new Stage("西棟屋上", 5940, {
    back: [
        new Iimage("images/bg_rooftop_door.png", 0, 0, 1080, 720),
        new Iimage("images/bg_rooftop.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_rooftop.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_rooftop.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_rooftop.png", 4320, 0, 1080, 720),
        new Iimage("images/bg_rooftop.png", 5400, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(540, 550), 1350, () => stage_corridor_west_3, se_door),
])

const stage_toilet_west_0_0 = new Stage("西棟0階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 2340, () => stage_corridor_west_0, se_step)])
const stage_toilet_west_0_1 = new Stage("西棟0階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => stage_corridor_west_0, se_step)])

const stage_toilet_west_1_0 = new Stage("西棟1階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 2340, () => stage_corridor_west_1, se_step)])
const stage_toilet_west_1_1 = new Stage("西棟1階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => stage_corridor_west_1, se_step)])

const stage_toilet_west_2_0 = new Stage("西棟2階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [
    new Event_Move(new vec(900, 550), 2340, () => stage_corridor_west_2, se_step),
    new Event_Switch(new vec(160, 550), 40, [
        new Event_Conversation(new vec(160, 550), 40, null, ["何かの気配を感じる......"]),
        new Event_Conversation(new vec(160, 550), 40, null, ["シトリ: はーなーこさんっあーそびーましょー！", "???: いいよー！", "シトリ: えっ", "???: じゃあ首絞めごっこで遊ぼうか！"])
    ], () => data.flag.member_num == 4 ? 1 : 0)
])

const stage_toilet_west_2_1 = new Stage("西棟2階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => stage_corridor_west_2, se_step)])

const stage_toilet_west_3_0 = new Stage("西棟3階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 2340, () => stage_corridor_west_2, se_step)])
const stage_toilet_west_3_1 = new Stage("西棟3階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => stage_corridor_west_2, se_step)])

const stage_office = new Stage("職員室", 1080, {
    back: [new Iimage("images/bg_office_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_office_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(200, 550), 4160, () => stage_corridor_west_0, se_door),
    new Event_Move(new vec(900, 550), 3460, () => stage_corridor_west_0, se_door)
])


const stage_principal = new Stage("校長室", 1080, {
    back: [new Iimage("images/bg_principal_back.png", 0, 0, 1080, 720)],
}, [
    new Event_Conversation(new vec(270, 550), 40, null, ["校長: 何故働いているか分からない、と？", "校長: 君はアンドロイドですからねえ<br>その問いは存在理由に近いのではないでしょうか？"]),
    new Event_Move(new vec(1000, 550), 4580, () => stage_corridor_west_0, se_door)
])

const stage_main_entrance = new Stage("正門", 1080, {
    back: [new Iimage("images/bg_main_entrance.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(100, 550), 100, () => stage_corridor_west_0, se_door),
    new Event_Conversation(new vec(540, 550), 40, null, ["だめ"]),
])

const stage_kitchen = new Stage("給食室", 2160, {
    back: [new Iimage("images/bg_kitchen_back.png", 0, 0, 2160, 720)],
    front: [new Iimage("images/bg_kitchen_front.png", 0, 0, 2160, 720)]
}, [
    new Event_Move(new vec(200, 550), 5760, () => stage_corridor_west_0, se_door),
    new Event_Conversation(new vec(980, 550), 40, null, ["料理長: ああああ！！！", "料理長: 調理場に私服で入ってくるんじゃあない！せめて髪をくくりやがれ！"]),
    new Event_Move(new vec(1980, 550), 5060, () => stage_corridor_west_0, se_door),
])


const stage_passage_0 = new Stage("0階渡り廊下", 1080, {
    back: [new Iimage("images/bg_passage_0_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_passage_0_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(100, 550), 4200, () => stage_corridor_east_0, se_door),
    new Event_Switch(new vec(980, 550), 40, [
        new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
        new Event_Move(null, 810, () => stage_corridor_north_0, se_door)
    ], () => data.flag.member_num >= 3 ? 1 : 0),
])

const stage_passage_1 = new Stage("1階渡り廊下", 1080, {
    front: [new Iimage("images/bg_passage_1.png", 0, 0, 1080, 720)],
}, [
    new Event_Move(new vec(100, 550), 4200, () => stage_corridor_east_1, se_door),
    new Event_Switch(new vec(980, 550), 40, [
        new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
        new Event_Move(null, 810, () => stage_corridor_north_1, se_door)
    ], () => data.flag.member_num >= 3 ? 1 : 0),
])

const stage_passage_2 = new Stage("2階渡り廊下", 1080, {
    front: [new Iimage("images/bg_passage_1.png", 0, 0, 1080, 720)],
}, [
    new Event_Move(new vec(100, 550), 4200, () => stage_corridor_east_2, se_door),
    new Event_Switch(new vec(980, 550), 40, [
        new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
        new Event_Move(null, 810, () => stage_corridor_north_2, se_door)
    ], () => data.flag.member_num >= 3 ? 1 : 0),
])

const stage_passage_3 = new Stage("3階渡り廊下", 1080, {
    back: [new Iimage("images/bg_passage_2.png", 0, 0, 1080, 720)],
}, [
    new Event_Move(new vec(100, 550), 4200, () => stage_corridor_east_3, se_door),
    new Event_Switch(new vec(980, 550), 40, [
        new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
        new Event_Move(null, 810, () => stage_corridor_north_3, se_door)
    ], () => data.flag.member_num >= 3 ? 1 : 0),
])

//north

const stage_corridor_north_0 = new Stage("北棟0階廊下", 5400, {
    back: [
        new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
        new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_craft_room.png", 2160, 0, 2160, 720),
        new Iimage("images/bg_corridor_stairs_0.png", 4320, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(100, 550), 4760, () => stage_passage_gym, se_door),

    new Event_Move(new vec(810, 550), 1000, () => stage_passage_0, se_door),

    new Event_Move(new vec(2560, 550), 2520, () => stage_craft_room, se_door),
    new Event_Move(new vec(3920, 550), 740, () => stage_craft_room, se_door),

    new Event_Move(new vec(5200, 550), 4600, () => stage_corridor_north_1, se_step),

])

const stage_corridor_north_1 = new Stage("北棟1階廊下", 5400, {
    back: [
        new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_laboratory.png", 2160, 0, 2160, 720),
        new Iimage("images/bg_corridor_stairs_1.png", 4320, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(810, 550), 1000, () => stage_passage_1, se_door),

    new Event_Move(new vec(2560, 550), 2520, () => stage_laboratory, se_door),
    new Event_Move(new vec(3920, 550), 740, () => stage_laboratory, se_door),

    new Event_Move(new vec(4600, 550), 5200, () => stage_corridor_north_0, se_step),
    new Event_Move(new vec(5200, 550), 4600, () => stage_corridor_north_2, se_step),
])

const stage_corridor_north_2 = new Stage("北棟2階廊下", 5400, {
    back: [
        new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_cooking_room.png", 2160, 0, 2160, 720),
        new Iimage("images/bg_corridor_stairs_2.png", 4320, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(810, 550), 1000, () => stage_passage_2, se_door),

    new Event_Move(new vec(2560, 550), 2520, () => stage_cooking_room, se_door),
    new Event_Move(new vec(3920, 550), 740, () => stage_cooking_room, se_door),

    new Event_Move(new vec(4600, 550), 5200, () => stage_corridor_north_1, se_step),
    new Event_Conversation(new vec(5200, 550), 40, null, ["北棟3階へのアクセスには、東棟3階から渡り廊下を通ってください"]),

])

const stage_corridor_north_3 = new Stage("北棟3階廊下", 4320, {
    back: [
        new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_computer_room.png", 1890, 0, 2160, 720),
        new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720),
    ]
}, [
    new Event_Move(new vec(810, 550), 1000, () => stage_passage_3, se_door),

    new Event_Illustlation(new vec(1620, 550), 40, new Iimage("images/il_mirror.png", 0, 0, width, height, { camera: false })),

    new Event_Move(new vec(2290, 550), 1960, () => stage_computer_room, se_door),
    new Event_Move(new vec(3650, 550), 200, () => stage_computer_room, se_door),

    new Event_Move(new vec(4220, 550), 200, () => stage_balcony, se_step),
])

// const stage_rooftop_north = new Stage("北棟屋上", 4320, {
//     back: [
//         new Iimage("images/bg_rooftop.png", 0, 0, 1080, 720),
//         new Iimage("images/bg_rooftop.png", 1080, 0, 1080, 720),
//         new Iimage("images/bg_rooftop.png", 2160, 0, 1080, 720),
//         new Iimage("images/bg_rooftop_door.png", 3240, 0, 1080, 720),
//     ]
// }, [
//     new Event_Move(new vec(3780, 550), 5200, () => stage_corridor_north_3, se_door),
// ])

const stage_balcony = new Stage("バルコニー", 810, {
    back: [new Iimage("images/bg_balcony_back.png", -135, 0, 1080, 720),],
    front: [new Iimage("images/bg_balcony_front.png", -135, 0, 1080, 720),],
}, [
    new Event_Move(new vec(200, 380), 4220, () => stage_corridor_north_3, se_step),
], 550)

const stage_craft_room = new Stage("図工室", 3240, {
    back: [
        new Iimage("images/bg_craft_room_0.png", 0, 0, 540, 720),
        new Iimage("images/bg_craft_room_1.png", 540, 0, 2160, 720),
        new Iimage("images/bg_craft_room_2.png", 2700, 0, 540, 720),
    ]
}, [
    new Event_Move(new vec(740, 550), 3920, () => stage_corridor_north_0, se_door),
    new Event_Move(new vec(2520, 550), 2560, () => stage_corridor_north_0, se_door),
])

const stage_laboratory = new Stage("理科室", 3240, {
    back: [
        new Iimage("images/bg_laboratory_0.png", 0, 0, 540, 720),
        new Iimage("images/bg_laboratory_1.png", 540, 0, 2160, 720),
        new Iimage("images/bg_laboratory_2.png", 2700, 0, 540, 720),
    ]
}, [
    new Event_Move(new vec(740, 550), 3920, () => stage_corridor_north_1, se_door),
    new Event_Move(new vec(2520, 550), 2560, () => stage_corridor_north_1, se_door),
])

const stage_cooking_room = new Stage("調理室", 3240, {
    back: [
        new Iimage("images/bg_cooking_room_0.png", 0, 0, 540, 720),
        new Iimage("images/bg_cooking_room_1.png", 540, 0, 2160, 720),
        new Iimage("images/bg_cooking_room_2.png", 2700, 0, 540, 720),
    ]
}, [
    new Event_Conversation(new vec(200, 550), 40, null, ["ほうちょう"]).set("end", () => { se_glass.play(); data.flag.broken_plate = true }),
    new Event_Move(new vec(740, 550), 3920, () => stage_corridor_north_2, se_door),

    new Event_Switch(new vec(1680, 550), 40, [event_nothing, new Event_Conversation(null, null, null, ["皿が割れている"])], () => data.flag.broken_plate ? 1 : 0),

    new Event_Move(new vec(2520, 550), 2560, () => stage_corridor_north_2, se_door),
])

const stage_computer_room = new Stage("コンピュータ室", 2160, {
    back: [new Iimage("images/bg_computer_room_back.png", 0, 0, 2160, 720),],
    front: [new Iimage("images/bg_computer_room_front.png", 0, 0, 2160, 720),]
}, [
    new Event_Move(new vec(200, 550), 3650, () => stage_corridor_north_3, se_door),
    new Event_Move(new vec(1920, 550), 2290, () => stage_corridor_north_3, se_door),
])

//gym

const stage_passage_gym = new Stage("体育館前通路", 4860, {
    back: [
        new Iimage("images/bg_sign_pool.png", 0, 0, 540, 720),
        new Iimage("images/bg_passage_gym.png", 540, 0, 1080, 720),
        new Iimage("images/bg_passage_gym.png", 2700, 0, 1080, 720),
        new Iimage("images/bg_gap.png", 4050, 0, 540, 720),
        new Iimage("images/bg_sign_right.png", 4320, 0, 540, 720),
    ]
}, [
    new Event_Move(new vec(100, 550), 2060, () => stage_pool_entrance, se_door),

    new Event_Move(new vec(1080, 550), 2700, () => stage_gym, se_door),
    new Event_Move(new vec(3240, 550), 540, () => stage_gym, se_door),

    new Event_Move(new vec(4320, 550), 100, () => stage_gym_entrance, se_road),

    new Event_Move(new vec(4760, 550), 100, () => stage_corridor_north_0, se_door),

])

const stage_gym = new Stage("体育館", 3240, {
    back: [
        new Iimage("images/bg_sign_left.png", 0, 0, 540, 720),
        new Iimage("images/bg_corridor_door.png", 270, 0, 540, 720),
        new Iimage("images/bg_corridor_door.png", 2430, 0, 540, 720),
        new Iimage("images/bg_sign_right.png", 2700, 0, 540, 720),
    ]
}, [
    new Event_Move(new vec(100, 550), 540, () => stage_gym_entrance, se_door),
    new Event_Move(new vec(540, 550), 3240, () => stage_passage_gym, se_door),
    new Event_Move(new vec(2700, 550), 1080, () => stage_passage_gym, se_door),
    new Event_Move(new vec(3140, 550), 100, () => stage_gym_stage, se_door),
])

const stage_gym_stage = new Stage("壇上", 1080, {
    back: [new Iimage("images/bg_gym_stage_back.png", 0, 0, 1080, 720),],
    front: [new Iimage("images/bg_gym_stage_front.png", 0, 0, 1080, 720),],
}, [
    new Event_Move(new vec(100, 380), 3140, () => stage_gym, se_door),
    new Event_Move(new vec(980, 380), 100, () => stage_gym_warehouse, se_door),
], 550)

const stage_gym_warehouse = new Stage("体育館倉庫", 1080, {
    back: [new Iimage("images/bg_gym_warehouse.png", 0, 0, 1080, 720),]
}, [
    new Event_Move(new vec(100, 550), 980, () => stage_gym_stage, se_door),
])

const stage_gym_entrance = new Stage("体育館入口", 1080, {
    back: [new Iimage("images/bg_gym_entrance.png", 0, 0, 1080, 720),]
}, [
    new Event_Move(new vec(100, 550), 4320, () => stage_passage_gym, se_road),
    new Event_Move(new vec(540, 550), 100, () => stage_gym, se_door),
    new Event_Move(new vec(980, 550), 100, () => stage_playground, se_road),
])

const stage_playground = new Stage("運動場", 6480, {}, [
    new Event_Move(new vec(100, 550), 980, () => stage_gym_entrance, se_road),
])

const stage_pool_entrance = new Stage("プール更衣室前", 2160, {
    back: [
        new Iimage("images/bg_corridor_exit_right.png", 1620, 0, 540, 720),
        new Iimage("images/bg_corridor_enter.png", 0, 0, 540, 720),
        new Iimage("images/bg_corridor_locker_room.png", 540, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(2060, 550), 100, () => stage_passage_gym, se_door),
    new Event_Move(new vec(270, 550), 100, () => stage_poolside, se_step),
    new Event_Move(new vec(760, 550), 980, () => stage_pool_locker_room_0, se_door),
    new Event_Move(new vec(1460, 550), 100, () => stage_pool_locker_room_1, se_door),
])

const stage_pool_locker_room_0 = new Stage("女子プール更衣室", 1080, {
    back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(980, 550), 760, () => stage_pool_entrance, se_door)
])

const stage_pool_locker_room_1 = new Stage("男子プール更衣室", 1080, {
    back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(100, 550), 1460, () => stage_pool_entrance, se_door)
])

const stage_poolside = new Stage("プールサイド", 3240, {
    back: [
        new Iimage("images/bg_poolside.png", 0, 0, 540, 720),
        new Iimage("images/bg_poolside_parasol.png", 540, 0, 1080, 720),
        new Iimage("images/bg_poolside_parasol.png", 1620, 0, 1080, 720),
        new Iimage("images/bg_poolside.png", 2700, 0, 540, 720)
    ]
}, [
    new Event_Move(new vec(100, 550), 270, () => stage_pool_entrance, se_step),
    new Event_Move(new vec(3140, 550), 1350, () => stage_entrance_teachers_locker_room, se_door),
])

const stage_entrance_teachers_locker_room = new Stage("教員用プール更衣室前", 1620, {
    back: [
        new Iimage("images/bg_corridor_locker_room.png", 0, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
    ]
}, [
    new Event_Move(new vec(1350, 550), 3140, () => stage_poolside, se_door, se_step),
    new Event_Move(new vec(200, 550), 980, () => stage_teachers_pool_locker_room_0, se_door),
    new Event_Move(new vec(900, 550), 100, () => stage_teachers_pool_locker_room_1, se_door),
])

const stage_teachers_pool_locker_room_0 = new Stage("女性教員用プール更衣室", 1080, {
    back: [new Iimage("images/bg_teachers_locker_room.png", 0, 0, 1080, 720)]
}, [
    new Event_Switch(new vec(150, 550), 40, [
        new Event_Conversation(null, null, null, ["『よびのみずぎ』をみつけた"]).set("end", () => { data.item_flag.aqua.spare_swimsuit_0 = true }),
        new Event_Conversation(null, null, null, ["ここにはもうなにもない"])
    ], () => data.item_flag.spare_swimsuit_0 ? 1 : 0),
    new Event_Move(new vec(980, 550), 200, () => stage_entrance_teachers_locker_room, se_door)
])

const stage_teachers_pool_locker_room_1 = new Stage("男性教員用プール更衣室", 1080, {
    back: [new Iimage("images/bg_teachers_locker_room.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(100, 550), 900, () => stage_entrance_teachers_locker_room, se_door),
    new Event_Switch(new vec(980, 550), 40, [
        new Event_Conversation(null, null, null, ["『よびのみずぎ』をみつけた"]).set("end", () => { data.item_flag.aqua.spare_swimsuit_1 = true }),
        new Event_Conversation(null, null, null, ["ここにはもうなにもない"])
    ], () => data.item_flag.spare_swimsuit_1 ? 1 : 0),
])


/**maintenance_space */
