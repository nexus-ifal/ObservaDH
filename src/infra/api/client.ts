import axios from "axios";

export const conexaoBackend = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 15_000,
});
