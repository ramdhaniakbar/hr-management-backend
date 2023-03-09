import { ForbiddenError } from "@casl/ability";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccessService } from "src/access/access.service";
import { CHECK_ABILITY, RequiredRule } from "./ability.decorator";
import { AbilityFactory } from "./ability.factory";

@Injectable()
export class AbilityGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private abilityFactory: AbilityFactory,
        private accesService: AccessService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||[];
        const {user,url} = context.switchToHttp().getRequest();
        const [role] = await this.accesService.getRole(user)
        const ability = await this.abilityFactory.defineAbility(user, role, url)
        try{
            rules.forEach((rule) =>ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),)
            return true;
        }catch (error){
            if(error instanceof ForbiddenError){
                throw new ForbiddenException( "You don't have access to do "+ error.action +" on "+ error.subject )
            }
        }
        return true;
    }
}