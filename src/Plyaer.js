const Player = class {
  constructor(id, name) {
    this.id = id
    this.name = name

    this.p = new vec(0, 0)
    this.v = new vec(0, 0)
    this.speed = 36
    this.r = 100
    this.direction = 0
    this.app = new Iimage("images/ch_" + id + ".png", 0, 0, 380, 380)

    this.status = {
      max_hp: 20,
      max_hp: 20,
      max_token: 20,
      speed: 2,
      attack: 8,
      deffence: 4,

      draw_hp: 20,
      hp: 20,
      token: 20,
      meter: 0,
    }
  }

  set(key, value) {
    this[key] = value
    return this
  }
}

const Players = [
  new Player("aqua", "アクア"),
  new Player("purine", "プリン"),
  new Player("ammon", "アモン"),
  new Player("citri", "シトリ"),
]