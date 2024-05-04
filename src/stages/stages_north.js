S = {}

//north

S.corridor_north_0 = new Stage("北棟0階廊下", 5400, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_door_0.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_craft_room.png", 2160, 0, 2160, 720),
    new Iimage("images/bg_corridor_stairs_0.png", 4320, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(0, 550), 4760, () => S.passage_gym, "Left", se_door),

  new Event_Move(new vec(810, 550), 1000, () => S.passage_0, "Up", se_door).set("start", () => { $.getScript("stages/stages_east_and_west.js") }),

  new Event_Move(new vec(2560, 550), 2520, () => S.craft_room, "Up", se_door),
  new Event_Move(new vec(3920, 550), 740, () => S.craft_room, "Up", se_door),

  new Event_Move(new vec(5130, 550), 4600, () => S.corridor_north_1, "Up", se_step),

])

S.corridor_north_1 = new Stage("北棟1階廊下", 5400, {
  back: [
    new Iimage("images/bg_corridor_door_0.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_laboratory.png", 2160, 0, 2160, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 4320, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1000, () => S.passage_1, "Up", se_door).set("start", () => { $.getScript("stages/stages_east_and_west.js") }),

  new Event_Move(new vec(2560, 550), 2520, () => S.laboratory, "Up", se_door),
  new Event_Move(new vec(3920, 550), 740, () => S.laboratory, "Up", se_door),

  new Event_Move(new vec(4600, 550), 5200, () => S.corridor_north_0, "Up", se_step),
  new Event_Move(new vec(5130, 550), 4600, () => S.corridor_north_2, "Up", se_step),
])

S.corridor_north_2 = new Stage("北棟2階廊下", 5400, {
  back: [
    new Iimage("images/bg_corridor_door_0.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_cooking_room.png", 2160, 0, 2160, 720),
    new Iimage("images/bg_corridor_stairs_2.png", 4320, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1000, () => S.passage_2, "Up", se_door).set("start", () => { $.getScript("stages/stages_east_and_west.js") }),

  new Event_Move(new vec(2560, 550), 2520, () => S.cooking_room, "Up", se_door),
  new Event_Move(new vec(3920, 550), 740, () => S.cooking_room, "Up", se_door),

  new Event_Move(new vec(4600, 550), 5200, () => S.corridor_north_1, "Up", se_step),
  new Event_Conversation(new vec(5130, 550), 40, null, ["北棟3階へのアクセスには、東棟3階から渡り廊下を通ってください"], se_select),

])

S.corridor_north_3 = new Stage("北棟3階廊下", 4320, {
  back: [
    new Iimage("images/bg_corridor_door_0.png", 540, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_corridor_computer_room.png", 1890, 0, 2160, 720),
    new Iimage("images/bg_corridor_exit_right.png", 3780, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1000, () => S.passage_3, "Up", se_door).set("start", () => { $.getScript("stages/stages_east_and_west.js") }),

  new Event_Illustlation(new vec(1620, 550), 40, new Iimage("images/il_mirror.png", 0, 0, width, height, { camera: false })),

  new Event_Move(new vec(2290, 550), 1960, () => S.computer_room, "Up", se_door),
  new Event_Move(new vec(3650, 550), 200, () => S.computer_room, "Up", se_door),

  new Event_Move(new vec(4220, 550), 200, () => S.balcony, "Right", se_door),
])

S.rooftop_north = new Stage("北棟屋上", 4320, {
  back: [
    new Iimage("images/bg_rooftop.png", 0, 0, 1080 * 4, 720, { repeat_x: 4 }),
  ]
}, [
  new Event_Conversation(new vec(2160, 580), 40, null, ["かわいさ"], se_select, () => data.flag.member_num >= 4),
  new Event_Conversation(new vec(2160, 580), 40, new Iimage("images/ch_citri.png", 0, 0, 380, 380), [
    "シトリ: うわ、びっくりした<br>よく来たねこんなとこまで",
    "アモン: 何してるんだ?",
    "シトリ: か、風を感じてただけだよぉ<br>疑わないでね",
    "プリン: 質問!あなたはなぜ働いているの?",
    "シトリ: ......働いている理由なんてない。<br>けど、働いていないとあたしは何物でもない",
    "シトリ: 辞めたいよね、お仕事",
    "アモン: じゃあ今日くらいは遊んでもいいんじゃないのか?<br>一緒に行こうぜ!",
    "シトリ: ......じゃあ遊んじゃおっかな!<br>そうだ、知ってる?旧校舎のこと<br>行ってみたかったんだよねー!",
    "シトリが仲間になった",
  ],
    null, () => data.flag.member_num < 4
  ).set("end", () => { data.flag.member_num = 4; scene_main.characters_data[3].p.x = 2160 }),

  new Event_Move(new vec(4220, 550), 710, () => S.balcony, "Right", se_metal),
])

S.balcony = new Stage("バルコニー", 810, {
  back: [new Iimage("images/bg_balcony_back.png", -135, 0, 1080, 720),],
  front: [new Iimage("images/bg_balcony_front.png", -135, 0, 1080, 720),],
}, [
  new Event_Move(new vec(200, 380), 4220, () => S.corridor_north_3, "Up", se_door),
  new Event_Move(new vec(710, 380), 4220, () => S.rooftop_north, "Up", se_metal),
], [], { _height: 550 })

S.craft_room = new Stage("技術室", 3240, {
  back: [
    new Iimage("images/bg_craft_room_0.png", 0, 0, 540, 720),
    new Iimage("images/bg_craft_room_1.png", 540, 0, 2160, 720),
    new Iimage("images/bg_craft_room_2.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(740, 550), 3920, () => S.corridor_north_0, "Up", se_door),
  new Event_Move(new vec(2520, 550), 2560, () => S.corridor_north_0, "Up", se_door),
])

S.laboratory = new Stage("理科室", 3240, {
  back: [
    new Iimage("images/bg_laboratory_0.png", 0, 0, 540, 720),
    new Iimage("images/bg_laboratory_1.png", 540, 0, 2160, 720),
    new Iimage("images/bg_laboratory_2.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(740, 550), 3920, () => S.corridor_north_1, "Up", se_door),
  new Event_Move(new vec(2520, 550), 2560, () => S.corridor_north_1, "Up", se_door),
])

S.cooking_room = new Stage("調理室", 3240, {
  back: [
    new Iimage("images/bg_cooking_room_0.png", 0, 0, 540, 720),
    new Iimage("images/bg_cooking_room_1.png", 540, 0, 2160, 720),
    new Iimage("images/bg_cooking_room_2.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Conversation(new vec(200, 550), 40, null, ["ほうちょう"], se_select),
  new Event_Move(new vec(740, 550), 3920, () => S.corridor_north_2, "Up", se_door),

  new Event_Move(new vec(2520, 550), 2560, () => S.corridor_north_2, "Up", se_door),
])

S.computer_room = new Stage("コンピュータ室", 2160, {
  back: [new Iimage("images/bg_computer_room_back.png", 0, 0, 2160, 720),],
  front: [new Iimage("images/bg_computer_room_front.png", 0, 0, 2160, 720),]
}, [
  new Event_Move(new vec(200, 550), 3650, () => S.corridor_north_3, "Up", se_door),
  new Event_Move(new vec(1920, 550), 2290, () => S.corridor_north_3, "Up", se_door),
])

//gym

S.passage_gym = new Stage("体育館前通路", 4860, {
  back: [
    new Iimage("images/bg_sign_pool.png", 0, 0, 540, 720),
    new Iimage("images/bg_passage_gym.png", 540, 0, 1080, 720),
    new Iimage("images/bg_passage_gym.png", 2700, 0, 1080, 720),
    new Iimage("images/bg_gap.png", 4050, 0, 540, 720),
    new Iimage("images/bg_sign_right.png", 4320, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(0, 550), 2060, () => S.pool_entrance, "Left", se_door),

  new Event_Move(new vec(1080, 550), 2700, () => S.gym, "Up", se_door),
  new Event_Move(new vec(3240, 550), 540, () => S.gym, "Up", se_door),

  new Event_Move(new vec(4320, 550), 0, () => S.gym_entrance, "Up", se_road),

  new Event_Move(new vec(4860, 550), 0, () => S.corridor_north_0, "Right", se_door),

])

S.gym = new Stage("体育館", 3240, {
  back: [
    new Iimage("images/bg_sign_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_door_0.png", 270, 0, 540, 720),
    new Iimage("images/bg_corridor_door_0.png", 2430, 0, 540, 720),
    new Iimage("images/bg_sign_right.png", 2700, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(0, 550), 540, () => S.gym_entrance, "Left", se_door),
  new Event_Move(new vec(540, 550), 3240, () => S.passage_gym, "Up", se_door),
  new Event_Move(new vec(2700, 550), 1080, () => S.passage_gym, "Up", se_door),
  new Event_Move(new vec(3240, 550), 0, () => S.gym_stage, "Right", se_door),
])

S.gym_stage = new Stage("壇上", 1080, {
  back: [new Iimage("images/bg_gym_stage_back.png", 0, 0, 1080, 720),],
  front: [new Iimage("images/bg_gym_stage_front.png", 0, 0, 1080, 720),],
}, [
  new Event_Move(new vec(0, 380), 3140, () => S.gym, "Left", se_door),
  new Event_Move(new vec(1080, 380), 0, () => S.gym_warehouse, "Right", se_door),
], [], { _height: 550 })

S.gym_warehouse = new Stage("体育館倉庫", 1080, {
  back: [new Iimage("images/bg_gym_warehouse.png", 0, 0, 1080, 720),]
}, [
  new Event_Move(new vec(0, 550), 1080, () => S.gym_stage, "Left", se_door),
], [], { lighting: "#00000080" })

S.gym_entrance = new Stage("体育館入口", 1080, {
  back: [new Iimage("images/bg_gym_entrance.png", 0, 0, 1080, 720),]
}, [
  new Event_Move(new vec(0, 550), 4320, () => S.passage_gym, "Left", se_road),
  new Event_Move(new vec(540, 550), 0, () => S.gym, "Up", se_door),
  new Event_Move(new vec(1080, 550), 0, () => S.corridor_locker_room, "Right", se_road),
])

S.corridor_locker_room = new Stage("更衣棟", 2160, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_locker_room.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 1620, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(0, 550), 1080, () => S.gym_entrance, "Left", se_road),

  new Event_Move(new vec(740, 550), 200, () => S.locker_room_0, "Up", se_road),
  new Event_Move(new vec(1440, 550), 900, () => S.locker_room_1, "Up", se_road),


  new Event_Move(new vec(2160, 550), 540, () => S.playground, "Right", se_road),
])

S.locker_room_0 = new Stage("女子更衣室", 1080, {}, [
  new Event_Move(new vec(0, 550), 740, () => S.corridor_locker_room, "Left", se_road),
])

S.locker_room_1 = new Stage("男子更衣室", 1080, {}, [
  new Event_Move(new vec(1080, 550), 1440, () => S.corridor_locker_room, "Right", se_road),
])

S.playground = new Stage("運動場", 6480, {}, [
  new Event_Move(new vec(540, 550), 2060, () => S.corridor_locker_room, "Up", se_road),
  new Event_Move(new vec(6480, 550), 0, () => S.old_school_back_entrance, "Right", se_road),
])

S.pool_entrance = new Stage("プール更衣室前", 2160, {
  back: [
    new Iimage("images/bg_corridor_exit_right.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_enter.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_pool_locker_room.png", 540, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(270, 550), 0, () => S.poolside, "Up", se_step),
  new Event_Move(new vec(760, 550), 1080, () => S.pool_locker_room_0, "Up", se_door),
  new Event_Move(new vec(1460, 550), 0, () => S.pool_locker_room_1, "Up", se_door),
  new Event_Move(new vec(2160, 550), 0, () => S.passage_gym, "Right", se_door),
])

S.pool_locker_room_0 = new Stage("女子プール更衣室", 1080, {
  back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(1080, 550), 760, () => S.pool_entrance, "Right", se_door)
], [], { gender: "f" })

S.pool_locker_room_1 = new Stage("男子プール更衣室", 1080, {
  back: [new Iimage("images/bg_pool_locker_room_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_pool_locker_room_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(0, 550), 1460, () => S.pool_entrance, "Left", se_door)
], [], { gender: "m" })

S.poolside = new Stage("プールサイド", 3240, {
  back: [
    new Iimage("images/bg_poolside.png", 0, 0, 540, 720),
    new Iimage("images/bg_poolside_parasol.png", 540, 0, 1080, 720),
    new Iimage("images/bg_poolside_parasol.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_poolside.png", 2700, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(0, 550), 270, () => S.pool_entrance, "Left", se_step),
  new Event_Move(new vec(3140, 550), 1350, () => S.entrance_teachers_locker_room, "Right", se_door),
])

S.entrance_teachers_locker_room = new Stage("教員用プール更衣室前", 1620, {
  back: [
    new Iimage("images/bg_corridor_pool_locker_room.png", 0, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1080, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(1350, 550), 3140, () => S.poolside, "Up", se_door, se_step),
  new Event_Move(new vec(200, 550), 1080, () => S.teachers_pool_locker_room_0, "Up", se_door),
  new Event_Move(new vec(900, 550), 0, () => S.teachers_pool_locker_room_1, "Up", se_door),
])

S.teachers_pool_locker_room_0 = new Stage("女性教員用プール更衣室", 1080, {
  back: [new Iimage("images/bg_teachers_locker_room.png", 0, 0, 1080, 720)]
}, [
  new Event_Conversation(new vec(150, 550), 40, null, ["『よびのみずぎ』をみつけた"], se_select, () => !data.item_flag.spare_swimsuit_0).set("end", () => { data.item_flag.aqua.spare_swimsuit_0 = true }),
  new Event_Conversation(new vec(150, 550), 40, null, ["ここにはもうなにもない"], se_select, () => !data.item_flag.spare_swimsuit_0),
  new Event_Move(new vec(1080, 550), 200, () => S.entrance_teachers_locker_room, "Right", se_door)
], [], { gender: "f" })

S.teachers_pool_locker_room_1 = new Stage("男性教員用プール更衣室", 1080, {
  back: [new Iimage("images/bg_teachers_locker_room.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(0, 550), 900, () => S.entrance_teachers_locker_room, "Left", se_door),
  new Event_Conversation(new vec(1080, 550), 40, null, ["『よびのみずぎ』をみつけた"], se_select, () => !data.item_flag.spare_swimsuit_1).set("end", () => { data.item_flag.aqua.spare_swimsuit_1 = true }),
  new Event_Conversation(new vec(1080, 550), 40, null, ["ここにはもうなにもない"], se_select, () => !data.item_flag.spare_swimsuit_1),
], [], { gender: "m" })

S.old_school_back_entrance = new Stage("旧小学校裏門", 4320, {}, [
  new Event_Move(new vec(0, 550), 6380, () => S.playground, "Left", se_road),
  new Event_Move(new vec(2160, 550), 3240, () => S.old_school_back_garden, "Up", se_road).set("start", () => { $.getScript("stages/stages_old_school.js") }),
], [])