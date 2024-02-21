import { Injectable } from '@angular/core';
import { Socket, io } from "socket.io-client";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket: Socket;
  private url = "http://localhost:3000";

  constructor(private http: HttpClient) { 
    this.socket = io(this.url);
  }

  joinRoom(data: any){
    this.socket.emit('join', data);
  }

  sendMessage(message: any){
    this.socket.emit('message', message)
  }

  getUserList(): Observable<any>{
    return this.http.get(this.url+'/users');
  }

  getMessages(): Observable<any>{
    return this.http.get(this.url+'/messages');
  }

  updateMessages(roomid: any, updatedData: any): Observable<any>{
    return this.http.put(this.url+"/messages/"+roomid, updatedData)
  }

}
