import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider/provider.service';

@Component({
  selector: 'batch-launcher',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  constructor(private providerService: ProviderService){}

  ngOnInit(): void {
  }

  title = 'batch';
  value = 0;

  launchBatch() {
    this.value = this.providerService.getProcessStatus();
  }
}
