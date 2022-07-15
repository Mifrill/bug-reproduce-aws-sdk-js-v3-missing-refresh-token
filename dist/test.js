"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
dotenv_1.default.config();
const fetchNewRefreshToken = async () => {
    const refreshToken = process.env.REFRESH_TOKEN;
    const client = new client_cognito_identity_provider_1.CognitoIdentityProvider({ region: 'eu-west-1' });
    const results = await client.initiateAuth({
        AuthFlow: client_cognito_identity_provider_1.AuthFlowType.REFRESH_TOKEN_AUTH,
        ClientId: process.env.CLIENT_ID,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken
        }
    });
    console.log(results);
    if (results.AuthenticationResult?.RefreshToken === undefined) {
        console.log('--------------------------------------------------------------' + '\n' +
            'Expect updated RefreshToken that !== process.env.REFRESH_TOKEN' + '\n' +
            '--------------------------------------------------------------');
    }
    return results.AuthenticationResult?.RefreshToken;
};
fetchNewRefreshToken();
//# sourceMappingURL=test.js.map