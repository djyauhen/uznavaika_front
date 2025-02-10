import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MailResponseType} from "../../../../types/mail-response.type";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private readonly http: HttpClient) {
  }

  sendMessage(body: {
    category: string,
    name: string,
    childAge: string,
    phone: string,
  }) {
    return this.http.post<MailResponseType>(environment.api + 'contact', body);
  }
}
