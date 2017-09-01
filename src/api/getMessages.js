export default function getMessages() {
  return fetch(
    'https://api.airtable.com/v0/appdEqtHieMx3kSAu/Table%201?maxRecords=3&view=Grid%20view',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer keyZjFgCqHqPR1F8o'
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.records.map(record => {
        return {
          id: record.id,
          body: record.fields.body,
          subject: record.fields.subject,
          read: record.fields.read,
          starred: record.fields.starred,
          labels: record.fields.labels.split(',')
        };
      });
    });
  // .then(message => {
  //   console.log(message);
  // });
}
