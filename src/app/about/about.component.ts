import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutUpdateForm!: FormGroup;
  public teamform = {
    title_id: '',
    name: '',
    designation: '',
    department: '',
    sequence:'',
    image:[''],
    is_active:'',


  };

  teamedit = {
    id: null,
    title_id: null,
    name: null,
    designation: null,
    department: null,
    sequence: null,
    image: [''],
    is_active: null
  } as {
    id: string | null,
    title_id: string | null,
    name: string | null,
    designation: string | null,
    department: string | null,
    sequence: string | null,
    image: [''],
    is_active: string | null
  };
  


  data: any;
  modalRef: BsModalRef<unknown> | undefined;
  routeTitle: any;
  headerTitle: any;
  image: any=[''];
  background_image: any;
  description: any;
  question: any;
  status: any;
  id: any;
  header_title_name: any;
  header_title: any;
  files: any;
  button_text: any;
  button_link: any;
  is_active: any;
  titleList: any;
  filesBackground: any[''];
  teamList: any;
  teamTitle: any=[''];
  tl:any;
  fileImage: any;
  filesImage1: any;
  filesImage3: any;

  


  constructor(

    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: BsModalService,
    private fb: FormBuilder,

  ) {
    this.aboutUpdateForm = this.fb.group({
      id: '',
      header_title: '',
      image: [''],
      background_image: [''],
      button_text: '',
      button_link: '',
      question:'',
      descriuption: '',
      is_active: '',
      description:'',
    });
  }



  ngOnInit() {

    this.route.data.subscribe(data => {

      this.routeTitle = data['title'];

    });

    this.loadAboutDetails();
    this.teamMemberDetails();

    this.dataService.titleList().subscribe((data: any) => {
      this.titleList = data.data;
    });

  }



  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);

  }

  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1);
  }

  openModal2(updateTeam: TemplateRef<any>) {
    this.modalRef = this.modalService.show(updateTeam
      );
  }

  openModal3(template4: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template4
      );
  }



  loadAboutDetails() {

    this.dataService.aboutDetails().subscribe((data: any) => {
      this.header_title_name = data.title;
      this.image = data.data.image;
      this.background_image = data.data.background_image;
      this.button_text = data.data.button_text;
      this.button_link = data.data.button_link;
      this.description = data.data.description;
      this.question = data.data.question;
      this.is_active = data.data.is_active;
      this.id = data.data.title.id;
      this.header_title = data.data.id;
      this.status = this.is_active === 1 ? 'Active' : 'Inactive';



      this.aboutUpdateForm.patchValue({
        id: this.id,
        header_title: this.header_title,
        description: this.description,
        image: this.image,
        question:this.question,
        background_image: this.background_image,
        'button_text': this.button_text,
        'button_link': this.button_link,
        is_active: this.is_active ? '1' : '0'
      });

    });

  }



  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.aboutUpdateForm.value.header_title);
    formData.append('header_title', this.aboutUpdateForm.value.id);
    formData.append('question',this.aboutUpdateForm.value.question);
    formData.append('description', this.aboutUpdateForm.value.description);
    formData.append('image', this.aboutUpdateForm.value.image);
    formData.append('background_image', this.aboutUpdateForm.value.background_image);
    formData.append('button_text', this.aboutUpdateForm.value.button_text);
    formData.append('button_link', this.aboutUpdateForm.value.button_link);
    formData.append('is_active', this.aboutUpdateForm.value.is_active);

    const image = this.aboutUpdateForm.value.image;
    if (this.aboutUpdateForm.value.image instanceof Blob) {
      const image = this.aboutUpdateForm.value.image;
      formData.append('image', image, image.name);
    }

    const background_image = this.aboutUpdateForm.value.background_image;
    if (this.aboutUpdateForm.value.background_image instanceof Blob) {
      const background_image = this.aboutUpdateForm.value.background_image;
      formData.append('background_image', background_image, background_image.name);
    }

    this.dataService.updateAbout(formData).subscribe((data: any) => {
      this.data = data.data;
      this.loadAboutDetails();
      this.modalService.hide();
    });
  }

  onFileChange(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
    this.aboutUpdateForm.patchValue({ image: this.files });
  }

  onBackgroundImageChange(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
    this.aboutUpdateForm.patchValue({ background_image: this.files });
  }

  createAbout() {
    const formData = new FormData();
  
    // Append form values to the formData
    formData.append('header_title', this.aboutUpdateForm.value.header_title);
    formData.append('question', this.aboutUpdateForm.value.question);
    formData.append('description', this.aboutUpdateForm.value.description);
    formData.append('button_text', this.aboutUpdateForm.value.button_text);
    formData.append('button_link', this.aboutUpdateForm.value.button_link);
  
    // Check if an image file is selected
    if (this.files instanceof Blob) {
      formData.append('image', this.files, 'customImageName.jpg');
    }
  
    // Check if a background image file is selected
    if (this.fileImage instanceof Blob) {
      formData.append('background_image', this.fileImage, 'customBackgroundImageName.jpg');
    }
  
    // Send the formData to the server
    this.dataService.createAbout(formData).subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);
        this.modalService.hide();
        // Perform additional actions after creating the about data
      }
    );
  }
  
  
  
  onImageChange1(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
    
  }
  
  onBackgroundImage2(event: any) {
    this.fileImage = event.target.files[0]; 
    console.log(this.fileImage);
  }

  onImageChange2(event: any) {
    this.filesImage1 = event.target.files[0];
    console.log(this.filesImage1);
    
  }

  onImageChange3(event: any) {
    this.filesImage3 = event.target.files[0];
    console.log(this.filesImage3);
    
  }

  teamMemberDetails() {

    this.dataService.teamMemberList().subscribe((data: any) => {
       this.teamList=data.data;
    });

 



  }

  edit(tl: {
    id: null;
    title_id: null; //[null,Validators.required]
    name: null;
    image: [''];
    department: null;
    designation: null;
    sequence: null;
    is_active:null
  }) {
    this.teamedit = tl;
  }


  updateTeaml() {
    const formData = new FormData();
  
    if (this.teamedit.id !== null) {
      formData.append('id', this.teamedit.id);
    }
    if (this.teamedit.title_id !== null) {
      formData.append('title_id', this.teamedit.title_id);
    }
    if (this.teamedit.name !== null) {
      formData.append('name', this.teamedit.name);
    }
    if (this.teamedit.designation !== null) {
      formData.append('designation', this.teamedit.designation);
    }
    if (this.teamedit.department !== null) {
      formData.append('department', this.teamedit.department);
    }
    if (this.teamedit.sequence !== null) {
      formData.append('sequence', this.teamedit.sequence);
    }
    if (this.teamedit.is_active !== null) {
      formData.append('is_active', this.teamedit.is_active);
    }

    if (this.filesImage1 instanceof Blob) {
      formData.append('image', this.filesImage1, 'customImageName.jpg');
    }
  
  
    this.dataService.updateTeam(formData).subscribe((data: any) => {
      this.data = data.data;
      this.teamMemberDetails();
      this.modalService.hide();
    });
  }

  createTeam() {
    const formData = new FormData();
    formData.append('title_id', this.teamform.title_id);
    formData.append('name', this.teamform.name);
    formData.append('department', this.teamform.department);
    formData.append('designation', this.teamform.designation); 
    formData.append('sequence', this.teamform.sequence);

  
    if (this.filesImage3 instanceof Blob) {
      formData.append('image', this.filesImage3, 'customImageName.jpg');
    }
  
    this.dataService.createTeam(formData).subscribe(
      (res) => {
        this.data = res;
        this.modalService.hide();
      }
    );
  }
  
  
  


}