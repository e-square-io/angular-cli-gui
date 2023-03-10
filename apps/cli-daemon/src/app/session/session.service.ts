import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  private _cwd = process.cwd();

  get cwd(): string {
    return this._cwd;
  }

  setCwd(cwd: string): void {
    this._cwd = cwd;
  }
}
