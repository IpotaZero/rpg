S = {}

//north

S.stage_corridor_north_0 = new Stage("北棟0階廊下", 5400, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_craft_room.png", 2160, 0, 2160, 720),
    new Iimage("images/bg_corridor_stairs_0.png", 4320, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(100, 550), 4760, () => S.stage_passage_gym, se_door),

  new Event_Move(new vec(810, 550), 1000, () => S.stage_passage_0, se_door).set("start", () => { $.getScript("stages_east_and_west.js") }),

  new Event_Move(new vec(2560, 550), 2520, () => S.stage_craft_room, se_door),
  new Event_Move(new vec(3920, 550), 740, () => S.stage_craft_room, se_door),

  new Event_Move(new vec(5200, 550), 4600, () => S.stage_corridor_north_1, se_step),

])

S.stage_corridor_north_1 = new Stage("北棟1階廊下", 5400, {
  back: [
    new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_laboratory.png", 2160, 0, 2160, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 4320, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1000, () => S.stage_passage_1, se_door).set("start", () => { $.getScript("stages_east_and_west.js") }),

  new Event_Move(new vec(2560, 550), 2520, () => S.stage_laboratory, se_door),
  new Event_Move(new vec(3920, 550), 740, () => S.stage_laboratory, se_door),

  new Event_Move(new vec(4600, 550), 5200, () => S.stage_corridor_north_0, se_step),
  new Event_Move(new vec(5200, 550), 4600, () => S.stage_corridor_north_2, se_step),
])

S.stage_corridor_north_2 = new Stage("北棟2階廊下", 5400, {
  back: [
    new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_cooking_room.png", 2160, 0, 2160, 720),
    new Iimage("images/bg_corridor_stairs_2.png", 4320, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1000, () => S.stage_passage_2, se_door).set("start", () => { $.getScript("stages_east_and_west.js") }),

  new Event_Move(new vec(2560, 550), 2520, () => S.stage_cooking_room, se_door),
  new Event_Move(new vec(3920, 550), 740, () => S.stage_cooking_room, se_door),

  new Event_Move(new vec(4600, 550), 5200, () => S.stage_corridor_north_1, se_step),
  new Event_Conversation(new vec(5200, 550), 40, null, ["北棟3階へのアクセスには、東棟3階から渡り廊下を通ってください"]),

])

S.stage_corridor_north_3 = new Stage("北棟3階廊下", 4320, {
  back: [
    new Iimage("images/bg_corridor_door.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_computer_room.png", 1890, 0, 2160, 720),
    new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1000, () => S.stage_passage_3, se_door).set("start", () => { $.getScript("stages_east_and_west.js") }),

  new Event_Illustlation(new vec(1620, 550), 40, new Iimage("images/il_mirror.png", 0, 0, width, height, { camera: false })),

  new Event_Move(new vec(2290, 550), 1960, () => S.stage_computer_room, se_door),
  new Event_Move(new vec(3650, 550), 200, () => S.stage_computer_room, se_door),

  new Event_Move(new vec(4220, 550), 200, () => S.stage_balcony, se_step),
])

// S.stage_rooftop_north = new Stage("北棟屋上", 4320, {
//     back: [
//         new Iimage("images/bg_rooftop.png", 0, 0, 1080, 720),
//         new Iimage("images/bg_rooftop.png", 1080, 0, 1080, 720),
//         new Iimage("images/bg_rooftop.png", 2160, 0, 1080, 720),
//         new Iimage("images/bg_rooftop_door.png", 3240, 0, 1080, 720),
//     ]
// }, [
//     new Event_Move(new vec(3780, 550), 5200, () => S.stage_corridor_north_3, se_door),
// ])

S.stage_balcony = new Stage("バルコニー", 810, {
  back: [new Iimage("images/bg_balcony_back.png", -135, 0, 1080, 720),],
  front: [new Iimage("images/bg_balcony_front.png", -135, 0, 1080, 720),],
}, [
  new Event_Move(new vec(200, 380), 4220, () => S.stage_corridor_north_3, se_step),
], { _height: 550 })

S.stage_craft_room = new Stage("技術室", 3240, {
  back: [
    new Iimage("images/bg_craft_room_0.png", 0, 0, 540, 720),
    new Iimage("images/bg_craft_room_1.png", 540, 0, 2160, 720),
    new Iimage("images/bg_craft_room_2.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(740, 550), 3920, () => S.stage_corridor_north_0, se_door),
  new Event_Move(new vec(2520, 550), 2560, () => S.stage_corridor_north_0, se_door),
])

S.stage_laboratory = new Stage("理科室", 3240, {
  back: [
    new Iimage("images/bg_laboratory_0.png", 0, 0, 540, 720),
    new Iimage("images/bg_laboratory_1.png", 540, 0, 2160, 720),
    new Iimage("images/bg_laboratory_2.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(740, 550), 3920, () => S.stage_corridor_north_1, se_door),
  new Event_Move(new vec(2520, 550), 2560, () => S.stage_corridor_north_1, se_door),
])

S.stage_cooking_room = new Stage("調理室", 3240, {
  back: [
    new Iimage("images/bg_cooking_room_0.png", 0, 0, 540, 720),
    new Iimage("images/bg_cooking_room_1.png", 540, 0, 2160, 720),
    new Iimage("images/bg_cooking_room_2.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Conversation(new vec(200, 550), 40, null, ["ほうちょう"]).set("end", () => { se_glass.play(); data.flag.broken_plate = true }),
  new Event_Move(new vec(740, 550), 3920, () => S.stage_corridor_north_2, se_door),

  new Event_Switch(new vec(1680, 550), 40, [event_nothing, new Event_Conversation(null, null, null, ["皿が割れている"])], () => data.flag.broken_plate ? 1 : 0),

  new Event_Move(new vec(2520, 550), 2560, () => S.stage_corridor_north_2, se_door),
])

S.stage_computer_room = new Stage("コンピュータ室", 2160, {
  back: [new Iimage("images/bg_computer_room_back.png", 0, 0, 2160, 720),],
  front: [new Iimage("images/bg_computer_room_front.png", 0, 0, 2160, 720),]
}, [
  new Event_Move(new vec(200, 550), 3650, () => S.stage_corridor_north_3, se_door),
  new Event_Move(new vec(1920, 550), 2290, () => S.stage_corridor_north_3, se_door),
])

//gym

S.stage_passage_gym = new Stage("体育館前通路", 4860, {
  back: [
    new Iimage("images/bg_sign_pool.png", 0, 0, 540, 720),
    new Iimage("images/bg_passage_gym.png", 540, 0, 1080, 720),
    new Iimage("images/bg_passage_gym.png", 2700, 0, 1080, 720),
    new Iimage("images/bg_gap.png", 4050, 0, 540, 720),
    new Iimage("images/bg_sign_right.png", 4320, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(100, 550), 2060, () => S.stage_pool_entrance, se_door),

  new Event_Move(new vec(1080, 550), 2700, () => S.stage_gym, se_door),
  new Event_Move(new vec(3240, 550), 540, () => S.stage_gym, se_door),

  new Event_Move(new vec(4320, 550), 100, () => S.stage_gym_entrance, se_road),

  new Event_Move(new vec(4760, 550), 100, () => S.stage_corridor_north_0, se_door),

])

S.stage_gym = new Stage("体育館", 3240, {
  back: [
    new Iimage("images/bg_sign_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_door.png", 270, 0, 540, 720),
    new Iimage("images/bg_corridor_door.png", 2430, 0, 540, 720),
    new Iimage("images/bg_sign_right.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(100, 550), 540, () => S.stage_gym_entrance, se_door),
  new Event_Move(new vec(540, 550), 3240, () => S.stage_passage_gym, se_door),
  new Event_Move(new vec(2700, 550), 1080, () => S.stage_passage_gym, se_door),
  new Event_Move(new vec(3140, 550), 100, () => S.stage_gym_stage, se_door),
])

S.stage_gym_stage = new Stage("壇上", 1080, {
  back: [new Iimage("images/bg_gym_stage_back.png", 0, 0, 1080, 720),],
  front: [new Iimage("images/bg_gym_stage_front.png", 0, 0, 1080, 720),],
}, [
  new Event_Move(new vec(100, 380), 3140, () => S.stage_gym, se_door),
  new Event_Move(new vec(980, 380), 100, () => S.stage_gym_warehouse, se_door),
], { _height: 550 })

S.stage_gym_warehouse = new Stage("体育館倉庫", 1080, {
  back: [new Iimage("images/bg_gym_warehouse.png", 0, 0, 1080, 720),]
}, [
  new Event_Move(new vec(100, 550), 980, () => S.stage_gym_stage, se_door),
])

S.stage_gym_entrance = new Stage("体育館入口", 1080, {
  back: [new Iimage("images/bg_gym_entrance.png", 0, 0, 1080, 720),]
}, [
  new Event_Move(new vec(100, 550), 4320, () => S.stage_passage_gym, se_road),
  new Event_Move(new vec(540, 550), 100, () => S.stage_gym, se_door),
  new Event_Move(new vec(980, 550), 100, () => S.stage_corridor_locker_room, se_road),
])

S.stage_corridor_locker_room = new Stage("更衣棟", 2160, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_locker_room.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 1620, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(100, 550), 980, () => S.stage_gym_entrance, se_road),

  new Event_Move(new vec(740, 550), 200, () => S.stage_locker_room_0, se_road),
  new Event_Move(new vec(1440, 550), 900, () => S.stage_locker_room_1, se_road),


  new Event_Move(new vec(2060, 550), 100, () => S.stage_playground, se_road),
])

S.stage_locker_room_0 = new Stage("女子更衣室", 1080, {}, [
  new Event_Move(new vec(200, 550), 740, () => S.stage_corridor_locker_room, se_road),
])

S.stage_locker_room_1 = new Stage("男子更衣室", 1080, {}, [
  new Event_Move(new vec(900, 550), 1440, () => S.stage_corridor_locker_room, se_road),
])

S.stage_playground = new Stage("運動場", 6480, {}, [
  new Event_Move(new vec(100, 550), 2060, () => S.stage_corridor_locker_room, se_road),
])

S.stage_pool_entrance = new Stage("プール更衣室前", 2160, {
  back: [
    new Iimage("images/bg_corridor_exit_right.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_enter.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_pool_locker_room.png", 540, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(2060, 550), 100, () => S.stage_passage_gym, se_door),
  new Event_Move(new vec(270, 550), 100, () => S.stage_poolside, se_step),
  new Event_Move(new vec(760, 550), 980, () => S.stage_pool_locker_room_0, se_door),
  new Event_Move(new vec(1460, 550), 100, () => S.stage_pool_locker_room_1, se_door),
])

S.stage_pool_locker_room_0 = new Stage("女子プール更衣室", 1080, {
  back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(980, 550), 760, () => S.stage_pool_entrance, se_door)
], { gender: "f" })

S.stage_pool_locker_room_1 = new Stage("男子プール更衣室", 1080, {
  back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(100, 550), 1460, () => S.stage_pool_entrance, se_door)
], { gender: "m" })

S.stage_poolside = new Stage("プールサイド", 3240, {
  back: [
    new Iimage("images/bg_poolside.png", 0, 0, 540, 720),
    new Iimage("images/bg_poolside_parasol.png", 540, 0, 1080, 720),
    new Iimage("images/bg_poolside_parasol.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_poolside.png", 2700, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(100, 550), 270, () => S.stage_pool_entrance, se_step),
  new Event_Move(new vec(3140, 550), 1350, () => S.stage_entrance_teachers_locker_room, se_door),
])

S.stage_entrance_teachers_locker_room = new Stage("教員用プール更衣室前", 1620, {
  back: [
    new Iimage("images/bg_corridor_pool_locker_room.png", 0, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(1350, 550), 3140, () => S.stage_poolside, se_door, se_step),
  new Event_Move(new vec(200, 550), 980, () => S.stage_teachers_pool_locker_room_0, se_door),
  new Event_Move(new vec(900, 550), 100, () => S.stage_teachers_pool_locker_room_1, se_door),
])

S.stage_teachers_pool_locker_room_0 = new Stage("女性教員用プール更衣室", 1080, {
  back: [new Iimage("images/bg_teachers_locker_room.png", 0, 0, 1080, 720)]
}, [
  new Event_Switch(new vec(150, 550), 40, [
    new Event_Conversation(null, null, null, ["『よびのみずぎ』をみつけた"]).set("end", () => { data.item_flag.aqua.spare_swimsuit_0 = true }),
    new Event_Conversation(null, null, null, ["ここにはもうなにもない"])
  ], () => data.item_flag.spare_swimsuit_0 ? 1 : 0),
  new Event_Move(new vec(980, 550), 200, () => S.stage_entrance_teachers_locker_room, se_door)
], { gender: "f" })

S.stage_teachers_pool_locker_room_1 = new Stage("男性教員用プール更衣室", 1080, {
  back: [new Iimage("images/bg_teachers_locker_room.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(100, 550), 900, () => S.stage_entrance_teachers_locker_room, se_door),
  new Event_Switch(new vec(980, 550), 40, [
    new Event_Conversation(null, null, null, ["『よびのみずぎ』をみつけた"]).set("end", () => { data.item_flag.aqua.spare_swimsuit_1 = true }),
    new Event_Conversation(null, null, null, ["ここにはもうなにもない"])
  ], () => data.item_flag.spare_swimsuit_1 ? 1 : 0),
], { gender: "m" })

