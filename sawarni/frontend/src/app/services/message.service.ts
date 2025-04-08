import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket! : WebSocket;
  private messageSubject = new Subject<any>();

  connect (url : string) : void {
    this.socket = new WebSocket(url);
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
