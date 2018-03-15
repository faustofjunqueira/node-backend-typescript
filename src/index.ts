import * as express from 'express';

const app = express();

/**
 * Comment test
 */



app.get('/', (req, res) => res.send('junda!'));

app.listen(3000, () => process.stdout.write('Example app listening on port 3000!'));
