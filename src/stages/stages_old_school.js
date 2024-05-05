S = {}

S.old_school_back_garden = new Stage("旧小学校裏庭", 6480, {
  back: [
    new Iimage("images/bg_corridor_old_school_toilet.png", 270, 0, 1080, 720),
    new Iimage("images/bg_old_school_back_garden_1.png", 1620, 0, 1080 * 2, 720, { repeat_x: 2 }),
    new Iimage("images/bg_old_school_back_garden_0.png", 3780, 0, 1080, 720),
    new Iimage("images/bg_old_school_back_garden_1.png", 4860, 0, 1080 * 2, 720, { repeat_x: 2 }),

  ],
  front: [
    new Iimage("images/bg_old_school_back_garden_front_1.png", -540, 0, 1080 * 3, 720, { repeat_x: 3 }),
    new Iimage("images/bg_old_school_back_garden_front_0.png", 2700, 0, 1080, 720),
    new Iimage("images/bg_old_school_back_garden_front_1.png", 3780, 0, 1080 * 3, 720, { repeat_x: 3 }),
  ],
}, [
  new Event_Move(new vec(510, 550), 2160, () => S.old_school_toilet_0, "Up", se_road),

  new Event_Move(new vec(3240, 550), 2160, () => S.old_school_back_entrance, "Down", se_road).set("start", () => { $.getScript("stages/stages_north.js") }),
  new Event_Move(new vec(4320, 550), 3240, () => S.old_school_shoe_shelf, "Up", se_road).set("end", () => { data.front = 1 }),

], [], { _height: 680 })

S.old_school_toilet_0 = new Stage("女子便所", 2160, {
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Move(new vec(2160, 550), 510, () => S.old_school_back_garden, "Right", se_road),

], [], { gender: "f" })

S.old_school_shoe_shelf = new Stage("下駄箱", 4320, {
  back: [
    new Iimage("images/bg_old_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_shoe_locker_back_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_shoe_locker_back_0.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_shoe_locker_back_1.png", 2700, 0, 1080, 720),
    new Iimage("images/bg_old_right.png", 3780, 0, 540, 720),
  ],
  front: [
    new Iimage("images/bg_shoe_locker_front.png", 540, 0, 1080 * 2, 720, { repeat_x: 2 }),
    new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })
  ],
}, [
  new Event_Move(new vec(2160, 550), 540, () => S.old_school_main_entrance, "Up", se_door).set("end", () => { data.front = 0 }),
  new Event_Move(new vec(3240, 550), 4320, () => S.old_school_back_garden, "Down", se_road).set("end", () => { data.front = 0 }),
  new Event_Move(new vec(4320, 550), 0, () => S.corridor_old_school_south_0, "Right", se_door),
], [], { _height: 650, lighting: "#00000080" })

S.old_school_main_entrance = new Stage("旧小学校正門", 1080, {
  back: [new Iimage("images/bg_old_school_main_entrance.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Move(new vec(540, 550), 2160, () => S.old_school_shoe_shelf, "Up", se_door).set("end", () => { data.front = 1 }),
], [])

S.corridor_old_school_south_0 = new Stage("0階南廊下", 4320, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_old_health_room.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_old_classroom.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_0.png", 2700, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720),
  ],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Move(new vec(0, 550), 4320, () => S.old_school_shoe_shelf, "Left", se_door),
  new Event_Move(new vec(720, 550), 1960, () => old_health_room, "Up", se_slide_door),
  new Event_Move(new vec(1820, 550), 900, () => S.support_classroom, "Up", se_slide_door),
  new Event_Move(new vec(2520, 550), 200, () => S.support_classroom, "Up", se_slide_door),
  new Event_Move(new vec(2980, 550), 3500, () => S.corridor_old_school_south_b1, "Up", se_door),
  new Event_Move(new vec(3500, 550), 2980, () => S.corridor_old_school_south_1, "Up", se_step),
  new Event_Move(new vec(4320, 550), 0, () => S.corridor_old_school_south_0_end, "Right", se_step),
], [

], { lighting: "#000000c0" })

S.corridor_old_school_south_0_end = new Stage("0階南廊下奥", 1080, {
  back: [new Iimage("images/bg_corridor_right_classroom.png", 0, 0, 1080, 720),],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Move(new vec(0, 550), 4320, () => S.corridor_old_school_south_0, "Left", se_step),
  new Event_Move(new vec(1080, 550), 0, () => S.old_classroom_0, "Right", se_slide_door),

], [], { _height: 700, lighting: "#000000c0" })

