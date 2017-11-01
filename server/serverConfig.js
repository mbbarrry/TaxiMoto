import io from 'socket.io-client/dist/socket.io'

const WS_HOST = 'http://192.168.56.1:3000'
const ws = io(WS_HOST)

export default ws;