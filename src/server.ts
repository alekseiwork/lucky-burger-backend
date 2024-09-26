import { server } from './app';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  const address = server.address();
  const host = typeof address === 'string' ? address : address?.address;
  console.log(`Server is running at http://${host}:${PORT}`);
});
