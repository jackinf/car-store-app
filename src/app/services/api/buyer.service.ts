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
export class BuyerService {
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
}
