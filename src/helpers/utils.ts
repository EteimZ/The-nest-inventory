import { UserEntity } from "src/users/entity/user.entity";
import { UserDto } from "src/users/dto/user.dto";

import * as bcrypt from "bcrypt";
import { InventoryEntity } from "src/inventory/entity/inventory.entity";
import { InventoryInterface } from "src/inventory/interface/inventory.interface";

// transform the user entity into a user dto
export const toUserDto = (user: UserEntity): UserDto => {
    const { id, username, email } = user;

    let userDto: UserDto = {
        id,
        username,
        email,
    };

    return userDto;
};


// transform the inventory entity into a inventory dto
export const toInventoryInterface = (inventory: InventoryEntity): InventoryInterface => {
    const { owner, ...results } = inventory

    return results
}



// comparing the password with the hashed password
export const comparePasswords = async ( userPassword: string, hashedPassword: string ): Promise<boolean> => {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
}