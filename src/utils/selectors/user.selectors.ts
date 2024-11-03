export const selectCurrentUser = (state: {
  user: {
    loading: boolean;
    userData: {
      token: { access_token: string; expiresIn: string };
      user: {
        id: number;
        first_name: string;
        last_name: string;
        role: Roles;
        admin_role: AdminRoles;
        is_active: boolean;
        profile_picture: string;
      };
    };
    error: {
      response: string;
      status: number;
      message: string;
    };
  };
}) => state.user;

enum Gender {
  Male = "M",
  Female = "F",
  Others = "O",
}

enum Roles {
  Influencer = "Influencer",
  Marketer = "Marketer",
  Admin = "Admin",
  Account_Manager = "Account_Manager",
}

export enum AdminRoles {
  AM1 = "AM1",
  AM2 = "AM2",
  AM3 = "AM3",
  Employee = "Employee",
  SUPER_ADMIN = "SUPER_ADMIN",
}
