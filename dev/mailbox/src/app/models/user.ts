enum Gender {
  M = 'M',
  F = 'F',
}

interface UserInfo {
    _id?: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  birthdate?: Date;
  gender?: string;
  address?: string;
}

export class User implements UserInfo {
  _id?: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  birthdate?: Date;
  gender?: string;
  address?: string;

  constructor(options: UserInfo) {
    this.fullName = options.fullName || '';
    this.email = options.email || '';
    this.avatarUrl = options.avatarUrl || '';
    this.birthdate = options.birthdate || null;
    this.gender = options.gender || 'M';
    this.address = options.address || '';
  }
}
