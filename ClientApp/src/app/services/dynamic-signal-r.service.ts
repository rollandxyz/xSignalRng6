import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Injectable, EventEmitter } from '@angular/core';
import { NotifyMessage } from '../models/notify-message';

@Injectable({
  providedIn: 'root'
})
export class DynamicHubSignalRService {
  messageReceived = new EventEmitter<NotifyMessage>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendChatMessage(message: NotifyMessage) {
    this._hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('/dynamichub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('Send', (data: any) => {
      console.log('Data received:' + data);
      this.messageReceived.emit(data);
    });
  }
}
