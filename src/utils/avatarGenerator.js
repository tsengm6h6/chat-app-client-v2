import { Buffer } from 'buffer'

const genRandomNum = () => Math.floor(Math.random() * 1000)

export const avatarGenerator = (fetchFn, generateCb) => {
  const AVATAR_API = `https://api.multiavatar.com/${genRandomNum()}?apikey=${process.env.VITE_AVATAR_KEY}`
  fetchFn(
    {
      method: 'GET',
      url: AVATAR_API
    },
    (data) => {
      const result = Buffer.from(data)
      generateCb(result.toString('base64'))
    }
  )
}