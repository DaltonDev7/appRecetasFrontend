import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MiperfilComponent } from './miperfil.component';

const routes : Routes = [
  {
    path:'',
    component: MiperfilComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MiPerfilRoutingModule { }
