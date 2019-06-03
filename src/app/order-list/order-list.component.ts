import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../shared/orders.service";


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor( private ordersService:OrdersService ) { }

  ngOnInit() {
    this.getCoffeeOrders();
  }
  markCompleted = data => this.ordersService.updateCoffeeOrder(data);
  deleteOrder = data => this.ordersService.deleteCoffeeOrder(data);

  coffeeOrders;
  getCoffeeOrders = () =>
     this.ordersService
     .getCoffeeOrders()
     .subscribe(res =>(this.coffeeOrders = res));
}
