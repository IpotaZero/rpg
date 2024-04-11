import webview
import threading


def command():
    running = True

    while running:
        command = input("Command?")
        print(command)
        if command == "finish":
            running = False


d = threading.Thread(target=command, daemon=True)

d.start()

window = webview.create_window(
    "RPG", url="index.html", width=1080, height=780, resizable=True
)
webview.start(http_server=True, debug=True)
