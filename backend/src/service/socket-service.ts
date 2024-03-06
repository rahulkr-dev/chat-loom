import { Server } from "socket.io";

class SocketService {
    private _io: Server;
    constructor() {
        // eslint-disable-next-line no-console
        console.log("Init socket service");
        this._io = new Server({
            cors: {
                allowedHeaders: [""],
                origin: "*",
            },
        });
    }

    public initListners() {
        const io = this.io;
        io.on("connection", (socket) => {
            // eslint-disable-next-line no-console
            console.log("New connection", socket.id);
        });
    }

    get io() {
        return this._io;
    }
}

export default SocketService;
