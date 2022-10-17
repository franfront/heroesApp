import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from './../../services/heroes.service';
import { Heroe, Publisher } from './../../interface/heroes.interface';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `],
})
export class AgregarComponent implements OnInit {
  universos = [
    {
      id: 'DC Comics',
      universo: 'DC',
    },
    {
      id: 'Marvel Comics',
      universo: 'Marvel',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };



  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
    if (this.router.url.includes("editar")) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroesId(id)))
        .subscribe((heroe) => (this.heroe = heroe));
      
    }
    
    
    
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.abrirSnakbar("Heroe actualizado"))
    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id ]);
        this.abrirSnakbar("Heroe creado");
      });

    }

  }

  borrar(){

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: "450px",
      data: {...this.heroe}
    })

    dialog.afterClosed().subscribe(
      result =>{
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id!).subscribe(
            resp => {
              this.router.navigate(['/heroes']);
            }
          )
        }
      } 
    )



    
  }

  abrirSnakbar(mensaje: string): void{
    this.snack.open(mensaje, "Cerrar", {
      duration: 2500,
    } )
  }


}
