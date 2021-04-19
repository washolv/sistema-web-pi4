import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {

  public id: number=0;
  constructor(private roleGuardService: RoleGuardService) {
    let user=this.roleGuardService.getUser();
    this.id=<number>user.Id;
  }

  ngOnInit() {
  }
  compras(){

  }
}
