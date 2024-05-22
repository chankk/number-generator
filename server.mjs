import { createServer } from "node:http";
import generateRandomNumbers from "./number-generator.mjs";

const host = "localhost";
const port = "3000";

// creates http server
const server = createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	const numbers = generateRandomNumbers();
	res.end(JSON.stringify(numbers));
});

// starts http server
server.listen(port, host, () => {
	console.log(`Listening on http://${host}:${port}`);
});
