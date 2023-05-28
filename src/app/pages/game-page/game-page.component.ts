import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';
import { CharacterListComponent } from 'src/app/components/game/character-list/character-list.component';
import { ICharacter } from 'src/app/interfaces/game.interfaces';
import { BackendService } from 'src/app/services/backend.service';
import { NotificationService } from 'src/app/services/notification.service';
import { GameMapComponent } from 'src/app/components/game/game-map/game-map.component';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    CharacterListComponent,
    GameMapComponent,
  ],
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  characters: ICharacter[] = [
    {
      id: 1,
      nombre: 'Gandalf',
      nivel: 10,
      experiencia: 300,
      clase: 'Mago',
      alineamiento: 'Bueno',
      imagen: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/10/18/16661071524623.jpg',
    }
  ];

  constructor(
    private readonly backendService: BackendService,
    private readonly notificationService:NotificationService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCharacters();
  }
  async getCharacters(): Promise<void> {
    try {
      this.characters = await lastValueFrom(this.backendService.getCharacters());
    } catch (error) {
      this.notificationService.createNotification('error','Error','Ha ocurrido un error en la carga de personajes.');
      console.log(error);
    }
  }


}
