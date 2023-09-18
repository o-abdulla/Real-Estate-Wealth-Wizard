import { Component, Input } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { PropertyDetails } from 'src/app/Models/property-details';
import { User } from 'src/app/Models/user';
import { FavoriteService } from 'src/app/Services/favorite.service';
import { PropertyDetailsService } from 'src/app/Services/property-details.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent {

  

  @Input() DisplayFavorite:User = {} as User;
  FavoriteListResult:Favorite[] = [];
  UserListResult:User[] = [];
  name:string = "4200";
  favoriteProperties:PropertyDetails[] = [];
  

  
constructor(private _favoriteService:FavoriteService, private _propertyDetailsService: PropertyDetailsService) { }

  ngOnInit(): void {
    this.DisplayFavorites(this.name);
    // this.DisplayEvents();
    }

  DisplayFavorites(googleId:string):void{
  
    this._favoriteService.GetFavorites(googleId).subscribe((response:Favorite[]) =>{
      console.log(response);
      this.FavoriteListResult = response;
    });

  }

  GetPropDetails():void{
    this.FavoriteListResult.forEach((f:Favorite) => {
    this._propertyDetailsService.GetPropertyDetails(f.propertyId).subscribe((response:PropertyDetails) => {
      this.favoriteProperties.push(response);
    });
    });
  }

  RemoveFavorite(googleId: string, propertyId:string):void{
    let favorite:Favorite = {} as Favorite;
    // this._eventService.AddFavorite();
    favorite.googleId = googleId;
    favorite.propertyId = propertyId;
    this._favoriteService.RemoveFavorite(googleId, propertyId).subscribe((response:Favorite) =>{
      console.log(response)
      this.FavoriteListResult.push(response);
    });
  }
  
  //  DisplayEvents(): void {
  //   this._favoriteService.GetEvents().subscribe((response:Event[]) => {
  //     console.log(response);
  //     this.EventListResult = response;
  //   });
  // }

  // DeleteFavorite(id:number):void{
  //   //feedback for user
  //   let target:number = this.FavoriteListResult.findIndex(e => e.id ==id);
  //   this.FavoriteListResult.splice(target,1);

  //   this._favoriteService.RemoveFavorite(id).subscribe((response:Favorite) => {
  //     console.log(response);
  //   });
  // }
}
