export const chatAPI = {
  getChatRecordsList: (userId) => {
    return `/api/users/${userId}/contacts`
  }
}