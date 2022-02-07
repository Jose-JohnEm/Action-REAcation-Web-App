var about_json = (req, res) => {
    let output = {
        client: {
            host: undefined
        },
        server: {
            current_time: undefined
        },
    };

    output.client.host = req.ip.slice(7);
    output.server.current_time = Math.floor(new Date().getTime() / 1000);
    res.status(200).json(output);
}


export default about_json;