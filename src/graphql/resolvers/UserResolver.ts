import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/__mocks__/mockUser';
import { UserSetting } from '../models/userSetting';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';
import { CreateUserInput } from '../utils/CreateUserInput';

export let incrementalId = 3

@Resolver(of => User)
export class UserResolver {
  @Query(returns => User, {nullable:true})
//   getUsers() {
//     return {
//       id: 1,
//       username: 'Animesh',
//       displayName: 'Animesh the developer',
//     };
//   }
    getUserById(@Args('id', {type:()=>Int}) id: number){
        return mockUsers.find(user=> user.id === id)
    }

    @Query(()=>[User], {nullable:true})
    getUsers(){
        return mockUsers
    }

    @ResolveField(()=> UserSetting, {nullable:true, name: 'settings'}, )
    getUserSettings(@Parent() user: User){
        return mockUserSettings.find((setting)=>setting.userId === user.id)
    }

    @Mutation(()=>User)
    createUser(
    // @Args('username') username: string,
    // @Args('displayName', {nullable: true}) displayName: string){
//better way of doing above thing
        @Args('createUserData') createUserData: CreateUserInput){
    const {username, displayName} = createUserData;
        const newUser = {username, displayName, id: ++incrementalId};
        console.log(newUser)
        mockUsers.push(newUser);
        return newUser
    }
}
