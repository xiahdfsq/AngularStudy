import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductService } from './servive/product.service';
import { OrderComponent } from './order/order.component';
import { PriceQuoteComponent } from './price-quote/price-quote.component';
import { MutiplePipe } from './pipe/mutiple.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { FormComponent } from './form/form.component';
import { ReactFormComponent } from './react-form/react-form.component';
import { ReactiveRegistComponent } from './reactive-regist/reactive-regist.component';
import { PhonevalidatorDirective } from './directives/phonevalidator.directive';
import { EqualvalidatorDirective } from './directives/equalvalidator.directive';

const routerConfig: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path: 'product/:productId',component: ProductDetailComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    OrderComponent,
    PriceQuoteComponent,
    MutiplePipe,
    FilterPipe,
    FormComponent,
    ReactFormComponent,
    ReactiveRegistComponent,
    PhonevalidatorDirective,
    EqualvalidatorDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
