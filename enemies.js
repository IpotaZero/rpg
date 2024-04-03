const Actor = class {
  constructor(max_hp, max_token, attack, deffence, speed) {
    this.max_hp = max_hp
    this.max_token = max_token
    this.attack = attack
    this.deffence = deffence
    this.speed = speed
  }

  reset() {
    this.hp = this.max_hp
    this.token = this.max_token
    this.meter = 0

  }

  action(character) {

  }

  draw() {
    //enemy
    Irect(800, 400, 120, 24, "black")
    Irect(800, 400, 120 * (this.meter / this.max_meter), 24, "#c0c0c0")
    Irect(800, 440, 120, 24, "black")
    Irect(800, 440, 120 * (this.hp / this.max_hp), 24, "#ff4040")
  }

  set(key, value) {
    this[key] = value
    return this
  }
}

const after_school_polyturner = new class extends Actor {
  constructor() {
    super(20, 0, 8, 4, 1)
    this.name = "放課後ポリターナー"
    this.reset()
  }

  action(character) {
    const damage = Math.ceil((this.attack / 2 - character.deffence / 4) * (1 + Math.random() / 2))

    character.hp = Math.max(character.draw_hp - damage, 0)

    this.meter = 0

    return ["放課後ポリターナーのこうげき", character.name + "に" + damage + "のダメージ"]
  }

}()