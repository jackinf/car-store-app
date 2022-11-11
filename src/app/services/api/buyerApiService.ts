import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

export interface AddPayload {
  name: string;
  email: string;
  balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class BuyerApiService {
  private apiURL: string = environment.buyersApi;

  constructor() {
  }

  public list(): Promise<Response> {
    return fetch(this.apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  public getCurrent(): Promise<Response> {
    return fetch(this.apiURL + 1, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  public async create(payload: AddPayload): Promise<Response> {
    return await fetch(this.apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }

  public async setBalance(id: number, balance: number): Promise<Response> {
    return await fetch(this.apiURL + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({balance})
    });
  }
}
