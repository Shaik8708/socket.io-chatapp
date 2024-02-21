import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatServiceService } from './services/chat-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('popup', { static: false }) popup: any;

  currentUser: any;
  userList: any;
  phone: any;
  showScreen: boolean = false;
  messageText: string = "";

  selectedUser: any;
  roomId: any;
  messageArray: any;
  storageArray: any;

  constructor(
    private chatService: ChatServiceService,
    private modalService: NgbModal
  ) {}
  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  ngOnInit(): void {}

  openPopup(content: any) {
    this.modalService.open(content, { backdrop: 'static', centered: true });
  }

  login(dismiss: any) {
    this.getUsers(dismiss);
  }

  selectUserHandler(phone: string) {
    this.selectedUser = this.userList.find((user: any) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];
    this.getMessages()
    
  }

  join(username: string, roomId: string) {
    this.chatService.joinRoom({ user: username, room: roomId });
  }

  getUsers(dismiss: any) {
    this.chatService.getUserList().subscribe((data) => {
      this.userList = data;
      this.currentUser = this.userList.find(
        (user: any) => user.phone === this.phone.toString()
      );

      if (this.currentUser) {
        this.userList = this.userList.filter(
          (user: any) => user.phone !== this.phone.toString()
        );
        this.showScreen = true;
        dismiss();
      }
    });
  }

  getMessages( ){
    this.chatService.getMessages().subscribe((data) => {
      this.storageArray = data
      
    const storeIndex = this.storageArray.findIndex(
      (storage: any) => storage.roomId === this.roomId
    );
    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
    })
  }

  sendMessage(){
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    });
    this.getMessages();
    
    const storeIndex = this.storageArray.findIndex((storage: any) => storage.roomId === this.roomId);
    if(storeIndex > -1){
      this.storageArray[storeIndex].chats.push({
        message: this.messageText,
        senderId: this.currentUser.id,
          user: this.currentUser.name,
          timestamp: (Math.floor(new Date().getTime()/1000)).toString()
      })
      this.messageArray = this.storageArray[storeIndex].chats
    }else{
      const updateStorage ={
        roomId: this.roomId,
        chats: [{
          senderId: this.currentUser.id,
          user: this.currentUser.name,
          message: this.messageText,
          timestamp: (Math.floor(new Date().getTime()/1000)).toString() 
        }]
      }
      this.storageArray.push(updateStorage)
    }
    
    this.updateMsg(this.storageArray)
    
    this.messageText = "";
  }

  updateMsg(updatedData: any){
    
    this.chatService.updateMessages(this.roomId, updatedData[0]).subscribe((data) => {
      
    })
  }
}
