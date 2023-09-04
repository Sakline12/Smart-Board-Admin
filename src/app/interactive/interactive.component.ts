import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  VideoLinkForm!: FormGroup;
  deviceItemsForm!: FormGroup;
  // specificationForm!: FormGroup;
  data: any;
  title_id: any;
  files: any;
  filenew: any;
  id: any;
  deviceList: any;
  sl:any;

  deviceUpdate: {
    id: '',
    title_id: '',
    sub_title_id: '',
    image_id: '',
    name: '',
    is_active: ''
  } = {
    id: '',
    title_id: '',
    sub_title_id: '',
    image_id: '',
    name: '',
    is_active: ''
  };

  specificationUpdate={
    id: null,
    title_id: null,
    feature: null,
    inch_86_ifp: null,
    inch_75_ifp: null,
    inch_65_ifp: null,
    is_active: null
  } ;

  public listForm = {
    title_id:'',
    subtitle_id: '',
    image_id: '',
    name: '',
  };

  public specificationForm: any = {
    title_id: '',
    feature: '',
    inch_86_ifp: '',
    inch_75_ifp: '',
    inch_65_ifp: '',
  };
  
  subtitleList: any;
  deviceImageList: any;
  specificationList: any;
  link: any;
  vdo_id: any;
  vdo_link: any;
  

  constructor(private route: ActivatedRoute, private dataService: DataService, private modalService: BsModalService,private fb: FormBuilder,private sanitizer: DomSanitizer) {
    this.InteractiveSliderForm = this.fb.group({
      id:'',
      title_id: '',
      subtitle:'',
      image: [''],
      background_image: [''],
      icon_link:'',
      is_active:''
    });



    // this.deviceItemsForm = this.fb.group({
    //   id: '',
    //   title_id: '',
    //   sub_title_id: '',
    //   image_id: '',
    //   is_active: ''
    // });
  }
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.routeTitle = data['title'];
    });
    this.interactiveHeaderDetails();
    this.interactiveDeviceList();
    this.specificationListItem();
    this.videoDetails();

    this.dataService.titleList().subscribe((data: any) => {
      this.titleList = data.data;
    });

    this.dataService.subTitleList().subscribe((data:any)=>{
      this.subtitleList=data.data;
    }
    );

    this.dataService.deviceImageList().subscribe((data:any)=>{
      this.deviceImageList=data.data;
    }
    );

    this.VideoLinkForm = new FormGroup({
      id: new FormControl(''), // You can add validators as needed
      link: new FormControl(''),
      is_active: new FormControl(''),
    });

  }



  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1);
  }

  openModal(update: TemplateRef<any>) {
    this.modalRef = this.modalService.show(update);
  }

  openModal2(updateDevice: TemplateRef<any>) {
    this.modalRef = this.modalService.show(updateDevice
      );
  }

  openModal3(template4: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template4
      );
  }

  openModal4(template5: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template5
      );
  }

  openModal5(updateSpecification: TemplateRef<any>) {
    this.modalRef = this.modalService.show(updateSpecification
      );
  }

  openModal6(updateVdeo: TemplateRef<any>) {
    this.modalRef = this.modalService.show(updateVdeo
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
        is_active: ''
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
        this.modalService.hide();
        // Perform additional actions after creating the about data
      }
    );
  }

  onImageChange1(event:any){
    this.files = event.target.files[0];
    this.InteractiveSliderForm.patchValue({ image: this.files });
  }

  onImageChange2(event:any){
    this.filenew = event.target.files[0];
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
      
  });
}

updateDeviceitems() {
  const formData = new FormData();
  
  if (this.deviceUpdate.id !== null) {
    formData.append('id', this.deviceUpdate.id);
  }
  if (this.deviceUpdate.title_id !== null) {
    formData.append('title_id', this.deviceUpdate.title_id);
  }
  if (this.deviceUpdate.sub_title_id !== null) {
    formData.append('sub_title_id', this.deviceUpdate.sub_title_id);
  }
  if (this.deviceUpdate.name !== null) {
    formData.append('name', this.deviceUpdate.name);
  }
  if (this.deviceUpdate.image_id !== null) {
    formData.append('image_id', this.deviceUpdate.image_id);
  }
  if (this.deviceUpdate.is_active !== null) {
    formData.append('is_active', this.deviceUpdate.is_active);
  }


  // if (this.filesImage1 instanceof Blob) {
  //   formData.append('image', this.filesImage1, 'customImageName.jpg');
  // }


  this.dataService.updateDeviceItems(formData).subscribe((data: any) => {
    this.data = data.data;
    this.interactiveDeviceList();
    this.modalService.hide();
  });
}


edititems(dl: {
  id: '',
  title_id: '',
  sub_title_id: '',
  image_id: '',
  name: '',
  is_active: '',
}) {
  this.deviceUpdate = dl;
}



editspecification(sl: {
  id: null,
  title_id:null,
  feature:null,
  inch_86_ifp:null,
  inch_75_ifp:null,
  inch_65_ifp:null,
  is_active:null
}) {
  this.specificationUpdate=sl;
}

createDevice() {
  const formData = new FormData();

    formData.append('title_id', this.listForm.title_id);
    formData.append('subtitle_id', this.listForm.subtitle_id);
    formData.append('image_id', this.listForm.image_id);
    formData.append('name', this.listForm.name);
    

  this.dataService.createDevice(formData).subscribe(
    (res) => {
      this.data = res;
      this.modalService.hide();
      this.interactiveDeviceList();
    }
  );
}

specificationListItem() {
  this.dataService.ListSpecification().subscribe((data: any) => {
    this.specificationList = data.data;
    console.log(this.deviceList);
    
});
}

createSpecification() {
  this.dataService.createIteractiveSpecification(this.specificationForm).subscribe(
    (res) => {
      this.data = res;
      this.modalService.hide();
      this.specificationListItem();
    }
  );
}


updateInteractiveSpecification() {
  this.dataService.updateSpecification(this.specificationUpdate).subscribe((data: any) => {
    this.data = data;
    this.specificationListItem(); // Update the specification list
    this.modalService.hide();
  });
}

videoDetails() {

  this.dataService.videoLinkDetails().subscribe((data: any) => {

    this.vdo_id = data.data[0].id;
    this.vdo_link = this.sanitizer.bypassSecurityTrustResourceUrl(data.data[0].link);
    this.is_active=data.data[0].is_active;

    this.VideoLinkForm.patchValue({
      id: this.vdo_id,
      link: this.vdo_link,
      is_active: this.is_active,
    });
  });

 

}

updateVdoLinks(){
  const formData = new FormData();
  formData.append('id', this.VideoLinkForm.value.id);
  formData.append('link', this.VideoLinkForm.value.link);
  formData.append('is_active', this.VideoLinkForm.value.is_active);

  this.dataService.updateVideoLink(formData).subscribe((data: any) => {
    this.data = data.data;
    this.interactiveHeaderDetails();

    this.modalService.hide();
  });





}
}
