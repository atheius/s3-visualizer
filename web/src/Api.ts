import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000',
  timeout: 60000 * 10, // 10 min timeout
});

const getBuckets = async () => api.get(`/buckets`);

const getAnalysis = async (bucketName: string) =>
  api.get(`/analyse/${bucketName}`);

export { getBuckets, getAnalysis };
