import { SessionService } from '../src/app/session/session.service';

type SessionServiceMock = Partial<
  Record<keyof SessionService, jest.Mock | string>
>;
export function createSessionServiceMock(): SessionServiceMock {
  return {
    cwd: '',
    setCwd: jest.fn(),
  };
}
