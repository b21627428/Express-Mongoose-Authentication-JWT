Build: docker image build . -t uzumlukek/express-mongoose-jwt-authentication <br/>
Run: docker container run -d -p 3000:3000 --env-file ./.env uzumlukek/express-mongoose-jwt-authentication <br/>

.env File Content: <br/>
DB_CONNECT=mongodb+srv://$username:$password@$cluster-url?retryWrites=true&w=majority <br/>
TOKEN_SECRET=TOKEN_SECRET <br/>

End-points<br/>
HTTP POST<br/>
/api/user/register<br/>
payload: { "name": "name", "surname": "surname", "email": "email", "password": "password" }<br/>
<br/>

HTTP POST<br/>
/api/user/login<br/>
payload: { "email": "email", "password": "password" }<br/><br/>

DockerFile<br/>
FROM node:12-alpine<br/>
WORKDIR /app<br/>
COPY package*.json ./<br/>
RUN npm install<br/>
COPY . .<br/>
EXPOSE 3000<br/>
CMD ["npm","start"]<br/>
