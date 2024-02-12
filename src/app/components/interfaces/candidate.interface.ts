export interface candidate {
  id: number;
  name: string;
  email: string;
  registerAs: string;
}

export interface appliedCandidates {
  name: string;
  age: number;
  party: string;
  cityName?: string;
  cityPosition?: string;
  countryPosition?: string;
  gender: 'male' | 'female';
}

export interface appliedPosition {
  name: string;
  type: 'city' | 'country';
}
