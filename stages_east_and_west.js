S = {}

//east

S.stage_corridor_east_0 = new Stage("東棟0階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_0.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(100, 550), 980, () => S.stage_back_garden, se_door),

  new Event_Move(new vec(740, 550), 900, () => S.stage_classroom_0, se_door),
  new Event_Enemy(new vec(1040, 550), 40, null),
  new Event_Move(new vec(1440, 550), 200, () => S.stage_classroom_0, se_door),

  new Event_Switch(new vec(1910, 550), 40, [
    new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"]),
    new Event_Move(null, 1890, () => S.stage_corridor_west_0, se_step)
  ], () => data.flag.member_num >= 2 ? 1 : 0),

  new Event_Move(new vec(2360, 550), 1980, () => S.stage_health_room, se_door),

  new Event_Move(new vec(3500, 550), 900, () => S.stage_warehouse_under_stairs_east, se_door),

  new Event_Switch(new vec(4040, 550), 40, [
    new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"]),
    new Event_Move(null, 3500, () => S.stage_corridor_east_1, se_step),
  ], () => data.flag.member_num >= 2 ? 1 : 0),

  new Event_Move(new vec(4740, 550), 100, () => S.stage_passage_0, se_door)
])

S.stage_corridor_east_1 = new Stage("東棟1階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(1910, 550), 1890, () => S.stage_corridor_west_1, se_step),

  new Event_Move(new vec(3500, 550), 4040, () => S.stage_corridor_east_0, se_step),
  new Event_Move(new vec(4040, 550), 3500, () => S.stage_corridor_east_2, se_step),

  new Event_Move(new vec(4740, 550), 100, () => S.stage_passage_1, se_door)
])

S.stage_corridor_east_2 = new Stage("東棟2階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(1910, 550), 1890, () => S.stage_corridor_west_2, se_step),

  new Event_Move(new vec(3500, 550), 4040, () => S.stage_corridor_east_1, se_step),
  new Event_Move(new vec(4040, 550), 3500, () => S.stage_corridor_east_3, se_step),

  new Event_Move(new vec(4740, 550), 100, () => S.stage_passage_2, se_door)
])

S.stage_corridor_east_3 = new Stage("東棟3階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(1910, 550), 1890, () => S.stage_corridor_west_3, se_step),

  new Event_Move(new vec(3500, 550), 3500, () => S.stage_corridor_east_2, se_step),
  new Event_Move(new vec(4040, 550), 3780, () => S.stage_rooftop_east, se_step),

  new Event_Move(new vec(4740, 550), 100, () => S.stage_passage_3, se_door)
])

