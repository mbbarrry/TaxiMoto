
import io from 'socket.io-client/dist/socket.io'

const WS_HOST = 'http://192.168.56.1:3000'
const socket = io(WS_HOST)

export default socket;