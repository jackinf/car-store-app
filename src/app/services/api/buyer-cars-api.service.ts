import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

export interface CreatePayload {
  name: string;
  qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class BuyerCarsApiService {
  private apiURL: string = environment.buyerCarsApi;

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
