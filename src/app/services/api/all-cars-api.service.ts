import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

export interface CreatePayload {
  name: string;
  price: number;
  qty: number;
  isAvailable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AllCarsApiService {
  private apiURL: string = environment.allCarsApi;

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

  public create(carItem: CreatePayload): Promise<Response> {
    return fetch(this.apiURL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(carItem)
      }
    );
  }

  public delete(id: string): Promise<Response> {
    return fetch(this.apiURL + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }
}
