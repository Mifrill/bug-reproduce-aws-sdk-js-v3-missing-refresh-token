import dotenv from 'dotenv'
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

dotenv.config()

const fetchNewRefreshToken = async (): Promise<void> => {
  const refreshToken = process.env.REFRESH_TOKEN as string
  const client = new CognitoIdentityProvider({ region: 'eu-west-1' })
  const results = await client.initiateAuth({
    AuthFlow: 'REFRESH_TOKEN',
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
}

fetchNewRefreshToken()
