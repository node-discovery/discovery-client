import io from "socket.io-client";


export default class DiscoveryClient {

	private socket: SocketIOClient.Socket;

	public intervalDelayMs: number = 30000;

	private interval?: NodeJS.Timeout;

	constructor(
		private name: string,
		private url: string,
		private port: number,
		private protocol: string = "http",
		socketOptions: SocketIOClient.ConnectOpts = {},
		public callback?: (client: DiscoveryClient) => {}
	) {

		this.socket = io(url, socketOptions);

		this.socket.on('connect', () => {
			console.log("connected")
			this.socket.emit('register', { name: this.name, protocol: this.protocol, port: this.port })

			this.interval = setInterval(() => {
				if (this.callback !== undefined) {
					this.socket.emit("status", { name: this.name, status: this.callback(this) })
				}
			}, this.intervalDelayMs)
		})

	}

	getName() {
		return this.name;
	}

	getUrl() {
		return this.url;
	}

	getPort() {
		return this.port;
	}

	getProtocol() {
		return this.protocol;
	}

	stop() {
		this.socket.emit('unregister', {name: this.name})
		if (this.interval !== undefined)
			clearInterval(this.interval)
	}

}