import dotenv from 'dotenv'
import { AuthFlowType, AuthenticationResultType, CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

dotenv.config()

const fetchNewRefreshToken = async (): Promise<AuthenticationResultType['IdToken']> => {
  const refreshToken = process.env.REFRESH_TOKEN as string
  const client = new CognitoIdentityProvider({ region: 'eu-west-1' })
  const results = await client.initiateAuth({
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: process.env.CLIENT_ID as string,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken
    }
  })
  console.log(results)
  if (results.AuthenticationResult?.RefreshToken === undefined) {
    console.log(
      '--------------------------------------------------------------' + '\n' +
      'Expect updated RefreshToken that !== process.env.REFRESH_TOKEN' + '\n' +
      '--------------------------------------------------------------'
    )
  }
  return results.AuthenticationResult?.RefreshToken
}

fetchNewRefreshToken()
