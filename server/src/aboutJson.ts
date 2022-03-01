import * as fs from "fs";

const aboutJson = (req, res) => {
    // Save the file in a services variable
    const services = JSON.parse(fs.readFileSync("./services.json", "utf8"));

    let output = {
        client: {
            host: undefined
        },
        server: {
            url: process.env.URL,
            current_time: undefined,
            services: undefined
        },
    };

    output.client.host = req.ip.slice(7) || "127.0.0.1";
    output.server.current_time = Math.floor(new Date().getTime() / 1000);
    output.server.services = services;

    res.status(200).json(output);
}

export default aboutJson;