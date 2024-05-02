import webview
import threading


# 実行しながらソースコードを変更できるのです スゴイ!
def command():
    running = True

    while running:
        command = input("Command?")
        c = command.split(" ")
        print(c)
        if c[0] == "reload":
            try:
                with open(c[1], mode="r", encoding="utf-8") as f:
                    window.evaluate_js(f.read())
                    window.evaluate_js(
                        r"""
                      const a = function getObjectByName(obj, targetName) {
                        for (let key in obj) {
                          if (obj[key].name === targetName) {
                            return obj[key];
                          }
                        }
                        return null; // 名前が見つからない場合はnullを返す
                      }(S, scene_main.stage.name)

                      if(a){
                        scene_main.stage = a
                      }
                      """
                    )
            except:
                print("error!")

        elif c[0] == "rescue":
            window.evaluate_js("scene_main.stage=health_room")
            with open("stages_east_and_west.js", mode="r", encoding="utf-8") as f:
                window.evaluate_js(f.read())
        elif c[0] == "clear":
            pass


d = threading.Thread(target=command, daemon=True)

d.start()

window = webview.create_window(
    "RPG", url="index.html", width=1080, height=720, resizable=True
)
webview.start(http_server=True, debug=True)
