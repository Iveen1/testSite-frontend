import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
// TODO: все статики заменить на env
export class AttachmentService {

  constructor(private http: HttpClient) { }

  getAttachment(attachmentId: string) {
    return this.http.get("http://localhost:8080/api/storage/get/base64?id="+attachmentId, httpOptions);
  }

  getAttachmentNew(path: string) {
    return "http://localhost:8080/"+path;
  }

  uploadAttachment(data: any){
    console.log('req')
    return this.http.post("http://localhost:8080/api/storage/upload", data);
  }
}
