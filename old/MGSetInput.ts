
import { Field, InputType, Int, ArgsType } from "type-graphql";
import { Max, Min } from "class-validator";
import { MGLanguage, MGSet, MGSetBlock, MGSetType } from "./MGSet.js";

@InputType()
export class NewMGSetInput {
    @Field()
    code!: string;

    @Field()
    name!: string;

    @Field()
    releaseDate!: string;

    @Field()
    @Min(0)
    cardCount!: number;

    @Field()
    isFoilOnly!: boolean;

    @Field()
    isOnlineOnly!: boolean;

    @Field()
    logoCode!: string;

    @Field({ nullable: true })
    mtgoCode?: string;

    @Field()
    keyruneUnicode!: string;

    @Field()
    keyruneClass!: string;

    @Field()
    yearSection!: string;

    @Field()
    tcgplayerId!: number;

    @Field({ nullable: true })
    setParent?: MGSet;

    @Field({ nullable: true })
    setBlock?: MGSetBlock;

    @Field()
    setType!: MGSetType;

    @Field()
    languages!: MGLanguage[];
}

@ArgsType()
export class MGSetArgs {
     @Field(type => Int)
    @Min(0)
    skip: number = 0;

    @Field(type => Int)
    @Min(1)
    @Max(50)
    take: number = 25;
}