import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../@core/services/data.service';
import { MachinesService } from '../../../@core/services/machines.service';
import { ElectronService } from '../../../core/services';



@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  rows: any;
  loading: boolean;
  searchValue = '';
  tempData = [];
  myIntervalCloseApp: any;

  constructor(
    private machinesService: MachinesService,
    public router: Router,
    private data: DataService,
    public electronService: ElectronService
  ) { }

  ngOnInit(): void {
    this.getRequest();
    this.closeTime();
  }

  getRequest() {
    this.loading = true;
    this.machinesService.getMachines().subscribe(data => {      
      this.rows = data;
      this.tempData = this.rows;
      this.loading = false;
    });
  }

  openOperation(row){
    console.log("openOperation", row.id);
    this.data.changeMessage(row.id)
    localStorage.setItem('dataRedirectOperation', JSON.stringify(row));
    this.router.navigate(['api/operation/' + row.id]);
  }

  filterUpdate(event) {

    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    // this.table.offset = 0;
  }

  closeTime() {        
    if (this.electronService.isElectron) {
      this.myIntervalCloseApp = setInterval(() => {      
        this.electronService.closeWindows()
      }, 600000);
    }    
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');   
    clearInterval(this.myIntervalCloseApp);    
  }

}
