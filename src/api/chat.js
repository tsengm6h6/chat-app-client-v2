export const chatAPI = {
  getUserContacts: (userId) => {
    return `/api/users/${userId}/contacts`
  },
  getUserMessages: ({ userId, chatId, type }) => {
    return `/api/users/${userId}/messages?chatId=${chatId}&type=${type}`
  },
}