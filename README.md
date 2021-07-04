<b>Build:</b> 
```bash
docker image build . -t uzumlukek/express-mongoose-jwt-authentication
```
<b>Run:</b> docker container run -d -p 3000:3000 --env-file ./.env uzumlukek/express-mongoose-jwt-authentication <br/>
<br/>
<b>.env File Content: </b><br/>
DB_CONNECT=mongodb+srv://<b>$username</b>:<b>$password</b>@<b>$cluster-url</b>?retryWrites=true&w=majority <br/>
TOKEN_SECRET=TOKEN_SECRET <br/>

<b>End-points</b><br/>
HTTP POST<br/>
/api/user/register<br/>
payload: { "name": "name", "surname": "surname", "email": "email", "password": "password" }<br/>
<br/>

HTTP POST<br/>
/api/user/login<br/>
payload: { "email": "email", "password": "password" }<br/><br/>

<b>DockerFile</b><br/>
FROM node:12-alpine<br/>
WORKDIR /app<br/>
COPY package*.json ./<br/>
RUN npm install<br/>
COPY . .<br/>
EXPOSE 3000<br/>
CMD ["npm","start"]<br/>
