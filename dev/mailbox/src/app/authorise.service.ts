
export class AuthoriseService {
  private _isAuthorise = false;

  constructor() {}

  Authorise(data: { login: string; password: string }) {
    if (data.login === 'admin' && data.password === 'admin') {
      this._isAuthorise = true;
    }
  }

  get authorise() {
    return this._isAuthorise;
  }
}
