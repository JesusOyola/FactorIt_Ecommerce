import { Component, OnInit } from '@angular/core';
import { ProductAmount, Products } from 'src/app/interface/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-lists',
  templateUrl: './products-lists.component.html',
  styleUrls: ['./products-lists.component.scss']
})
export class ProductsListsComponent implements OnInit {
 
  listProducts: ProductAmount[] | undefined;
  urlImage: string =
    'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_';

  cartListProducts: Products[] = [];

  constructor(
    private productsService: ProductsService,
    
  ) {}

  ngOnInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log(data);

        this.listProducts = data;
      },
    });
  }
}
