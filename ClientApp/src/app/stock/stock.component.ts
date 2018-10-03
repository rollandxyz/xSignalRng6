import { Component, OnInit } from '@angular/core';
import { StockSignalRService } from '../services/stock-signal-r.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {

  stocks = [];
  marketStatus: string;

  constructor(private stockService: StockSignalRService) {
    this.stocks = [];
    this.marketStatus = 'closed';
    // subscribe for connection eastablish
    // fetch the stocks details
    stockService.connectionEstablished.subscribe(() => {
      stockService.getAllStocks().then((data) => {
        this.stocks = data;
      });
    });

    // subscribe for market open
    stockService.marketOpened.subscribe(() => {
      this.marketStatus = 'open';
      this.startStrearming();
    });

    // subscribe for market close
    stockService.marketClosed.subscribe(() => {
      this.marketStatus = 'closed';
    });
  }

  openMarketClicked() {
    this.stockService.openMarket();
  }

  startStrearming() {
    this.stockService.startStreaming().subscribe({
      next: (data) => {
        this.displayStock(data);
      },
      error: function (err) {
        console.log('Error:' + err);
      },
      complete: function () {
        console.log('completed');
      }
    });
  }

  closeMarketClicked() {
    this.stockService.CloseMarket();
  }

  resetClicked() {
    this.stockService.ResetMarket();
  }

  displayStock(stock) {
    console.log('stock updated:' + stock.symbol);
    for (const i in this.stocks) {
      // console.log(i);
      if (this.stocks[i].symbol === stock.symbol) {
        this.stocks[i] = stock;
      }
    }
  }

}