S.corridor_old_school_south_b1 = new Stage("-1階南廊下", 4320, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    // new Iimage("images/bg_corridor_old_health_room.png", 540, 0, 1080, 720),
    // new Iimage("images/bg_corridor_old_classroom.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_0.png", 2700, 0, 1080, 720),
    // new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720),
  ],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  // new Event_Move(new vec(0, 550), 4320, () => S.old_school_shoe_shelf, "Left", se_door),
  // new Event_Move(new vec(720, 550), 1960, () => old_health_room, "Up", se_door),
  // new Event_Move(new vec(1820, 550), 900, () => S.support_classroom, "Up", se_door),
  // new Event_Move(new vec(2520, 550), 200, () => S.support_classroom, "Up", se_door),
  new Event_Move(new vec(3500, 550), 2980, () => S.corridor_old_school_south_0, "Up", se_step),

], [

], { lighting: "#000000e0" })

S.corridor_old_school_south_1 = new Stage("1階南廊下", 4320, {
  back: [
    // new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    // new Iimage("images/bg_corridor_old_health_room.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_old_classroom.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 2700, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720),
  ],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  // new Event_Move(new vec(0, 550), 4320, () => S.old_school_shoe_shelf, "Left", se_door),
  new Event_Move(new vec(720, 550), 1080, () => S.old_principal, "Up", se_door),
  new Event_Move(new vec(1820, 550), 900, () => S.old_office, "Up", se_door),
  new Event_Move(new vec(2520, 550), 200, () => S.old_office, "Up", se_door),
  new Event_Move(new vec(2980, 550), 3500, () => S.corridor_old_school_south_0, "Up", se_step),
  new Event_Move(new vec(3500, 550), 3780, () => S.rooftop_old_school, "Up", se_step),
  new Event_Move(new vec(4320, 550), 0, () => S.corridor_old_school_south_1_end, "Right", se_step),
], [

], { lighting: "#000000c0" })

S.corridor_old_school_south_1_end = new Stage("1階南廊下奥", 1080, {
  back: [
    new Iimage("images/bg_corridor_right_classroom.png", 0, 0, 1080, 720),
  ],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Move(new vec(0, 550), 4320, () => S.corridor_old_school_south_1, "Left", se_step),
  new Event_Move(new vec(1080, 550), 0, () => S.old_classroom_0, "Right", se_slide_door),

], [], { _height: 700, lighting: "#000000c0" })

S.rooftop_old_school = new Stage("旧小学校屋上", 4320, {
  back: [
    new Iimage("images/bg_rooftop.png", 0, 0, 1080 * 4, 720, { repeat_x: 4 }),
  ]
}, [
  new Event_Move(new vec(3780, 550), 3500, () => S.corridor_old_school_south_1, "Up", se_door),
], [])

S.support_classroom = new Stage("特別教室", 1080, {
  back: [
    new Iimage("images/bg_support_room.png", 0, 0, 1080, 720),
  ],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Move(new vec(200, 550), 2520, () => S.corridor_old_school_south_0, "Up", se_slide_door),
  new Event_Conversation(new vec(540, 550), 40, null, ["面白そうな本はない"], se_select),
  new Event_Move(new vec(900, 550), 1820, () => S.corridor_old_school_south_0, "Up", se_slide_door),
], [], { lighting: "#000000c0" })

S.old_classroom_0 = new Stage("0年生教室", 1080, {
  back: [new Iimage("images/bg_old_classroom.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Move(new vec(0, 550), 1080, () => S.corridor_old_school_south_0_end, "Left", se_slide_door),
  new Event_Conversation(new vec(540, 550), 40, null, ["時計は止まっている"], se_select),
  new Event_Conversation(new vec(810, 550), 40, null, ["造花"], se_select),
], [], { lighting: "#000000c0" })

S.old_principal = new Stage("校長室", 1080, {
  back: [new Iimage("images/bg_principal_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [
  new Event_Conversation(new vec(180, 550), 40, null, ["「にほんとう」をみつけた"], se_select),
  new Event_Move(new vec(1080, 550), 720, () => S.corridor_old_school_south_1, "Right", se_door),
], [], { lighting: "#000000c0" })

S.old_office = new Stage("教員控所", 1620, {
  back: [

  ],
  front: [new Iimage("images/web.png", 0, 0, 1080, 720, { camera: false, alpha: 0.5 })]
}, [], [])

