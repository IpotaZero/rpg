const Actor = class {
  constructor(max_hp, max_token, attack, deffence, speed, app) {
    this.max_hp = max_hp
    this.max_token = max_token
    this.attack = attack
    this.deffence = deffence
    this.speed = speed
    this.app = app
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
    Irect(850, 320, 120, 24, "black")
    Irect(850, 320, 120 * (this.meter / this.max_meter), 24, "#c0c0c0")
    Irect(850, 360, 120, 24, "black")
    Irect(850, 360, 120 * (this.hp / this.max_hp), 24, "#ff4040")


  }

  set(key, value) {
    this[key] = value
    return this
  }
}


const get_enemy_data = async () => {
  const Enemy_Data = {}

  const file = await (await fetch("enemy_data.xlsx")).arrayBuffer();
  const workbook = XLSX.read(file);
  const first_sheet = workbook.Sheets[workbook.SheetNames[0]];

  // console.log(first_sheet)

  const column = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

  for (let i = 2; i < 7; i++) {
    const row_name = first_sheet["A" + i].v
    Enemy_Data[row_name] = {}
    for (let c of column) {
      const column_name = first_sheet[c + 1].v
      Enemy_Data[row_name][column_name] = first_sheet[c + i]?.v
    }
  }


  for (let key in Enemy_Data) {
    const e = Enemy_Data[key]
    E[key] = new class extends Actor {
      constructor() {
        super(e.hp, e.token, e.attack, e.deffence, e.speed, null)
        this.name = e.name
        this.credit = e.credit
        this.exp = e.exp

        if (e.image_right) {
          this.app = [new Iimage(e.image_right, 0, 580, 380, 380), new Iimage(e.image_left, 0, 580, 380, 380)]
        } else {
          this.app = null
        }
        this.reset()
      }

      action(character) {
        const damage = Math.ceil((this.attack / 2 - character.deffence / 4) * (1 + Math.random() / 2))

        character.hp = Math.max(character.draw_hp - damage, 0)

        this.meter = 0

        return [this.name + "のこうげき", character.name + "に" + damage + "のダメージ"]
      }
    }()
  }
}
const E = {}

get_enemy_data()




