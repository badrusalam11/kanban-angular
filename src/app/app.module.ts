import { DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { MainViewService } from './pages/main-view/main-view.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { AwesomeTooltipDirective } from './awesome-tooltip.directive';
import { AwesomeTooltipComponent } from './awesome-tooltip.directive.spec';


@NgModule({
  entryComponents: [AwesomeTooltipComponent],
  declarations: [
    AppComponent,
    MainViewComponent,
    LoginViewComponent,
    AwesomeTooltipDirective,
    AwesomeTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    RouterModule.forRoot([
      { path: '', component: LoginViewComponent },
      { path: 'dashboard', component: MainViewComponent },
    ]),
    OverlayModule 
  ],
  providers: [
    MainViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
