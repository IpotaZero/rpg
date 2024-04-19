S = {}

//east

S.corridor_east_0 = new Stage("東棟0階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_0.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(0, 550), 1080, () => S.back_garden, "Left", se_door),

  new Event_Move(new vec(740, 550), 900, () => S.classroom_0, "Up", se_door),
  // new Event_Enemy(new vec(1040, 550), 40, null, E.after_school_polyturner),
  new Event_Move(new vec(1440, 550), 200, () => S.classroom_0, "Up", se_door),

  new Event_Switch(new vec(1910, 550), 40, [
    new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"], se_select),
    new Event_Move(null, 1890, () => S.corridor_west_0, "Up", se_step)
  ], () => data.flag.member_num >= 2 ? 1 : 0),

  new Event_Move(new vec(2360, 550), 1980, () => health_room, "Up", se_door),

  new Event_Move(new vec(3500, 550), 900, () => S.warehouse_under_stairs_east, "Up", se_door),

  new Event_Switch(new vec(4040, 550), 40, [
    new Event_Conversation(null, null, null, ["だめ、プリンに会わなきゃ"], se_select),
    new Event_Move(null, 3500, () => S.corridor_east_1, "Up", se_step),
  ], () => data.flag.member_num >= 2 ? 1 : 0),

  new Event_Move(new vec(4860, 550), 0, () => S.passage_0, "Right", se_door)
])

S.corridor_east_1 = new Stage("東棟1階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(1910, 550), 1890, () => S.corridor_west_1, "Up", se_step),

  new Event_Move(new vec(3500, 550), 4040, () => S.corridor_east_0, "Up", se_step),
  new Event_Move(new vec(4040, 550), 3500, () => S.corridor_east_2, "Up", se_step),

  new Event_Move(new vec(4860, 550), 0, () => S.passage_1, "Right", se_door)
])

S.corridor_east_2 = new Stage("東棟2階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(1910, 550), 1890, () => S.corridor_west_2, "Up", se_step),

  new Event_Move(new vec(3500, 550), 4040, () => S.corridor_east_1, "Up", se_step),
  new Event_Move(new vec(4040, 550), 3500, () => S.corridor_east_3, "Up", se_step),

  new Event_Move(new vec(4860, 550), 0, () => S.passage_2, "Right", se_door)
])

S.corridor_east_3 = new Stage("東棟3階廊下", 4860, {
  back: [
    new Iimage("images/bg_corridor_classroom.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_stairs_1.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_exit_right.png", 4320, 0, 540, 720)
  ]
}, [
  new Event_Move(new vec(1910, 550), 1890, () => S.corridor_west_3, "Up", se_step),

  new Event_Move(new vec(3500, 550), 3500, () => S.corridor_east_2, "Up", se_step),
  new Event_Move(new vec(4040, 550), 3780, () => S.rooftop_east, "Up", se_step),

  new Event_Move(new vec(4860, 550), 0, () => S.passage_3, "Right", se_door)
])

S.rooftop_east = new Stage("東棟屋上", 4320, {
  back: [
    new Iimage("images/bg_rooftop.png", 0, 0, 1080 * 3, 720, { repeat_x: 3 }),
    new Iimage("images/bg_rooftop_door.png", 3240, 0, 1080, 720),
  ]
}, [
  new Event_Move(new vec(3780, 550), 4040, () => S.corridor_east_3, "Up", se_door),
])

S.back_garden = new Stage("裏庭", 1080, {}, [
  new Event_Move(new vec(1080, 550), 0, () => S.corridor_east_0, "Right", se_door),
])

S.classroom_0 = new Stage("0年生教室", 1080,
  {
    back: [new Iimage("images/bg_classroom_0_back.png", 0, 0, 1080, 720)],
    front: [new Iimage("images/bg_classroom_0_front.png", 0, 0, 1080, 720)]
  },
  [
    new Event_Move(new vec(200, 550), 1440, () => S.corridor_east_0, "Up", se_door),
    new Event_Move(new vec(900, 550), 740, () => S.corridor_east_0, "Up", se_door),
  ], []
)

