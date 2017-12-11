
import io from 'socket.io-client/dist/socket.io'

 const WS_HOST = 'http://172.20.10.2:3000'

const socket = io(WS_HOST)

export default socket;