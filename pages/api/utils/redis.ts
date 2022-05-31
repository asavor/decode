import { createClient } from 'redis'
const client = createClient({ url: process.env.REDIS_URL })

client.on('ready', function () {
  console.log('Redis Database Connected!')
})
client.on('error', (err) => console.log('Redis connection error', err))
client.on('end', () => {
  console.log('CacheStore - Connection status: disconnected')
})
//connects to the database
client.connect()

export { client }
