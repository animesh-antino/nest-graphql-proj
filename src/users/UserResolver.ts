import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { mockUsers } from 'src/__mocks__/mockUser';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/userSetting';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { UserService } from './UserService';

export let incrementalId = 3

@Resolver(of => User)
export class UserResolver {

    constructor(private UserService: UserService){}

  @Query(returns => User, {nullable:true})
//   getUsers() {
//     return {
//       id: 1,
//       username: 'Animesh',
//       displayName: 'Animesh the developer',
//     };
//   }
    getUserById(@Args('id', {type:()=>Int}) id: number){
        // return mockUsers.find(user=> user.id === id)

        return this.UserService.getUserById(id)
    }

    @Query(()=>[User], {nullable:true})
    getUsers(){
        return this.UserService.getUsers();
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
    // const {username, displayName} = createUserData;
    //     const newUser = {username, displayName, id: ++incrementalId};
    //     console.log(newUser)
    //     mockUsers.push(newUser);
    //     return newUser
    return this.UserService.createUser(createUserData)
    }
}
