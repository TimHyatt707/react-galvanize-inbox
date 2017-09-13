export default function createMessage(message) {
  return fetch(`https://api.airtable.com/v0/appdEqtHieMx3kSAu/Messages`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer keyZjFgCqHqPR1F8o',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      fields: message
    })
  })
    .then(response => {
      return response.json();
    })
    .then(record => {
      return {
        id: record.id,
        body: record.fields.body,
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: []
      };
    });
}
