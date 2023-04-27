import {Component, OnInit} from '@angular/core';
import {EmployeePair} from "./models/employeePair";
import {ManageService} from "./services/manage.service";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pairList: EmployeePair[] = [];
  selectedFile: File | undefined;
  imageUrl="data:image/png;base64,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";

  constructor(
    private service: ManageService
  ) {}
  ngOnInit(): void {
    this.service.getPairs().subscribe(data=>{
      this.pairList=data;
    })
  }

  onFileSelected(event: Event): void {
    const inputElement = event?.target as HTMLInputElement;

    // @ts-ignore
    this.selectedFile = inputElement?.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.service.upload(this.selectedFile)
        .subscribe(event => {
         if (event.type === HttpEventType.Response) {
            console.log('File uploaded successfully');
            // const pairs = event.body as EmployeePair[];
            this.pairList = event.body as EmployeePair[]
            // console.log(pairs, " pairs"); // response data
          };
        });
    }
  }
  replaceChar(pair: any){

    for (let i = 0; i < pair?.projects?.length; i++) {
        if (pair.projects[i]?.charAt(0)=="["){
          pair.projects[i] = pair.projects[i].replace(/\[|\]/g, "");
          // pair.projects[i]?.replace("[","");
          // pair.projects[i]?.replace("]","");
        }
      }
    return pair?.projects;
  }
}
