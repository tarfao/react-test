import axios from "axios";
import consts from '../../consts';
import qs from 'qs';

function getToken(){
    return new Promise(async (resolve, reject) => {
        try {
            const dados_body = { grant_type: "client_credentials" }
            const { data: { access_token } } = await axios({
                method: 'POST',
                url: consts.url_token,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${consts.auth_secret}` //autho para conseguir um novo token
                },
                data: qs.stringify(dados_body),
            })
            resolve(access_token);
        } catch (error) {
            reject(error);
        }
    })
}

export { getToken }