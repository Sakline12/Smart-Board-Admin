import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {
  routeTitle!: string;
  header_title: any;
  subtitle: any;
  background_image: any;
  icon_link: any;
  status: any;
  is_active: any;
  image: any;
  modalRef: BsModalRef<unknown> | undefined;
  titleList: any;

  InteractiveSliderForm!: FormGroup;
  data: any;
  title_id: any;
  files: any;
  filenew: any;
  id: any;
  deviceList: any;
  

  constructor(private route: ActivatedRoute, private dataService: DataService, private modalService: BsModalService,private fb: FormBuilder) {
    this.InteractiveSliderForm = this.fb.group({
      id:'',
      title_id: '',
      subtitle:'',
      image: [''],
      background_image: [''],
      icon_link:'',
      is_active:''
    });
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.routeTitle = data['title'];
    });
    this.interactiveHeaderDetails();
    this.interactiveDeviceList();

    this.dataService.titleList().subscribe((data: any) => {
      this.titleList = data.data;
    });
  }



  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1);
  }

  openModal(update: TemplateRef<any>) {
    this.modalRef = this.modalService.show(update);
  }

  openModal2(updateTeam: TemplateRef<any>) {
    this.modalRef = this.modalService.show(updateTeam
      );
  }

  interactiveHeaderDetails() {
    this.dataService.interactiveIntro().subscribe((data: any) => {
      this.header_title = data.title;
      this.subtitle = data.data.subtitle;
      this.image = data.data.image;;
      this.background_image = data.data.background_image;
      this.icon_link = data.data.icon_link;
      this.is_active = data.data.is_active;
      this.title_id=data.data.title_id;
      this.id=data.data.id;
      this.status = this.is_active === 1 ? 'Active' : 'Inactive';
      
      this.InteractiveSliderForm.patchValue({
        id: this.id,
        title_id: this.title_id,
        subtitle:this.subtitle,
        icon_link: this.icon_link,
        image: this.image,
        background_image: this.background_image,
        is_active: this.is_active ? '1' : '0'
      });
    });
  }

  createInteractiveSlider() {
    const formData = new FormData();

    // Append form values to the formData
      formData.append('title_id', this.InteractiveSliderForm.value.title_id);
      formData.append('subtitle', this.InteractiveSliderForm.value.subtitle);
      formData.append('icon_link', this.InteractiveSliderForm.value.icon_link);
      formData.append('is_active', this.InteractiveSliderForm.value.is_active);
      


  
    if (this.files instanceof Blob) {
      formData.append('image', this.files, 'customImageName.jpg');
    }

    if (this.filenew instanceof Blob) {
      formData.append('background_image', this.filenew, 'customBackgroundImageName.jpg');
    }

    // Send the formData to the server
    this.dataService.createInteractiveSlider(formData).subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);
        this.modalService.hide();
        // Perform additional actions after creating the about data
      }
    );
  }

  onImageChange1(event:any){
    this.files = event.target.files[0];
    console.log(this.files);
    this.InteractiveSliderForm.patchValue({ image: this.files });
  }

  onImageChange2(event:any){
    this.filenew = event.target.files[0];
    console.log(this.files);
    this.InteractiveSliderForm.patchValue({ image: this.filenew });
  }

  updateInteractiveSlider(){
    const formData = new FormData();
    formData.append('id', this.InteractiveSliderForm.value.id);
    formData.append('title_id', this.InteractiveSliderForm.value.title_id);
    formData.append('subtitle', this.InteractiveSliderForm.value.subtitle);
    formData.append('icon_link',this.InteractiveSliderForm.value.icon_link);
    formData.append('is_active', this.InteractiveSliderForm.value.is_active);

    if (this.files instanceof Blob) {
      formData.append('image', this.files, 'customImageName.jpg');
    }

    if (this.filenew instanceof Blob) {
      formData.append('background_image', this.filenew, 'customBackgroundImageName.jpg');
    }

    this.dataService.updateInteractiveSlider(formData).subscribe((data: any) => {
      this.data = data.data;
      this.interactiveHeaderDetails();
      this.modalService.hide();
    });
  }

  interactiveDeviceList() {
    this.dataService.interactiveDeviceInfo().subscribe((data: any) => {
      this.deviceList = data.data;
      console.log(this.deviceList);
      
  });
}

updateDeviceitems() {
  this.dataService.updateDeviceItems(this).subscribe((data: any) => {
    this.data = data.data;
    this.modalService.hide();
  });
}


}
