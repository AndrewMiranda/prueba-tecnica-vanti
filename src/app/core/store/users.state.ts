import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/users.interface';
import { LoadUsers, ClearUsers } from './users.action';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

export interface UserStateModel {
    users: IUser[];
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})
@Injectable()
export class UserState {
    constructor(private userService: UserService) {}

    @Selector()
    static getUsers(state: UserStateModel): IUser[] {
        return state.users;
    }

    @Action(LoadUsers)
    loadUsers(ctx: StateContext<UserStateModel>) {
        return this.userService.getUsers().pipe(
            tap((users: IUser[]) => {
                ctx.patchState({ users });
            })
        );
    }

    @Action(ClearUsers)
    clearUsers(ctx: StateContext<UserStateModel>) {
        ctx.patchState({ users: [] });
    }
}
