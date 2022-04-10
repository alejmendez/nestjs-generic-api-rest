import { generateRandomString } from '../../../../common/utils';

const mockJwtService = {
  sign: jest.fn(() => {
    return [
      generateRandomString(36),
      generateRandomString(164),
      generateRandomString(43),
    ].join('.');
  }),
};

export { mockJwtService };
