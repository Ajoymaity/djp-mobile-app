import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppHeaderService } from 'src/app/services';
import { TelemetryGeneratorService } from 'src/app/services/telemetry/telemetry.generator.service';

@Component({
  selector: 'app-parent-sakhi',
  templateUrl: './parent-sakhi.page.html',
  styleUrls: ['./parent-sakhi.page.scss'],
})
export class ParentSakhiPage implements OnInit, OnDestroy {
  config: any;
  cdata:  any;
  duration: any;
  constructor(private headerService: AppHeaderService,
    private router: Router,
    private telemetry: TelemetryGeneratorService) {}

  ngOnInit() {
  }
  
  tabViewWillEnter(): void {
    this.ionViewWillEnter();
  }
  
  ionViewWillEnter()  {
    this.config = {type: 'parent'}
    this.headerService.showHeader("Parent Sakhi", true, ['bot']);
    this.headerService.showStatusBar(false, '#FCB915');
  }

  handleBotEvent(event: any) {
    this.cdata = {
      "audioMessagesCount": event.audio,
      "textMessagesCount": event.text
    }
    this.duration = event.duration;
    this.router.navigate(['/tabs/home']);
  }

  ngOnDestroy() {
    this.telemetry.generateEndTelemetry('bot', 'end', 'parent-sakhi', 'parent-sakhi', undefined, undefined, undefined, this.duration, this.cdata); 
  }
}
