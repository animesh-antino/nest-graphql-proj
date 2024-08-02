import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'user_settings'})
@ObjectType()
export class UserSetting{

    @PrimaryColumn()
    @Field((type)=> Int)
    userId: number

    @Column({default: false})
    @Field({defaultValue: false})
    recieveNotifications: boolean;

    @OneToOne(()=>UserSetting)
    @JoinColumn()
    @Field({defaultValue: false})
    recieveEmails: boolean
}