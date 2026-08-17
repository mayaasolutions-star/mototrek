const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');

// Start test instance of server
const app = require('../src/app');

test('GET /api/v1/health returns HTTP 200 with status ok', (t, done) => {
  const server = app.listen(0, () => {
    const port = server.address().port;
    
    http.get(`http://localhost:${port}/api/v1/health`, (res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'].includes('application/json'), true);

      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        const body = JSON.parse(rawData);
        assert.equal(body.success, true);
        assert.equal(body.data.service, 'mototrek-api');
        assert.equal(body.data.status, 'ok');
        
        server.close(done);
      });
    });
  });
});
