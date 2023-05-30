import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application as PixiApplication, Graphics, SCALE_MODES, Sprite, Texture, FederatedPointerEvent } from 'pixi.js';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-game-map',
  standalone: true,
  imports: [CommonModule,
    NzMenuModule,
    NzDropDownModule,
    NzIconModule,],
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.css']
})
export class GameMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private dragTarget
  private app!: PixiApplication;
  isDropdownOpen: boolean = false;
  sprites = [
    "assets/gameAssets/bath1x2.png",
    "assets/gameAssets/barril.png",
    "assets/gameAssets/bath1x2.png",
    "assets/gameAssets/bed1x2.png",
    "assets/gameAssets/beddouble2x2.png",
    "assets/gameAssets/bedtwo1x2.png",
    "assets/gameAssets/bedtwodouble2x2.png",
    "assets/gameAssets/book1x1.png",
    "assets/gameAssets/bookcase1x1.png",
    "assets/gameAssets/booktwo1x1.png",
    "assets/gameAssets/campfire1x1.png",
    "assets/gameAssets/campfiretwo1x1.png",
    "assets/gameAssets/Chair1x1.png",
    "assets/gameAssets/chest1x1.png",
    "assets/gameAssets/chesttwo1x1.png",
    "assets/gameAssets/crate1x1.png",
    "assets/gameAssets/cratetwo1x1.png",
    "assets/gameAssets/dresser1x1.png",
    "assets/gameAssets/fire.png",
    "assets/gameAssets/grasstile5x5.png",
    "assets/gameAssets/hay1x1.png",
    "assets/gameAssets/hay2x2.png",
    "assets/gameAssets/number0-1x1.png",
    "assets/gameAssets/number1-1x1.png",
    "assets/gameAssets/number2-1x1.png",
    "assets/gameAssets/number3-1x1.png",
    "assets/gameAssets/number4-1x1.png",
    "assets/gameAssets/number5-1x1.png",
    "assets/gameAssets/number6-1x1.png",
    "assets/gameAssets/number7-1x1.png",
    "assets/gameAssets/number8-1x1.png",
    "assets/gameAssets/number9-1x1.png",
    "assets/gameAssets/opencrate1x1.png",
    "assets/gameAssets/paper-pile1x1.png",
    "assets/gameAssets/paper1x1.png",
    "assets/gameAssets/Pit1x1.png",
    "assets/gameAssets/Pitcircle1x1.png",
    "assets/gameAssets/pot1x1.png",
    "assets/gameAssets/potplant1x1.png",
    "assets/gameAssets/potplanttwo1x1.png",
    "assets/gameAssets/sack1x1.png",
    "assets/gameAssets/sacktwo1x1.png",
    "assets/gameAssets/shelf1x1.png",
    "assets/gameAssets/stairs1x1.png",
    "assets/gameAssets/stonytile5x5.png",
    "assets/gameAssets/table1x1.png",
    "assets/gameAssets/table1x2-rough.png",
    "assets/gameAssets/table1x2.png",
    "assets/gameAssets/TableCircle1x1.png",
    "assets/gameAssets/tableCircleRough1x1.png",
    "assets/gameAssets/tableCircleRough2x2.png",
    "assets/gameAssets/tableRough1x1.png",
    "assets/gameAssets/tile5x5.png",
    "assets/gameAssets/treasurepile1x1.png",
    "assets/gameAssets/treasurepile2x2.png",
    "assets/gameAssets/fire1.png",
    "assets/gameAssets/fire2.png",
    "assets/gameAssets/skeletonLick.png",
    "assets/gameAssets/skeletonguard.png",
    "assets/gameAssets/max.png",
    "assets/gameAssets/token_2.png",
    "assets/gameAssets/token_3.png",
    "assets/gameAssets/token_4.png",
    "assets/gameAssets/token_5.png",
    "assets/gameAssets/token_6.png",
  ]

  ngOnInit(): void {
    this.createmap();
  }

  createmap() {
    this.app = new PixiApplication({
      background: 'green',
      width: 1420,
      height: 863,
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
  openDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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