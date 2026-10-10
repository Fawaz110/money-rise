import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import AuthInterfaces from '../Interfaces/auth.interface.export';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Interfaces from '../../../Core/Interfaces/interfaces.export';

@Service()
export class AuthService {
    private AuthBaseUrl: string = environment.base_url + '/api/v1/auth';
    private _HttpClient = inject(HttpClient);
    userPayload: BehaviorSubject<AuthInterfaces.UserPayload | undefined> = new BehaviorSubject<AuthInterfaces.UserPayload | undefined>(undefined);
    userToken: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

    login(data: AuthInterfaces.Login): Observable<AuthInterfaces.UserToken> {
        return this._HttpClient.post<AuthInterfaces.UserToken>(this.AuthBaseUrl + '/login', data);
    }

    signup(data: AuthInterfaces.Signup): Observable<AuthInterfaces.UserToken> {
        return this._HttpClient.post<AuthInterfaces.UserToken>(this.AuthBaseUrl + '/signup', data);
    }

    recovery(email: string): Observable<AuthInterfaces.UserSummary> {
        return this._HttpClient.get<AuthInterfaces.UserSummary>(this.AuthBaseUrl + '/recovery?email=' + email);
    }

    sendResetPasswordCode(id: string): Observable<Interfaces.ApiResponse> {
        return this._HttpClient.post<Interfaces.ApiResponse>(this.AuthBaseUrl + `/${id}/email/reset-password`, {});
    }

    confirmCode(data: { id: string, code: string }): Observable<Interfaces.ApiResponse> {
        return this._HttpClient.patch<Interfaces.ApiResponse>(this.AuthBaseUrl + 'code/confirm', data);
    }
}
