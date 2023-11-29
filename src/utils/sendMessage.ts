export const sendMessage = async (messages: string) => {
  try {
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: messages }),
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
