import 'dotenv/config'
import { ChatGPTAPI } from 'chatgpt'
 
async function example() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const res = await api.sendMessage('阿部寛が出演した日本ドラマ2つ、名前だけください')
  console.log(res.text)
}
 
example()