import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yebelo';
  productList: Array<any> = [];
  disPlayProductList: Array<any> = [];
  selectedProduct: Array<any> = [];
  selectedCategory: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://localhost:4200/assets/mock/product-list.json')
      .subscribe((data: Array<any>) => {
        console.log(data);
        this.productList = data;
        this.disPlayProductList = data;
      });
  }

  onChangeCategory() {
    const productList = this.disPlayProductList.filter(
      (list) => list.p_category === this.selectedCategory
    );
    this.productList = productList.length
      ? productList
      : this.disPlayProductList;
  }

  onProductSelect(selectedProduct) {
    if (selectedProduct.p_availability) {
      selectedProduct.isSelected = !selectedProduct.isSelected;

      if (selectedProduct.isSelected) {
        this.selectedProduct.push(selectedProduct);
      } else {
        const index = this.selectedProduct.findIndex(
          (list) => list.p_id === selectedProduct.p_id
        );
        this.selectedProduct.splice(index, 1);
      }
    }
  }

  onSubmit() {
    if (this.selectedProduct.length) {
      alert(JSON.stringify(this.selectedProduct));
    } else {
      alert('Please select any product before submit!');
    }
  }
}
