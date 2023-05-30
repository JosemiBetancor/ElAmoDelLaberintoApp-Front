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

  private dragTarget
  private app!: PixiApplication;
 sprites = [
    "assets/gameAssets/bath1x2.png"
  ]

  ngOnInit(): void {
    this.createmap();
  }
  createmap() {
    this.app = new PixiApplication({
      background: '#034a05',
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
  addSpriteToMap(url: string): void {
    const texture = Texture.from(url);
    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    const sprite = new Sprite(texture);
    sprite.interactive = true;
    sprite.anchor.set(0.5);
    sprite.cursor = 'pointer';
    sprite.on('pointerdown', this.onDragStart.bind(this, sprite), sprite);
    sprite.x = 500;
    sprite.y = 500;
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