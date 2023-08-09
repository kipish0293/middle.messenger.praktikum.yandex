import EventBus from "./eventBus";
import store from "./store";

export enum WSTransportEvents {
    Error = "error",
    Connected = "conected",
    Close = "close",
    Message = "message"
}

export class WSTransport extends EventBus {
    private socket?: WebSocket;
    private pingInterval?: ReturnType<typeof setInterval>;
    private readonly pingIntervalTime = 30000;
    private url: string

    constructor(url: string) {
        super()
        this.url = url
    }

    public send(data: string | number | object) {
        if(!this.socket) {
            throw new Error('Socket is not connected')
        }

        this.socket.send(JSON.stringify(data))
    }

    public connect(): Promise<void> {
        if(this.socket) {
            throw new Error('The socket is already connected')
        }

        this.socket = new WebSocket(this.url)
        this.subscribe(this.socket)
        this.setupPing()

        return new Promise((resolve, reject) => {
            this.on(WSTransportEvents.Error, reject)
            this.on(WSTransportEvents.Connected, () => {
                this.off(WSTransportEvents.Error, reject)
                resolve()
            })
        })
    }

    public close() {
        this.socket?.close()
        clearInterval(this.pingInterval)
    }

    public setupPing() {
        this.pingInterval = setInterval(() => {
            this.send({type: 'ping'})
        }, this.pingIntervalTime)

        this.on(WSTransportEvents.Close, ()=> {
            clearInterval(this.pingInterval)
            this.pingInterval = undefined
        })
    }

    public subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WSTransportEvents.Connected)
        })

        socket.addEventListener('close', () => {
            this.emit(WSTransportEvents.Close)
        })

        socket.addEventListener('error', (e) => {
            this.emit(WSTransportEvents.Error, e)
        })

        socket.addEventListener('message', (message: any) => {
            try {
                const data = JSON.parse(message.data)
                if(['pong', 'user connected'].includes(data?.type)) {
                    return;
                }
                // this.emit(WSTransportEvents.Message, data)
                if(Array.isArray(data)) {
                    console.log('if array')
                    store.set('messages', data.sort((a,b) => a.time > b.time ? 1 : -1))
                } else {
                    console.log('if object')
                    const messages = store.getState().messages
                    const newMes = [...messages, data]
                    store.set('messages', newMes)
                }

            } catch (e) {
                //игнор ошибок JSON.parse
            }
        })
    }
}