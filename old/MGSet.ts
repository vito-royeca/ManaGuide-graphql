import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MGLanguage {
    @Field()
    code!: string;

    @Field()
    displayCode!: string;

    @Field()
    name!: string;
}

@ObjectType()
export class MGSet {
    @Field()
    code!: string;

    @Field()
    name!: string;

    @Field()
    releaseDate!: string;

    @Field()
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

@ObjectType()
export class MGSetType {
    @Field()
    name!: string;
}

@ObjectType()
export class MGSetBlock {
    @Field()
    name!: string;

    @Field()
    code!: string;
}
