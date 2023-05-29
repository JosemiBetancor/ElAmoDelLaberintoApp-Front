import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application as PixiApplication, Graphics, SCALE_MODES, Sprite, Texture, FederatedPointerEvent } from 'pixi.js';
 
@Component({
  selector: 'app-game-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.css']
})
export class GameMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  dragTarget

  private app!: PixiApplication;
  // private grid!: Graphics;
  // private dragTarget: Sprite | null = null;

  // ngOnInit(): void {
  //   this.createMap();
  // }

  // createMap(): void {
  //   // Crea una instancia de la aplicación Pixi
  //   this.app = new Application({
  //     width: 1280,
  //     height: 720,
  //     backgroundColor: 0x000000, // Fondo negro
  //     antialias: true
  //   });
  //   texture.baseTexture.scaleMode =SCALE_MODES.NEAREST;
  //   // Añade la aplicación al contenedor del mapa en el template
  //   this.mapContainer.nativeElement.appendChild(this.app.view);
  //   // Crea el grid blanco
  //   this.grid = new Graphics();
  //   this.grid.lineStyle(1, 0xffffff); // Líneas blancas
  //   this.grid.alpha = 0.5; // Transparencia

  //   const gridSize = 50; // Tamaño de cada celda del grid
  //   const numCellsX = Math.ceil(this.app.renderer.width / gridSize);
  //   const numCellsY = Math.ceil(this.app.renderer.height / gridSize);

  //   for (let i = 0; i < numCellsX; i++) {
  //     this.grid.moveTo(i * gridSize, 0);
  //     this.grid.lineTo(i * gridSize, this.app.renderer.height);
  //   }

  //   for (let j = 0; j < numCellsY; j++) {
  //     this.grid.moveTo(0, j * gridSize);
  //     this.grid.lineTo(this.app.renderer.width, j * gridSize);
  //   }

  //   // Añade el grid al stage de la aplicación
  //   this.app.stage.addChild(this.grid);
 
  // }

  // addSpriteToMap(): void {
  //   // Crea el sprite
  //   const sprite = Sprite.from('assets/gameAssets/bath1x2.png');
  //   sprite.interactive = true;
  //   sprite.on('pointerdown', (event: any) => {
  //     this.onDragStart(event);
  //   });

  //   this.app.stage.addChild(sprite);
  // }

  // onDragStart(event: any): void {
  //   this.dragTarget = event.target;
  //   this.dragTarget.alpha = 0.5;
  //   this.dragTarget.on('pointermove', this.onDragMove, this);
  //   this.dragTarget.on('pointerup', this.onDragEnd, this);
  //   this.dragTarget.on('pointerupoutside', this.onDragEnd, this);
  // }
  
  // onDragMove(event: any): void {
  //   if (this.dragTarget) {
  //     const newPosition = event.data.global;
  //     this.dragTarget.position.set(newPosition.x, newPosition.y);
  //   }
  // }
  
  // onDragEnd(): void {
  //   if (this.dragTarget) {
  //     this.dragTarget.alpha = 1;
  //     this.dragTarget.off('pointermove', this.onDragMove, this);
  //     this.dragTarget.off('pointerup', this.onDragEnd, this);
  //     this.dragTarget.off('pointerupoutside', this.onDragEnd, this);
  //     this.dragTarget = null;
  //   }
  // }

  ngOnInit(): void {
      this.app = new PixiApplication({
        background: '#000000',
        width: 1000,
        height: 1000,
      });
      this.app.stage.interactive = true;
      this.app.stage.hitArea = this.app.screen;
      this.app.stage.on('pointerup', this.onDragEnd.bind(this));
      this.app.stage.on('pointerupoutside', this.onDragEnd.bind(this));
      const mapContainerDiv = this.mapContainer.nativeElement as HTMLDivElement;
      const canvas = this.app.view as HTMLCanvasElement;
      canvas.style.height = '100%';
      canvas.style.width = '100%';
      canvas.style.display = 'block';
      mapContainerDiv.appendChild(canvas);
  }

  addSpriteToMap(): void {
    const texture = Texture.from('assets/gameAssets/bath1x2.png');
    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    const sprite = new Sprite(texture);
    sprite.interactive = true;
    sprite.anchor.set(0.5);
    sprite.cursor = 'pointer';
    sprite.on('pointerdown', this.onDragStart.bind(this, sprite), sprite);
    sprite.x = 0;
    sprite.y = 0;
    this.app.stage.addChild(sprite);
  }

  onDragStart(sprite: Sprite, event: FederatedPointerEvent) {
    sprite.alpha = 0.5;
    this.dragTarget = sprite;
    this.app.stage.on('pointermove', this.onDragMove.bind(this));
  }

  onDragMove(event: FederatedPointerEvent) {
    if (this.dragTarget) {
      this.dragTarget.parent.toLocal(event.global, null, this.dragTarget.position);
    }
  }

  onDragEnd(event: FederatedPointerEvent) {
    if (this.dragTarget) {
      this.app.stage.off('pointermove', this.onDragMove.bind(this));
      this.dragTarget.alpha = 1;
      this.dragTarget = null;
    }
  }
}