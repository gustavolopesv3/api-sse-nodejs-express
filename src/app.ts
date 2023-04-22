import express from 'express'

const app = express()

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    const events = [
      {
        type: 'message',
        data: 'This is a regular message',
      },
      {
        type: 'warning',
        data: 'This is a warning message',
      },
      {
        type: 'error',
        data: 'This is an error message',
      },
      {
        type: 'custom-event',
        data: {
          message: 'This is a custom event',
          date: new Date(),
        },
      },
      {
        type: 'data',
        data: `${JSON.stringify({data: 'data here'})}`
      },
      {
        type: 'close',
        data: 'Connection closed',
      },
    ];
  
    let eventCount = 0;
    const maxEvents = events.length;
    const intervalId = setInterval(() => {
      const { type, data } = events[eventCount];
      res.write(`event: ${type}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      eventCount++;
  
      if (eventCount >= maxEvents) {
        clearInterval(intervalId);
        res.write('event: close\n');
        res.write('data: Connection closed\n\n');
        res.end();
      }
    }, 1000);
  });
  
  
  
  
  // Inicia o servidor
  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });