import { Response } from 'express';
import { RegisterDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    hiddenInformation(): Promise<string>;
    publicInformation(): Promise<string>;
    register(registerDTO: RegisterDTO, res: Response): Promise<{
        user: any;
        token: string;
    }>;
    login(loginDTO: LoginDTO, req: any, res: Response): Promise<{
        user: any;
        token: string;
    }>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: any): Promise<any>;
}
