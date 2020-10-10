import express from "express";
import DiscoveryClient from "./discovery-client";

const app: express.Express = express();

app.listen(3000)

const SERVER_NAME = "server1";

const server: DiscoveryClient = new DiscoveryClient(SERVER_NAME, "http://localhost:8080/", 3000);

server.callback = (client: DiscoveryClient) => {
	return {
		"heartbeat": 2000
	}
}