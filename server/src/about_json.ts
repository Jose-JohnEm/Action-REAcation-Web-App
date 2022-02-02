import { networkInterfaces } from 'os'

var about_json = (req, res) => {
    const nets = networkInterfaces();
    const results : object = {};
  
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    res.send({client: results['eth0'][0]})
}


export default about_json;