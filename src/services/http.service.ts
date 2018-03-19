import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Config from './../config';

@Injectable()
export class HttpService {

    private serviceUrl = Config.serverUrl;
    constructor(
        private http: HttpClient) { }

    //Peticiones get
    public get(url: string, httpOptions?: any): Observable<any> {
        let urlToServer = this.serviceUrl + url;
        return this.http.get(urlToServer, httpOptions);
    }

    //Peticiones post
    public post(url: string, body: Object, httpOptions?: any): Observable<any> {
        let urlToServer = this.serviceUrl + url;
        return this.http.post(urlToServer, body, httpOptions);
    }

    //Peticiones put
    public put(url: string, body: Object, httpOptions?: any): Observable<any> {
        let urlToServer = this.serviceUrl + url;
        return this.http.put(urlToServer, body, httpOptions);
    }

    //Peticiones delete
    public delete(url: string, httpOptions?: any): Observable<any> {
        let urlToServer = this.serviceUrl + url;
        return this.http.delete(urlToServer, httpOptions);
    }
}