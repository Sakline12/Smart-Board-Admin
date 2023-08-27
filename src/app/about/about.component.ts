import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 aboutUpdate = {
    headerTitle: null,
    image: null,
    backgroundImage: null,
    description: null,
    question: null,
    buttonText: null,
    buttonLink: null,
    isActive: null,
    status:null
  };
  data: any;
  modalRef: BsModalRef<unknown> | undefined;
  routeTitle: any;
  headerTitle: any;
  image: any;
  backgroundImage: any;
  buttonText: any;
  buttonLink: any;
  description: any;
  question: any;
  isActive: any;
  status: any;
  

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // Load route title and about details on component initialization
    this.route.data.subscribe(data => {
      this.routeTitle = data['title'];
    });
    this.loadAboutDetails();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  loadAboutDetails() {
    // Fetch the "About" details from the service and populate the aboutUpdate object
    this.dataService.aboutDetails().subscribe((data: any) => {
      this.headerTitle = data.title;
      this.image = data.data.image;
      this.backgroundImage = data.data.background_image;
      this.buttonText = data.data.button_text;
      this.buttonLink = data.data.button_link;
      this.description = data.data.description;
      this.question = data.data.question;
      this.isActive = data.data.is_active;
 
      this.status = this.isActive === 1 ? 'Active' : 'Inactive';

      // Populate aboutUpdate object with retrieved data
      this.aboutUpdate = {
        headerTitle: this.headerTitle,
        image: this.image,
        backgroundImage: this.backgroundImage,
        buttonText: this.buttonText,
        buttonLink: this.buttonLink,
        description: this.description,
        question: this.question,
        isActive: this.isActive,
        status:this.status
      };
    });
  }

  onSubmit() {
    // Send updated "About" data to the service for updating
    this.dataService.updateAbout(this.aboutUpdate).subscribe((data) => {
      this.data = data;
      this.modalService.hide();
    });
  }
}
