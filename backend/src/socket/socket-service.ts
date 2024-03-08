import { Server } from "socket.io";

// interface IconnectedUser{
//     socketId:string,
//     userId:string
// }
class SocketService {
    private _io: Server;
    private _connectedUser: string[];
    constructor() {
        // eslint-disable-next-line no-console
        console.log("Init socket service");
        this._io = new Server({
            cors: {
                allowedHeaders: [""],
                origin: "*",
            },
        });
        this._connectedUser = [];
    }

    public initListners() {
        const io = this.io;
        io.on("connection", (socket) => {
            // eslint-disable-next-line no-console
            console.log("New connection", socket.id);
            this._connectedUser.push(socket.id);
        });
    }

    get io() {
        return this._io;
    }
}

export default SocketService;
