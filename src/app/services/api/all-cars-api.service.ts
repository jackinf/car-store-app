import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

export interface CreatePayload {
  name: string;
  price: number;
  qty: number;
  isAvailable: boolean;
}

export interface UpdatePayload {
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

  public listAvailable(): Promise<Response> {
    return fetch(this.apiURL + "?isAvailable=true", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  public get(id: number): Promise<Response> {
    return fetch(`${this.apiURL}${id}`, {
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

  public update(id: number, carItem: UpdatePayload): Promise<Response> {
    return fetch(`${this.apiURL}${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(carItem)
      }
    );
  }

  public delete(id: number): Promise<Response> {
    return fetch(this.apiURL + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }
}
