import { Injectable } from '@angular/core';
import { serialize, Serializer } from 'node:v8';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class MessageWebsocketService {
  private socket! : WebSocket;
  private messageSubject = new Subject<any>();

  connect (url : string) : void {
    const queryParameters = new  URLSearchParams({
      token : localStorage.getItem('token')!
    });

    this.socket = new WebSocket(`${url}?${queryParameters}`);
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('sent by server : ', data);
      this.messageSubject.next(data);
    };

    this.socket.onerror = (error) => {
      console.error('Websocket error : ', error);
    };

    this.socket.onclose = () => {
      console.warn('Websocket connection closed.');
    };
  }

  sendMessage(message : any) : void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('sent by client', message)
      this.socket.send(JSON.stringify(message));
    }
    else {
      console.warn('Websocket is not connected.');
    }
  }

  get messages$() : Observable<any> {
    return this.messageSubject.asObservable();
  }

  ngOnDestroy() : void {
    this.socket?.close();
  }



  
}
