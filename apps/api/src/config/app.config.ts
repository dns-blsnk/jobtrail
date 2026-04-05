export const API_GLOBAL_PREFIX = 'api';
export const DEFAULT_API_PORT = 4001;

export const getApiPort = (): number => {
  const rawPort = process.env.API_PORT;
  const parsedPort = Number.parseInt(rawPort ?? '', 10);

  if (Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535) {
    return parsedPort;
  }

  return DEFAULT_API_PORT;
};
