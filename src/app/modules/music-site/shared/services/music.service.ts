import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {listApis} from "../../../../shared/services/global-variables.constant";
import {Injectable} from "@angular/core";
import {PageAble} from "../../../../shared/models/models";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAllSongs(): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/all-songs`)
  }

  getSongs(pageAble: PageAble): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/get-songs`, {params: {...pageAble}})
  }

  searchSongs(pageAble: any): Observable<any> {
    return this.http.get<any>(`${listApis.local}/song/search-songs`, {params: {...pageAble}})
  }

  getSong(id: number): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`${listApis.local}/song/get-song/${id}`, { responseType: 'arraybuffer' })
  }

  uploadSong(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/song/create`, formData)
  }
}
