<b>Dockerfile:</b> 
```bash
FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
```

<b>docker-compose.yaml:</b> 
```bash
version: '3'

services: 
    local-firestore:
        build: 
            context: .
            dockerfile: Dockerfile
        image: uzumlukek/express-mongoose-jwt-authentication
        ports: 
            - '3000:3000'
```

<b>Build and Run:</b> 
```bash
git clone https://github.com/muhammedsaidkaya/express-mongoose-token-based-authentication
cd express-mongoose-token-based-authentication
docker compose --env-file ./.env --build up 

```

<br/>
<b>.env File Content: </b> <br/>
DB_CONNECT=mongodb+srv://<b>$username</b>:<b>$password</b>@<b>$cluster-url</b>?retryWrites=true&w=majority <br/>
TOKEN_SECRET=TOKEN_SECRET <br/> <br/>

<hr/>


<b>End-points</b><br/>
HTTP POST<br/>
```bash
/api/user/register
```
payload: { "name": "name", "surname": "surname", "email": "email", "password": "password" }<br/>
<br/>

HTTP POST<br/>
```bash
/api/user/login
```
payload: { "email": "email", "password": "password" }<br/><br/>
