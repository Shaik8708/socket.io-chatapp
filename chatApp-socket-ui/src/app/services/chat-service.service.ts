import { Injectable } from '@angular/core';
import { Socket, io } from "socket.io-client";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket: Socket;
  private newMessages = new Subject<[]>();
  eventCallback$ = this.newMessages.asObservable();
  private url = "http://localhost:3000";

  constructor(private http: HttpClient) { 
    this.socket = io(this.url);
    this.socket.on("new message", (data) => {
      this.newMessages.next(data);
    });
  }

  joinRoom(data: any){
    this.socket.emit('join', data);
  }

  sendMessage(message: any){
    this.socket.emit('message', message);
  }

  getUserList(): Observable<any>{
    return this.http.get(this.url+'/users');
  }

  getMessages(): Observable<any>{
    return this.http.get(this.url+'/messages');
  }

  getMessagesByRoomId(roomId: any): Observable<any>{
    return this.http.get(this.url+'/messages/'+roomId)
  }

  updateMessages(roomId: any, updatedData: any): Observable<any>{
    return this.http.put(this.url+"/messages/"+roomId, updatedData)
  }

  addNewMessageRoom(newMessageData: any): Observable<any>{
    return this.http.post(this.url+"/messages", newMessageData)
  }

}
