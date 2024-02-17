import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IntroPage implements OnInit {
  @ViewChild('swiper')
  swiper!: SwiperComponent;
  @ViewChild('bg')
  background!: ElementRef;

  config: SwiperOptions = {
    pagination: true,
  };

  pages = [
    {
      title: 'Watch on any device',
      text: 'Stream on your phone, tablet, laptop, and TV without paying more.',
      img: './assets/img/intro2.png',
    },
    {
      title: '3, 2, 1... Download!',
      text: 'Always have something to watch offline.',
      img: './assets/img/intro3.png',
    },
    {
      title: 'No pesky contracts',
      text: 'Cancel anytime.',
      img: './assets/img/intro4.png',
    },
  ];
  constructor(public renderer: Renderer2) {}

  ngOnInit() {
    StatusBar.setStyle({ style: Style.Dark });
  }

  slidesMoved(ev: { touches: { startX: number; currentX: number; diff: number; }; width: any; }) {
    if (
      this.swiper.swiperRef.activeIndex == 0 ||
      this.swiper.swiperRef.activeIndex == 1
    ) {
      // Filter out swipe in the wrong direction on first slide
      if (
        this.swiper.swiperRef.activeIndex == 0 &&
        ev.touches.startX < ev.touches.currentX
      ) {
        return;
      }

      const element = this.background.nativeElement;
      const width = ev.width;
      let transform = ev.touches.diff / 3;

      if (this.swiper.swiperRef.activeIndex == 1) {
        transform = -width / 3 + transform;
      }

      this.renderer.setStyle(
        element,
        'webkitTransform',
        `translateX(${transform}px)`
      );
    }
  }

  onSlideSnap(ev) {
    if (ev.snapIndex == 0) {
      this.flyBgOut();
    } else if (ev.snapIndex == 1) {
      this.flyBgIn();
    }
  }

  slideResetTransitionStart() {
    if (this.swiper.swiperRef) {
      if (this.swiper.swiperRef.activeIndex == 0) {
        this.flyBgOut();
      } else if (this.swiper.swiperRef.activeIndex == 1) {
        this.flyBgIn();
      }
    }
  }

  flyBgOut() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, 'reset-bg');
    setTimeout(() => {
      this.renderer.setStyle(element, 'webkitTransform', `translateX(0px)`);
      this.renderer.removeClass(element, 'reset-bg');
    }, 500);
  }

  flyBgIn() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, 'reset-bg-out');
    setTimeout(() => {
      this.renderer.setStyle(element, 'webkitTransform', `translateX(-600px)`);
      this.renderer.removeClass(element, 'reset-bg-out');
    }, 500);
  }
}
