S = {}

S.old_school_back_garden = new Stage("旧小学校裏庭", 4320, {
  back: [new Iimage("images/bg_old_school_back_garden_0.png", 2700, 0, 1080, 720)],
  front: [
    new Iimage("images/bg_old_school_back_garden_front_1.png", -540, 0, 1080 * 2, 720, { repeat_x: 2 }),
    new Iimage("images/bg_old_school_back_garden_front_0.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_old_school_back_garden_front_1.png", 2700, 0, 1080, 720),
  ],
}, [
  new Event_Move(new vec(2160, 550), 2160, () => S.old_school_back_entrance, se_road).set("start", () => { $.getScript("stages_north.js") }),
  new Event_Move(new vec(3240, 550), 3240, () => S.old_school_shoe_shelf, se_road)

], [], { _height: 680 })

S.old_school_shoe_shelf = new Stage("下駄箱", 4320, {
  back: [
    new Iimage("images/bg_old_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_shoe_locker_back_1.png", 540, 0, 1080, 720),
    new Iimage("images/bg_shoe_locker_back_0.png", 1620, 0, 1080, 720),
    new Iimage("images/bg_shoe_locker_back_1.png", 2700, 0, 1080, 720),
    new Iimage("images/bg_old_right.png", 3780, 0, 540, 720),
  ],
  front: [new Iimage("images/bg_shoe_locker_front.png", 540, 0, 1080 * 2, 720, { repeat_x: 2 })],
}, [
  new Event_Move(new vec(3240, 550), 3240, () => S.old_school_back_garden, se_road),
  new Event_Move(new vec(2160, 550), 540, () => S.old_school_main_entrance, se_door),
  new Event_Move(new vec(4220, 550), 100, () => S.old_school_south_corridor, se_door),
], [], { _height: 650, lighting: "#00000080" })

S.old_school_main_entrance = new Stage("旧小学校正門", 1080, {
  back: [new Iimage("images/bg_old_school_main_entrance.png", 0, 0, 1080, 720)],
}, [
  new Event_Move(new vec(540, 550), 2160, () => S.old_school_shoe_shelf, se_door),
], [])

S.old_school_south_corridor = new Stage("0階南廊下", 4320, {
  back: [
    new Iimage("images/bg_corridor_exit_left.png", 0, 0, 540, 720),
    new Iimage("images/bg_corridor_health_room.png", 540, 0, 1080, 720),
  ],
}, [
  new Event_Move(new vec(100, 550), 4220, () => S.old_school_shoe_shelf, se_door),
  new Event_Move(new vec(810, 550), 4220, () => S.old_school_shoe_shelf, se_door),
], [

], { lighting: "#000000c0" })

S.old_health_room = new Stage("保険室", 2160, {}, [], [])