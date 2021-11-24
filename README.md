# OT4-Blockchain-Project

## Installation / Using our application

### CLIENT

From the folder client, first install the required packages with `pip3 install -r requirements.txt` and then just run `python3 client.py --help` to see the actions you can do.

### BACK-END

Installation process is quite simple : run `git clone` and `npm install` into repository's folder. Use `npm run dev` to start development server at `http://localhost:8080/`. If you want a production deployment just hit `npm start`. Do not forget to create your `.env` file with secrets into repository's folder.

Swagger exposition is available at `http://localhost:8080/api-docs/`

You would need the following .env file at the root of the back-end folder : 
```
PORT=8080
MODE="development"

LOCAL_NODE="http://localhost:7545"
```

### BLOCKCHAIN

Installation process is quite simple : run `git clone` and `npm install` into repository's folder. Moreover, you'll need to install *[Ganache](https://www.trufflesuite.com/ganache)*