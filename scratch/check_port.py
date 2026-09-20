import socket

ports = [3000, 5000, 5173, 8000, 8888, 9000, 9999]
for p in ports:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind(('127.0.0.1', p))
        s.close()
        print(f"Port {p} is AVAILABLE!")
        break
    except Exception as e:
        print(f"Port {p} failed: {e}")
