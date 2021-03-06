import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthenticationServiceApi } from './core/service/auth.service.api';
import { AuthenticationServiceJhipster } from './core/service/jhipster/auth.service.jhipster';
import { ApplicationConfigService } from './core/service/jhipster/core/config/application-config.service';
import { httpInterceptorProviders } from './core/service/jhipster/core/interceptor';
import { AuthenticationServiceMock } from './core/service/mock/auth.service.mock';
import { metaReducers, reducers } from './reducers';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.debug,
    }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.debug ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot(),
    AuthModule,
  ],
  providers: [
    {
      provide: AuthenticationServiceApi,
      useClass: !environment.useMockService
        ? AuthenticationServiceJhipster
        : AuthenticationServiceMock,
    },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService) {
    applicationConfigService.setEndpointPrefix(environment.backendUrl);
  }
}
