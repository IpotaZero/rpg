const csv2json = (csvArray) => {
  let jsonArray = [];

  const RowArray = csvArray.split('\r\n');
  const items = RowArray[0].split(',');
  for (let i = 1; i < RowArray.length; i++) {
    const cellArray = RowArray[i].split(',');
    let line = new Object();
    for (let j = 0; j < items.length; j++) {
      line[items[j]] = cellArray[j];
    }
    jsonArray.push(line);
  }
  return jsonArray;
}

const make_enemy_from_json = (json) => {
  for (let key in json) {
    const enemy = json[key]

    E[enemy.id] = {
      name: enemy.name,
      max_hp: +enemy.hp,
      max_token: +enemy.token,
      credit: +enemy.credit,
      exp: +enemy.exp,

      attack: +enemy.attack,
      deffence: +enemy.deffence,
      speed: +enemy.speed,

      hp: +enemy.hp,
      token: +enemy.token,

      app: new Iimage(enemy.image, 0, 580, 380, 380),

      action(character) {
        const status = character.status

        const damage = Math.ceil((this.attack / 2 - status.deffence / 4) * (1 + Math.random() / 4))

        status.hp = Math.max(status.draw_hp - damage, 0)

        Icamera.vibe_power = 24

        se_damage.play()

        this.meter = 0

        return [this.name + "のこうげき", character.name + "に" + damage + "のダメージ"]
      },

      reset() {
        this.hp = this.max_hp
        this.token = this.max_token
        this.meter = 0
      },

      draw() {
        //enemy
        Irect(850, 320, 120, 24, "black")
        Irect(850, 320, 120 * (this.meter / this.max_meter), 24, "#c0c0c0")
        Irect(850, 360, 120, 24, "black")
        Irect(850, 360, 120 * (this.hp / this.max_hp), 24, "#ff4040")
      }
    }
  }
}

const E = {}

fetch("enemy_data.csv")
  .then(response => response.text())
  .then(data => {
    const json = csv2json(data)
    console.log(json)
    make_enemy_from_json(json)
  })
  .catch(error => {
    console.error('敵データが読み込めないにゃあ...: ', error)
  });



