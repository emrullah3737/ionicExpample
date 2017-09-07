import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import * as _ from 'underscore';

@Injectable()

export class HttpRequests {
  public headers: Headers;
  public host: string;

  constructor(
    private http: Http,
  ) {
    this.setHost();
    this.setHeader();
  }

  private setHost() {
    this.host = 'http://127.0.0.1:8080';
  }

  private setHeader() {
    this.headers = new Headers({
      'X-Client-Id': '123',
      'X-Client-Secret': '123'
    });
  }

  private setQueryString(qs: Object = {}, params) {
    _.each(qs, (e, i) => {
      params.set(i, e);
    });
    return params;
  }

  public fetch(apiUrl: string, qs: Object = {}): Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    params = this.setQueryString(qs, params);
    return this.http.get(this.host + apiUrl, { params, headers: this.headers })
      .map((data) => data.json())
      .toPromise();
  }

  public save(apiUrl: string, body: any): Promise<any> {
    //if body has _id attribute, http.put will execute for update
    if (body['_id'] === undefined)
      return this.http.post(this.host + apiUrl, body, { headers: this.headers })
        .map((data) => data.json())
        .toPromise();

    return this.http.put(this.host + `${apiUrl}/${body['_id']}`, body, { headers: this.headers })
      .map((data) => data.json())
      .toPromise();
  }

  public destroy(apiUrl: string, id: number): Promise<any> {
    return this.http.delete(this.host + `${apiUrl}/${id}`, { headers: this.headers })
      .map((data) => data.json())
      .toPromise();
  }
}

export class HttpRequestMock extends HttpRequests{
  constructor() {
    let http: Http;
    super(http);
  }
}