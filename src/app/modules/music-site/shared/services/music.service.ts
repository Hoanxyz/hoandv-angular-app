import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {listApis} from "../../../../shared/services/global-variables.constant";
import {Injectable} from "@angular/core";
import {PageAble} from "../../../../shared/models/models";
import {ApiService} from "../../../../shared/services/services.service";
import {data} from "autoprefixer";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  constructor(
    private http: HttpClient,
    public apiService: ApiService,
  ) {
  }

  searchSongs(pageAble: PageAble): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song/search-songs`, pageAble);
  }

  getSong(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-song/${id}`,
      { observe: 'response', responseType: 'blob' as 'json' }
    );
  }

  uploadSong(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song/create`, formData);
  }

  deleteSong(id: number): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song/delete/${id}`, {});
  }

  addToFav(data: any): Observable<any>  {
    return this.http.post<any>(`${listApis.local}/song/add-fav`, data);
  }

  deleteFav(data: any): Observable<any>  {
    return this.http.post<any>(`${listApis.local}/song/delete-fav`, data);
  }


  getListFav(pageAble: PageAble): Observable<any>  {
    return this.http.post<any>(`${listApis.local}/song/get-fav`, pageAble);
  }

  findFavSongIdsByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-fav-ids`,
      { params: {id} }
    );
  }

  findNewestSong(): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-newest-song`);
  }

  findNextSong(id: number): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-next-song/${id}`);
  }
}
