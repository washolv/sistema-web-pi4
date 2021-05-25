import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {
  public  apiUrl: string;

  public id: number=0;
  constructor(private roleGuardService: RoleGuardService) {
    let user=this.roleGuardService.getUser();
    this.id=<number>user.Id;
    this.apiUrl = environment.urlFront;
  }

  ngOnInit() {
  }
  compras(){

  }

}
