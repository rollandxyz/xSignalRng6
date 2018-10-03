import { Component, OnInit, NgZone } from '@angular/core';
import { NotifyMessage } from '../models/notify-message';
import { Tab } from '../models/tab.model';
import { DynamicHubSignalRService } from '../services/dynamic-signal-r.service';

@Component({
  selector: 'app-dynamic-hub',
  templateUrl: './dynamic-hub.component.html',
  styleUrls: ['./dynamic-hub.component.css']
})
export class DynamicHubComponent {
  chatMessage: NotifyMessage;
  canSendMessage: boolean;
  tabs: Tab[];
  currentRoom: string;

  constructor(
    private signalrService: DynamicHubSignalRService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.chatMessage = new NotifyMessage();
    this.tabs = [];
    this.tabs.push(new Tab('Lobby', 'Welcome to lobby'));
    this.tabs.push(new Tab('SignalR', 'Welcome to SignalR Room'));
    this.currentRoom = 'Lobby';
  }

  sendMessage() {
    if (this.canSendMessage) {
      this.chatMessage.room = this.currentRoom;
      this.signalrService.sendChatMessage(this.chatMessage);
    }
  }

  OnRoomChange(room) {
    this.currentRoom = room;
  }

  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    this.signalrService.messageReceived.subscribe((message: NotifyMessage) => {
      this._ngZone.run(() => {
        this.chatMessage = new NotifyMessage();
        const room = this.tabs.find(t => t.heading === message.room);
        if (room) {
            room.messageHistory.push(new NotifyMessage(message.user, message.message, message.room));
        }
      });
    });
  }
}
