const se_door = new Iaudio("audios/古びたドアを開ける.mp3", "se")

const Stage = class {
    constructor(name, width, backgrounds = { back: [], front: [] }, events = []) {
        this.name = name
        this.width = width
        this.backgrounds = backgrounds
        this.events = events
    }
}


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
    constructor(p, x, to) {
        super(p, 40, null)

        this.x = x
        this.to = to

        this.reset()
    }

    loop() {
        if (pushed.includes("ok") && this.is_touched()) {
            scene_event.event = this

            scene_dark.run("blink", 24, scene_main, () => {
                scene_main.player.p.x = this.x
                scene_main.stage = this.to()
                Icamera.p.x = scene_main.player.p.x - width / 2
                if (Icamera.p.x < 0) { Icamera.p.x = 0 }
                if (Icamera.p.x > scene_main.stage.width - width) { Icamera.p.x = scene_main.stage.width - width }
            })

            se_door.play()
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
        }

    }

    event_loop() {

        scene_main.draw_background()
        scene_main.draw_characters()
        scene_main.draw_front()

        Irect(20, 20, width - 40, 320, "#121212")
        Irect(20, 20, width - 40, 320, "#c0c0c0", "stroke", 12)

        Ifont({ size: 48, colour: "#c0c0c0", font: "serif" })
        Itext5(this.frame / 1.4, 40, 80, font_size, this.text[this.text_num])

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
    constructor(p, r, app, events, terms) {
        super(p, r, app)
        this.events = events
        this.terms = terms

        this.reset()
    }

    loop() {
        const e = this.events[this.terms()]

        e.p = this.p
        e.loop()
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

            scene_dark.run("curtain", 36, scene_battle, null, () => {
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

const stage_temporary = new Stage("仮部屋", 1080, {}, [])

const stage_classroom_0 = new Stage("0年生教室", 1080,
    {
        back: [new Iimage("images/bg_classroom_0_back.png", 0, 0, 1080, 720)],
        front: [new Iimage("images/bg_classroom_0_front.png", 0, 0, 1080, 720)]
    },
    [
        new Event_Move(new vec(200, 550), 900, () => stage_corridor_east_0),
        new Event_Move(new vec(900, 550), 200, () => stage_corridor_east_0)
    ]
)

const stage_corridor_east_0 = new Stage("東棟0階廊下", 4320, {
    back: [
        new Iimage("images/bg_corridor_classroom.png", 0, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
        new Iimage("images/bg_corridor_healthroom.png", 1620, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_0.png", 2700, 0, 1080, 720),
        new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720)
    ]
}, [
    new Event_Move(new vec(200, 550), 900, () => stage_classroom_0),

    new Event_Enemy(new vec(500, 550), 40, null),

    new Event_Move(new vec(900, 550), 200, () => stage_classroom_0),
    new Event_Move(new vec(1820, 550), 900, () => stage_health_room),
    new Event_Switch(new vec(1370, 550), 40, null, [
        new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"]),
        new Event_Move(null, 1890, () => stage_corridor_west_0)
    ], () => data.flag.meet_purine ? 1 : 0),
    new Event_Switch(new vec(3500, 550), 40, null, [
        new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"]),
        new Event_Move(null, 4350, () => stage_temporary),
    ], () => data.flag.meet_purine ? 1 : 0),
    new Event_Move(new vec(4200, 550), 100, () => stage_passage_0)
])

const stage_health_room = new Stage("保健室", 1080, {
    back: [new Iimage("images/bg_healthroom_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_healthroom_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(900, 550), 1820, () => stage_corridor_east_0),
    new Event_Conversation(new vec(350, 580), 100, new Iimage("images/ch_purine_right.png", 0, 0, 380, 380),
        ["プリン: あら、アクア どうしたの？", "プリン: なんでお仕事してるか<br>分からなくなったって？", "プリン: ......そういえばあたしも<br>何でお仕事してるんだっけ？", "プリン: 校長先生に相談してみたら？<br>校長室は西棟0階よ"]
    ).set("end", () => { data.flag.meet_purine = true; data.task = "xxx" })
])

const stage_corridor_west_0 = new Stage("西棟0階廊下", 5940, {
    back: [
        new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
        new Iimage("images/bg_corridor_stairs_0.png", 540, 0, 1080, 720),
        new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
        new Iimage("images/bg_corridor_classroom.png", 4860, 0, 1080, 720)
    ]
}, [
    new Event_Move(new vec(100, 550), 100, () => stage_main_entrance),
    new Event_Move(new vec(1350, 550), 100, () => stage_temporary),
    new Event_Move(new vec(1890, 550), 1370, () => stage_corridor_east_0),
    new Event_Move(new vec(2340, 550), 1000, () => stage_toilet_0_0),
    new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
    new Event_Move(new vec(3040, 550), 1000, () => stage_toilet_0_1),
    new Event_Move(new vec(3460, 550), 900, () => stage_office),
    new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
    new Event_Move(new vec(4160, 550), 200, () => stage_office),
    new Event_Move(new vec(4580, 550), 1000, () => stage_principal),

])

const stage_toilet_0_0 = new Stage("女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 2340, () => stage_corridor_west_0)])
const stage_toilet_0_1 = new Stage("男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => stage_corridor_west_0)])

const stage_office = new Stage("職員室", 1080, {
    back: [new Iimage("images/bg_office_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_office_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(200, 550), 4160, () => stage_corridor_west_0),
    new Event_Move(new vec(900, 550), 3460, () => stage_corridor_west_0)
])


const stage_principal = new Stage("校長室", 1080, {
    back: [new Iimage("images/bg_principal_back.png", 0, 0, 1080, 720)],
}, [
    new Event_Move(new vec(1000, 550), 4580, () => stage_corridor_west_0)
])

const stage_main_entrance = new Stage("正門", 1080, {
    back: [new Iimage("images/bg_main_entrance.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(100, 550), 100, () => stage_corridor_west_0),
    new Event_Conversation(new vec(540, 550), 40, null, ["だめ"]),
])

const stage_passage_0 = new Stage("0階渡り廊下", 1080, {
    back: [new Iimage("images/bg_passage_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_passage_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(100, 550), 4200, () => stage_corridor_east_0),
    new Event_Switch(new vec(1000, 550), 40, null, [
        new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
        new Event_Move(null, 810, () => stage_corridor_north_0)
    ], () => data.flag.key_north ? 1 : 0),
])

const stage_corridor_north_0 = new Stage("北棟0階廊下", 5400, {
    back: [
        new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
        new Iimage("images/bg_corridor_enter.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_0.png", 4320, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(100, 550), 4220, () => stage_passage_gym),
    new Event_Move(new vec(810, 550), 1000, () => stage_passage_0),
    new Event_Move(new vec(5200, 550), 4600, () => stage_corridor_north_1),

])

const stage_corridor_north_1 = new Stage("北棟1階廊下", 5400, {
    back: [
        new Iimage("images/bg_corridor_enter.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_1.png", 4320, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(810, 550), 1000, () => stage_passage_0),
    new Event_Move(new vec(4600, 550), 5200, () => stage_corridor_north_0),
    new Event_Move(new vec(5200, 550), 4600, () => stage_corridor_north_2),
])

const stage_corridor_north_2 = new Stage("北棟2階廊下", 5400, {
    back: [
        new Iimage("images/bg_corridor_enter.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_1.png", 4320, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(810, 550), 1000, () => stage_passage_0),
    new Event_Move(new vec(4600, 550), 5200, () => stage_corridor_north_1),
    new Event_Move(new vec(5200, 550), 4600, () => stage_corridor_north_3),
])

const stage_corridor_north_3 = new Stage("北棟3階廊下", 5400, {
    back: [
        new Iimage("images/bg_corridor_enter.png", 540, 0, 540, 720),
        new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 2160, 0, 1080, 720),
        new Iimage("images/bg_corridor_classroom.png", 3240, 0, 1080, 720),
        new Iimage("images/bg_corridor_stairs_1.png", 4320, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(810, 550), 1000, () => stage_passage_0),
    new Event_Illustlation(new vec(1620, 550), 40, new Iimage("images/il_mirror.png", 0, 0, width, height, { camera: false })),
    new Event_Move(new vec(4600, 550), 5200, () => stage_corridor_north_2),
])

const stage_passage_gym = new Stage("体育館前通路", 4320, {
    back: [
        new Iimage("images/bg_passage_gym.png", 0, 0, 1080, 720),
        new Iimage("images/bg_passage_gym.png", 3240, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(4220, 550), 100, () => stage_corridor_north_0),
    new Event_Move(new vec(100, 550), 2060, () => stage_pool_entrance),
])

const stage_pool_entrance = new Stage("プール更衣室前", 2160, {
    back: [
        new Iimage("images/bg_corridor_exit_right.png", 1620, 0, 540, 720),
        new Iimage("images/bg_corridor_enter.png", 0, 0, 540, 720),
        new Iimage("images/bg_corridor_pool_locker_room.png", 540, 0, 1080, 720),
    ]
}, [
    new Event_Move(new vec(2060, 550), 100, () => stage_passage_gym),
    new Event_Move(new vec(270, 550), 100, () => stage_poolside),
    new Event_Move(new vec(760, 550), 980, () => stage_pool_locker_room_0),
    new Event_Move(new vec(1460, 550), 100, () => stage_pool_locker_room_1),
])

const stage_pool_locker_room_0 = new Stage("女子プール更衣室", 1080, {
    back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(980, 550), 760, () => stage_pool_entrance)
])

const stage_pool_locker_room_1 = new Stage("男子プール更衣室", 1080, {
    back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
    new Event_Move(new vec(100, 550), 1460, () => stage_pool_entrance)
])

const stage_poolside = new Stage("プールサイド", 3240, {
    back: [
        new Iimage("images/bg_poolside.png", 0, 0, 540, 720),
        new Iimage("images/bg_poolside_parasol.png", 540, 0, 1080, 720),
        new Iimage("images/bg_poolside_parasol.png", 1620, 0, 1080, 720),
        new Iimage("images/bg_poolside.png", 2700, 0, 540, 720)
    ]
}, [
    new Event_Move(new vec(100, 550), 270, () => stage_pool_entrance),
])