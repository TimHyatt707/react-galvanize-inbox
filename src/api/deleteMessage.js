export default function deleteMessage(messageId) {
  return fetch(
    `https://api.airtable.com/v0/appdEqtHieMx3kSAu/Messages/${messageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer keyZjFgCqHqPR1F8o'
      }
    }
  ).then(response => response.json());
}
