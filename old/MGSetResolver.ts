import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MGSetService } from "./MGSetService.js";
import { MGSetNotFoundError } from "./errors";
import { User, Roles } from "./auth";
import { MGSet } from "./MGSet.js";
import { MGSetArgs, NewMGSetInput } from "./MGSetInput.js";

@Resolver(MGSet)
export class MGSetResolver {
    constructor(private setService: MGSetService) {}

    @Query(returns => MGSet)
    async set(@Arg("code") code: string) {
        const set = await this.setService.findByCode(code);
        if (set === undefined) {
            throw new MGSetNotFoundError(code);
        }
        return set;
    }

    @Query(returns => [MGSet])
    sets(@Args() { skip, take }: MGSetArgs) {
        return this.setService.findAll({ skip, take });
    }

    @Mutation(returns => MGSet)
    @Authorized()
    addSet(
        @Arg("newSetData") newSetData: NewMGSetInput,
        @Ctx("user") user: User,
    ): Promise<MGSet> {
        return this.setService.add({ data: newSetData, user });
    }

    @Mutation(returns => Boolean)
    @Authorized(Roles.Admin)
    async removeSet(@Arg("code") code: string) {
        try {
            await this.setService.remove(code);
            return true;
        } catch {
            return false;
        }
    }
}
