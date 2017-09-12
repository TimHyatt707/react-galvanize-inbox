export default function updateMessage(messageId, changes) {
  return fetch(
    `https://api.airtable.com/v0/appdEqtHieMx3kSAu/Messages/${messageId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer keyZjFgCqHqPR1F8o',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        fields: changes
      })
    }
  )
    .then(response => {
      return response.json();
    })
    .then(record => {
      if (!record.fields.labels) {
        record.fields.labels = '';
      }
      return {
        id: messageId,
        body: record.fields.body,
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: record.fields.labels.split('')
      };
    });
}
