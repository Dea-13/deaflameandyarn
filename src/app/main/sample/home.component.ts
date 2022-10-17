import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public contentHeader: object

  constructor(private userListService: UserService) {}
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }

    // console.log('test!');
    // this.userListService.getById(15).subscribe(data => {  
    //   console.log('userListService: ', data);         
    // });
  }
}
