
```python
import requests
import json

url = "https://api.deepseek.com/chat/completions"

payload = json.dumps({
  "messages": [
    {
      "content": "你是一个旨在提供准确且有用信息的AI。",
      "role": "system"
    },
    {
      "content": "你是谁？",
      "role": "user"
    }
  ],
  "model": "deepseek-chat",
#   "frequency_penalty": 0,
#   "max_tokens": 2048,
#   "presence_penalty": 0,
  "response_format": {
    "type": "text"
  },
  "stop": None,
  "stream": False,
  "stream_options": None,
#   "temperature": 1,
#   "top_p": 1,
#   "tools": None,
#   "tool_choice": "none",
#   "logprobs": False,
#   "top_logprobs": None
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer <填apikey>'
}

response = requests.request("POST", url, headers=headers, data=payload)

respContent = response.json()['choices'][0]['message']['content']

print(response.text)
```