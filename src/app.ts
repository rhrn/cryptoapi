import uWebSockets from 'uWebSockets.js'
import { ws as wsCryptocompare, httpGet as httpGetCryptocompare } from '@src/components/cryptocompare/index'

export const app = uWebSockets.App()

app.ws('/cryptocompare', wsCryptocompare)
app.get('/cryptocompare', httpGetCryptocompare)
