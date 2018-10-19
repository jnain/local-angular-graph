import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ProviderService } from '../provider/provider.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Source } from '../data-table/data-table.component';

export interface Granularite {
  value: string;
  viewValue: string;
}

export interface GraphData {
  id: number;
  date: string;
  value: string;
  country: string;
}

@Component({
  selector: 'data-table-graph',
  templateUrl: './data-table-graph.component.html',
  styleUrls: ['./data-table-graph.component.css']
})
export class DataTableGraphComponent implements OnInit {
  private sommeGlobale = [];
  private dataFrance = [];
  private dataItalie = [];
  private dataAllemagne = [];

  grans: Granularite[] = [
    {value: "Jour", viewValue: "Jour"},
    {value: "Semaine", viewValue: "Semaine"},
    {value: "Mois", viewValue: "Mois"},
    {value: "Annee", viewValue: "Année"}
  ];

  debut;
  fin;
  gran;
  parentTableData: Source[];
  chart: Chart; 

  constructor(private providerService: ProviderService) {
    this.refreshSeries(new Date('12-14-2008').getTime(), new Date('12-16-2008').getTime(), "Mois");

    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
            text: 'Somme valeurs'
        }
      },
      xAxis: {
        title: {
            text: 'Jours'
        }
      },
    });
    this.parentTableData = [];
  }

  updateGlobalSomme() {
    this.sommeGlobale = [];
    for (let i = 0; i < this.dataFrance.length && i < this.dataAllemagne.length && i < this.dataItalie.length ; i++) {
      this.sommeGlobale[i] = this.dataFrance[i] + this.dataAllemagne[i] + this.dataItalie[i];
    }
    let serie = this.chart.ref.get('global');
    serie ? serie.remove():'';
    this.chart.addSerie({
      name: 'Somme Globale',
      data: this.sommeGlobale,
      id: 'global'
    })
    var index = this.parentTableData.findIndex(e => e.source === 'Global');
    var source = {source: 'Global', somme: this.sommeGlobale.reduce((result, e) => result += e, 0)}
    if (index !== -1) {
      this.parentTableData[index] = source;
    }
    else {
      this.parentTableData.push(source);
    }
  }

  private debutControl: FormControl;
  private finControl: FormControl;
  private granControl: FormControl;
  private debounce: number = 400;


  ngOnInit() {
    this.debutControl = new FormControl(new Date('12-14-2008'));
    this.debutControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        this.debut = new Date(query).getTime();
        console.log(this.debut);
        this.refreshSeries(this.debut, this.fin, this.gran);
      });
    this.finControl = new FormControl(new Date('12-16-2008'));
    this.finControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        this.fin = new Date(query).getTime();
        console.log(this.fin);
        this.refreshSeries(this.debut, this.fin, this.gran);
      });
    this.granControl = new FormControl('Jour');
    this.granControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        this.gran = query;
        console.log(this.gran);
        this.refreshSeries(this.debut, this.fin, this.gran);
      });
  }

  refreshSeries(debut, fin, step) {
    this.providerService.getSumByPeriod(debut, fin, step, 'France').subscribe(data => {
      console.log(data);
      this.dataFrance = data.map(e => e.value);
      let serie = this.chart.ref.get('france');
      serie ? serie.remove():'';
      this.chart.addSerie({
        name: 'Somme France',
        data: this.dataFrance,
        id: 'france'
      })
      this.updateGlobalSomme();
      var index = this.parentTableData.findIndex(e => e.source === 'France');
      var source = {source: 'France', somme: this.dataFrance.reduce((result, e) => result += e, 0)};
      if (index !== -1) {
        this.parentTableData[index] = source;
      }
      else {
        this.parentTableData.push(source);
      }
    });
    this.providerService.getSumByPeriod(debut, fin, step, 'Italie').subscribe(data => {
      this.dataItalie = data.map(e => e.value);
      let serie = this.chart.ref.get('italie');
      serie ? serie.remove():'';
      this.chart.addSerie({
        name: 'Somme Italie',
        data: this.dataItalie,
        id: 'italie'
      })
      this.updateGlobalSomme();
      var index = this.parentTableData.findIndex(e => e.source === 'Italie');
      var source = {source: 'Italie', somme: this.dataItalie.reduce((result, e) => result += e, 0)}
      if (index !== -1) {
        this.parentTableData[index] = source;
      }
      else {
        this.parentTableData.push(source);
      }
    });
    this.providerService.getSumByPeriod(debut, fin, step, 'Allemagne').subscribe(data => {
      this.dataAllemagne = data.map(e => e.value);
      let serie = this.chart.ref.get('allemagne');
      serie ? serie.remove():'';
      this.chart.addSerie({
        name: 'Somme Allemagne',
        data: this.dataAllemagne,
        id: 'allemagne'
      })
      this.updateGlobalSomme();
      var index = this.parentTableData.findIndex(e => e.source === 'Allemagne');
      var source = {source: 'Allemagne', somme: this.dataAllemagne.reduce((result, e) => result += e, 0)}
      if (index !== -1) {
        this.parentTableData[index] = source;
      }
      else {
        this.parentTableData.push(source);
      }
      console.log(this.parentTableData);
    });
  }
}
