import { ExecutorsService } from '../src/app/executors/executors.service';

type ExecutorsServiceMock = Partial<Record<keyof ExecutorsService, jest.Mock>>;
export function createExecutorsServiceMock(): ExecutorsServiceMock {
  return {
    execAsync: jest.fn(),
    readTaskStatus: jest.fn(),
    killTask: jest.fn(),
    readAllTasks: jest.fn(),
  };
}
