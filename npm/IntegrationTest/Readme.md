# Project Setup & Testing

## 1. Install dependencies  

```dash
npm i
```
## 2. Create Desk token files
Copy the Desk JWT token from `AdvOidc.Login` and save it as the following files:
  - `./desk/token_TAdmin`  
  - `./desk/token_Tuser`  
Make sure the files contain only the raw JWT token string.  


## Run test  
```dash
npm run test
npm run test:auth
npm run test:org
npm run test:device
```

## 4. IAM access tokens  
After running tests, IAM access tokens will be generated in `./iam`:
  - `./iam/access_TAdmin`  
  - `./iam/refresh_TAdmin`  
These files contain the access and refresh tokens used in subsequent API requests.