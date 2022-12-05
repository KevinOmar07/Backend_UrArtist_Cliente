import https from 'https';

const peticion = async (mail, host, path, metodo) => {

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

    let postBody;

    if (host === 'ozmotecha.urartist.click'){
        postBody = {
            email: mail,
        }
    } else {
        postBody = {
            mail,
        }
    }

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
        // The below 2 lines are most important part of the whole snippet.
        req.write(JSON.stringify(postBody));
        req.end();
    });
}

export const apiExterno = {
    peticion
}