S.warehouse_under_stairs_east = new Stage("東棟階段下倉庫", 1080, {
  back: [new Iimage("images/bg_warehouse.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(900, 550), 3500, () => S.corridor_east_0, "Up", se_door),
], [], { lighting: "#00000080" })

//west

S.corridor_west_0 = new Stage("西棟0階廊下", 6480, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_stairs_0.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_principal.png", 4320, 0, 540, 720),
    new Iimage("images/bg_corridor_kitchen.png", 4860, 0, 1080, 720),
    new Iimage("images/bg_corridor_elevator_0.png", 5940, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(0, 550), 0, () => S.main_entrance, "Left", se_door),

  new Event_Move(new vec(1350, 550), 810, () => S.corridor_west_1, "Up", se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.corridor_east_0, "Up", se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.toilet_west_0_0, "Up", se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["アクアが写っている"], se_select),
  new Event_Move(new vec(3040, 550), 1000, () => S.toilet_west_0_1, "Up", se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.office, "Up", se_door),
  new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板", "アクアの予定:......", "そうじ"], se_select),
  new Event_Move(new vec(4160, 550), 200, () => S.office, "Up", se_door),

  new Event_Move(new vec(4580, 550), 1000, () => S.principal, "Up", se_door),

  new Event_Move(new vec(5060, 550), 2060, () => S.kitchen, "Up", se_door),
  new Event_Conversation(new vec(5410, 550), 40, null, ["給食の献立が書いてある", "明日の料理は......グラタンだ！"], se_select),
  new Event_Move(new vec(5760, 550), 200, () => S.kitchen, "Up", se_door),

  new Event_Move(new vec(6210, 550), 270, () => S.elevator, "Up", se_elevator)
], [
  () => E.after_school_polyturner
])

S.corridor_west_1 = new Stage("西棟1階廊下", 6480, {
  back: [
    new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_office.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_broadcast_studio.png", 4320, 0, 540, 720),
    new Iimage("images/bg_corridor_library_room.png", 4860, 0, 1080, 720),
    new Iimage("images/bg_corridor_elevator_1.png", 5940, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1350, () => S.corridor_west_0, "Up", se_step),
  new Event_Move(new vec(1350, 550), 810, () => S.corridor_west_2, "Up", se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.corridor_east_1, "Up", se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.toilet_west_1_0, "Up", se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["アクアが写っている"], se_select),
  new Event_Move(new vec(3040, 550), 1000, () => S.toilet_west_1_1, "Up", se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.paper_work_office, "Up", se_door),
  new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"], se_select),
  new Event_Conversation(new vec(4160, 550), 40, null, ["奥に何かあって開かない"], se_select),

  new Event_Move(new vec(4580, 550), 1000, () => S.broadcast_studio, "Up", se_door),

  new Event_Move(new vec(5060, 550), 2060, () => S.library_room, "Up", se_door),
  // new Event_Conversation(new vec(5410, 550), 40, null, ["給食の献立が書いてある", "明日の料理は......グラタンだ！"]),
  new Event_Move(new vec(5760, 550), 200, () => S.library_room, "Up", se_door),

  new Event_Move(new vec(6210, 550), 270, () => S.elevator, "Up", se_elevator)
])

S.corridor_west_2 = new Stage("西棟2階廊下", 6480, {
  back: [
    new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_audio_visual_room.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_door_1.png", 4320, 0, 540, 720),
    new Iimage("images/bg_corridor_music_room.png", 4860, 0, 1080, 720),
    new Iimage("images/bg_corridor_elevator_1.png", 5940, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1350, () => S.corridor_west_1, "Up", se_step),
  new Event_Move(new vec(1350, 550), 810, () => S.corridor_west_3, "Up", se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.corridor_east_2, "Up", se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.toilet_west_2_0, "Up", se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["アクアが写っている"], se_select),
  new Event_Move(new vec(3040, 550), 1000, () => S.toilet_west_2_1, "Up", se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.audio_visual_room, "Up", se_door),
  // new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
  new Event_Move(new vec(4160, 550), 200, () => S.audio_visual_room, "Up", se_door),

  new Event_Switch(new vec(4580, 550), 40, [
    new Event_Conversation(null, null, null, ["鍵がかかっている"], se_select),
    new Event_Move(null, 1000, () => S.security_office, "Up", se_door),
  ], () => data.flag.member_num >= 3 ? 1 : 0),

  new Event_Move(new vec(5060, 550), 2060, () => S.music_room, "Up", se_door),
  // new Event_Conversation(new vec(5410, 550), 40, null, ["給食の献立が書いてある", "明日の料理は......グラタンだ！"]),
  new Event_Move(new vec(5760, 550), 200, () => S.music_room, "Up", se_door),

  new Event_Move(new vec(6210, 550), 270, () => S.elevator, "Up", se_elevator)
])

S.corridor_west_3 = new Stage("西棟3階廊下", 6480, {
  back: [
    new Iimage("images/bg_corridor_stairs_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_corridor_enter.png", 1620, 0, 540, 720),
    new Iimage("images/bg_corridor_toilet.png", 2160, 0, 1080, 720),
    new Iimage("images/bg_corridor_sewing_room.png", 3240, 0, 1080, 720),
    new Iimage("images/bg_corridor_machine_room.png", 4320, 0, 540, 720),
    new Iimage("images/bg_corridor_art_room.png", 4860, 0, 1080, 720),
    new Iimage("images/bg_corridor_elevator_2.png", 5940, 0, 540, 720),
  ]
}, [
  new Event_Move(new vec(810, 550), 1350, () => S.corridor_west_2, "Up", se_step),
  new Event_Move(new vec(1350, 550), 540, () => S.rooftop_west, "Up", se_step),

  new Event_Move(new vec(1890, 550), 1910, () => S.corridor_east_3, "Up", se_step),

  new Event_Move(new vec(2340, 550), 1000, () => S.toilet_west_3_0, "Up", se_step),
  new Event_Conversation(new vec(2690, 550), 40, null, ["アクアが写っている"], se_select),
  new Event_Move(new vec(3040, 550), 1000, () => S.toilet_west_3_1, "Up", se_step),

  new Event_Move(new vec(3460, 550), 900, () => S.sewing_room, "Up", se_door),
  // new Event_Conversation(new vec(3850, 550), 40, null, ["掲示板"]),
  new Event_Move(new vec(4160, 550), 200, () => S.sewing_room, "Up", se_door),

  new Event_Move(new vec(4580, 550), 1000, () => S.machine_room, "Up", se_door),

  new Event_Move(new vec(5060, 550), 2060, () => S.art_room, "Up", se_door),
  // new Event_Conversation(new vec(5410, 550), 40, null, ["給食の献立が書いてある", "明日の料理は......グラタンだ！"]),
  new Event_Move(new vec(5760, 550), 200, () => S.art_room, "Up", se_door),

  new Event_Move(new vec(6210, 550), 270, () => S.elevator, "Up", se_elevator)
])

S.rooftop_west = new Stage("西棟屋上", 6480, {
  back: [
    new Iimage("images/bg_rooftop_door.png", 0, 0, 1080, 720),
    new Iimage("images/bg_rooftop.png", 1080, 0, 1080 * 6, 720, { repeat_x: 6 }),

  ]
}, [
  new Event_Move(new vec(540, 550), 1350, () => S.corridor_west_3, "Up", se_door),
])

S.elevator = new Stage("エレベーター", 540, {
  back: [new Iimage("images/bg_elevator.png", -270, 0, 1080, 720)]
}, [
  new Event_Command(new vec(270, 550), 40, null, new Icommand({ "": new Icommand.option(35, 135, ["0階", "1階", "2階", "3階"]) }, {
    "": (me) => { Itext(null, 35, 80, "何階に行く？") },
    ".": (me) => { new Event_Move(null, 6210, () => S["corridor_west_" + me.current_branch[0]], null, se_elevator_door).element() }
  }))
])

S.main_entrance = new Stage("正門", 1080, {
  back: [new Iimage("images/bg_main_entrance.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(0, 550), 0, () => S.corridor_west_0, "Left", se_door),
  new Event_Conversation(new vec(540, 550), 40, null, ["だめ"], se_select),
])

S.toilet_west_0_0 = new Stage("西棟0階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(1080, 550), 2340, () => S.corridor_west_0, "Right", se_step)], [], { gender: "f" })
S.toilet_west_0_1 = new Stage("西棟0階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(1080, 550), 3040, () => S.corridor_west_0, "Right", se_step)], [], { gender: "m" })

S.toilet_west_1_0 = new Stage("西棟1階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(1080, 550), 2340, () => S.corridor_west_1, "Right", se_step)], [], { gender: "f" })
S.toilet_west_1_1 = new Stage("西棟1階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(1080, 550), 3040, () => S.corridor_west_1, "Right", se_step)], [], { gender: "m" })

S.toilet_west_2_0 = new Stage("西棟2階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [
  new Event_Move(new vec(1080, 550), 2340, () => S.corridor_west_2, "Right", se_step),
  new Event_Switch(new vec(160, 550), 40, [
    new Event_Conversation(new vec(160, 550), 40, null, ["何かの気配を感じる......"], se_select),
    new Event_Conversation(new vec(160, 550), 40, null, ["シトリ: はーなーこさんっあーそびーましょー！", "???: いいよー！", "???: じゃあ首絞めごっこで遊ぼうか！"])
  ], () => data.flag.member_num == 4 ? 1 : 0)
], [], { gender: "f" })

S.toilet_west_2_1 = new Stage("西棟2階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(1080, 550), 3040, () => S.corridor_west_2, "Right", se_step)], [], { gender: "m" })

S.toilet_west_3_0 = new Stage("西棟3階女子トイレ", 1080, { back: [new Iimage("images/bg_toilet_0.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(1080, 550), 2340, () => S.corridor_west_2, "Right", se_step)], [], { gender: "f" })
S.toilet_west_3_1 = new Stage("西棟3階男子トイレ", 1080, { back: [new Iimage("images/bg_toilet_1.png", 0, 0, 1080, 720)] }, [new Event_Move(new vec(1080, 550), 3040, () => S.corridor_west_2, "Right", se_step)], [], { gender: "m" })

S.office = new Stage("職員室", 1080, {
  back: [new Iimage("images/bg_office_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_office_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(200, 550), 4160, () => S.corridor_west_0, "Up", se_door),
  new Event_Move(new vec(900, 550), 3460, () => S.corridor_west_0, "Up", se_door)
])

S.principal = new Stage("校長室", 1080, {
  back: [new Iimage("images/bg_principal_back.png", 0, 0, 1080, 720)],
}, [
  new Event_Conversation(new vec(270, 550), 40, null, ["校長: 何故働いているか分からない、と？", "校長: 君たちはアンドロイドですからねえ<br>その問いは存在理由に近いのではないでしょうか？"]),
  new Event_Move(new vec(1080, 550), 4580, () => S.corridor_west_0, "Right", se_door)
])

S.kitchen = new Stage("給食室", 2160, {
  back: [new Iimage("images/bg_kitchen_back.png", 0, 0, 2160, 720)],
  front: [new Iimage("images/bg_kitchen_front.png", 0, 0, 2160, 720)]
}, [
  new Event_Move(new vec(200, 550), 5760, () => S.corridor_west_0, "Up", se_door),
  new Event_Conversation(new vec(1080, 550), 40, null, ["料理長: ああああ！！！", "料理長: 調理場に私服で入ってくるんじゃあない！せめて髪をくくりやがれ！"]),
  new Event_Move(new vec(1980, 550), 5060, () => S.corridor_west_0, "Up", se_door),
])

S.paper_work_office = new Stage("事務室", 1080, {
  back: [new Iimage("images/bg_paper_work_office.png", 0, 0, 1080, 720)],
}, [
  new Event_Conversation(new vec(540, 550), 40, null, ["事務員: 仕事が終わらないぃ～～！！", "事務員: 見てよこのパソコン！<br>君のOSの10世代は前だよ！"]),
  new Event_Move(new vec(900, 550), 3460, () => S.corridor_west_1, "Up", se_door)
])

S.broadcast_studio = new Stage("放送室", 1080, {
  back: [new Iimage("images/bg_broadcast_studio_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_broadcast_studio_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(1080, 550), 4580, () => S.corridor_west_1, "Right", se_door)
])

S.library_room = new Stage("図書室", 2160, {
  back: [new Iimage("images/bg_library_room_back.png", 0, 0, 2160, 720)],
  front: [new Iimage("images/bg_library_room_front.png", 0, 0, 2160, 720)]
}, [
  new Event_Move(new vec(200, 550), 5760, () => S.corridor_west_1, "Up", se_door),
  new Event_Conversation(new vec(1080, 550), 40, null, ["本好きの少女: 私ファンタジーが好きなんです<br>特に世界観が緻密なものが", "本好きの少女: 自分の生活を忘れられるからでしょうか"]),
  new Event_Move(new vec(1980, 550), 5060, () => S.corridor_west_1, "Up", se_door),
])

S.audio_visual_room = new Stage("視聴覚室", 1080, {
  back: [new Iimage("images/bg_audio_visual_room_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_audio_visual_room_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(200, 550), 4160, () => S.corridor_west_2, "Up", se_door),
  new Event_Move(new vec(900, 550), 3460, () => S.corridor_west_2, "Up", se_door)
], [], { lighting: "#00000080" })

S.security_office = new Stage("守衛控え室", 1080, {
  back: [new Iimage("images/bg_security_office.png", 0, 0, 1080, 720)]
}, [
  new Event_Switch(new vec(540, 580), 40, [
    new Event_Conversation(new vec(540, 580), 40, null, ["力強さ"], se_select),
    new Event_Conversation(new vec(540, 580), 40, new Iimage("images/ch_ammon_right.png", 0, 0, 380, 380),
      [
        "アモン: あー、なんだ<br>俺はもう今日の仕事は終わったと思ってたんだが",
        "プリン: おっイケメン発見",
        "アモン: ......何か用かい？",
        "アモン: ......なんで働いてるかって？<br>そうだな、子供たちの笑顔を守りたい、とか？",
        "アモン: 実際なんで働いてるかなんてわかんねえよ<br>俺が知りたいくらいさ",
        "プリン: じゃあさ、一緒に探しに行こうよ！",
        "アモン: ......まあ悪くないかもな<br>いいぜ！ついて行ってやろうじゃないか！",
        "アモンが仲間になった",
        "アモン: そうだ、俺予備のカギ持ってるから北棟とかにも行けるぞ"
      ]
    ).set("end", () => { data.flag.member_num = 3; scene_main.characters_data[2].p.x = 540 }),

  ], () => data.flag.member_num < 3 ? 1 : 0),
  new Event_Move(new vec(1080, 550), 4580, () => S.corridor_west_2, "Right", se_door)
])

S.music_room = new Stage("音楽室", 2160, {
  back: [new Iimage("images/bg_music_room.png", 0, 0, 2160, 720)],
}, [
  new Event_Move(new vec(200, 550), 5760, () => S.corridor_west_2, "Up", se_door),
  new Event_Conversation(new vec(810, 550), 40, null, ["オルガン"], se_select),
  new Event_Move(new vec(1980, 550), 5060, () => S.corridor_west_2, "Up", se_door),
])

S.sewing_room = new Stage("被服室", 1080, {
  back: [new Iimage("images/bg_sewing_room.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(200, 550), 4160, () => S.corridor_west_3, "Up", se_door),
  new Event_Conversation(new vec(670, 550), 40, null, ["首のないマネキン"], se_select),
  new Event_Move(new vec(900, 550), 3460, () => S.corridor_west_3, "Up", se_door)
])

S.machine_room = new Stage("機械室", 1080, {
  back: [new Iimage("images/bg_machine_room_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_machine_room_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Chain(new vec(270, 550), 40, null, [
    new Event_Conversation(null, null, null, ["！", "床に穴が開いている！"], se_select),
    new Event_Move(null, 270, () => S.security_office, null, se_fall),
    new Event_Conversation(null, null, null, ["ドシーン！"]),
  ]),

  new Event_Move(new vec(1080, 550), 4580, () => S.corridor_west_3, "Right", se_door)
], [], { lighting: "#00000080" })

S.art_room = new Stage("美術室", 2160, {
  back: [new Iimage("images/bg_art_room.png", 0, 0, 2160, 720)],
}, [
  new Event_Move(new vec(200, 550), 5760, () => S.corridor_west_3, "Up", se_door),
  new Event_Conversation(new vec(540, 550), 40, null, ["誰かのデッサン"], se_select),
  new Event_Conversation(new vec(810, 550), 40, null, ["3次元的色観図"], se_select),
  new Event_Conversation(new vec(1080, 550), 40, null, ["りんごの木"], se_select),
  new Event_Conversation(new vec(1620, 550), 40, null, ["壁に描かれた机の絵"], se_select),
  new Event_Move(new vec(1980, 550), 5060, () => S.corridor_west_3, "Up", se_door),
])

S.passage_0 = new Stage("0階渡り廊下", 1080, {
  back: [new Iimage("images/bg_passage_0_back.png", 0, 0, 1080, 720)],
  front: [new Iimage("images/bg_passage_0_front.png", 0, 0, 1080, 720)]
}, [
  new Event_Move(new vec(0, 550), 4740, () => S.corridor_east_0, "Left", se_door),
  new Event_Switch(new vec(1080, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないので", "ぴーんぽーんぱーんぽーん", "先生方へ連絡です<br>北棟のカギをお持ちの方は職員室までご返却お願いします", "ぴーんぽーんぱーんぽーん"], se_select),
    new Event_Move(null, 810, () => S.corridor_north_0, "Right", se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])

S.passage_1 = new Stage("1階渡り廊下", 1080, {
  front: [new Iimage("images/bg_passage_1.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(0, 550), 4740, () => S.corridor_east_1, "Left", se_door),
  new Event_Switch(new vec(1080, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないので"], se_select),
    new Event_Move(null, 810, () => S.corridor_north_1, "Right", se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])

S.passage_2 = new Stage("2階渡り廊下", 1080, {
  front: [new Iimage("images/bg_passage_1.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(0, 550), 4740, () => S.corridor_east_2, "Left", se_door),
  new Event_Switch(new vec(1080, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないので"], se_select),
    new Event_Move(null, 810, () => S.corridor_north_2, "Right", se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])

S.passage_3 = new Stage("3階渡り廊下", 1080, {
  back: [new Iimage("images/bg_passage_2.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(0, 550), 4740, () => S.corridor_east_3, "Left", se_door),
  new Event_Switch(new vec(1080, 550), 40, [
    new Event_Conversation(null, null, null, ["むり、鍵がないので"], se_select),
    new Event_Move(null, 810, () => S.corridor_north_3, "Right", se_door).set("start", () => { $.getScript("stages_north.js") })
  ], () => data.flag.member_num >= 3 ? 1 : 0),
])