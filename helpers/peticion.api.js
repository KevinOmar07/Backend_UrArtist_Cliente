import https from 'https';

const peticion = async (postBody, host, path, metodo) => {

    const options = {
        protocol: 'https:',
        hostname: host,
        port: 443,
        method: metodo,
        path: path,
        rejectUnauthorized: false,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic TOKEN'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(body));
            });

            res.on('error', () => {
                console.log('error');
                reject(Error('HTTP call failed'));
            });
        });
        
        req.write(JSON.stringify(postBody));
        req.end();
    });
}

export const apiExterno = {
    peticion
}