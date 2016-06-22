import Route from '../../../route';
import {Param, Header, Body} from '../../../property';
import Auth from '../../../auth';
import AuthHandler from '../../../auth/handler';
import {ScrubIn, ScrubOut, Required} from '../../../dto';

export class User {
    @Required()
    id: string;
    
    username: string;
    
    @ScrubOut()
    password: string;
    
    email: string;
}

export class UserService {
    @AuthHandler('User')
    public static resolveAuth(@Header('Authorization') auth: string): User {
        let user = new User();
        
        user.id = auth;
        user.username = 'foo';
        user.password = 'password';
        user.email = 'email@gmail.com';

        return user;
    }
}

export class UserRouter {
    @Route('PUT', '/user')
    public static updateUser(@Auth('User') user: User, @Body(User) update: User) {
        return update;
    }
}