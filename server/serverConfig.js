import io from 'socket.io-client/dist/socket.io'

const WS_HOST = 'http://172.20.10.2:3000'

const ws = io(WS_HOST)

export default ws;