S.stage_rooftop_east = new Stage("東棟屋上", 4320, {
  back: [
    new Iimage("images/bg_rooftop.png", 0, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_rooftop_door.png", 3240, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(3780, 550), 4040, () => S.stage_corridor_east_3, se_door),
])

S.stage_back_garden = new Stage("裏庭", 1080, {}, [
  new Event_Move(new vec(980, 550), 100, () => S.stage_corridor_east_0, se_door),
])

S.stage_classroom_0 = new Stage("0年生教室", 1080,
  {
    back: [new Iimage("images/bg_classroom_0_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_classroom_0_front.png", 0, 0, 1080, 720)]
  },
  [
    new Event_Move(new vec(200, 550), 1440, () => S.stage_corridor_east_0, se_door),
    new Event_Move(new vec(900, 550), 740, () => S.stage_corridor_east_0, se_door),
  ]
)

S.stage_health_room = new Stage("保健室", 2160, {
  back: [
    new Iimage("images/bg_health_room_0.png", 0, 0, 1080, 720),
    new Iimage("images/bg_health_room_1_back.png", 1080, 0, 1080, 720)
  ],
  front: [new Iimage("images/bg_health_room_1_front.png", 1080, 0, 1080, 720)]
}, [
  // new Event_Move(new vec(270, 550), 270, () => S.stage_m_health_room).set("end", () => { back_paper = back_paper_1 }),
  new Event_Move(new vec(1980, 550), 2360, () => S.stage_corridor_east_0, se_door),

  new Event_Switch(new vec(1430, 580), 100, [
    new Event_Conversation(null, null, new Iimage("images/ch_purine_right.png", 0, 0, 380, 380),
      ["プリン: あら、アクア どうしたの？", "プリン: なんでお仕事してるか分からなくなったって？", "プリン: ......そういえばあたしも何でお仕事してるんだっけ？", "プリン: 今日はもう上がっていろんな人と話してみたら？", "プリン: あたしもついていくわ！", "プリンが仲間になった"]
    ).set("end", () => { data.task = "いろんな人とはなす"; data.flag.member_num = 2 }),
    new Event_Conversation(null, null, null, ["やさしさ"]),
  ], () => data.flag.member_num >= 2 ? 1 : 0),


])

S.stage_warehouse_under_stairs_east = new Stage("東棟階段下倉庫", 1080, {
  back: [new Iimage("images/bg_warehouse.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(900, 550), 3500, () => S.stage_corridor_east_0, se_door),
])

//west

S.stage_corridor_west_0 = new Stage("西棟0階廊下", 5940, {
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
  new Event_Move(new vec(100, 550), 100, () => S.stage_main_entrance, se_door),

  new Event_Move(new vec(1350, 550), 810, () => S.stage_corridor_west_1, se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.stage_corridor_east_0, se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.stage_toilet_west_0_0, se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
  new Event_Move(new vec(3040, 550), 1000, () => S.stage_toilet_west_0_1, se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.stage_office, se_door),
  new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板", "アクアの予定:......", "そうじ"]),
  new Event_Move(new vec(4160, 550), 200, () => S.stage_office, se_door),

  new Event_Move(new vec(4580, 550), 1000, () => S.stage_principal, se_door),

  new Event_Move(new vec(5060, 550), 2060, () => S.stage_kitchen, se_door),
  new Event_Conversation(new vec(5410, 550), 40, null, ["給食の献立が書いてある", "明日の料理は......グラタンだ！"]),
  new Event_Move(new vec(5760, 550), 200, () => S.stage_kitchen, se_door),
])

S.stage_corridor_west_1 = new Stage("西棟1階廊下", 5940, {
  back: [
    new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
    new Iimage("images/bg_corridor_classroom.png", 4860, 0, 1080, 720)
  ]
}, [
  new Event_Move(new vec(810, 550), 1350, () => S.stage_corridor_west_0, se_step),
  new Event_Move(new vec(1350, 550), 810, () => S.stage_corridor_west_2, se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.stage_corridor_east_1, se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.stage_toilet_west_1_0, se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
  new Event_Move(new vec(3040, 550), 1000, () => S.stage_toilet_west_1_1, se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.stage_paper_work_office, se_door),
  new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
  new Event_Conversation(new vec(4160, 550), 40, null, ["奥に何かあって開かない"]),

  // new Event_Move(new vec(4580, 550), 1000, () => S.stage_principal, se_door),

  new Event_Move(new vec(5060, 550), 2060, () => S.stage_library_room, se_door),
  // new Event_Conversation(new vec(5410, 550), 40, null, ["給食の献立が書いてある", "明日の料理は......グラタンだ！"]),
  new Event_Move(new vec(5760, 550), 200, () => S.stage_library_room, se_door),

])

S.stage_corridor_west_2 = new Stage("西棟2階廊下", 5940, {
  back: [
    new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
    new Iimage("images/bg_corridor_classroom.png", 4860, 0, 1080, 720)
  ]
}, [
  new Event_Move(new vec(810, 550), 1350, () => S.stage_corridor_west_1, se_step),
  new Event_Move(new vec(1350, 550), 810, () => S.stage_corridor_west_3, se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.stage_corridor_east_2, se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.stage_toilet_west_2_0, se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
  new Event_Move(new vec(3040, 550), 1000, () => S.stage_toilet_west_2_1, se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.stage_office, se_door),
  new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
  new Event_Move(new vec(4160, 550), 200, () => S.stage_office, se_door),

  new Event_Move(new vec(4580, 550), 1000, () => S.stage_principal, se_door),

])

S.stage_corridor_west_3 = new Stage("西棟3階廊下", 5940, {
  back: [
    new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
    new Iimage("images/bg_corridor_classroom.png", 4860, 0, 1080, 720)
  ]
}, [
  new Event_Move(new vec(810, 550), 1350, () => S.stage_corridor_west_2, se_step),
  new Event_Move(new vec(1350, 550), 810, () => S.stage_rooftop_west, se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.stage_corridor_east_3, se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.stage_toilet_west_3_0, se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["自分が写っている"]),
  new Event_Move(new vec(3040, 550), 1000, () => S.stage_toilet_west_3_1, se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.stage_office, se_door),
  new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
  new Event_Move(new vec(4160, 550), 200, () => S.stage_office, se_door),

  new Event_Move(new vec(4580, 550), 1000, () => S.stage_principal, se_door),

])

S.stage_rooftop_west = new Stage("西棟屋上", 5940, {
  back: [
    new Iimage("images/bg_rooftop_door.png", 0, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 1080, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 4320, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 5400, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(540, 550), 1350, () => S.stage_corridor_west_3, se_door),
])

S.stage_main_entrance = new Stage("正門", 1080, {
  back: [new Iimage("images/bg_main_entrance.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(100, 550), 100, () => S.stage_corridor_west_0, se_door),
  new Event_Conversation(new vec(540, 550), 40, null, ["だめ"]),
])

S.stage_toilet_west_0_0 = new Stage("西棟0階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 2340, () => S.stage_corridor_west_0, se_step)], { gender: "f" })
S.stage_toilet_west_0_1 = new Stage("西棟0階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => S.stage_corridor_west_0, se_step)], { gender: "m" })

S.stage_toilet_west_1_0 = new Stage("西棟1階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 2340, () => S.stage_corridor_west_1, se_step)], { gender: "f" })
S.stage_toilet_west_1_1 = new Stage("西棟1階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => S.stage_corridor_west_1, se_step)], { gender: "m" })

S.stage_toilet_west_2_0 = new Stage("西棟2階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [
  new Event_Move(new vec(900, 550), 2340, () => S.stage_corridor_west_2, se_step),
  new Event_Switch(new vec(160, 550), 40, [
    new Event_Conversation(new vec(160, 550), 40, null, ["何かの気配を感じる......"]),
    new Event_Conversation(new vec(160, 550), 40, null, ["シトリ: はーなーこさんっあーそびーましょー！", "???: いいよー！", "シトリ: えっ", "???: じゃあ首絞めごっこで遊ぼうか！"])
  ], () => data.flag.member_num == 4 ? 1 : 0)
], { gender: "f" })

S.stage_toilet_west_2_1 = new Stage("西棟2階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => S.stage_corridor_west_2, se_step)], { gender: "m" })

S.stage_toilet_west_3_0 = new Stage("西棟3階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 2340, () => S.stage_corridor_west_2, se_step)], { gender: "f" })
S.stage_toilet_west_3_1 = new Stage("西棟3階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(900, 550), 3040, () => S.stage_corridor_west_2, se_step)], { gender: "m" })

S.stage_office = new Stage("職員室", 1080, {
  back: [new Iimage("images/bg_office_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_office_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(200, 550), 4160, () => S.stage_corridor_west_0, se_door),
  new Event_Move(new vec(900, 550), 3460, () => S.stage_corridor_west_0, se_door)
])

S.stage_principal = new Stage("校長室", 1080, {
  back: [new Iimage("images/bg_principal_back.png", 0, 0, 1080, 720)],
}, [
  new Event_Conversation(new vec(270, 550), 40, null, ["校長: 何故働いているか分からない、と？", "校長: 君たちはアンドロイドですからねえ<br>その問いは存在理由に近いのではないでしょうか？"]),
  new Event_Move(new vec(1000, 550), 4580, () => S.stage_corridor_west_0, se_door)
])

S.stage_kitchen = new Stage("給食室", 2160, {
  back: [new Iimage("images/bg_kitchen_back.png", 0, 0, 2160, 720)],
  front: [new Iimage("images/bg_kitchen_front.png", 0, 0, 2160, 720)]
}, [
  new Event_Move(new vec(200, 550), 5760, () => S.stage_corridor_west_0, se_door),
  new Event_Conversation(new vec(980, 550), 40, null, ["料理長: ああああ！！！", "料理長: 調理場に私服で入ってくるんじゃあない！せめて髪をくくりやがれ！"]),
  new Event_Move(new vec(1980, 550), 5060, () => S.stage_corridor_west_0, se_door),
])

S.stage_paper_work_office = new Stage("事務室", 1080, {
  back: [new Iimage("images/bg_paper_work_office.png", 0, 0, 1080, 720)],
}, [
  new Event_Conversation(new vec(540, 550), 40, null, ["事務員: 仕事が終わらないぃ～～！！", "事務員: 見てよこのパソコン！<br>君のOSの10世代は前だよ！"]),
  new Event_Move(new vec(900, 550), 3460, () => S.stage_corridor_west_1, se_door)
])

S.stage_library_room = new Stage("図書室", 2160, {
  back: [new Iimage("images/bg_library_room_back.png", 0, 0, 2160, 720)],
  front: [new Iimage("images/bg_library_room_front.png", 0, 0, 2160, 720)]
}, [
  new Event_Move(new vec(200, 550), 5760, () => S.stage_corridor_west_1, se_door),
  new Event_Conversation(new vec(980, 550), 40, null, ["本好きの少女: 私、ファンタジーが好きなんです<br>特に世界観が緻密なものが", "本好きの少女: 自分の生活を忘れられるからでしょうか"]),
  new Event_Move(new vec(1980, 550), 5060, () => S.stage_corridor_west_1, se_door),
])



S.stage_passage_0 = new Stage("0階渡り廊下", 1080, {
  back: [new Iimage("images/bg_passage_0_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_passage_0_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(100, 550), 4740, () => S.stage_corridor_east_0, se_door),
  new Event_Switch(new vec(980, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
    new Event_Move(null, 810, () => S.stage_corridor_north_0, se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])

S.stage_passage_1 = new Stage("1階渡り廊下", 1080, {
  front: [new Iimage("images/bg_passage_1.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(100, 550), 4740, () => S.stage_corridor_east_1, se_door),
  new Event_Switch(new vec(980, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
    new Event_Move(null, 810, () => S.stage_corridor_north_1, se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])

S.stage_passage_2 = new Stage("2階渡り廊下", 1080, {
  front: [new Iimage("images/bg_passage_1.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(100, 550), 4740, () => S.stage_corridor_east_2, se_door),
  new Event_Switch(new vec(980, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
    new Event_Move(null, 810, () => S.stage_corridor_north_2, se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])

S.stage_passage_3 = new Stage("3階渡り廊下", 1080, {
  back: [new Iimage("images/bg_passage_2.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(100, 550), 4740, () => S.stage_corridor_east_3, se_door),
  new Event_Switch(new vec(980, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないよ"]),
    new Event_Move(null, 810, () => S.stage_corridor_north_3, se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])
