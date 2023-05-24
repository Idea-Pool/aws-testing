import { getStackOutput } from '../utils/stack';
import axios, { AxiosError } from 'axios';

describe('StaticSite Functional Validation', () => {
  test('CloudFront distribution has valid response', async () => {
    const websiteUrl = await getStackOutput('WebsiteUrl');
    const response = await axios.get(websiteUrl);

    expect(response.status).toBe(200);
    expect(response.data).toContain('Static Site');
  });
  test('CloudFront distribution has error response', async () => {
    const websiteUrl = await getStackOutput('WebsiteUrl');

    try {
      await axios.get(`${websiteUrl}/no-page.html`);
      fail();
    } catch (e) {
      const response = (e as AxiosError).response!;
      expect(response.status).toBe(403);
      expect(response.data).toContain('Static Site');
    }
  });
});
