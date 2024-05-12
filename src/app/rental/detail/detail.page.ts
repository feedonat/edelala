import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RentalService } from '../rental.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailPage implements OnInit {


  items:Observable<any>;
  itemId =null;
  details:any
  showToolbar = false;
  showFooter = false;
  btnBgColor = '--ion-color-step-150';
  heartType: string = "heart-outline";
  transition: boolean = false;
  config: SwiperOptions = {
    pagination: true,
  };
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };
  @ViewChild('swiper')
  swiper!: SwiperComponent;
  constructor(
    private rentalService :RentalService,
    private modalController:ModalController,
    private router:Router,
    private routerOutlet: IonRouterOutlet,
    private route: ActivatedRoute,

    ) { 
      this.itemId= this.route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get("id");
    console.log("item ID ngoninit " + this.itemId);
    this.rentalService.getOneItem(this.itemId).subscribe(item=>{
      console.log(JSON.stringify(item));
      this.details = item;
      console.log('ITEM DETAIL +++++ '+JSON.stringify(this.details));
    });
  }
  currentModal = null;
  async createModal() {
    const modal = await this.modalController.create({
      component: null,
      animated:true,
      backdropDismiss:true,
      showBackdrop:true,
      presentingElement : this.routerOutlet.nativeEl,
      mode:'ios'
    });

    await modal.present();
    this.currentModal = modal;
  
  }

  onScroll($event: CustomEvent) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.transition = true;
      this.showToolbar = scrollTop >= 250;
      this.showFooter = scrollTop >= 590;
    }else{
      this.transition = false;
    }
  }

  backClicked(){
    this.router.navigateByUrl("rental/list");
  }

  getPublicProfile(){
    this.router.navigateByUrl("/public-profile");
  }

  chat(){
    this.router.navigate(["/redmarket/chat/detail",{ id:this.itemId,saler: JSON.stringify(this.details?.poster), itemImg:this.details.images[0],price:this.details.price}])
  }
}
