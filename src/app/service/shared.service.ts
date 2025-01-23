import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isClickedRouteVisible: boolean = false;
  index: number = 0;
  isSideBarVisible: boolean = false;

  constructor() { }

  toggleSidebar() {
    this.isSideBarVisible = !this.isSideBarVisible;
  }

  navigate(receivedIndex: number) {
    this.index = receivedIndex;
    console.log("index", this.index)
  }
}
