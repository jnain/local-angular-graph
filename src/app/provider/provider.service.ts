import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface valueData {
  id: number;
  timestamp: string;
  value: number;
  country:string;
  date: string;
  grouped: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private httpClient: HttpClient) { }

  processStatus = 0;

  getProcessStatus() {
    return this.processStatus = ((this.processStatus + 10) % 100);
  }
  getSumByPeriod(begin:string = null, end:string = null, step:string = 'Jour', source:string = 'all'){
    return this.httpClient.get<valueData[]>(`http://localhost:8081/sumByPeriodByStepBySource/${begin}/${end}/${step}/${source}`);
  }
}
